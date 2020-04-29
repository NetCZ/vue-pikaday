<template>
  <div class="example clearfix">
    <vue-pikaday
      v-model="now"
      :options="options"
      @input-value="updateInputValue"
    />
    <pre><code v-html="values"></code></pre>
  </div>
</template>

<script>
  import './base';

  export default {
    name: "pikaday-options",
    data() {
      return {
        now: null,
        inputValue: null,
        options: {
          format: 'YYYY/MM/DD',
          minDate: this.$moment().toDate(),
          maxDate: this.$moment().add(7, 'days').toDate()
        }
      }
    },
    computed: {
      values() {
        return `{
     value: ${this.now},
     inputValue: ${this.inputValue},
     options: {
       format: '${this.options.format}',
       minDate: moment().toDate(),
       maxDate: moment().add(7, 'days').toDate()
     }
   }`;
      }
    },
    methods: {
      updateInputValue(value) {
        this.inputValue = value;
      }
    }
  }
</script>

