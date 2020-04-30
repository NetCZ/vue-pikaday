# Installation

[[toc]]

You can either add VuePikaday to your `package.json` dependencies or HTML as script tag.
::: warning NOTE
VuePikaday has also [Pikaday](https://github.com/dbushell/Pikaday) and [moment.js](http://momentjs.com) 
as `peerDependencies` and requires them to be installed / included in order to work.
:::

## NPM

```bash
npm install --save @netcz/vue-pikaday
```

or

```bash
yarn add @netcz/vue-pikaday
```

## Standalone

1. Download latest [release](https://github.com/netcz/vue-pikaday/releases) of VuePikaday or use latest [jsDelivr](https://www.jsdelivr.com/package/npm/@netcz/vue-pikaday) links
2. Add to your HTML head section (after Vue) using script tag

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/moment@2/moment.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pikaday@1/pikaday.js"></script>

<script src="/project/path/dist/vue-pikaday.js"></script> 
or 
<script src="https://cdn.jsdelivr.net/npm/@netcz/vue-pikaday@1/dist/vue-pikaday.js"></script>
```

::: warning 
**DO NOT** use jsDelivr's "combine" method (even its tempting) as it uglifies code and [Pikaday](https://github.com/dbushell/Pikaday) relies on "moment" variable in scope in order to use it.
:::
