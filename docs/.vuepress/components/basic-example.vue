<template>
  <div class="example clearfix">
    <vue-pikaday
      v-model="now"
      @input-value="updateInputValue"
    />
    <button @click="clear()">Clear</button>
    <pre><code v-html="values"></code></pre>
  </div>
</template>

<script>
  import './base';

  export default {
    name: "basic-example",
    data() {
      return {
        now: null,
        inputValue: null
      }
    },
    computed: {
      values() {
        return `{
     value: ${this.now},
     inputValue: ${this.inputValue}
   }`;
      }
    },
    methods: {
      updateInputValue(value) {
        this.inputValue = value;
      },
      clear() {
        this.now = null;
      }
    }
  }
</script>
