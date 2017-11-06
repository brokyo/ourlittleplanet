<template>
<section>
  {{config.note}} {{config.octave}}
  <h4 :class="{'notePlaying': playing}">
    {{ config.keyCode }}
  </h4>
</section>
</template>

<script>

export default {
  name: 'synthtrigger',
  props: ['config', 'playing'],
}
</script>
<style lang="css" scoped>
section {
  padding: 20px;
  border: 1px solid black;
  width: 200px;
  flex-grow: 1;
}

.notePlaying {
  background-color: red;
}

h4 {
    text-align: center;
    background-color: #fff;
    margin: 0 auto;
    border: 1px solid #000;
    padding: 20px;
}
</style>
