import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'

Vue.use(VueFire)

var config = {
    apiKey: "AIzaSyAd1smP63cEltRztI1z4BU4G9Ua8lN0M50",
    authDomain: "jsradioorchestra.firebaseapp.com",
    databaseURL: "https://jsradioorchestra.firebaseio.com",
    projectId: "jsradioorchestra",
    storageBucket: "jsradioorchestra.appspot.com",
    messagingSenderId: "1096876541278"
};

let firebase = Firebase.initializeApp(config)
let db = firebase.database()

export { db }
