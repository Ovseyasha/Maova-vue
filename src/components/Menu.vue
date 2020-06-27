<template>
  <div>
    <router-link class="menu__main" v-show="notMain" to="/">OM DESIGN</router-link>
    <div class="menu">
      <router-link
        v-for="item in menuList"
        :key="item.title"
        class="menu__item"
        active-class="menu__item_active"
        exact
        :to="item.link"
      >{{item.title}}</router-link>
      <div
        class="menu__hr"
        :style="[{width : (100 / menuList.length) + '%'},{left: positionForLine}]"
      ></div>
    </div>
    <div class="container-fluid" id="app">
      <nav class="row navbar">
        <div class="logo" @click="menuOpen ? menuOpen = !menuOpen : menuOpen">
          <router-link class="menu__mains" v-show="notMain" to="/">OM DESIGN</router-link>
        </div>
        <div class="hamburger-wrap">
          <button class="hamburger" type="button" @click="menuOpen = !menuOpen">
            <svg
              class="ham hamRotate ham7"
              viewBox="0 0 100 100"
              width="80"
              :class="{'active' : menuOpen}"
            >
              <path
                class="line top"
                d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013"
              />
              <path class="line middle" d="m 70,50 h -40" />
              <path
                class="line bottom"
                d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40"
              />
            </svg>
          </button>
        </div>
      </nav>
      <div class="row dropdown" :class="{ 'dropdown-after' : menuOpen }">
        <ul class="navlist">
          <li
            class="navlistitem"
            v-for="item in menuList"
            :key="item.title"
            @click="menuOpen = !menuOpen"
          >
            <router-link
              class="navlist__item"
              active-class="navlist__item_active"
              exact
              :to="item.link"
            >{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false
    };
  },
  computed: {
    menuList() {
      return this.$store.getters["menu/list"];
    },
    notMain() {
      return this.$route.name !== "Main";
    },
    positionForLine() {
      let path = this.$route.path;
      let pos;
      if (path == "/content/about") {
        pos = "-24px";
      } else if (path == "/content/services") {
        pos = "17.5%";
      } else if (path == "/content/portfolio") {
        pos = "43%";
      } else if (path == "/content/contacts") {
        pos = "71%";
      } else {
        pos = "-30%";
      }
      return pos;
    }
  }
};
</script>

<style scoped>
.menu {
  position: fixed;
  z-index: 1000000;
  right: 2%;
  top: 4%;
  transition: all 0.4s;
  padding-left: 20px;
  overflow: hidden;
}
.menu__main {
  position: fixed;
  z-index: 1000000;
  top: 4%;
  left: 2%;
  font-size: 1.5em;
  text-decoration: none;
  color: #000;
  font-weight: bold;
  transition: all 0.4s;
}
.menu__mains {
  position: fixed;
  z-index: 1000000;
  font-size: 1.5em;
  text-decoration: none;
  color: #000;
  font-weight: bold;
  transition: all 0.4s;
}
.menu__main:hover {
  color: #4d6a00;
}
.menu__item {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  letter-spacing: 0.09em;
  text-transform: uppercase;
  text-decoration: none;
  color: #000;
  margin-right: 40px;
  transition: all 0.4s;
}
.menu__hr {
  margin-top: 1%;
  position: relative;
  background: #a0c601;
  height: 1px;
  transition: all 0.3s;
}
/* hum btn */
.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hamRotate.active {
  transform: rotate(45deg);
}
.hamRotate180.active {
  transform: rotate(180deg);
}
.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #000;
  stroke-width: 5.5;
  stroke-linecap: round;
}
.ham7 .top {
  stroke-dasharray: 40 82;
}
.ham7 .middle {
  stroke-dasharray: 40 111;
}
.ham7 .bottom {
  stroke-dasharray: 40 161;
}
.ham7.active .top {
  stroke-dasharray: 17 82;
  stroke-dashoffset: -62px;
}
.ham7.active .middle {
  stroke-dashoffset: 23px;
}
.ham7.active .bottom {
  stroke-dashoffset: -83px;
}
/* humburger */
.container-fluid {
  display: none;
  width: 100%;
  right: 0;
  z-index: 2;
  position: fixed;
}
.navbar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  border-radius: 0px;
}

.logo,
.hamburger-wrap {
  width: 100px;
  height: 100%;
  margin-left: 4%;
  margin-right: 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hamburger-wrap {
  float: right;
  justify-content: flex-end;
  /* right: 2%; */
}

.hamburger {
  position: relative;
  background: none;
  outline: none;
  border: none;
}

.hamburger:focus {
  outline: none;
}

.dropdown {
  /* margin-top: -40px; */
  height: 0px;
  background-color: #4d6a00;
  transition: height 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.dropdown-after {
  height: calc(100vh - 50px);
  transition: height 0.2s ease;
}

.navlist {
  list-style: none;
}

.navlistitem {
  text-transform: uppercase;
  text-align: center;
  padding: 20px;
}
.navlist__item {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 2em;
  line-height: 17px;
  /* identical to box height */
  letter-spacing: 0.09em;
  text-transform: uppercase;
  text-decoration: none;
  color: white;
  margin-right: 40px;
  transition: all 0.4s;
}

.navlist__item_active {
  box-sizing: border-box;
  border-bottom: 2px solid #a0c601;
}

@media (max-width: 1200px) {
}
@media (max-width: 1200px) {
}
@media (max-width: 992px) {
  .container-fluid {
    display: block;
  }
  .menu {
    display: none;
  }
  .menu__main {
    display: none;
  }
}
@media (max-width: 768px) {
}
@media (max-width: 576px) {
}
</style>