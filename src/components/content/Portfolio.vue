<template>
  <div class="projects">
    <div class="projects__header">Портфолио</div>
    <div class="projects__loading" v-show="loading">
      <i class="fas fa-spinner"></i>
    </div>

    <transition-group
      class="projects__items"
      enter-active-class="animate__fadeIn animate__animated animate__faster"
    >
      <!-- <project v-for="(project,index) in projects" :key="index" :project="project"></project> -->
      <router-link
        class="projects__item project"
        v-for="(project) in projects"
        :key="project.id"
        tag="a"
        :to="`portfolio/project/${project.id}`"
        :style="getBg(project.img)"
      >
        <div class="wrapper">
          <div class="project__title">{{project.title}}</div>
          <div class="project__sub-title">{{project.subTitle}}</div>
        </div>
        <div class="porject__blur"></div>
      </router-link>
    </transition-group>
  </div>
</template>

<script>
export default {
  computed: {
    projects() {
      return this.$store.getters["portfolio/projects"];
    },
    loading() {
      return this.$store.getters["common/loading"];
    }
  },
  methods: {
    getBg(img) {
      return {
        background:
          " url(" +
          img +
          "), url('" +
          require("@/assets/loading.gif") +
          "') no-repeat",
        backgroundSize: "100% 100%"
      };
    }
  }
};
</script>

<style scoped>
.projects {
  color: #000;
}

.projects__header {
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
.projects__loading {
  color: #4d6a00;
  position: absolute;
  animation-name: rotate;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  font-size: 8em;
  left: 45%;
  top: 40%;
}
.projects__items {
  overflow: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 77vh;
}
.projects__items::-webkit-scrollbar {
  width: 0px;
}
.projects__item {
  position: relative;
  flex-basis: 23%;
  height: 35vh;
  margin: auto;
  background: white;
  overflow: hidden; /* clearfix */
  margin: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}
.projects__item:hover .project__title {
  top: -50px;
}
.projects__item:hover .project__sub-title {
  opacity: 1;
}

.wrapper {
  width: 100%;
  z-index: 1;
}
.porject__blur {
  position: absolute;
  transition: 0.5s;
  background: #000;
  opacity: 0.4;
  height: 100%;
  width: 100%;
}
.project__title {
  width: 100%;
  color: white;
  text-align: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.4em;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  position: relative;
  transition: all 0.3s;
  top: 2em;
  /* top: -4em; */
}

.project__sub-title {
  width: 100%;
  color: white;
  text-align: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.2em;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.05em;
  opacity: 0;
  transition: opacity 0.5s;
}
@media (max-width: 1200px) {
  .service__cover {
    height: 30vh;
  }
  .page__header {
    font-size: 2.7em;
  }
  .page__description {
    max-width: 95%;
  }
  .steps__item {
    flex-basis: 46%;
  }
  .projects__item {
    flex-basis: 20%;
    height: 20vh;
  }
}
@media (max-width: 1200px) {
  .projects__item {
    flex-basis: 30%;
    height: 35vh;
  }
}
@media (max-width: 992px) {
  .projects__item {
    flex-basis: 48%;
    height: 35vh;
  }
}
@media (max-width: 768px) {
  .projects__item {
    flex-basis: 98%;
    height: 55vh;
  }
  .project__title {
    font-size: 1.8em;
  }
  .project__sub-title {
    font-size: 1.6em;
  }
}
@media (max-width: 576px) {
  .projects__item {
    flex-basis: 98%;
    height: 40vh;
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