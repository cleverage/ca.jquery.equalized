[![Build Status](https://api.travis-ci.org/cleverage/ca.jquery.equalized.svg?branch=master)](https://api.travis-ci.org/cleverage/ca.jquery.equalized)

jQuery Equalized Plug-in
========================

Ce plug-in permet d'harmoniser la hauteur (et la largeur) de plusieurs éléments
du DOM. Dans la mesure du possible essayez de faire ça en CSS. Si vraiment ce
n'est pas possible, c'est là que ce plug-in peut vous aider.


API
---

La méthode d'initialisation du plugin est `equalized()`

```javascript
$('.equilize_me').equalized(options)
```

Cette methode accept un objet de paramètrage qui a jusqu'à 4 propriétés.
Elle accepte également des formes racourcis (chaines ou nombres) pour simplifier
les usages les plus courants.

### Les propriétés de l'objet de confguration

#### `height`

Cette propriété permet de déterminer comment la hauteur des elements va être
égalisée. Elle accepte 4 types de valeurs possibles:

* `{falsy}`   : Toute valeur _falsy_ (qui peut être compris comme `false`)
                désactive l'égalisation des hauteurs.
* `auto`      : Le plug-in va calculer automatiquement la hauteur à appliquer.
                Il va prendre la plus grande hauteur parmis tous les éléments
                du groupe à égaliser et l'appliquer à tous les autres.
* `{number>0}`: Tout nombre superieur à zero est considéré comme la hauteur en
                pixel à appliquer à tous les éléments du groupe à égaliser.
* `{selector}`: N'importe quel chaine de caractère autre que `auto` est utilisée
                comme un selecteur jQuery. La hauteur du premier élément retourné
                par ce selecteur est appliquée à l'ensemble des éléments du groupe
                à égaliser. Si ce selecteur commence par le caractère `>`, il sera
                alors utilisé comme un filtre pour selectionner l'élément du
                groupe à utiliser pour definir la hauteur d'égalisation.

La valeur par défaut de cette propriété est `auto`.

#### `width`

Cette propriété permet de determiner comment la largeur des elements va être
égalisée. Elle accepte les même types de valeur que la propriété `height`.

La valeur par défaut de cette propriété est `false`.

#### `group`

Cette propriété permet d'indiquer quel groupe d'élément doit être égalisé. Elle
accepte 3 valeurs possibles :

* `{falsy}`: Toute valeur "falsy" (qui peut être compris comme `false`) indique
             que l'ensemble d'élément courant doit être égalisé.
* `all`    : Indique que tous les groupes vont être égalisés. Chaque groupe est
             traité individuellement chacun à son tour. _Cela peut avoir un
             impact de performance s'il y a de nombreux groupes dans la page_.
* `{id}`   : Toute autre valeur est considérée comme un identifiant de groupe.
             Tous les éléments portant l'attribut défini par la propriété
             `attribute` et dont la valeur est égale à cet identifiant sont
             considérés comme faisant partie du même groupe et seront égalisés
             entre eux.

La valeur par défaut de cette propriété est `false`, sauf pour un objet jQuery
englobant les objet `document` ou `window`. Dans ce cas, la valeur par défaut
est `all`.

#### `attribute`

Cette propriété indique quel attribut est utilisé pour définir des groupes
d'égalisation.

Si la valeur de cette proriété est `class`, un group sera constitué de tous les
éléments du document qui porterons la class définie par la propriété `group`.
Pour tout autre type d'attribut, un group sera constitué de tous les éléments
du document dont la valeur de l'attribut sera exactement égale à la valeur de
la propriété `group`.

La valeur par défaut de cette propriété est `data-equalized`.

### Paramètres racourcis

Plutot que de passer un objet de configuration à la fonction `equalized`, on
peut lui passer un nombre ou une chaine de caractère. Dans ces cas là, le
plugin se comportera comme si on lui avait passé un objet `{height:valeur}`.

Les deux examples suivant sont strictement identiques:

```javascript
$('.equilize_me').equalized(100);
```

```javascript
$('.equilize_me').equalized({
  height: 100
});
```

Les deux examples suivant sont aussi strictement identique:

```javascript
$('.equilize_me').equalized('> :eq(0)');
```

```javascript
$('.equilize_me').equalized({
  height : '> :eq(0)'
});
```

### Surcharger les paramètres par défaut.

Il est possible de lire et surcharger les valeurs par défaut de chaque paramètre
en modifiant l'objet `$.fn.equalized.defaults`.

### Impact sur CSS

Le plug-in va modifer les propriétés `width` et `height` des éléments et seulement celles-ci.
