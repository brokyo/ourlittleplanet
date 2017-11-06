<template>
<section class="synthConfig">
	<div class="category">
		<div class="title">
			<h4>Synth</h4>
		</div>
		<div class="controls">
			<label>Oscillator</label>
			<select :value="config.oscillator.type" @change="updateVuexSynth($event.target.value, 'oscillator', 'type')">
				<option v-for="oscillator in options.oscillators.standard">{{oscillator}}</option>
			</select>
			<label>Modulation Oscillator</label>
			<select :value="config.modulation.type" @change="updateVuexSynth($event.target.value, 'modulation', 'type')">
				<option v-for="oscillator in options.oscillators.standard">{{oscillator}}</option>
			</select>
			<label>Volume</label>
			<input type="range" min="-50" max="0" :value="config.volume" @change="updateVuexSynth($event.target.value, 'volume')"></input>
			<input type="number" :value="config.volume" @change="updateVuexSynth($event.target.value, 'volume')"></input>
			<label>Harmonicity</label>
			<input type="range" min="0" max="20" :value="config.harmonicity" @change="updateVuexSynth($event.target.value, 'harmonicity')"></input>
			<input type="number" :value="config.harmonicity" @change="updateVuexSynth($event.target.value, 'harmonicity')"></input>
			<label>Modulation Index</label>
			<input type="range" min="0" max="50" :value="config.modulationIndex" @change="updateVuexSynth($event.target.value, 'modulationIndex')"></input>
			<input type="number" :value="config.modulationIndex" @change="updateVuexSynth($event.target.value, 'modulationIndex')"></input>
			<label>Detune</label>
			<input type="range" min="-200" max="200" :value="config.detune" @change="updateVuexSynth($event.target.value, 'detune')">
			<input type="number" :value="config.detune" @change="updateVuexSynth($event.target.value, 'detune')"></input>
		</div>
	</div>
	<div class="category">
		<div class="title">
			<h4>Envelope</h4>
		</div>
		<div class="controls">
			<label>Attack</label>
			<input type="range" min="0" max="5" step="0.1" :value="config.envelope.attack" @change="updateVuexSynth($event.target.value, 'envelope', 'attack')"></input>
			<input type="number" :value="config.envelope.attack" @change="updateVuexSynth($event.target.value, 'envelope', 'attack')"></input>
			<label>Attack Curve</label>
			<select :value="config.envelope.attackCurve" @change="updateVuexSynth($event.target.value, 'envelope', 'attackCurve')">
				<option v-for="curve in options.envelopeCurves">{{curve}}</option>
			</select>
			<label>Decay</label>
			<input type="range" min="0" max="5" step="0.1" :value="config.envelope.decay" @change="updateVuexSynth($event.target.value, 'envelope', 'decay')"></input>
			<input type="number" :value="config.envelope.decay" @change="updateVuexSynth($event.target.value, 'envelope', 'decay')"></input>
			<label>Sustain</label>
			<input type="range" min="0" max="1" step="0.1" :value="config.envelope.sustain" @change="updateVuexSynth($event.target.value, 'envelope', 'sustain')"></input>
			<input type="number" :value="config.envelope.sustain" @change="updateVuexSynth($event.target.value, 'envelope', 'sustain')"></input>
			<label>Release</label>
			<input type="range" min="0" max="5" step="0.1" :value="config.envelope.release" @change="updateVuexSynth($event.target.value, 'envelope', 'release')"></input>
			<input type="number" :value="config.envelope.release" @change="updateVuexSynth($event.target.value, 'envelope', 'release')"></input>
			<label>Release Curve</label>
			<select :value="config.envelope.releaseCurve" @change="updateVuexSynth($event.target.value, 'envelope', 'releaseCurve')">
				<option v-for="curve in options.envelopeCurves">{{curve}}</option>
			</select>
		</div>
	</div>
	<div class="category">
		<div class="title">
			<h4>Modulation Envelope</h4>
		</div>
		<div class="controls">
			<label>Attack</label>
			<input type="range" min="0" max="5" step="0.1" :value="config.modulationEnvelope.attack" @change="updateVuexSynth($event.target.value, 'modulationEnvelope', 'attack')"></input>
			<input type="number" :value="config.modulationEnvelope.attack" @change="updateVuexSynth($event.target.value, 'modulationEnvelope', 'attack')"></input>
      <label>Attack Curve</label>
      <select :value="config.modulationEnvelope.attackCurve" @change="updateVuexSynth($event.target.value, 'modulationEnvelope', 'attackCurve')">
        <option v-for="curve in options.envelopeCurves">{{curve}}</option>
      </select>
			<label>Decay</label>
			<input type="range" min="0" max="5" step="0.1" :value="config.modulationEnvelope.decay" @change="updateVuexSynth($event.target.value, 'modulationEnvelope', 'decay')"></input>
			<input type="number" :value="config.modulationEnvelope.decay" @change="updateVuexSynth($event.target.value, 'modulationEnvelope', 'decay')"></input>
			<label>Sustain</label>
			<input type="range" min="0" max="1" step="0.1" :value="config.modulationEnvelope.sustain" @change="updateVuexSynth($event.target.value, 'modulationEnvelope', 'sustain')"></input>
			<input type="number" :value="config.modulationEnvelope.sustain" @change="updateVuexSynth($event.target.value, 'modulationEnvelope', 'sustain')"></input>
			<label>Release</label>
			<input type="range" min="0" max="5" step="0.1" :value="config.modulationEnvelope.release" @change="updateVuexSynth($event.target.value, 'modulationEnvelope', 'release')"></input>
			<input type="number" :value="config.modulationEnvelope.release" @change="updateVuexSynth($event.target.value, 'modulationEnvelope', 'release')"></input>
      <label>Release Curve</label>
      <select :value="config.modulationEnvelope.releaseCurve" @change="updateVuexSynth($event.target.value, 'modulationEnvelope', 'releaseCurve')">
        <option v-for="curve in options.envelopeCurves">{{curve}}</option>
      </select>
<!-- 				<label>Base Frequency</label>
			<input type="range" min="0" max="5000" :value="config.modulationEnvelope.baseFrequency"></input>
			<input type="number" :value="config.modulationEnvelope.baseFrequency"></input>
			<label>Octave</label>
			<input type="range" min="0" max="20" :value="config.modulationEnvelope.octaves"></input>
			<input type="number" :value="config.modulationEnvelope.octaves"></input>
			<label>Exponent</label>
			<input type="range" min="0" max="10" :value="config.modulationEnvelope.exponent"></input>
			<input type="number" :value="config.modulationEnvelope.exponent"></input> -->
		</div>
	</div>
</section>
</template>

<script>
import toneUtilityData from '../../../utilities/toneUtility.js'

export default {
  name: 'fmsynth',
  data () {
  	return {
		options: toneUtilityData.generalConfigOptions
  	}
  },
  computed: {
  	config () { return this.$store.state.tone.synthMemberValues}
  }
}
</script>

<style lang="scss" scoped>

</style>
