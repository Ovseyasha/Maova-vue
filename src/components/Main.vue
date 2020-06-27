<template>
  <div class="main" ref="screen" @mousemove="mouseMove">
    <div
      class="main__logo animate__animated animate__fadeIn"
      :style="{'transform': `translate(${x * 15}px, ${y * 15}px)` }"
    >OM DESIGN</div>
    <div class="main__header" :style="{'transform': `translate(-${x * 20}px, -${y * 20}px)`}">
      <header class="header">Марина Овчинникова</header>
      <footer class="footer">графический дизайнер</footer>
    </div>

    <img
      :src="require('@/assets/fon_site.png')"
      alt
      class="main__bg"
      :style="{'transform': `translate(-${x * 15}px, -${y * 15}px)`}"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0
    };
  },
  computed: {},
  methods: {
    mouseMove(e) {
      // console.log(this.$refs.screen.offsetWidth);
      this.x = e.pageX / this.$refs.screen.offsetWidth;
      this.y = e.pageY / this.$refs.screen.offsetHeight;
    }
  }
};
</script>

<style>
.main {
  overflow: hidden;
  background: rgb(161, 199, 0);
  background: radial-gradient(
    circle,
    rgba(161, 199, 0, 1) 0%,
    rgba(120, 153, 0, 1) 30%,
    rgba(89, 123, 0, 1) 93%
  );
  height: 100vh;
  position: relative;
}
.main__bg {
  position: absolute;
  /* z-index: 1; */
}

.main__logo {
  white-space: nowrap;
  font-size: 13em;
  position: absolute;
  color: white;
  text-shadow: -42px 41px 21px rgba(0, 0, 0, 0.28);
  margin-top: 5%;
  margin-left: 5%;
  z-index: 1;
  font-weight: lighter;
}
.main__header {
  position: absolute;
  margin-top: 35%;
  margin-left: 5%;
}
.header {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 30px;
  line-height: 37px;
  /* identical to box height */

  letter-spacing: 0.09em;
  text-transform: uppercase;

  color: #000000;
}
.footer {
  /* podzagolovok */

  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 19.8px;
  line-height: 24px;
  letter-spacing: 0.09em;
  text-transform: lowercase;

  color: #000000;
}
@media (max-width: 1200px) {
  .main__header {
    margin-top: 45%;
  }
}
@media (max-width: 992px) {
  .main__header {
    margin-top: 60%;
  }
  .main__logo {
    margin-top: 10%;
    font-size: 10em;
  }
}
@media (max-width: 958px) {
  .main__header {
    margin-left: 3%;
    margin-top: 80%;
  }
  .main__logo {
    margin-left: 1%;
    font-size: 9.8em;
  }
}
@media (max-width: 838px) {
  .main__header {
    margin-left: 3%;
    margin-top: 80%;
  }
  .main__logo {
    margin-left: 1%;
    font-size: 8.6em;
  }
}
@media (max-width: 768px) {
  .main__bg {
    right: -180%;
  }
  .main__header {
    margin-left: 3%;
    margin-top: 80%;
  }
  .main__logo {
    margin-left: 1%;
    font-size: 7.8em;
  }
}
@media (max-width: 576px) {
  .main {
    background: linear-gradient(
      180deg,
      rgba(77, 106, 0, 1) 0%,
      rgba(161, 199, 0, 1) 100%
    );
  }
  .main__bg {
    right: -270%;
  }
  .main__header {
    margin-left: 3%;
    margin-top: 100%;
  }
  .main__logo {
    font-size: 8em;
    margin-left: 1%;
    font-size: 5.8em;
  }
}
@media (max-width: 500px) {
  .main__bg {
    right: -315%;
  }
  .main__header {
    margin-left: 3%;
    margin-top: 100%;
  }
  .main__logo {
    font-size: 8em;
    margin-left: 1%;
    font-size: 5.1em;
  }
}
@media (max-width: 420px) {
  .main__bg {
    right: -370%;
  }
  .main__header {
    margin-left: 3%;
    margin-top: 100%;
  }
  .main__logo {
    margin-top: 35%;
    margin-left: 4%;
    font-size: 4.5em;
  }
}
@media (max-width: 375px) {
  .main__bg {
    right: -410%;
  }
  .main__header {
    margin-left: 3%;
    margin-top: 125%;
  }
  .main__logo {
    margin-top: 35%;
    margin-left: 4%;
    font-size: 4em;
  }
}
@media (max-width: 360px) {
  .main__bg {
    right: -430%;
    top: -15%;
  }
  .main__header {
    margin-left: 3%;
    margin-top: 125%;
  }
  .main__logo {
    margin-top: 35%;
    margin-left: 4%;
    font-size: 4em;
  }
}
@media (max-width: 320px) {
  .main__bg {
    right: -490%;
    top: -30%;
  }
  .main__header {
    margin-left: 3%;
    margin-top: 120%;
  }
  .main__logo {
    margin-top: 35%;
    margin-left: 4%;
    font-size: 3.6em;
  }
}
</style>