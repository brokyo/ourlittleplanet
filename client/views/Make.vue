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
    	activeView: 'synth',
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
    		effects: [],
    		filter: {},
        effectChainStart: {},
        effectChainEnd: {}
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
    toneConfigEffectsList () { return this.$store.state.tone.effectsConfig },
    toneConfigEffectValues () { return this.$store.state.tone.effectValues },
    chorusEffect () { return this.$store.state.tone.effectValues.Chorus },
    tremoloEffect () { return this.$store.state.tone.effectValues.Tremolo },
    vibratoEffect () { return this.$store.state.tone.effectValues.Vibrato },
    freeverbEffect () { return this.$store.state.tone.effectValues.Freeverb },
    ...mapGetters([
      'active_scale'
    ])
  },
  watch: {
  	toneConfigSynthName: {
  		handler () { 
  			this.tone.synth.disconnect(this.tone.effectChainStart)
  			this.tone.synth = new this.$Tone.PolySynth(8, this.$Tone[this.toneConfigSynthName])
		    this.tone.synth.set(this.toneConfigSynthValues)
		    this.tone.synth.connect(this.tone.effectChainStart)
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
        this.tone.effectChainEnd.disconnect(this.tone.filter)
        this.tone.filter = {}

        if(this.toneConfigFilter) {
          this.tone.filter = new this.$Tone.Filter(this.toneConfigFilterValues)
        } else {
          this.tone.filter = new this.$Tone.Gain()
        }

        this.tone.effectChainEnd.connect(this.tone.filter)
        this.tone.filter.connect(this.$Tone.Master)
      }
    },
    toneConfigFilterValues: {
      handler () {
        this.tone.filter.set(this.toneConfigFilterValues)
      },
      deep: true
    },
    toneConfigEffectsList: {
      handler () {
        // Disconnect Effects

        // Disconnect effect chain
        this.tone.effectChainStart.disconnect(this.tone.effects[0])

        this.$_.forEach(this.tone.effects, (effect, index) => {
          if (index === 0 && this.tone.effects.length === 1) {
            effect.disconnect(this.tone.effectChainEnd)
          } else if (index !== (this.tone.effects.length - 1) ) {
            effect.disconnect(this.tone.effects[index+1])
          } else {
            effect.disconnect(this.tone.effectChainEnd)
          }
        })

        // Reset effect object
        this.tone.effects = []

        // Create and push effects to effect array
        var activeEffects = this.$_.filter(this.toneConfigEffectsList, {active: true})
        activeEffects.forEach((effect) => {
          let toneEffect = new this.$Tone[effect.name]()
          toneEffect.set(this.toneConfigEffectValues[effect.name])
          toneEffect.name = effect.name

          if(effect.oscillator) {
            console.log('start that shit')
            toneEffect.start()
          }

          this.tone.effects.push(toneEffect)
        })


        // Connect it all
        this.$_.forEach(this.tone.effects, (effect, index) => {
          if ( index === 0 && this.tone.effects.length === 1 ) {
            this.tone.effectChainStart.connect(effect)
            effect.connect(this.tone.effectChainEnd)
          } else if ( index === 0 ) {
            this.tone.effectChainStart.connect(effect)         
            effect.connect(this.tone.effects[index+1])   
          } else if ( index !== (this.tone.effects.length - 1 )) {
            effect.connect(this.tone.effects[index + 1])
          } else {
            effect.connect(this.tone.effectChainEnd)
          }
        })

        if ( this.tone.effects.length === 0 ) {
          this.tone.effectChainStart.connect(this.tone.effectChainEnd)
        }

      },
      deep: true
    },
    chorusEffect: {
      handler (newValues) {
        var effect = this.$_.find(this.tone.effects, {name: 'Chorus'})
        effect.set(newValues)
      },
      deep: true
    },
    tremoloEffect: {
      handler (newValues) {
        var effect = this.$_.find(this.tone.effects, {name: 'Tremolo'})
        effect.set(newValues)
      },
      deep: true
    },
    vibratoEffect: {
      handler (newValues) {
        var effect = this.$_.find(this.tone.effects, {name: 'Vibrato'})
        effect.set(newValues)
      },
      deep: true
    },
    freeverbEffect: {
      handler (newValues) {
        var effect = this.$_.find(this.tone.effects, {name: 'Freeverb'})
        effect.set(newValues)
      },
      deep: true
    }
  },
  mounted: function () {
    this.$Tone.context.close()
    this.$Tone.context = new AudioContext()

    this.tone.synth = new this.$Tone.PolySynth(8, this.$Tone[this.toneConfigSynthName])
    this.tone.synth.set(this.toneConfigSynthValues)

    this.tone.effectChainStart = new this.$Tone.Gain()
    this.tone.synth.connect(this.tone.effectChainStart)

    this.tone.effectChainEnd = new this.$Tone.Gain()

    // Create and push effects to effect array
    var activeEffects = this.$_.filter(this.toneConfigEffectsList, {active: true})
    activeEffects.forEach((effect) => {
      let toneEffect = new this.$Tone[effect.name]()
      toneEffect.set(this.toneConfigEffectValues[effect.name])
      toneEffect.name = effect.name

      if(toneEffect.oscillator) {
        toneEffect.start()
      }

      this.tone.effects.push(toneEffect)
    })

    if ( this.tone.effects.length > 0 ) {
      this.$_.forEach(this.tone.effects, (effect, index) => {
        if ( index === 0 && this.tone.effects.length === 1 ) {
          this.tone.effectChainStart.connect(effect)
          effect.connect(this.tone.effectChainEnd)
        } else if ( index === 0 ) {
          this.tone.effectChainStart.connect(effect)         
          effect.connect(this.tone.effects[index+1])   
        } else if ( index !== (this.tone.effects.length - 1 )) {
          console.log(effect, '>', this.tone.effects[index + 1])
          effect.connect(this.tone.effects[index + 1])
        } else {
          effect.connect(this.tone.effectChainEnd)
        }
      })      
    } else {
      this.tone.effectChainStart.connect(this.tone.effectChainEnd)
    }

    if (this.toneConfigFilter) {
      this.tone.filter = new this.$Tone.Filter(this.toneConfigFilterValues)
    } else {
      this.tone.filter = new this.$Tone.Gain()
    }

    this.tone.effectChainEnd.connect(this.tone.filter)

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