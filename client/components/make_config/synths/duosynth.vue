<template>
<section class="duoSynthConfig">
	<div class="groupControls">
		<div class="voiceTitle">
			<h4>Group Controls</h4>
		</div>
		<div class="controls">
			<label>Vibrato Amount</label>
			<input type="range" min="0" max="3" step="0.25" :value="config.vibratoAmount" @change="updateVuexSynth($event.target.value, 'vibratoAmount')"></input>
			<input type="number" :value="config.vibratoAmount" @change="updateVuexSynth($event.target.value, 'vibratoAmount')"></input>
			<label>Vibrato Rate</label>
			<input type="range" min="0" max="20" :value="config.vibratoRate" @change="updateVuexSynth($event.target.value, 'vibratoRate')"></input>
			<input type="number" :value="config.vibratoRate" @change="updateVuexSynth($event.target.value, 'vibratoRate')"></input>
			<label>Harmonicity</label>
			<input type="range" min="0" max="20" :value="config.harmonicity" @change="updateVuexSynth($event.target.value, 'harmonicity')"></input>
			<input type="number" :value="config.harmonicity" @change="updateVuexSynth($event.target.value, 'harmonicity')"></input>
		</div>
	</div>
	<div class="voice">
		<div class="voiceTitle">
			<h4>Voice 1</h4>
		</div>
		<div class="voiceControls">
			<div class="parentCategory">
				<div class="title">
					<h4>Synth</h4>
				</div>
				<div class="category">
					<label>Oscillator</label>
					<select :value="config.voice0.oscillator.type" @change="updateVuexSynth($event.target.value, 'voice0', 'oscillator', 'type')">
						<option v-for="oscillator in options.oscillators.standard">{{oscillator}}</option>
					</select>
					<label>Volume</label>
					<input type="range" min="-50" max="0" :value="config.voice0.volume" @change="updateVuexSynth($event.target.value, 'voice0', 'volume')"></input>
					<input type="number" :value="config.voice0.volume" @change="updateVuexSynth($event.target.value, 'voice0', 'volume')"></input>
					<label>Detune</label>
					<input type="range" min="-200" max="200" :value="config.voice0.detune" @change="updateVuexSynth($event.target.value, 'voice0', 'detune')">
					<input type="number" :value="config.voice0.detune" @change="updateVuexSynth($event.target.value, 'voice0', 'detune')"></input>
				</div>
			</div>
			<div class="parentCategory">
				<div class="title">
					<h4>Envelope</h4>
				</div>
				<div class="category">
					<label>Attack</label>
					<input type="range" min="0" max="5" step="0.1" :value="config.voice0.envelope.attack" @change="updateVuexSynth($event.target.value, 'voice0', 'envelope', 'attack')"></input>
					<input type="number" :value="config.voice0.envelope.attack" @change="updateVuexSynth($event.target.value, 'voice0', 'envelope', 'attack')"></input>
					<label>Attack Curve</label>
					<select :value="config.voice0.envelope.attackCurve" @change="updateVuexSynth($event.target.value, 'voice0', 'envelope', 'attackCurve')">
						<option v-for="curve in options.envelopeCurves">{{curve}}</option>
					</select>
					<label>Decay</label>
					<input type="range" min="0" max="5" step="0.1" :value="config.voice0.envelope.decay" @change="updateVuexSynth($event.target.value, 'voice0', 'envelope', 'decay')"></input>
					<input type="number" :value="config.voice0.envelope.decay" @change="updateVuexSynth($event.target.value, 'voice0', 'envelope', 'decay')"></input>
					<label>Sustain</label>
					<input type="range" min="0" max="1" step="0.1" :value="config.voice0.envelope.sustain" @change="updateVuexSynth($event.target.value, 'voice0', 'envelope', 'sustain')"></input>
					<input type="number" :value="config.voice0.envelope.sustain" @change="updateVuexSynth($event.target.value, 'voice0', 'envelope', 'sustain')"></input>
					<label>Release</label>
					<input type="range" min="0" max="5" step="0.1" :value="config.voice0.envelope.release" @change="updateVuexSynth($event.target.value, 'voice0', 'envelope', 'release')"></input>
					<input type="number" :value="config.voice0.envelope.release" @change="updateVuexSynth($event.target.value, 'voice0', 'envelope', 'release')"></input>
					<label>Release Curve</label>
					<select :value="config.voice0.envelope.releaseCurve" @change="updateVuexSynth($event.target.value, 'voice0', 'envelope', 'releaseCurve')">
						<option v-for="curve in options.envelopeCurves">{{curve}}</option>
					</select>
				</div>
			</div>
			<div class="parentCategory">
				<div class="title">
					<h4>Filter Envelope</h4>
				</div>
				<div class="category">
					<label>Attack</label>
					<input type="range" min="0" max="5" step="0.1" :value="config.voice0.filterEnvelope.attack" @change="updateVuexSynth($event.target.value, 'voice0', 'filterEnvelope', 'attack')"></input>
					<input type="number" :value="config.voice0.filterEnvelope.attack" @change="updateVuexSynth($event.target.value, 'voice0', 'filterEnvelope', 'attack')"></input>
          <label>Attack Curve</label>
          <select :value="config.voice0.filterEnvelope.attackCurve" @change="updateVuexSynth($event.target.value, 'voice0', 'filterEnvelope', 'attackCurve')">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
					<label>Decay</label>
					<input type="range" min="0" max="5" :value="config.voice0.filterEnvelope.decay" @change="updateVuexSynth($event.target.value, 'voice0', 'filterEnvelope', 'decay')"></input>
					<input type="number" :value="config.voice0.filterEnvelope.decay" @change="updateVuexSynth($event.target.value, 'voice0', 'filterEnvelope', 'decay')"></input>
					<label>Sustain</label>
					<input type="range" min="0" max="1" :value="config.voice0.filterEnvelope.sustain" @change="updateVuexSynth($event.target.value, 'voice0', 'filterEnvelope', 'sustain')"></input>
					<input type="number" :value="config.voice0.filterEnvelope.sustain" @change="updateVuexSynth($event.target.value, 'voice0', 'filterEnvelope', 'sustain')"></input>
					<label>Release</label>
					<input type="range" min="0" max="5" :value="config.voice0.filterEnvelope.release" @change="updateVuexSynth($event.target.value, 'voice0', 'filterEnvelope', 'release')"></input>
					<input type="number" :value="config.voice0.filterEnvelope.release" @change="updateVuexSynth($event.target.value, 'voice0', 'filterEnvelope', 'release')"></input>
          <label>Release Curve</label>
          <select :value="config.voice0.filterEnvelope.releaseCurve" @change="updateVuexSynth($event.target.value, 'voice0', 'filterEnvelope', 'releaseCurve')">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
				</div>
			</div>
		</div>
	</div>
  <div class="voice">
    <div class="voiceTitle">
      <h4>Voice 2</h4>
    </div>
    <div class="voiceControls">
      <div class="parentCategory">
        <div class="title">
          <h4>Synth</h4>
        </div>
        <div class="category">
          <label>Oscillator</label>
          <select :value="config.voice1.oscillator.type" @change="updateVuexSynth($event.target.value, 'voice1', 'oscillator', 'type')">
            <option v-for="oscillator in options.oscillators.standard">{{oscillator}}</option>
          </select>
          <label>Volume</label>
          <input type="range" min="-50" max="0" :value="config.voice1.volume" @change="updateVuexSynth($event.target.value, 'voice1', 'volume')"></input>
          <input type="number" :value="config.voice1.volume" @change="updateVuexSynth($event.target.value, 'voice1', 'volume')"></input>
          <label>Detune</label>
          <input type="range" min="-200" max="200" :value="config.voice1.detune" @change="updateVuexSynth($event.target.value, 'voice1', 'detune')">
          <input type="number" :value="config.voice1.detune" @change="updateVuexSynth($event.target.value, 'voice1', 'detune')"></input>
        </div>
      </div>
      <div class="parentCategory">
        <div class="title">
          <h4>Envelope</h4>
        </div>
        <div class="category">
          <label>Attack</label>
          <input type="range" min="0" max="5" step="0.1" :value="config.voice1.envelope.attack" @change="updateVuexSynth($event.target.value, 'voice1', 'envelope', 'attack')"></input>
          <input type="number" :value="config.voice1.envelope.attack" @change="updateVuexSynth($event.target.value, 'voice1', 'envelope', 'attack')"></input>
          <label>Attack Curve</label>
          <select :value="config.voice1.envelope.attackCurve" @change="updateVuexSynth($event.target.value, 'voice1', 'envelope', 'attackCurve')">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
          <label>Decay</label>
          <input type="range" min="0" max="5" step="0.1" :value="config.voice1.envelope.decay" @change="updateVuexSynth($event.target.value, 'voice1', 'envelope', 'decay')"></input>
          <input type="number" :value="config.voice1.envelope.decay" @change="updateVuexSynth($event.target.value, 'voice1', 'envelope', 'decay')"></input>
          <label>Sustain</label>
          <input type="range" min="0" max="1" step="0.1" :value="config.voice1.envelope.sustain" @change="updateVuexSynth($event.target.value, 'voice1', 'envelope', 'sustain')"></input>
          <input type="number" :value="config.voice1.envelope.sustain" @change="updateVuexSynth($event.target.value, 'voice1', 'envelope', 'sustain')"></input>
          <label>Release</label>
          <input type="range" min="0" max="5" step="0.1" :value="config.voice1.envelope.release" @change="updateVuexSynth($event.target.value, 'voice1', 'envelope', 'release')"></input>
          <input type="number" :value="config.voice1.envelope.release" @change="updateVuexSynth($event.target.value, 'voice1', 'envelope', 'release')"></input>
          <label>Release Curve</label>
          <select :value="config.voice1.envelope.releaseCurve" @change="updateVuexSynth($event.target.value, 'voice1', 'envelope', 'releaseCurve')">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
        </div>
      </div>
      <div class="parentCategory">
        <div class="title">
          <h4>Filter Envelope</h4>
        </div>
        <div class="category">
          <label>Attack</label>
          <input type="range" min="0" max="5" step="0.1" :value="config.voice1.filterEnvelope.attack" @change="updateVuexSynth($event.target.value, 'voice1', 'filterEnvelope', 'attack')"></input>
          <input type="number" :value="config.voice1.filterEnvelope.attack" @change="updateVuexSynth($event.target.value, 'voice1', 'filterEnvelope', 'attack')"></input>
          <label>Attack Curve</label>
          <select :value="config.voice1.filterEnvelope.attackCurve" @change="updateVuexSynth($event.target.value, 'voice1', 'filterEnvelope', 'attackCurve')">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
          <label>Decay</label>
          <input type="range" min="0" max="5" :value="config.voice1.filterEnvelope.decay" @change="updateVuexSynth($event.target.value, 'voice1', 'filterEnvelope', 'decay')"></input>
          <input type="number" :value="config.voice1.filterEnvelope.decay" @change="updateVuexSynth($event.target.value, 'voice1', 'filterEnvelope', 'decay')"></input>
          <label>Sustain</label>
          <input type="range" min="0" max="1" :value="config.voice1.filterEnvelope.sustain" @change="updateVuexSynth($event.target.value, 'voice1', 'filterEnvelope', 'sustain')"></input>
          <input type="number" :value="config.voice1.filterEnvelope.sustain" @change="updateVuexSynth($event.target.value, 'voice1', 'filterEnvelope', 'sustain')"></input>
          <label>Release</label>
          <input type="range" min="0" max="5" :value="config.voice1.filterEnvelope.release" @change="updateVuexSynth($event.target.value, 'voice1', 'filterEnvelope', 'release')"></input>
          <input type="number" :value="config.voice1.filterEnvelope.release" @change="updateVuexSynth($event.target.value, 'voice1', 'filterEnvelope', 'release')"></input>
          <label>Release Curve</label>
          <select :value="config.voice1.filterEnvelope.releaseCurve" @change="updateVuexSynth($event.target.value, 'voice1', 'filterEnvelope', 'releaseCurve')">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import toneUtilityData from '../../../utilities/toneUtility.js'

export default {
  name: 'duosynth',
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

.duoSynthConfig {

  label {
    display: block;
    font-weight: 900;
  }

  .parentCategory {
    display: flex;
  }

  .controls {
    margin: 0px 20px;
    background-color: white;
    padding-bottom: 20px;

    input[type="range"] {
      width: 70%;
      margin-right: 10px;
    }
    input[type="number"] {
      width: 25%;
      font-weight: 900;
    }

  }

  .title {
    width: 80px;
    background-color: #E1E1E1;
    border: 1px solid black;
    border-right: none;

    h4 {
      margin: 0;
      padding: 2px 10px;
    }
  }

  .groupControls {
    background-color: white;
  }

  .voice {

  }

  .voiceTitle {
    background-color: #E1E1E1;
    border: 1px solid black;
    margin: 20px 0px;
    padding: 5px 10px;

    h4 {
      margin: 0;
    }
  }

  .voiceControls {
    display: flex;
    justify-content: space-evenly;

    .category {
      border: 1px solid black;
      padding: 2px 10px;
      background-color: white;
    }
  }
}

</style>
