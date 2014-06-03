/*! Copyright (c) 2014 Clever Age
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function ($) {
  'use strict';

  var PLUGIN = 'equalized';


  // UTILS
  // -----

  // check if a jQuery object is wrapping the one of the test objects
  //
  // * @param `d` {jQuery}
  // * @param `test` {Object|Array}
  // * @return {boolean}
  function is(d, test) {
    var obj = $.isArray(test) ? test : [test];
    var out = false;

    $.each(obj, function () {
      out = (d[0] === this);
      if (out) {
        return false; // break the loop
      }
    });

    return out;
  }

  // Make sure a none object parameters is properly turn into an object
  //
  // * @param `param` {any}
  // * @result {object}
  function nomalizeParams(param) {
    // {falsy} other than undefined will reset both height and width
    if (!param && param !== undefined) {
      return {
        height : false,
        width  : false
      };
    }

    // params shortcut: {string} or {number}
    if (typeof param === 'string' || param === +param) {
      return {
        height : param
      };
    }

    // params shortcut: not {object} (which include {array})
    if (typeof param !== 'object' || $.isArray(param)) {
      return {};
    }

    return param;
  }

  // Provide the numeric value of the property for a given context
  //
  // * @param `property` {string} : the name of the property value to get
  //                                Only support `width` and `height`.
  // * @param `value` {any} : the current value to transform into a number.
  // * @param `context` {jQuery} : A context where the value can be searched.
  // * @return {number}
  function getNumValue(property, value, context) {
    var out = 0, group;

    if (value === +value) {
      out = value > 0 ? value : 0;
    }

    if (typeof value === 'string') {
      if(value === 'auto') {
        group = context;
      }

      else if (value.indexOf('>') === 0) {
        group = context.filter(value.substr(1));
      }

      else {
        group = $(value);
      }

      group.each(function () {
        out = Math.max(out, $(this)[property]());
      });
    }

    return out;
  }

  // Equalized a group based on its options
  //
  // * @param `group` {jQuery}
  // * @param `options` {object} : Must have a `width` and `height` property.
  function processGroup(group, options) {
    // Retrieve numeric values for width and height
    var w = getNumValue('width',  options.width,  group);
    var h = getNumValue('height', options.height, group);

    group.each(function () {
      $(this).css({
        width : w > 0 ? w : '',
        height: h > 0 ? h : ''
      });
    });
  }


  // PLUGIN API
  // ----------

  // Main entry point (see below for the possible params)
  $.fn[PLUGIN] = function (params) {
    var group;
    var options = $.extend({}, $.fn[PLUGIN].defaults, nomalizeParams(params));

    // If no group, we process the current set of element
    // except if it's `document` or `window`
    if (!options.group && !is(this, [document, window])) {
      processGroup(this, options);
    }

    // If a group is identifed, we retrive it and process it.
    else if (options.group && options.group !== 'all') {
      group = options.attribute === 'class' ? $('.' + options.group)
            : $('[' + options.attribute + '="' + options.group + '"]');

      processGroup(group, options);
    }

    // Otherwise, we process all groups
    else {
      group = [];

      $('[' + options.attribute + ']').each(function () {
        var grp = $(this).attr(options.attribute);

        if (group.indexOf(grp) === -1) {
          group.push(grp);
          processGroup($('[' + options.attribute + '="' + grp + '"]'), options);
        }
      });
    }

    return this;
  };

  // Default configuration for the plug-in options
  $.fn[PLUGIN].defaults = {
    // Indicate if the width must be equilzed. Possible values are:
    // * {falsy}   : The plugin will not equalized the width.
    // * `auto`    : The plugin will automaticaly equalized the width.
    // * {number>0}: The plugin will equalized the elements to the given width
    // * {selector}: The plugin will equalized the elements using the width of
    //               the first element matching the selector. If the selector
    //               start with a `>` it is considered as a filter to apply to
    //               the current list of elements, otherwise, it is an obsolute
    //               selector to the whole document.
    width  : false,

    // Indicate if the height must be equalized.
    // Possible values are the same as for `width`
    height : 'auto',

    // Indicate which group must be equilized. Possible values are:
    // * {falsy} : The plugin will equilized the current set of elements
    // * `all`   : The plugin will equilized all groups of elements. NOTE: It
    //             will always be `all` if the plugin is called from `document`
    //             or `window`
    // * {string}: The plugin will equilized all the elements with the
    //             attribute `data-equilized="{string}"` or any other attribute
    //             defines with the `attribute` parameter.
    //
    group : false,

    // Indicate which attribute must be used to define groups.
    attribute : 'data-equalized'
  };
})(jQuery);
