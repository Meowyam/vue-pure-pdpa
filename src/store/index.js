import { createStore } from 'vuex';
import { getField, updateField } from 'vuex-map-fields';
import { str } from '../index.purs';
import * as AnyAll from '../AnyAll.purs';

export default createStore({
  state: {
    pur_str: AnyAll.fromNode2(str),
    burf: AnyAll.fromNode1,
    example1: AnyAll.example1,
    editor_str: 'press eval to parse input according to calc.jison grammar',
  },
  getters: {
    getField,
  },
  mutations: {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    reset_editor_str(s) { s.editor_str = ''; },
    append_editor_str(s, x) { s.editor_str += x; },
    updateField,
  },
  actions: {
  },
  modules: {
  },
});
