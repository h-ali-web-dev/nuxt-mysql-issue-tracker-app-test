<template>
  <LazyClientOnly>
    <div class="head">
      <div class="editor">
        <textarea class="input" :value="input" @input="update"></textarea>
        <div class="output" v-html="output"></div>
      </div>
    </div>
  </LazyClientOnly>
</template>

<script lang="ts" setup>
import { marked } from "marked";
import { debounce } from "lodash-es";
const input = ref(`
# Header
**Bold Text**
*italic Text*
`);
const output = computed(() => marked(input.value));
const update = debounce((e) => {
  input.value = e.target.value;
  useState("descriptionValue", () => e.target.value);
}, 500);
</script>

<style scoped>
.head {
  border: 1 solid black;
  background-color: lightblue;
  margin: 10px;
  padding: 10px;
}
.editor {
  height: 400px;
  display: flex;
}

.input,
.output {
  overflow: auto;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}

.input {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}
</style>
