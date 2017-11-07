<template>
<main>
  <label>Frequency</label>
  <input type="range" min="0" max="10000" step="100" :value="effectConfig.frequency" @change="updateVuexEffect($event.target.value, 'frequency', 'Tremolo')">
  <label>Depth</label>
  <input type="range" min="0" max="1" step="0.1" :value="effectConfig.depth" @change="updateVuexEffect($event.target.value, 'depth', 'Tremolo')">
  <label>Spread</label>
  <input type="range" min="0" max="600" step="50" :value="effectConfig.spread" @change="updateVuexEffect($event.target.value, 'spread', 'Tremolo')">
  <label>Wet</label>
  <input type="range" min="0" max="1" step="0.1" :value="effectConfig.wet" @change="updateVuexEffect($event.target.value, 'wet', 'Tremolo')">
</main>
</template>

<script>
export default {
  computed: {
    effectConfig () { return this.$store.state.tone.effectValues.Tremolo }
  }
}
</script>

<style lang="scss" scoped>
</style>
