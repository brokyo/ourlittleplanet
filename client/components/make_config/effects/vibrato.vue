<template>
<main>
  <label>Frequency</label>
  <input type="range" min="0" max="10" step="0.1" :value="effectConfig.frequency" @change="updateVuexEffect($event.target.value, 'frequency', 'Vibrato')">
  <input type="number" :value="effectConfig.frequency" @change="updateVuexEffect($event.target.value, 'frequency', 'Vibrato')">
  <label>Depth</label>
  <input type="range" min="0" max="1" step="0.1" :value="effectConfig.depth" @change="updateVuexEffect($event.target.value, 'depth', 'Vibrato')">
  <label>Wet</label>
  <input type="range" min="0" max="1" step="0.1" :value="effectConfig.wet" @change="updateVuexEffect($event.target.value, 'wet', 'Vibrato')">
</main>
</template>

<script>
export default {
  computed: {
    effectConfig () { return this.$store.state.tone.effectValues.Vibrato }
  }
}
</script>

<style lang="scss" scoped>
</style>
