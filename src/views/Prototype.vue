<template>
  <section class="section is-medium">
    <div class="container">
    <h1 class="title">
      Did you...
    </h1>
    <div v-for="action in actions" v-bind:key="action.index">
      <div class="columns is-centered">
      <div class="column is-half subtitle">{{action}}</div>
      <div class="column field has-addons"
       v-for="(val, key) in checkOptions" :key="key">
        <label class="radio">
          <input type="radio" name="check" :value="val" :checked="val == value"
           @change=goNext(action,val) />
          {{val}}
        </label>
      </div>
      </div>
    </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      actions: ['walk', 'run'],
      consequences: ['sing'],
      checkOptions: ['yes', 'no', 'don\'t know'],
      eachQuestion: [],
      i: Number,
      checked: [],
      act: [],
    };
  },
  methods: {
    goNext(action, selection) {
      console.log(action, selection);
      this.eachQuestion = [action, selection];
    },
  },
//   mounted() {
//     this.goNext(this.actions, 0);
//   },
};
</script>

<style scoped lang="scss">
</style>
