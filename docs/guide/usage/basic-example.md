## Basic example

Simply include `vue-pikaday` component with `v-model` defined.

<ClientOnly>
  <basic-example />
</ClientOnly>

```vue
<template>
  <vue-pikaday
    v-model="now"
  />
  <button @click="clear()">Clear</button>
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
      clear() {
        this.now = null;
      }
    }
  }
</script>
```
