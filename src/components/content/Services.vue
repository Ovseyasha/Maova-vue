<template>
  <div class="services">
    <div class="services__header">Услуги</div>
    <div class="services__loading" v-show="loading">
      <i class="fas fa-spinner"></i>
    </div>
    <transition-group
      class="services__items"
      enter-active-class="animate__fadeIn animate__animated animate__faster"
    >
      <service
        class="services__item"
        v-for="(service) in services"
        :key="service.id"
        :service="service"
      ></service>
    </transition-group>
  </div>
</template>

<script>
import Service from "./item/Service";
export default {
  components: {
    Service
  },
  computed: {
    services() {
      return this.$store.getters["services/services"];
    },
    loading() {
      return this.$store.getters["common/loading"];
    }
  }
};
</script>

<style scoped>
.services {
  color: #000;
}

.services__header {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 2.5em;
  line-height: 37px;
  /* identical to box height */
  text-align: center;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  margin-bottom: 0.5%;
}
.services__items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: auto;
  height: 77vh;
  /* position: relative; */
}
.services__items::-webkit-scrollbar {
  width: 0px;
}
.services__item {
  flex-basis: 23%;
  /* width: 23%; */
  margin: 1%;
}
.services__item::-webkit-scrollbar {
  width: 0px;
}
.services__loading {
  color: #4d6a00;
  position: absolute;
  animation-name: rotate;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  font-size: 8em;
  left: 46.5%;
  top: 45%;
}
@media (max-width: 1200px) {
  .services__item {
    flex-basis: 30%;
  }
}
@media (max-width: 992px) {
  .services__item {
    flex-basis: 45%;
  }
}
@media (max-width: 768px) {
  .services__item {
    flex-basis: 48%;
  }
}
@media (max-width: 576px) {
  .services__item {
    flex-basis: 98%;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>