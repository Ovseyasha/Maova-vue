<template>
  <div class="projects">
    <a href="#" class="link-back" @click="$router.go(-1)">
      <i class="fas fa-arrow-circle-left"></i> Назад
    </a>
    <div class="projects__header">Страница Проектов</div>
    <button class="projects__add" @click="addProject">
      <i class="fas fa-plus-square"></i>
      Добавить проект
    </button>
    <div class="projects__list">
      <!-- вывести циклом услуги -->
      <transition-group
        leave-active-class="animate__animated animate__faster	 animate__fadeOutDown"
      >
        <div class="projects__item project" v-for="(project,index) in projects" :key="project.id">
          <div class="project__id">{{index + 1}}</div>
          <div class="project__name">{{project.title}}</div>
          <router-link class="project__edit btn" :to="'portfolio/edit/' + project.id">
            <i class="far fa-edit"></i>
          </router-link>
          <button class="project__delete btn" @click="open(project.title,project.id)">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </transition-group>
      <transition
        enter-active-class="animate__animated animate__faster animate__flipInX"
        leave-active-class="animate__animated animate__faster animate__flipOutX"
      >
        <div class="modal" v-show="modal">
          <div class="modal__text">Вы Действительно хотите удалить Проект "{{title}}"?</div>
          <div class="modal__btns">
            <button class="modal__btn close" @click="modal = !modal">Отмена</button>
            <button class="modal__btn del" @click="deleteProject(id)">Удалить</button>
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
    projects() {
      return this.$store.getters["portfolio/projects"];
    }
  },
  methods: {
    open(title, id) {
      this.modal = !this.modal;
      this.title = title;
      this.id = id;
    },
    addProject() {
      this.$router.push("portfolio/add");
    },
    deleteProject(id) {
      this.$store.dispatch("portfolio/deleteProjectById", id).then(() => {
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
.projects__header {
  font-size: 2em;
  text-align: center;
}
.projects__add {
  outline: none;
  border: none;
  background: #4d6a00;
  color: #f2f2f2;
  font-size: 1.3em;
  padding: 1% 2%;
  cursor: pointer;
}
.projects__add:active {
  background: #415900;
}
.projects__list {
  margin-top: 1%;
  display: flex;
  flex-direction: column;
}
.projects__item {
  display: flex;
  justify-content: space-between;
}
.project {
  margin: 1%;
  font-size: 1.3em;
}
.project__id {
  font-weight: bold;
  width: 10%;
}
.project__name {
  text-align: center;
  width: 50%;
}
.project__edit {
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
</style>