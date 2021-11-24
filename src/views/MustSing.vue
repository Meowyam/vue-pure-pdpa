<!-- eslint-disable max-len -->
<template>
  <form>
    <h1 class="title">Must You Sing?</h1>
    <h1 v-if="qrootExample1.mark.value == 'true'" class="title">Yes!</h1>
    <h1 v-if="qrootExample1.mark.value == 'false'" class="title">No!</h1>
    <h1 v-if="qrootExample1.mark.value == 'undefined'" class="title">It depends...</h1>
    <Q v-bind:q='qrootExample1' v-bind:depth=0 />
  </form>
  <ul class="viz-container">
    <li class="viz-item"><HelloWorld v-bind:msg='qrootExample1' /></li>
    <li class="viz-item"><D3 v-bind:qroot='reformatdata' /></li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';

import pl from 'tau-prolog';
import lists from 'tau-prolog/modules/lists';
import js from 'tau-prolog/modules/js';

import Q from '@/components/Q.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import D3 from '@/components/D3.vue';

lists(pl);
js(pl);

export default {
  name: 'MustSing',
  props: {},
  computed: {
    ...mapFields(['marking', 'anyallform', 'formTitle']),
    ...mapGetters(['qrootExample1']),
    reformatdata() {
      const viewChild = (this.qrootExample1.andOr.children.filter((child) => child.shouldView === 'View'))[0].andOr;
      const getObject = { ...viewChild };
      const newTree = this.qrootExample1;
      const newChildren = this.qrootExample1.andOr.children
        .filter((child) => child.shouldView === 'Ask');
      newChildren.map((leaf) => Object.assign(leaf.andOr, getObject));
      newTree.andOr.children = newChildren;
      return newTree;
    },
  },
  methods: {
    rps() {
      const session = pl.create(1000);
      const show = (x) => console.log(session.format_answer(x));
      // const choose = process.argv[2];

      const program = `
    % Products
    item(id(1), name(bread)).
    item(id(2), name(water)).
    item(id(3), name(apple)).
    % Shops
    shop(id(1), name(tau), location(spain)).
    shop(id(2), name(swi), location(netherlands)).
    % Stock
    stock(item(1), shop(1), count(23), price(0.33)).
    stock(item(2), shop(1), count(17), price(0.25)).
    stock(item(2), shop(2), count(34), price(0.31)).
    stock(item(3), shop(2), count(15), price(0.45)).
`;
      const goal = `
    item(id(ItemID), name(bread)),
    stock(item(ItemID), shop(ShopID), _, price(Price)),
    shop(id(ShopID), name(Shop), _).
`;

      // Consult program, query goal, and show answers
      session.consult(program, {
        success() {
          session.query(goal, {
            success() {
              return session.answers(show);
            },
          });
        },
      });
    },

  },
  components: {
    Q,
    HelloWorld,
    D3,
  },
  mounted() {
    console.log(this.rps());
  },
};
</script>
