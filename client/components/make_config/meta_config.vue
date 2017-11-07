<template>
<main>
  <h2 class="sectionHeader"><span>meta</span></h2>
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
  <u3c :config="this.u3c"></u3c>
</main>
</template>

<script>
import { db } from '../../plugins/firebase.js'

export default {
  name: 'demo',
  data () {
    return {
      u3c: {
        about: 'Make your own digital music box. It looks confusing (and it is! Welcome to the under construction club! I no longer care about UX!) but honestly you\'ll figure it out. It\'ll be fine. If something is super impossible to use of confusing email me at alexcarusillo@gmail.com. If you see this box somewhere it means there\'s somethign that I think needs explanation',
        db: 'jsradioorchestra'
      }
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

  #setParams {
    background-color: white;
    width: 300px;
    padding: 5px;
  }

  textArea {
    height: 60px;
  }

  label {
    font-weight: 900;
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
