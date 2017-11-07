<template>
<main>
  <label>Delay Time</label>
  <input type="range" min="0" max="1" step="0.1" :value="effectConfig.delayTime" @change="updateVuexEffect($event.target.value, 'delayTime', 'FeedbackDelay')">
  <label>Feedback</label>
  <input type="range" min="0" max="8" :value="effectConfig.feedback" @change="updateVuexEffect($event.target.value, 'feedback', 'FeedbackDelay')">
  <label>Wet</label>
  <input type="range" min="0" max="1" step="0.1" :value="effectConfig.wet" @change="updateVuexEffect($event.target.value, 'wet', 'FeedbackDelay')">
</main>
</template>

<script>
export default {
  computed: {
    effectConfig () { return this.$store.state.tone.effectValues.FeedbackDelay }
  }
}
</script>

<style lang="scss" scoped>
</style>
