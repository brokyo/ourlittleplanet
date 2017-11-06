<template>
    <main id="player">
      <div v-if="!userStart">
        <h1 v-if="boxConfig.meta">{{$store.state.meta.title}}</h1>
        <h3>Lower octave: 'Q', 'W', 'E', 'R', 'T'</h3>
        <h3>Upper octave: 'H', 'J', 'K', 'L', ';'</h3>
        <h4>composition last {{$store.state.meta.length}} seconds</h4>
        <br>
        <br>
        <br>
        <h4>{{$store.state.meta.intro}}</h4>
        <button @click="start">Start</button>
      </div>
      <div v-if="userStart">
        <player @ended="ended"></player>
      </div>
      <u3c :config="this.u3c" v-if="!userStart"></u3c>
    </main>
</template>

<script>
import { db } from '../plugins/firebase.js'
import player from '../components/player/player.vue'

export default {
  name: 'single',
  components: {
    player
  },
  data () {
    return {
        // boxConfig: {},
        userStart: false,
        u3c: {
          about: 'This digital music box was created in our little planet. Read more about it at under-construction.club and make your own at /make.',
          instructions: 'It\'s an instrument. play it with the keys above however you think is best. you can\'t share it, no one else will ever hear it, etc etc. just a thing for you right now.',
          db: 'jsradioorchestra'
        }
    }
  },
  methods: {
    start: function () {
      var player = document.getElementById('player')

      if (player.requestFullscreen) {
        player.requestFullscreen()
      } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen()
      } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen()
      } else if (player.msRequestFullscreen) {
        player.msRequestFullscreen()
      }
      this.userStart = true
    },
    ended: function () {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  },
  created () {
    this.$bindAsObject(
    	'boxConfig', 
    	db.ref('musicboxes').child('-KxFZ8QPcpWsEsdiRmha'),
	    cancel => {
	    	alert('something broken i dunno')
	    	console.log(cancel)
	    },
	    ready => {
	    	this.$store.commit('PLAY_CONFIG', this.boxConfig)
	    }
    )
  }
}
</script>

<style lang="css" scoped>
</style>
