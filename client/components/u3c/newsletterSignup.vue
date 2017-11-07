<template>
  <div class="signupContainer" v-if="active">
    <div class="item">
	  	<span @click="active = false">x</span>
      <p>Want to infrequently hear about new musicboxes and other UCC projects? Add your email below</p>
      <input v-model="email"></input><button @click="newsletterSignup">Sign Up</button>
    </div>
  </div>
</template>

<script>
import { db } from '../../plugins/firebase.js'

export default {
  name: 'newsletterSignup',
  data () {
    return {
    	active: true,
    	email: ''
    }
  },
  firebase: {
    newsletter: db.ref('newsletterSignups')
  },
  methods: {
    newsletterSignup: function () {
    	this.active = false;
    	this.$firebaseRefs.newsletter.push({email: this.email})
    }
  }
}
</script>

<style lang="scss" scoped>
	.signupContainer {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  position: fixed;
	  bottom: 0px;
	  right: 10px;
	  z-index: 999999;

	  .item {
	    text-align: center;
	    border: 1px solid black;
	    padding: 0px 10px;
	    width: 300px;
	    background: white;

	    span {
		    float: right;
		    position: relative;
		    top: -10px;
		    right: -15px;
		    border: 1px solid black;
		    background: white;
		    font-size: 12px;
		    padding: 3px;
	    }

	    span:hover {
	    	background: #d8d8d8;
	    	cursor: pointer;
	    }

	    p {
	      font-size: 12px;
	    }
	  }

	  input {
	    width: 75%;
	    margin-bottom: 10px;
	  }
	}

</style>