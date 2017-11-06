<template>
  <main class="video-background">
    <div class="video-foreground">
      <youtube id="video" :videoId='video.videoId' player-width="100%" player-height="100%" :player-vars='{start: video.params.start, end: video.params.end, autoplay: 1, showinfo: 0, modestbranding:1, playlist: video.videoId, loop: 1, controls: 0}' @ready="ready"></youtube>
    </div>
  </main>
</template>

<script>
export default {
  name: 'backgroundvideo',
  computed: {
  	video () { return this.$store.state.video }
  },
  methods: {
    ready (player) {
      player.setVolume(this.video.params.volume)
      player.setPlaybackQuality('small')
    }
  }
}
</script>

<style lang="scss" scoped>

#video {
  height: 100%
}

.video-background {
  background: #ffffff;
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 0;
}

.video-foreground,
.video-background iframe {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

</style>
