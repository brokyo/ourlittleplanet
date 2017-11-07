<template>
<main>
	<label>Frequency</label>
	<input type="range" min="0" max="10" step="0.5" :value="effectConfig.frequency" @change="updateVuexEffect($event.target.value, 'frequency', 'Chorus')">
	<input type="number" :value="effectConfig.frequency" @change="updateVuexEffect($event.target.value, 'frequency', 'Chorus')">
	<label>Delay Time</label>
	<input type="range" min="0" max="8" :value="effectConfig.delayTime" @change="updateVuexEffect($event.target.value, 'delayTime', 'Chorus')">
	<label>Depth</label>
	<input type="range" min="0" max="1" step="0.1" :value="effectConfig.depth" @change="updateVuexEffect($event.target.value, 'depth', 'Chorus')">
	<label>Feedback</label>
	<input type="range" min="0" max="0.5" step="0.05" :value="effectConfig.feedback" @change="updateVuexEffect($event.target.value, 'feedback', 'Chorus')">
	<label>Spread</label>
	<input type="range" min="0" max="600" step="50" :value="effectConfig.spread" @change="updateVuexEffect($event.target.value, 'spread', 'Chorus')">
	<label>Wet</label>
	<input type="range" min="0" max="1" step="0.1" :value="effectConfig.wet" @change="updateVuexEffect($event.target.value, 'wet', 'Chorus')">
</main>
</template>

<script>
export default {
	computed: {
		effectConfig () { return this.$store.state.tone.effectValues.Chorus }
	}
}
</script>

<style lang="scss" scoped>
</style>
