<template>
<main>
    <title-card v-if="showTitle"></title-card>
    <background-video></background-video>
    <color-filter-overlay class="color-filter-overlay" :active="playing"></color-filter-overlay>
    <mount-synth @attackStart="attackStart" @releaseStart="releaseStart"></mount-synth>
    <newsletter-signup v-if="playbackEnded"></newsletter-signup>
</main>
</template>

<script>
import colorFilterOverlay from './overlay.vue'
import backgroundVideo from './backgroundvideo.vue'
import mountSynth from './mountsynth.vue'
import titleCard from './titlecard.vue'
import newsletterSignup from '../../components/u3c/newsletterSignup.vue'

export default {
  name: 'player',
  components: {
    colorFilterOverlay, backgroundVideo, mountSynth, titleCard, newsletterSignup
  },
  data () {
    return {
      showTitle: true,
      playbackEnded: false,
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
      console.log('player ended')
      this.$emit('ended')
      this.showTitle = false
      this.playbackEnded = true
    }, String(Number(this.$store.state.meta.length) + 10) + 's')


  }
}
</script>

<style lang="css" scoped>
</style>
