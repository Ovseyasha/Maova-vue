<template>
  <div class="admin">
    <div class="admin__content">
      <button class="admin__logOut" v-show="check" @click="logOut">Выйти</button>
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__faster	 animate__slideInLeft"
        leave-active-class="animate__animated animate__faster	 animate__slideOutRight"
      >
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
  data() {
    return {};
  },
  computed: {
    check() {
      // console.log(this.$store.getters["admin/checkAdmin"]);

      return this.$store.getters["admin/checkAdmin"];
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("admin/logOut").then(() => {
        this.$router.push("/admin");
      });
    }
  }
};
</script>

<style scoped>
.admin {
  margin: 8% 10%;
}
.admin__logOut {
  position: absolute;
  top: 10%;
  right: 15%;

  margin: 1%;
  padding: 0.5% 1%;
  outline: none;
  border: none;
  font-size: 1em;
  cursor: pointer;

  background: #4d6a00;
  color: #f2f2f2;
}
</style>