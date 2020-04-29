## Passing options to underlying Pikaday

Options can be passed using `options` prop on component.
To see all possible options, consult official Pikaday [documentation](https://github.com/dbushell/Pikaday#configuration).

::: tip
see [Config Reference](/config/#props) for more info
:::

<ClientOnly>
  <pikaday-options />
</ClientOnly>

```vue
<template>
  <vue-pikaday 
    v-model="now"
    :options="pikadayOptions" 
  />
</template>

<script>
  import '@netcz/vue-pikaday';

  export default {
    data() {
      return {
        now: null,
        pikadayOptions: {
          format: 'YYYY/MM/DD',
          minDate: moment().toDate(),
          maxDate: moment().add(7, 'days').toDate()
        }
      }
    }
  }
</script>
```
