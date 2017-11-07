<template>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  name: 'mountsynth',
  data () {
    return {
      synth: {},
      filter: {},
      effects: [],
      effectChainStart: {},
      effectChainEnd: {}
    }
  },
  computed: {
  	toneConfig () { return this.$store.state.tone },
    ...mapGetters([
      'active_scale'
    ])
  },
  mounted: function () {
    this.$Tone.context.close()
    this.$Tone.context = new AudioContext()

    this.synth = new this.$Tone.PolySynth(8, this.$Tone[this.toneConfig.synth])
    this.synth.set(this.toneConfig.synthMemberValues)

    this.effectChainStart = new this.$Tone.Gain()
    this.synth.connect(this.effectChainStart)

    this.effectChainEnd = new this.$Tone.Gain()

    // Create and push effects to effect array
    var activeEffects = this.$_.filter(this.toneConfig.effectsConfig, {active: true})
    activeEffects.forEach((effect) => {
      let toneEffect = new this.$Tone[effect.name]()
      toneEffect.set(this.toneConfig.effectValues[effect.name])
      this.effects.push(toneEffect)
    })

    if ( this.effects.length > 0 ) {
      this.$_.forEach(this.effects, (effect, index) => {
        if ( index === 0 && this.effects.length === 1 ) {
          this.effectChainStart.connect(effect)
          effect.connect(this.effectChainEnd)
        } else if ( index === 0 ) {
          this.effectChainStart.connect(effect)         
          effect.connect(this.effects[index+1])   
        } else if ( index !== (this.effects.length - 1 )) {
          console.log(effect, '>', this.effects[index + 1])
          effect.connect(this.effects[index + 1])
        } else {
          effect.connect(this.effectChainEnd)
        }
      })      
    } else {
      this.effectChainStart.connect(this.effectChainEnd)
    }

    if (this.toneConfig.filter) {
      this.filter = new this.$Tone.Filter(this.toneConfig.filterMemberValues)
    } else {
      this.filter = new this.$Tone.Gain()
    }

    this.effectChainEnd.connect(this.filter)
    this.filter.connect(this.$Tone.Master)

    // Corruption
    this.$_.forEach(this.$store.state.corruption, (effect) => {
      console.log(effect)

      if (effect.type === 'detune' && effect.active) {

        this.$Tone.Transport.scheduleOnce((time) => {
          let detuneAmount = 0
          this.$Tone.Transport.scheduleRepeat((time) => {
            detuneAmount += effect.detuneAmount

            this.synth.set({'detune': detuneAmount})
          }, String(effect.interval) + 's')
        }, String(effect.start) + 's')

      }

      if (effect.type === 'volumeDown' && effect.active) {

        this.$Tone.Transport.scheduleOnce((time) => {
          let volume = 0
          this.$Tone.Transport.scheduleRepeat((time) => {
            volume -= effect.volumeDecrease
            if (volume > effect.minVolume) {
              this.synth.set({'volume': volume})
            } else {
              // Cancel this probably
            }
          }, String(effect.interval) + 's')
        }, String(effect.start) + 's')
      }

      if (effect.type === 'compression' && effect.active) {
        this.$Tone.Transport.scheduleOnce((time) => {
          var compressor = new Tone.Compressor(effect.members).toMaster()
          this.filter.disconnect(Tone.Master)
          this.filter.connect(compressor)
        }, effect.start)
      }

    })


    this.$_.forEach(this.active_scale, (trigger) => {
        window.addEventListener('keydown', (e) => {
          if (e.key === trigger.keyCode & !e.repeat) {
            this.synth.triggerAttack(trigger.noteToPlay)
            this.$emit('attackStart', trigger.id)
          }
        })

        window.addEventListener('keyup', (e) => {
          if (e.key === trigger.keyCode & !e.repeat) {
            this.synth.triggerRelease(trigger.noteToPlay)
            this.$emit('releaseStart', trigger.id)
          }
        })
    })

  }
}
</script>

<style lang="css" scoped>
</style>
