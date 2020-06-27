<template>
  <div class="services">
    <a href="#" class="link-back" @click="$router.go(-1)">
      <i class="fas fa-arrow-circle-left"></i> Назад
    </a>
    <div class="services__header">Страница Услуг</div>
    <button class="services__add" @click="addService">
      <i class="fas fa-plus-square"></i>
      Добавить услугу
    </button>
    <div class="services__list">
      <div class="services__loading" v-show="loading">
        <i class="fas fa-spinner"></i>
      </div>
      <!-- вывести циклом услуги -->

      <transition-group
        leave-active-class="animate__animated animate__faster	 animate__fadeOutDown"
      >
        <div class="services__item service" v-for="(service,index) in services" :key="service.id">
          <div class="service__id">{{index + 1}}</div>
          <div class="service__name">{{service.title}}</div>
          <router-link class="service__edit btn" :to="'services/edit/' + service.id">
            <i class="far fa-edit"></i>
          </router-link>
          <button class="service__delete btn" @click="open(service.title,service.id)">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </transition-group>
      <transition
        enter-active-class="animate__animated animate__faster animate__flipInX"
        leave-active-class="animate__animated animate__faster animate__flipOutX"
      >
        <div class="modal" v-show="modal">
          <div class="modal__text">Вы Действительно хотите удалить Услугу "{{title}}"?</div>
          <div class="modal__btns">
            <button class="modal__btn close" @click="modal = !modal">Отмена</button>
            <button class="modal__btn del" @click="deleteService(id)">Удалить</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      title: "",
      id: ""
    };
  },
  computed: {
    services() {
      return this.$store.getters["services/services"];
    },
    loading() {
      return this.$store.getters["common/loading"];
    }
  },
  methods: {
    open(title, id) {
      this.modal = !this.modal;
      this.title = title;
      this.id = id;
    },
    addService() {
      this.$router.push("services/add");
    },
    deleteService(id) {
      this.$store.dispatch("services/deleteServicesById", id).then(() => {
        this.modal = !this.modal;
      });
    }
  }
};
</script>

<style scoped>
.link-back {
  text-decoration: none;
  color: grey;
}
.services__header {
  font-size: 2em;
  text-align: center;
}
.services__add {
  outline: none;
  border: none;
  background: #4d6a00;
  color: #f2f2f2;
  font-size: 1.3em;
  padding: 1% 2%;
  cursor: pointer;
}
.services__add:active {
  background: #415900;
}
.services__list {
  margin-top: 1%;
  display: flex;
  flex-direction: column;
}
.services__item {
  display: flex;
  justify-content: space-between;
}
.service {
  margin: 1%;
  font-size: 1.3em;
}
.service__id {
  font-weight: bold;
  width: 10%;
}
.service__name {
  text-align: center;
  width: 50%;
}
.service__edit {
  color: #000;
}
.btn {
  cursor: pointer;
  outline: none;
  background: none;
  border: none;
  font-size: 1.5em;
  width: 20%;
}
.btn:active {
  color: grey;
}
.modal {
  display: flex;
  flex-direction: column;
  background: #dcdcdc;
  position: absolute;
  right: 10%;
  top: 15%;
  width: 400px;
  height: 100px;
}
.modal__text {
  margin: 3%;
  font-size: 0.8em;
}
.modal__btns {
  display: flex;
  justify-content: space-between;
  margin: 0 20%;
}
.modal__btn {
  outline: none;
  border: none;
  background: none;
  font-size: 1em;
  cursor: pointer;
  padding: 1% 2%;
}
.close {
  border: 1px solid #4d6a00;
  box-sizing: border-box;
  color: #4f4f4f;
}
.del {
  background: #4d6a00;
  color: #f2f2f2;
}
.services__loading {
  color: #4d6a00;
  position: absolute;
  animation-name: rotate;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  font-size: 8em;
  left: 45%;
  top: 45%;
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