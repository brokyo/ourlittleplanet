<template>
<main>
  <div id="setParams">
    <div class="olpInput">
      <label>Title</label>
      <input type="text" :value="meta.title" @change="update('title', $event.target.value)"></input>
    </div>
    <div class="olpInput">
      <label>Intro Text</label>
      <textarea :value="meta.intro" @change="update('intro', $event.target.value)"></textarea>    
    </div>
    <div class="olpInput">
      <label>Creator</label>
      <input type="text" class="olpInput" :value="meta.creator" @change="update('creator', $event.target.value)"></input>
    </div>
    <div class="olpInput">
      <label>Duration</label>
      <input type="number" class="olpInput" :value="meta.length" @change="update('length', $event.target.value)"></input>
    </div>
    <button @click="save()">Publish</button>
  </div>
</main>
</template>

<script>
import { db } from '../../plugins/firebase.js'

export default {
  name: 'demo',
  data () {
    return {

    }
  },
  computed: {
    meta () { return this.$store.state.meta },
  },
  firebase: {
    musicboxes: db.ref('musicboxes')
  },
  methods: {
    update: function (key, value) {
      let update = {
        [key]: value
      }

      this.$store.commit('UPDATE_META', update)
    },
    save: function () {
      // TODO: lol no fucking idea why https://stackoverflow.com/questions/31983225/error-firebase-set-failed-first-argument-contains-undefined-in-property-achv
      db.ref('musicboxes').push(JSON.parse(JSON.stringify(this.$store.state)))
      alert('saved!')
      this.$router.push('/all')
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  position: relative;
  display: flex;
  justify-content: center;

  #setParams {
    background-color: white;
    width: 300px;
    padding: 5px;
    margin-top: 80px;
  }

  textArea {
    height: 60px;
  }
}

.olpInput {
  display: block;
  margin-bottom: 10px;

  input {
    display: block;
    width: 98%;
  }

  textArea {
    display: block;
    width: 98%;
  }
}
</style>
