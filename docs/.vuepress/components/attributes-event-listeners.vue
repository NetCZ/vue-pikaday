<template>
  <div class="example clearfix">
    <vue-pikaday
      v-model="now"
      placeholder="Pick a date"
      @input-value="updateInputValue"
      @focus="triggerFocus()"
      @blur="triggerBlur()"
    />
    <pre><code v-html="values"></code></pre>
  </div>
</template>

<script>
  import './base';

  export default {
    name: "attributes-event-listeners",
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
      triggerFocus() {
        console.log('focus triggered')
      },
      triggerBlur() {
        console.log('blur triggered')
      }
    }
  }
</script>
