# Config Reference

[[toc]]

## Props

| Name{.mw-100} | Required | Default | Datatype | Description |
| --- | --- | --- | --- | --- |
| v-model | yes |  | Date, null, undefined | component model binding, for more info see [VueJS docs](https://vuejs.org/v2/guide/forms.html#Value-Bindings) |
| options | no | {} | Object | **reactive** options passed to underlaying Pikaday instance, for all available options see Pikaday [documentation](https://github.com/dbushell/Pikaday#configuration)
| autoDefault | no | false | Boolean | if `true`, component will set actual date as its default value |

::: warning NOTE
`field` option is internally overridden and not available to use.\
`trigger` is not usable either as DOM element do not exist yet when component is registered
::: tip
use `v-p-visible` directive instead
:::

## Directives

| Name{.mw-100} | Required | Default | Datatype | Description |
| --- | --- | --- | --- | --- |
| v-p-visible | no | false | Boolean | two-way binding directive to control datepicker visibility |

