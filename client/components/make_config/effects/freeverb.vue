<template>
<main>
  <label>Room Size</label>
  <input type="range" min="0" max=".9" step="0.1" :value="effectConfig.roomSize" @change="updateVuexEffect($event.target.value, 'roomSize', 'Freeverb')">
  <label>Dampening</label>
  <input type="range" min="0" max="5000" step="50" :value="effectConfig.dampening" @change="updateVuexEffect($event.target.value, 'dampening', 'Freeverb')">
  <label>Wet</label>
  <input type="range" min="0" max="1" step="0.1" :value="effectConfig.wet" @change="updateVuexEffect($event.target.value, 'wet', 'Freeverb')">
</main>
</template>

<script>
export default {
  computed: {
    effectConfig () { return this.$store.state.tone.effectValues.Freeverb }
  }
}
</script>

<style lang="scss" scoped>
</style>
