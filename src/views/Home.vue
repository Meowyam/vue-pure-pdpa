<template lang='pug'>
div(class='home')
  HelloWorld(msg='hardcoded msg string')
  h2() Burf string is "{{burf}}" ... let's try passing that to HelloWorld.
  HelloWorld(msg=burf)
  h1(class='title') pur_str: {{pur_str}}
  button(class='button is-large') Bulma button
  AnyAllForm(burf=burf)
</template>

<script>
// @ is an alias to /src
import { mapFields } from 'vuex-map-fields';
import HelloWorld from '@/components/HelloWorld.vue';
import AnyAllForm from '@/components/AnyAllForm.vue';

export default {
  name: 'Home',
  computed: {
    ...mapFields(['pur_str', 'anyallform', 'burf']),
  },
  components: {
    HelloWorld,
    AnyAllForm,
  },
};
</script>
