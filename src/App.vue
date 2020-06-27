<template>
  <div id="app">
    <v-menu></v-menu>
    <main class="content">
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <router-view></router-view>
      </transition>
    </main>
    <div class="footer">
      <a href="#" class="footer__link" :class="{'footer__link_green' : notMain}">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="#" class="footer__link" :class="{'footer__link_green' : notMain}">
        <i class="fab fa-behance"></i>
      </a>
      <a href="#" class="footer__link" :class="{'footer__link_green' : notMain}">
        <i class="fab fa-instagram"></i>
      </a>
    </div>
  </div>
</template>

<script>
import vMenu from "./components/Menu";
import firebase from "firebase/app";
export default {
  beforeMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("admin/loggedAdmin", user);
      }
    });
  },
  computed: {
    notMain() {
      return this.$route.name !== "Main";
    },
    checkAdmin() {
      return this.$store.getters["admin/checkAdmin"];
    }
  },
  methods: {},
  components: {
    vMenu
  }
};
</script>

<style scoped>
.content {
  overflow: hidden;
}
.content::-webkit-scrollbar {
  width: 0px;
}
.footer {
  position: fixed;
  right: 5%;
  bottom: 4%;
  font-size: 25px;
}
.footer__link {
  margin-left: 60px;
  color: #fff;
  transition: color 0.3s;
}
.footer__link_green {
  color: #4d6a00;
}
</style>
