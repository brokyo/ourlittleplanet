<template>
<main>
  <h2 class="sectionHeader"><span>synth</span></h2>
    <section>
	    <select :value="toneConfig.synth" @change="changeSynth">
          <option value="" disabled selected hidden>Select Synth</option>
          <option v-for="synth in possibleSynths">{{synth}}</option>
	    </select>

      <synth v-if="toneConfig.synth === 'Synth'"></synth>
      <monosynth v-if="toneConfig.synth === 'MonoSynth'"></monosynth>
      <amsynth v-if="toneConfig.synth === 'AMSynth'"></amsynth>
      <fmsynth v-if="toneConfig.synth === 'FMSynth'"></fmsynth>
      <duosynth v-if="toneConfig.synth === 'DuoSynth'"></duosynth>
    </section>

    <hr>
    <h2 class="sectionHeader"><span>effects</span></h2>
    <div class="effectConfig" v-for="effect in effectsConfig">
      <label>{{effect.name}}</label>
      <input type="checkbox" :value="effect.name" v-model="effect.active">
      <chorus v-if="effect.name === 'Chorus' && effect.active"></chorus>
      <tremolo v-if="effect.name === 'Tremolo' && effect.active"></tremolo>
      <vibrato v-if="effect.name === 'Vibrato' && effect.active"></vibrato>
      <freeverb v-if="effect.name === 'Freeverb' && effect.active"></freeverb>
    </div>

    <hr>
    <h2 class="sectionHeader"><span>filter</span></h2>
    <tonefilter></tonefilter>
</main>
</template>

<script>
import toneUtilityData from '../../utilities/toneUtility.js'
import synth from './synths/synth.vue'
import monosynth from './synths/monosynth.vue'
import amsynth from './synths/amsynth.vue'
import fmsynth from './synths/fmsynth.vue'
import duosynth from './synths/duosynth.vue'
import tonefilter from './filter_config.vue'


import chorus from './effects/chorus.vue'
import tremolo from './effects/tremolo.vue'
import vibrato from './effects/vibrato.vue'
import freeverb from './effects/freeverb.vue'

export default {
  name: 'synth-config',
  components: {
    synth, monosynth, amsynth, fmsynth, duosynth, tonefilter, chorus, tremolo, vibrato, freeverb
  },
  data () {
    return {
      possibleSynths: ['Synth', 'MonoSynth', 'AMSynth', 'FMSynth', 'DuoSynth']
    }
  },
  computed: {
    activeScale () { return _.cloneDeep(this.$store.state.scale) },
    toneConfig () { return this.$store.state.tone },
    // TODO: This won't run in strict but like I give a fuckkkkkkkkkk (deal with this eventually, maybe :())
    effectsConfig () { return this.$store.state.tone.effectsConfig }
  },
  methods: {
    changeSynth: function (event) {
      let newSynth = {
        synthName: event.target.value,
        synthMemberValues: toneUtilityData.synthDefaults[event.target.value]
      }

      this.$store.commit('CHANGE_SYNTH_TYPE', newSynth)
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  position: relative;
  z-index: 1;
}

.effectConfig {
    background-color: white;
    margin-top: 10px;
    padding: 2px 10px;

    label {
      font-weight: 900;
    }
}
</style>
