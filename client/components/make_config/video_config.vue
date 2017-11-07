<template>
<main>
<background-video></background-video>
<div class="config">
  <h2 class="sectionHeader"><span>video</span></h2>
  <div class="configPanel">
    <label>Curated Video</label>
    <select @change="videoSelect">
      <option v-for="video in videoList" :value="video.id">{{video.title}}</option>
    </select>
    <label>Custom YouTube Video (paste part after ?v= in url)</label>
    <input type="text" :value="background.id" @change="update($event.target.value, 'videoId')">
    <label>Start Time</label>
    <input type="text" :value="background.params.start" @change="update($event.target.value, 'params', 'start')">
    <label>End Time</label>
    <input type="text" :value="background.params.end" @change="update($event.target.value, 'params', 'end')">
    <label>Volume</label>
    <input type="text" :value="background.params.volume" @change="update($event.target.value, 'params', 'volume')">
  </div>
</div>

</main>
</template>

<script>
import backgroundVideo from '../player/backgroundvideo.vue'

export default {

  name: 'videoConfig',
  components: {
    backgroundVideo
  },
  data () {
    return {
      videoList: [
        {title: 'micro burst near lowell indiana', id: 'L6CtOH8RVmM'},
        {title: 'parking lot', id: 'm592XzAQfiw'},
        {title: 'plane', id: 'esbfjBWuZ3o'},
        {title: 'walk1', id: 'GFFWZ4Em1wM'},
        {title: 'walk2', id: 'whjlvr-3Lxc'},
        {title: 'walk3', id: 'o34e0406WL8'},
        {title: 'walk4', id: 'g98gwuSo680'}  
      ]      
    }
  },
  computed: {
  	background () {
  		return this.$store.state.video
  	}
  },
  methods: {
    videoSelect () {
      this.$store.commit('SET_VIDEO_PARAMS', {videoId: event.target.value})
    },
  	update (value, key, subkey) {
  		let update = {}

  		if (subkey !== undefined) {
  			update = {
  				[key]: {
  					[subkey]: value
  				}
  			}
  		} else {
  			update = {
  				[key]: value
  			}
  		}

  		this.$store.commit('SET_VIDEO_PARAMS', update)
  	}
  }
}
</script>

<style lang="scss" scoped>
.config {
  position: relative;
}

.configPanel {
  background-color: white;
  padding: 10px;
  width: 250px;

  label {
    display: block;
    font-weight: 900;
  }

  input, select {
    margin-bottom: 10px;
  }
}

</style>
