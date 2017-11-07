<template>
<main>
  <input type="checkbox" :value="configActive" @change="toggleFilter"></input>
  <section class="filterConfig" v-if="configActive">
    <div class="title">
      <h4>Filter</h4>
    </div>
    <div class="controls">
      <label>Filter Type</label>
      <select :value="configValues.type" @change="updateVuexFilter($event.target.value, 'type')">
        <option v-for="type in options.filter.allTypes">{{type}}</option>
      </select>
      <label>Frequency</label>
      <input type="range" min="0" max="20000" step="100" :value="configValues.frequency" @change="updateVuexFilter($event.target.value, 'frequency')"></input>
      <input type="number" :value="configValues.frequency" @change="updateVuexFilter($event.target.value, 'frequency')"></input>
      <label>Q</label>
      <input type="range" min="0" max="30" :value="configValues.Q" @change="updateVuexFilter($event.target.value, 'Q')">
      <input type="number" :value="configValues.Q" @change="updateVuexFilter($event.target.value, 'Q')"></input>
      <label>Rolloff</label>
      <select :value="configValues.rolloff" @change="updateVuexFilter($event.target.value, 'rolloff')">
        <option v-for="rolloff in options.filter.rollOffValues">{{ rolloff }}</option>
      </select>
    </div>
  </section>
</main>
</template>

<script>
import toneUtilityData from '../../utilities/toneUtility.js'

export default {
  name: 'tonefilter',
  data () {
    return {
      options: toneUtilityData.generalConfigOptions 
    }
  },
  computed: {
    configActive () { return this.$store.state.tone.filter },
    configValues () { return this.$store.state.tone.filterMemberValues }
  },
  methods: {
    toggleFilter () {
      this.$store.commit('TOGGLE_ACTIVE_FILTER')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
