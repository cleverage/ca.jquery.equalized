/*global casper*/
var BASE_URL = 'http://localhost:8000/tests';
(function () {
  'use strict';

  // DOM EVALUTATION FUNCTION
  // ------------------------

  function getComputedStyle(selector, property) {
    return casper.evaluate(function (selector, property) {
      var s = window.getComputedStyle(document.querySelector(selector));

      return property ? s[property] : s;
    }, selector, property);
  }

  function getTestTitle(n) {
    return casper.getHTML('section:nth-of-type(' + n + ') h2');
  }


  // TESTING FUNCTIONS
  // -----------------

  function testValues(test, id, property, values) {
    var v, name;

    for (name in values) {
      if (values.hasOwnProperty(name)) {
        v = getComputedStyle('#' + id + ' .' + name, property);
        test.assertEquals(v, values[name], 'For ' + name.toUpperCase()+ ', ' + property + ' is equal to ' + values[name]);
      }
    }
  }


  // TEST SUITE
  // ----------

  var TESTS = [
    { // 1.1.1 : Equalized height (auto)
      id    : '1.1.1',
      title : 'Equalized height (auto)',
      fn    : function (test) {
        casper.echo(getTestTitle(1));
        testValues(test, 'A', 'height', {a:'41px',b:'40px',c:'40px'});

        casper.echo(getTestTitle(2));
        testValues(test, 'B', 'height', {a:'40px',b:'40px',c:'40px'});
      }
    },
    { // 1.1.2 : Equalized height (number)
      id    : '1.1.2',
      title : 'Equilized height (number)',
      fn    : function (test) {
        casper.echo(getTestTitle(1));
        testValues(test, 'A', 'height', {a:'50px',b:'50px',c:'50px'});

        casper.echo(getTestTitle(2));
        testValues(test, 'B', 'height', {a:'50px',b:'50px',c:'50px'});

        casper.echo(getTestTitle(3));
        testValues(test, 'C', 'height', {a:'20px',b:'30px',c:'40px'});

        casper.echo(getTestTitle(4));
        testValues(test, 'D', 'height', {a:'20px',b:'30px',c:'40px'});
      }
    },
    { // 1.1.3 : Equalized height (selector)
      id    : '1.1.3',
      title : 'Equilized height (selector)',
      fn    : function (test) {
        casper.echo(getTestTitle(1));
        testValues(test, 'A', 'height', {a:'50px',b:'50px',c:'50px'});

        casper.echo(getTestTitle(2));
        testValues(test, 'B', 'height', {a:'50px',b:'50px',c:'50px'});

        casper.echo(getTestTitle(3));
        testValues(test, 'C', 'height', {a:'30px',b:'30px',c:'30px'});

        casper.echo(getTestTitle(4));
        testValues(test, 'D', 'height', {a:'30px',b:'30px',c:'30px'});
      }
    },
    { // 1.2.1 : Equalized width (auto)
      id    : '1.2.1',
      title : 'Equalized width (auto)',
      fn    : function (test) {
        casper.echo(getTestTitle(1));
        testValues(test, 'A', 'width', {a:'40px',b:'40px',c:'40px'});
      }
    },
    { // 1.2.2 : Equalized width (number)
      id    : '1.2.2',
      title : 'Equilized width (number)',
      fn    : function (test) {
        casper.echo(getTestTitle(1));
        testValues(test, 'A', 'width', {a:'50px',b:'50px',c:'50px'});

        casper.echo(getTestTitle(2));
        testValues(test, 'B', 'width', {a:'20px',b:'30px',c:'40px'});
      }
    },
    { // 1.2.3 : Equalized width (selector)
      id    : '1.2.3',
      title : 'Equilized width (selector)',
      fn    : function (test) {
        casper.echo(getTestTitle(1));
        testValues(test, 'A', 'width', {a:'50px',b:'50px',c:'50px'});

        casper.echo(getTestTitle(2));
        testValues(test, 'B', 'width', {a:'30px',b:'30px',c:'30px'});
      }
    },
    { // 1.3.0 : Reset equalized
      id    : '1.3.0',
      title : 'Reset equalized',
      fn    : function (test) {
        casper.echo(getTestTitle(1));
        testValues(test, 'A', 'height', {a:'20px',b:'30px',c:'40px'});
        testValues(test, 'A', 'width',  {a:'20px',b:'30px',c:'40px'});

        casper.echo(getTestTitle(2));
        testValues(test, 'B', 'height', {a:'20px',b:'30px',c:'40px'});
        testValues(test, 'B', 'width',  {a:'20px',b:'30px',c:'40px'});

        casper.echo(getTestTitle(3));
        testValues(test, 'C', 'height', {a:'20px',b:'30px',c:'40px'});
        testValues(test, 'C', 'width',  {a:'20px',b:'30px',c:'40px'});
      }
    },
    { // 2.1.0 : Define groups (data-equalized)
      id    : '2.1.0',
      title : 'Define groups (data-equalized)',
      fn    : function (test) {
        casper.echo(getTestTitle(1));
        testValues(test, 'A', 'height', {a:'50px',b:'40px',c:'40px',d:'50px'});

        casper.echo(getTestTitle(2));
        testValues(test, 'B', 'height', {a:'80px',b:'80px',c:'80px'});

      }
    },
    { // 2.2.0 : Define groups (custom attributes)
      id    : '2.2.0',
      title : 'Define groups (custom attributes)',
      fn    : function (test) {
        casper.echo(getTestTitle(1));
        testValues(test, 'A', 'height', {a:'20px',b:'40px',c:'40px'});

        casper.echo(getTestTitle(2));
        testValues(test, 'B', 'height', {a:'40px',b:'30px',c:'40px'});

      }
    },
    { // 2.3.1 : Equalized all groups (implicite)
      id    : '2.3.1',
      title : 'Equalized all groups (implicite)',
      fn    : function (test) {
        casper.echo(getTestTitle(1));
        testValues(test, 'A', 'height', {a:'50px',b:'40px',c:'40px',d:'50px'});
      }
    },
    { // 2.3.2 : Equalized all groups (explicite)
      id    : '2.3.2',
      title : 'Equalized all groups (explicite)',
      fn    : function (test) {
        casper.echo(getTestTitle(1));
        testValues(test, 'A',  'height', {a:'50px',b:'30px',c:'40px'});
        testValues(test, 'AA', 'height', {d:'50px',e:'70px',f:'70px'});
      }
    },
    { // 2.3.3 : Reset all groups (false)
      id    : '2.3.3',
      title : 'Reset all groups (false)',
      fn    : function (test) {
        casper.echo(getTestTitle(1));
        testValues(test, 'A', 'height', {a:'20px',b:'30px',c:'40px',d:'50px'});
        testValues(test, 'A', 'width',  {a:'20px',b:'30px',c:'40px',d:'50px'});
      }
    }
  ];


  // RUN ALL TESTS
  // -------------

  TESTS.forEach(function (t) {
    casper.test.begin('Equalized: Test ' + t.id + ': ' + t.title, function (test) {
      // casper.echo('LOAD: ' + BASE_URL + '/test.' + t.id + '.html');
      casper
        .start(BASE_URL + '/test.' + t.id + '.html')
        .then(function () {
          casper.echo(casper.getTitle());
          t.fn(test);
        })
        .run(function() {
          test.done();
        });
    });
  });
})();
