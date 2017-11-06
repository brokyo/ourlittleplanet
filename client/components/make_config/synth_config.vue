<template>
<main>
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

    <!-- Filter Config -->
    <section class="configSection">
      <tonefilter></tonefilter>
    </section>
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
// import triggers from './triggers.vue'


// import autofilter from '../effects/autofilter.vue'
// import autopanner from '../effects/autopanner.vue'
// import chorus from '../effects/chorus.vue'
// import feedbackdelay from '../effects/feedbackdelay.vue'
// import pitchshift from '../effects/pitchshift.vue'
// import tremolo from '../effects/tremolo.vue'
// import vibrato from '../effects/vibrato.vue'

export default {
  name: 'synth-config',
  props: ['synth', 'config'],
  components: {
    synth, monosynth, amsynth, fmsynth, duosynth, tonefilter
  },
  data () {
    return {
      tone: {
        synth: {},
        effects: [{}],
        filter: {}
      },
      possibleSynths: ['Synth', 'MonoSynth', 'AMSynth', 'FMSynth', 'DuoSynth']
    }
  },
  methods: {
    changeSynth: function (event) {
      let newSynth = {
        synthName: event.target.value,
        synthMemberValues: toneUtilityData.synthDefaults[event.target.value]
      }

      this.$store.commit('CHANGE_SYNTH_TYPE', newSynth)
    }
  },
  computed: {
    activeScale () { return _.cloneDeep(this.$store.state.scale) },
    toneConfig () { return this.$store.state.tone }
  },
  mounted: function () {

  }
}
</script>

<style lang="scss" scoped>
main {
  position: relative;
  z-index: 1;
}
</style>
