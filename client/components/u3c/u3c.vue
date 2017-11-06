<template lang="html">
  <main>
    <div class="explainer" v-if="explainer">The Under Construction Club is a bunch of half-finished, undesigned projects released too early. Click the button for more info on this page or head to the site itself by clicking the name.</div>
    <div class="topBanner">
      <div class="bannerOverlay">
        <span>
          <a href="http://www.under-construction.club" @mouseenter="explainer = true" @mouseleave="explainer = false">
            Under Construction Club
          </a>
          <button @click="min = !min">
            <span v-if="min">+</span>
            <span v-else>-</span>
          </button>
        </span>
      </div>
    </div>
    <div class="textBox" v-if="!min">
      <div v-if="state === 'text'">
        <button @click="state = 'guestbook'">Guestbook</button>
        <div v-if="config.about">
          <label>About</label>
          <p>{{config.about}}</p>
        </div>
        <div v-if="config.instructions">
          <label>Instructions</label>
          <p>{{config.instructions}}</p>
        </div>
        <div v-if="config.next">
          <label>How Can I help?</label>
          <p>{{config.next}}</p>
        </div>
      </div>
      <div v-if="state === 'guestbook'">
        <button @click="state = 'text'">About</button>
        <textarea v-model="newComment"></textarea>
        <button @click="post" :disabled="!newComment">Post</button>
        <div v-if="comments">
          <label>Suggestion Box/Guestbook</label>
          <p v-for="comment in comments">{{comment.text}}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { db } from '../../plugins/firebase.js'

export default {
  name: 'ucc',
  props: ['config'],
  data () {
    return {
      state: 'text',
      newComment: '',
      explainer: false,
      min: true
    }
  },
  firebase: {
    guestbook: db.ref('guestbook')
  },
  computed: {
    comments () { return  _.reverse(_.sortBy(this.guestbook, ['date']))}
  },
  methods: {
    post: function () {
        this.$firebaseRefs.guestbook.push({text: this.newComment, date: Date.now()})
        this.newComment = ''
      }
  }
}
</script>

<style lang="css" scoped>
  main {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 400px;
    background-color: white;

    label {
      margin-top: 20px;
      font-weight: 900;
    }

    .explainer {
      font-size: 10px;
    }

    .textBox {
      padding: 0px 8px;
      max-height: 200px;
      overflow: scroll;
      border-left: 2px dashed black;
      border-right: 2px dashed black;
    }

    p {
      margin-bottom: 10px;
    }

    textarea {
      display: block;
      width: 100%;
    }
  }


.topBanner {
  background: repeating-linear-gradient(-55deg,#ebb631,#ebb631 10px,#262425 0,#262425 20px);
  height: 40px;
  text-align: center;

  button {
    margin-left: 10px;
  }

  .bannerOverlay {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.35)
  }

  a {
    font-weight: 500;
    color: white;
    font-size: 22px;
  }
}
</style>
