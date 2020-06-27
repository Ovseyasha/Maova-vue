<template>
  <div class="menu">
    <div class="menu__header">Меню редактирования</div>
    <div class="menu__items">
      <router-link
        class="menu__item"
        v-for="item in adminList"
        :key="item.title"
        :to="item.link"
      >{{item.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    adminList() {
      return this.$store.getters["menu/adminList"];
    }
  }
};
</script>

<style scoped>
.menu {
  margin-top: 15%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.menu__header {
  margin-bottom: 2%;
  font-size: 2em;
}
.menu__items {
  display: flex;
  flex-wrap: wrap;
}
.menu__item {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  /* padding: 20%; */
  flex-basis: 48%;
  height: 150px;
  background: grey;
  margin: 1%;
  font-size: 1.2em;
}
.menu__item:hover {
  background: rgb(158, 157, 157);
}
</style>