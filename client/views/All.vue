<template>
  <main>
    <h1>All Music Boxes</h1>
    <div v-for="(box, key) in musicBoxes">
      <h4><router-link :to="{ path: 'musicboxes', query: { id: box['.key'] }}">{{box.meta.title}}</router-link></h4>
      <h6>{{box.meta.creator}}</h6>
    </div>
  </main>
</template>

<script>
import { db } from '../plugins/firebase.js'

export default {
  name: 'all',
  head () {
    return {
      title: 'All Music Boxes'
    }
  },
  firebase: {
    musicBoxes: db.ref('musicboxes')
  }
}
</script>

<style lang="css" scoped>
</style>
