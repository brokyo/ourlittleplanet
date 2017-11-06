<template>
	<main>
    <background-video v-if="activeView !== 'video' && showVideo"></background-video>
    <color-filter-overlay v-if="showOverlay" class="overlay--make" :active="playing"></color-filter-overlay>

    <div class="controlButtons">
      <button @click="showVideo = !showVideo">Video: {{ showVideo }}</button>
      <button @click="showOverlay = !showOverlay">Overlay: {{showOverlay}}</button>
      <button @click="showConfig = !showConfig">Controls: {{showConfig}}</button>
    </div>
		<nav>
      <button @click="activeView = 'meta'">Publish Options</button>
      <button @click="activeView = 'synth'">Synth</button>
      <button @click="activeView = 'scale'">Scale</button>
      <button @click="activeView = 'video'">Background Video</button>
      <button @click="activeView = 'overlay'">Overlay</button>
      <button @click="activeView = 'mutations'">Mutations</button>
		</nav>
    <meta-config v-if="activeView === 'meta' && showConfig"></meta-config>
		<synth-config v-if="activeView === 'synth' && showConfig"></synth-config>
    <scale-config v-if="activeView === 'scale' && showConfig" :playing="playing"></scale-config>
    <video-config v-if="activeView === 'video' && showConfig"></video-config>
    <overlay-config v-if="activeView === 'overlay' && showConfig"></overlay-config>
    <mutation-config v-if="activeView === 'mutations' && showConfig"></mutation-config>

  <u3c :config="this.u3c"></u3c>
	</main>
</template>

<script>
import { mapGetters } from 'vuex'
import synthTrigger from '../components/make_config/synths/triggers.vue'

// Config Components
import metaConfig from '../components/make_config/meta_config.vue'
import synthConfig from '../components/make_config/synth_config.vue'
import scaleConfig from '../components/make_config/scale_config.vue'
import videoConfig from '../components/make_config/video_config.vue'
import overlayConfig from '../components/make_config/overlay_config.vue'
import mutationConfig from '../components/make_config/mutation_config.vue'


// Player Components
import backgroundVideo from '../components/player/backgroundvideo.vue'
import colorFilterOverlay from '../components/player/overlay.vue'

export default {
	components: {
		synthTrigger, metaConfig, videoConfig, synthConfig, scaleConfig, overlayConfig, mutationConfig, backgroundVideo, colorFilterOverlay
	},
  data () {
    return {
    	activeView: 'meta',
      showVideo: false,
      showOverlay: false,
      showConfig: true,
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
      },
    	tone: {
    		synth: {},
    		effects: [{}],
    		filter: {}
    	},
      u3c: {
        about: 'Make your own digital music box. It looks confusing (and it is! Welcome to the under construction club! I no longer care about UX!) but honestly you\'ll figure it out. It\'ll be fine. If something is super impossible to use of confusing email me at alexcarusillo@gmail.com.',
        db: 'jsradioorchestra'
      }
    }
  },
  computed: {
    toneConfigSynthName () { return this.$store.state.tone.synth },
    toneConfigSynthValues () { return this.$store.state.tone.synthMemberValues },
  	toneConfigFilter () { return this.$store.state.tone.filter },
  	toneConfigFilterValues () { return this.$store.state.tone.filterMemberValues },
    ...mapGetters([
      'active_scale'
    ])
  },
  watch: {
  	toneConfigSynthName: {
  		handler () { 
  			this.tone.synth.disconnect(this.tone.filter)
  			this.tone.synth = new this.$Tone.PolySynth(8, this.$Tone[this.toneConfigSynthName])
		    this.tone.synth.set(this.toneConfigSynthValues)
		    this.tone.synth.connect(this.tone.filter)
		    this.tone.synth.triggerAttackRelease(110, 1)
  		}
  	},
  	toneConfigSynthValues: {
  		handler() { 
  			this.tone.synth.set(this.toneConfigSynthValues)
  		},
  		deep: true
  	},
    toneConfigFilter: {
      handler () {
        this.tone.synth.disconnect(this.tone.filter)
        this.tone.filter = {}

        if(this.toneConfigFilter) {
          this.tone.filter = new this.$Tone.Filter(this.toneConfigFilterValues)
        } else {
          this.tone.filter = new this.$Tone.Gain()
        }

        this.tone.synth.connect(this.tone.filter)
        this.tone.filter.connect(this.$Tone.Master)
      }
    },
    toneConfigFilterValues: {
      handler () {
        this.tone.filter.set(this.toneConfigFilterValues)
      },
      deep: true
    }
  },
  mounted: function () {
    // Create Synth
    this.$Tone.context.close()
    this.$Tone.context = new AudioContext()

    this.tone.synth = new this.$Tone.PolySynth(8, this.$Tone[this.toneConfigSynthName])
    this.tone.synth.set(this.toneConfigSynthValues)

    if (this.toneConfigFilter) {
      this.tone.filter = new this.$Tone.Filter(this.toneConfigFilterValues)
    } else {
      this.tone.filter = new this.$Tone.Gain()
    }

    this.tone.synth.connect(this.tone.filter)
    this.tone.filter.connect(this.$Tone.Master)

    // Set Triggers
    this.$_.forEach(this.active_scale, (pitch, index) => {
      window.addEventListener('keydown', (e) => {

        if (e.key === pitch.keyCode & !e.repeat) {
          this.tone.synth.triggerAttack(this.active_scale[index].noteToPlay)
          this.playing[index] = true
        }
      })

      window.addEventListener('keyup', (e) => {
        if (e.key === pitch.keyCode & !e.repeat) {
          this.tone.synth.triggerRelease(this.active_scale[index].noteToPlay)
          this.playing[index] = false
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  nav {
    position: relative;
    z-index: 1;
  }

  .controlButtons {
    position: relative;
    z-index: 1;
  }

  .overlay--make {
    position: relative;
  }
</style>