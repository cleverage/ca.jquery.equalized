$(function () {
  $('.test').each(function () {
    var ele = $(this);
    var html = this.outerHTML;
    var pre = ele.prevAll('pre').first();

    pre.text('\n' + html);
  });

  var toc = $('<ul>');

  $('section').each(function (i) {
    var s = $(this);

    s.attr('id', 's' + i);
    toc.append('<li><a href="#s' + i + '">' + s.find('h2').text() + '</a></li>');
  });

  $('h1 + p').after(toc);
});