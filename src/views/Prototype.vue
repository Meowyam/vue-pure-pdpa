<template>
  <section class="section">
    <div class="container">
      <div class="title">
        Did you...
      </div>
      <transition-group name="fade" tag="section">
        <div v-for="action in actions" :key="action.index">
          <div class="columns is-centered" :id="action">
            <div class="column is-half subtitle">{{action}}</div>
            <div class="column field has-addons"
             v-for="(val, key) in checkOptions" :key="key">
              <button class="button is-primary is-light"
              :name="action" :value="val"
              @click=goNext(action,val,$event)>
              {{val}}
              </button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </section>
  <section class="section" v-if="consSection">
    <div class="container">
      <div class="title">
        Then you...
      </div>
      <div v-for="consequence in consequences" :key="consequence.index">
        <div class="subtitle">
          {{consequence}}
        </div>
      </div>
    </div>
  </section>
  <section class="section" v-if="endStatement">
    <div class="container">
      <div v-for="question in eachQuestion" v-bind:key="question.index"
       class="title">
         You {{question.action}} and {{question.consList}}
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
      eachQuestion: {},
      i: Number,
      checked: [],
      act: [],
      consSection: false,
      endStatement: false,
      chosen: false,
    };
  },
  methods: {
    goNext(action, selection, e) {
      console.log(action, selection);
      this.eachQuestion.push = ({ action, selection });
      e.target.classList.remove('is-light');
      const filtered = this.actions.filter((x) => x !== action);
      if (selection === 'yes') {
        filtered.map((x) => document.getElementById(x).classList.add('is-hidden'));
        this.consSection = true;
        this.endStatement = true;
        const consList = this.consequences.join(' and ');
        this.eachQuestion.push = ({ action, selection, consList });
        console.log(this.eachQuestion);
      } else {
        filtered.map((x) => document.getElementById(x).classList.remove('is-hidden'));
        this.consSection = false;
        this.endStatement = false;
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
