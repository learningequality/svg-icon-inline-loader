# Icon SVG Inline Loader

A webpack loader that enables inlining Material Design SVGs, Ionicon SVGs, or any SVG file into HTML.

## Install

`npm install --save-dev icon-svg-inline-loader`


## Usage

### Webpack Configuration

```js
{
  test: /\.html$/,
  loader: 'svg-inline'
},
```

Or with [html-loader](https://github.com/webpack-contrib/html-loader):

```js
{
  test: /\.html$/,
  loader: 'html!svg-inline'
},
```

### Within HTML

This loader identifies **self-closing** SVGs with either a `src` or `icon-name` attribute.

#### Reference a Material Design Icon

To reference a Material Design Icon, the `icon-name` attribute must follow a specific format:
 
 `material-[category]-[name]` 
 
 *Multi-word icon names are separated by underscores.*

##### Example

```html
<svg icon-name="material-fullscreen_exit"/>
```


#### Reference a Ionicon Icon

To reference a Material Design Icon, the `icon-name` attribute must follow a specific format:

 `ion-[name]` 

*Multi-word icon names are separated by underscores.*

##### Example

```html
<svg icon-name="ion-arrow_expand"/>
```

#### Reference an SVG File

```html
<svg src="./icons/home.svg"/>
```

### Features

#### Retained Attributes

Any attributes (apart from `src` or `icon-name`) are retained. For example:

**Input** 
```html
<svg v-if="displayHomeIcon" class="icon-home" icon-name="material-action-home" />
```

**Output** 
```html
<svg v-if="displayHomeIcon" class="icon-home" role="presentation" focusable="false" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
  <path d="M0 0h24v24H0z" fill="none"></path>
</svg>
```

#### Accessibility Improvements

A11y modifications for SVGs as [recommended](http://haltersweb.github.io/Accessibility/svg.html).

* Add `role="presentation"` and `focusable="false"` attributes.
* Remove `desc` and `title` attrubutes.

#### SVG Clean Up

[SVGO](https://github.com/svg/svgo) is used to optimize SVGs.

#### Applying CSS to SVGs

Inlining SVGs enables CSS to be applied to SVGs.


## Notes

Originally forked from [markup-inline-loader](https://github.com/asnowwolf/markup-inline-loader). Thank you!
