jQuery Equalized Plug-in
========================

This plug-in allows to harmonize height (and width) of a group of elements.

If possible try to do this with CSS. Use this plug-in only if it's not possible.


API
---

The entry point for the plug-in is the `equalized` function.

```javascript
$('.equilize_me').equalized(options)
```

This method take a configuration object with up to 4 properties. It also take
some shortcut (string or number) to ease the most common usage.


### Properties of the configuration object

#### `height`

This property defines how the height of the elements must be equilized. It can
take on of the following values:

* `{falsy}` : Any falsy value will prevent the equalization of the height.
* `auto`    : The plug-in will automatically compute the height to apply. It
              will use the height of the highest element of the group to
              equalize.
* {number>0}: Any number greater than zero is considered as the height (in
              pixels) to apply to the group of elements to equalize.
* {selector}: Any string other than `auto` is used as a jQuery selector. The
              height of the first element found with this selector is applied
              to the whole group of elements to equalize. If the selector starts
              with `>`, it will be used as a filter against the group of elements
              to determine which element's height will be used to equalise that
              group.

The default value for this property is `auto`.

#### `width`

This property defines how the width of the elements must be equilized. It takes
the same kind of value as the `height` property.

The default value for this property is `false`.

#### `group`

This property indicates which group of elements must be equalized. It can take
three possible values:

* {falsy} : Any falsy values indicates that set of current elements must be
            equalized.
* `all`   : Indicates that all groups will be equalized. Each group is processed
            one at a time. _This can have some serious performance issues if
            there are many groups on the page_.
* {id}    : All other values are considered a group identifier. All elements
            with the attribute defined by the `attribute` property, with the same
            value as the one define by this property, are all part of the same
            equalizing group.

The default value for this property is `false`, except for a jQuery object
wrapping the `document` or `window` object. In such cases, the default value
is `all`.

#### `attribute`

This property define which attribute is used to define equalizing groups.

If the value for this property is `class`, a group will be made of all the
elements with the class name defined with the property `group`. For any other
attribute, a group will be made of all the elements with the attribute value
equal to the value of the `group` property.

The default value for this property is `data-equalized`.


### Shortcut parameters

Rather than passing a configuration object to the `equalized` function, it's
possible to pass a number or a string. In such cases, the plug-in will act as if
it gets a `{height:value}` object.

The two following examples are identical:

```javascript
$('.equilize_me').equalized(100);
```

```javascript
$('.equilize_me').equalized({
  height: 100
});
```

The two following examples are also identical:

```javascript
$('.equilize_me').equalized('> :eq(0)');
```

```javascript
$('.equilize_me').equalized({
  height : '> :eq(0)'
});
```


### Overload default parameters.

It's possible to read and overload the default values of each parameter by
accessing the `$.fn.sticky.defaults` object.


### Impact on CSS

This plug-in will only modify the `width` and `height` properties


