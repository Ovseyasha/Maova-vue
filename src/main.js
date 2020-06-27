// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Vuelidate from 'vuelidate'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
// картинки
import 'firebase/storage'
Vue.use(Vuelidate)
Vue.config.productionTip = false

// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }


var firebaseConfig = {
  apiKey: "AIzaSyDffydR-U9oOpMzn0vo8W17qdawxdepC40",
  authDomain: "maova-b6223.firebaseapp.com",
  databaseURL: "https://maova-b6223.firebaseio.com",
  projectId: "maova-b6223",
  storageBucket: "gs://maova-b6223.appspot.com",
  messagingSenderId: "925025116675",
  appId: "1:925025116675:web:5d4ec0f951759610d3e436",
  measurementId: "G-GCCZECYRB7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
      created() {
        if (user) {
          this.$store.dispatch('admin/loggedAdmin', user);

        }
        this.$store.dispatch('contacts/loadMails');
        this.$store.dispatch('about/loadAbout');
        this.$store.dispatch('services/loadServices');
        this.$store.dispatch('portfolio/LoadProjects');
        this.$store.dispatch('contacts/loadContacts');
      }
    })

  }

})
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>',
//   created() {
//     var firebaseConfig = {
//       apiKey: "AIzaSyDffydR-U9oOpMzn0vo8W17qdawxdepC40",
//       authDomain: "maova-b6223.firebaseapp.com",
//       databaseURL: "https://maova-b6223.firebaseio.com",
//       projectId: "maova-b6223",
//       storageBucket: "maova-b6223.appspot.com",
//       messagingSenderId: "925025116675",
//       appId: "1:925025116675:web:5d4ec0f951759610d3e436",
//       measurementId: "G-GCCZECYRB7"
//     };
//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);

//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         this.$store.dispatch('admin/loggedAdmin', user);

//       }
//       this.$store.dispatch('contacts/loadMails');
//       this.$store.dispatch('about/loadAbout');
//       this.$store.dispatch('services/loadServices');
//       this.$store.dispatch('portfolio/LoadProjects');
//       this.$store.dispatch('contacts/loadContacts');

//     })

//   }
// })

