<template>
  <section class="section">
    <div class="container">
      {{example1}}
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
import { mapFields } from 'vuex-map-fields';

export default {

  data() {
    return {
      // example1:  ['walk', 'run', 'jog'],
      // consequences: ['sing'],
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
  computed: {
    ...mapFields(['pur_str', 'example1']),
    actions() {
      if (this.example1[Object.keys(this.example1)[0]].value0 === 'all of') {
        // return this.example1[Object.keys(this.example1)[1]];
        const allActions = [];
        this.example1[Object.keys(this.example1)[1]].forEach((input) => {
          if (typeof (input.value0) !== 'object' && (input.value0) !== null) {
            allActions.push(input.value0);
          }
        });
        return allActions;
        //  );
      }
      return [];
    },
    consequences() {
      const allConsq = [];
      const checkConsq = (this.example1[Object.keys(this.example1)[1]]);
      checkConsq.forEach((input) => {
        if (typeof (input.value0) === 'object' && (input.value0) !== null) {
          input.value1.forEach(((consq) => {
            allConsq.push(consq.value0);
          }));
        }
      });
      return allConsq;
    },
  },
  methods: {
    checkExists(action, e) {
      const isExist = this.eachQuestion.filter((qn) => qn.action === action);
      const getIdx = this.eachQuestion.findIndex((qn) => qn.action === action);
      if (isExist) {
        console.log(action, ' exists');
        console.log(this.eachQuestion[getIdx]);
        this.eachQuestion.splice(getIdx, 1);
        document.getElementsByName(action).forEach((btn) => btn.classList.add('is-light'));
      }
      e.target.classList.remove('is-light');
    },
    goNext(action, selection, e) {
      console.log(action, selection);
      const filtered = this.actions.filter((x) => x !== action);
      if (selection === 'yes') {
        filtered.map((x) => document.getElementById(x).classList.add('is-hidden'));
        this.fade('this.show()', 'fadein');
        const consList = this.consequences.join(' and ');
        this.checkExists(action, e);
        this.eachQuestion.push({ action, selection, consList });
        console.log('yes ', this.eachQuestion);
      } else {
        filtered.map((x) => document.getElementById(x).classList.remove('is-hidden'));
        this.consSection = false;
        this.endStatement = false;
        this.checkExists(action, e);
        this.eachQuestion.push({ action, selection });
        console.log('no ', this.eachQuestion);
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
