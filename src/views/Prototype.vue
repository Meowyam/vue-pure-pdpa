<template>
  <section class="section">
    <div class="container">
      <div class="title">
        Did you...
      </div>
      <div v-for="action in actions" v-bind:key="action.index">
        <div class="columns is-centered" :id="action">
          <div class="column is-half subtitle">{{action}}</div>
          <div class="column field has-addons"
          v-for="(val, key) in checkOptions" :key="key">
            <label class="radio">
              <input type="radio" :name="action" :value="val"
              @change=goNext(action,val) />
              {{val}}
            </label>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section" v-if="consSection">
    <div class="container">
      <div class="title">
        Then you...
      </div>
      <div v-for="consequence in consequences" v-bind:key="consequence.index">
        <div class="subtitle">
          {{consequence}}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      actions: ['walk', 'run', 'jog'],
      consequences: ['sing'],
      checkOptions: ['yes', 'no', 'don\'t know'],
      eachQuestion: [],
      i: Number,
      checked: [],
      act: [],
      consSection: false,
    };
  },
  methods: {
    goNext(action, selection) {
      console.log(action, selection);
      this.eachQuestion.push = ([action, selection]);
      console.log(this.eachQuestion);
      const filtered = this.actions.filter((x) => x !== action);
      if (selection === 'yes') {
        filtered.map((x) => document.getElementById(x).classList.add('is-hidden'));
        this.consSection = true;
      } else {
        filtered.map((x) => document.getElementById(x).classList.remove('is-hidden'));
      }
    },
  },
//   mounted() {
//     this.goNext(this.actions, 0);
//   },
};
</script>

<style scoped lang="scss">
</style>
