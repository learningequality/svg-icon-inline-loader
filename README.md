# Icon SVG Inline Loader

A webpack loader that enables inlining [Material Design](https://material.io/icons/) SVGs, [Ionicon](http://ionicons.com/) SVGs, or any SVG file into HTML.

## Install

`npm install --save-dev svg-icon-inline-loader`


## Usage

### Webpack Configuration

```js
{
  test: /\.html$/,
  loader: 'svg-icon-inline'
},
```

Or with [html-loader](https://github.com/webpack-contrib/html-loader):

```js
{
  test: /\.html$/,
  loader: 'html!svg-icon-inline'
},
```

### Within HTML

This loader recognizes 3 types of **self-closing** tags:

1. `<mat-svg/>` - Inline a Material Design SVG
2. `<ion-svg/>` - Inline an Ionicon SVG
3. `<file-svg/>` - Inline an SVG file.

#### Inline a Material Design SVG
 
```html
<mat-svg category="navigation" name="fullscreen_exit"/>
```

* `category`: The category that Material Design specifies for that icon.
* `name`: The name of the icon. If the name is multi-word, it must be separated using **underscores**.

#### Inline an Ionicon SVG

```html
<ion-svg name="ion-arrow-expand"/>
```

* `name`: The name of the icon. If the name is multi-word, it must be separated using **hyphens**.

#### Inline an SVG File

```html
<file-svg src="./icons/home.svg"/>
```

* `src`: The path of the svg file.

### Features

#### Retained Attributes

Any attributes apart from `category`, `name`, or `src`, are retained. For example:

Input 

```html
<mat-svg v-if="displayHomeIcon" class="icon-home" category="action" name="home"/>
```

Output

```html
<svg role="presentation" focusable="false" v-if="displayHomeIcon" class="icon-home" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
  <path d="M0 0h24v24H0z" fill="none"></path>
</svg>
```

#### Accessibility Improvements

A11y modifications for SVGs as [recommended](http://haltersweb.github.io/Accessibility/svg.html).

* Add `role="presentation"` and `focusable="false"` attributes.
* Remove `desc` and `title` attributes.

#### SVG Optimization

[SVGO](https://github.com/svg/svgo) is used to optimize SVGs.

#### Applying CSS to SVGs

Inlining SVGs enables CSS to be applied to SVGs.


## Notes

Originally forked from [markup-inline-loader](https://github.com/asnowwolf/markup-inline-loader). Thank you!
