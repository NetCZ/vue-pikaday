## Attributes and event listeners

Component passes attributes and binds event listeners down to underlying `input`.
All attributes and/or event listeners you are used to use will work.

::: tip
Open browser console to see event listeners working.
:::

<ClientOnly>
  <attributes-event-listeners />
</ClientOnly>

```vue
<template>
  <vue-pikaday 
    v-model="now"
    placeholder="Pick a date"
    @focus="triggerFocus()"
    @blur="triggerBlur()"
  />
</template>

<script>
  import '@netcz/vue-pikaday';

  export default {
    data() {
      return {
        now: null
      }
    },
    methods: {
      triggerFocus() {
        console.log('focus triggered');
      },
      triggerBlur() {
        console.log('blur triggered')
      }
    }
  }
</script>
```
