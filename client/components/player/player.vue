<template>
<main>
    <title-card v-if="showTitle"></title-card>
    <background-video></background-video>
    <color-filter-overlay class="color-filter-overlay" :active="playing"></color-filter-overlay>
    <mount-synth @attackStart="attackStart" @releaseStart="releaseStart"></mount-synth>
</main>
</template>

<script>
import colorFilterOverlay from './overlay.vue'
import backgroundVideo from './backgroundvideo.vue'
import mountSynth from './mountsynth.vue'
import titleCard from './titlecard.vue'

export default {
  name: 'player',
  components: {
    colorFilterOverlay, backgroundVideo, mountSynth, titleCard
  },
  data () {
    return {
      showTitle: true,
      playing: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false
      }
    }
  },
  methods: {
    attackStart: function (trigger) {
      this.playing[trigger] = true
    },
    releaseStart: function (trigger) {
      this.playing[trigger] = false
    }
  },
  mounted: function () {
    this.$Tone.Transport.start()
    // Title card animations
    this.$Tone.Transport.scheduleOnce((time) => {
      this.showTitle = false
    }, '15s')

    this.$Tone.Transport.scheduleOnce((time) => {
      this.showTitle = true
    }, String(this.$store.state.meta.length) + 's')


    this.$Tone.Transport.scheduleOnce((time) => {
      this.$emit('ended')
      this.showTitle = false
    }, String(this.$store.state.meta.length + 20) + 's')


  }
}
</script>

<style lang="css" scoped>
</style>
