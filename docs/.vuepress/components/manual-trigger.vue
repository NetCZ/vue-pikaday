<template>
  <div class="example clearfix">
    <vue-pikaday
      v-model="now"
      v-p-visible="visible"
      @input-value="updateInputValue"
    />
    <button @click="toggle()">{{ label }}</button>
    <div class="p-container"></div>
    <pre><code v-html="values"></code></pre>
  </div>
</template>

<script>
  import './base';

  export default {
    name: "manual-trigger",
    data() {
      return {
        now: null,
        inputValue: null,
        visible: false
      }
    },
    computed: {
      label() {
        return this.visible ? 'Hide' : 'Show';
      },
      values() {
        return `{
     value: ${this.now},
     inputValue: ${this.inputValue},
     visible: ${this.visible}
   }`;
      }
    },
    methods: {
      toggle() {
        this.visible = !this.visible;
      },
      updateInputValue(value) {
        this.inputValue = value;
      }
    }
  }
</script>

