<template lang='pug'>
.rows
  #editor
  button(class='button is-primary is-light' v-on:click='eval_input') eval
  textarea(v-model='editor_str')
</template>

<script>
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { indentWithTab } from '@codemirror/commands';
import { mapFields } from 'vuex-map-fields';
import { parser } from '../grammars/calc.jison';

const initStr = '2 ^ 32 / 1024';
let editor;

export default {
  computed: {
    ...mapFields(['editor_str']),
  },
  mounted() {
    try {
      editor = new EditorView({
        state: EditorState.create({
          doc: initStr,
          extensions: [
            basicSetup,
            keymap.of([indentWithTab]),
            javascript()],
        }),
        parent: document.querySelector('#editor'),
      });
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    eval_input() {
      this.$store.commit('reset_editor_str');
      try {
        this.$store.commit('append_editor_str', parser.parse(editor.contentDOM.innerText));
      } catch (e) {
        this.$store.commit('append_editor_str', `\n${e}`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
#editor {
  width: 100%;
  height: auto;
  text-align: left;
  overflow: scroll;
}
.rows {
  flex-grow: 1;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 70% 5% 25%
}
textarea {
  font-family: monospace;
  border: none;
  padding: 1em;
}
</style>
