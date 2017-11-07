<template>
  <main>
    <section>
      <h2 class="sectionHeader"><span>overlay</span></h2>
      <button @click="randomize('shallow')">Randomize</button>
      <button @click="randomize('deep')">Deep Randomize</button>
      <div v-for="(octave, index) in colorConfig">
        <div class="octaveConfig">
          <h2>{{octave.name}}</h2>
          <label>Direction</label>
          <select :value="octave.config['flex-direction']" @change="updateGroup(index, 'flex-direction', $event.target.value)">
            <option value="column">Column</option>
            <option value="row">Row</option>
          </select>
          <select :value="octave.config['display']" @change="updateGroup(index, 'display', $event.target.value)">
            <option value="flex">Show [display: flex]</option>
            <option value="none">Hide</option>
          </select>
          <div v-for="band in octave.styles">
            <label>Color</label>
            <input type="color" :value="band.color" @change="updateBand(band.id, index, 'color', $event.target.value)"></input>
            <label>Grow</label>
            <input type="number" :value="band.grow" @change="updateBand(band.id, index, 'grow', $event.target.value)"></input>
            <label>Offset Top</label>
            <input type="number" :value="band.offsetTop" @change="updateBand(band.id, index, 'offsetTop', $event.target.value)"></input>
            <label>Offset Left</label>
            <input type="number" :value="band.offsetLeft" @change="updateBand(band.id, index, 'offsetLeft', $event.target.value)"></input>
            <label>Start Opacity</label>
            <input type="number" :value="band.startOpacity" @change="updateBand(band.id, index, 'startOpacity', $event.target.value)"></input>
            <label>End Opacity</label>
            <input type="number" :value="band.endOpacity" @change="updateBand(band.id, index, 'endOpacity', $event.target.value)"></input>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'colorfilter-config',
  props: ['active', 'transitions'],
  computed: {
    colorConfig () { return this.$store.state.overlay.colorConfig },
  },
  methods: {
    randomize: function (type) {
      var vue = this
      let octaveIndex = 0
      let bandIndex = 0

      this.colorConfig.forEach(function (octave) {
        let coinFlip = Math.floor(Math.random() * 2)

        if (coinFlip === 0) {
          octave.config['flex-direction'] = 'column'
        } else {
          octave.config['flex-direction'] = 'row'
        }

        octave.styles.forEach(function (band) {
          let coinFlip = Math.floor(Math.random() * 2)

          band.grow = Math.floor(Math.random() * 3) + 1

          if (type === 'deep') {
            band.offsetTop = Math.floor(Math.random() * 40)
            band.offsetLeft = Math.floor(Math.random() * 40)            
          }

          if (type === 'shallow') {
            band.offsetTop = 0
            band.offsetLeft = 0                        
          }

          if (coinFlip === 0) {
            band.offset = -band.offset
          }

          band.color = '#' + Math.floor(Math.random() * 16777215).toString(16)

          let update = {
            meta: {
              bandIndex: bandIndex,
              arrayIndex: octaveIndex
            },
            band: band
          }
          vue.$store.commit('RANDOM_OVERLAY_BAND', update)
          if (bandIndex >= 4) {
            bandIndex = 0
          } else {
            bandIndex++
          }
        })

        let update = {
          meta: {
            arrayIndex: octaveIndex
          },
          config: octave.config
        }


        vue.$store.commit('RANDOM_OVERLAY_GROUP', update)
        octaveIndex++
      })
    },
    updateBand: function (id, index, key, value) {
      let update = {
        meta: {
          arrayIndex: index,
          id: id
        },
        payload: {
          [key]: value
        }
      }

      this.$store.commit('SET_OVERLAY_BAND_PARAMS', update)

    },
    updateGroup: function (index, key, value) {
      let update = {
        meta: {
          arrayIndex: index
        },
        payload: {
          [key]: value
        }
      }

      this.$store.commit('SET_OVERLAY_GROUP_PARAMS', update)
    }
  },
  mounted: function () {
    this.$parent.showOverlay = true
  }
}
</script>

<style lang="scss" scoped>
section {
  position: relative;
  z-index: 1;
}

.octaveConfig {
  z-index: 1;
  display: block;
  background-color: white;
  padding: 2px 10px 10px 10px;
  margin-top: 20px;

  h2 {
    margin: 10px 0px 20px 0px;
  }

  label {
    display: inline-block;
  }
}

</style>
