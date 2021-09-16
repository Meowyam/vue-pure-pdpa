<template>
  <section class="section">
    <div class="container">
      <div class="title">
        Did you...
      </div>
      <div v-for="(action, index) in actions" :key="index">
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
    </div>
  </section>
  <section class="section" ref="cons" v-if="consSection">
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
  <section class="section" ref="statement" v-if="endStatement">
    <div class="container">
      <div v-for="(question, index) in eachQuestion" v-bind:key="index" class="title">
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
      eachQuestion: [],
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
      // console.log(action, selection);
      const isExist = this.eachQuestion.filter((qn) => qn.action === action);
      (console.log(isExist));
      // if (isExist) {
      //   isExist.action.classList.add('is-light');
      // }
      e.target.classList.remove('is-light');
      const filtered = this.actions.filter((x) => x !== action);
      if (selection === 'yes') {
        filtered.map((x) => document.getElementById(x).classList.add('is-hidden'));
        this.fade('this.show()', 'fadein');
        const consList = this.consequences.join(' and ');
        const tempQuestion = { action, selection, consList };
        this.eachQuestion.push(tempQuestion);
      } else {
        filtered.map((x) => document.getElementById(x).classList.remove('is-hidden'));
        this.consSection = false;
        this.endStatement = false;
      }
    },
    async show() {
      this.consSection = true;
      this.endStatement = true;
    },
    async fade(showOrHide, whichFade) {
      await this.show();
      this.$refs.cons.classList.add(whichFade);
      this.$refs.statement.classList.add(whichFade);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
