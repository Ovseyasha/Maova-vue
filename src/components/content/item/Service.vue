<template>
  <div class="service">
    <!-- добавить бг в ковер -->

    <div class="service__cover" @click="open" :style="getBg">
      <div class="blur"></div>
      <div class="service__header">{{service.title}}</div>
    </div>

    <transition
      class="fixxx"
      enter-active-class="animate__animated animate__faster animate__fadeInLeft"
      leave-active-class="animate__animated animate__faster animate__fadeOutRight"
    >
      <div class="sevice__full-page page" v-if="fullPage">
        <div class="wrapper">
          <img src="@/assets/close.svg" alt class="page__close" @click="open" />
          <div class="page__header">{{ service.title }}</div>
          <div class="page__description">
            <!-- циклом вывести абзацы -->
            <p class="page__sub" v-for="(sub,index) in service.description" :key="index">{{ sub }}</p>
          </div>
          <div class="page__steps steps">
            <div class="steps__header">Этапы работы</div>
            <div class="steps__items">
              <div class="steps__item step" v-for="(step,index) in service.steps" :key="index">
                <div class="wrapper_desc">
                  <div class="step__title">{{step.title}}</div>
                  <div class="step__description">{{step.description}}</div>
                </div>
                <div class="wrapper_num">
                  <div class="step__number">{{index + 1}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="page__date">{{service.date}}</div>
          <div class="page__hr"></div>
          <div class="page__projects projects">
            <div class="projects__header">Проекты</div>
            <div class="projects__items">
              <!-- циклом вывести проекты у котрых данная услуга -->
              <router-link
                class="projects__item"
                v-for="project in projects"
                :key="project.id"
                :to="'/content/portfolio/project/' + project.id"
                :style="{ background: 'url(' + project.img + ') no-repeat' , backgroundSize: '100% 100%' }"
              >
                <div class="projects__title">{{project.title}}</div>
                <div class="projects__short-desc">{{project.subTitle}}</div>
                <div class="projects__blur"></div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["service"],
  data() {
    return {
      fullPage: false
    };
  },
  computed: {
    projects() {
      // заменить на диспатч из бд с сортировкой по категории услуги
      let allProjects = this.$store.getters["portfolio/projects"];
      let service = this.service.title;
      let projects = allProjects.filter(item => {
        return item.nameOfService == service;
      });
      return projects;
    },
    getBg() {
      return {
        background:
          " url(" +
          this.service.img +
          "), url('" +
          require("@/assets/loading.gif") +
          "') no-repeat",
        backgroundSize: "100% 100%"
      };
    }
  },
  methods: {
    open() {
      this.fullPage = !this.fullPage;
    }
  }
};
</script>

<style scoped>
.service {
}

.service__cover {
  height: 35vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7em;
  /* text */
  cursor: pointer;
  color: white;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.4em;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  position: relative;
  /* background: red; */
  animation: gradient 0.5s ease infinite;
}
.service__cover:hover .blur {
  opacity: 0;
}
.service__cover:hover .service__header {
  opacity: 0;
}

.service__header {
  transition: 0.5s;
  z-index: 1;
}
.blur {
  transition: 0.5s;
  position: absolute;
  background: #000;
  opacity: 0.4;
  height: 100%;
  width: 100%;
}
.sevice__full-page {
  z-index: 200;
  overflow: auto;
  background: white;
  position: absolute;
  top: 13%;
  left: 10%;
  /* top: 0;
  left: 0; */
  height: 83vh;
  width: 80vw;
}
.sevice__full-page::-webkit-scrollbar {
  width: 0px;
}
.page {
}
.wrapper {
  margin: 2% 5%;
  display: flex;
  flex-direction: column;
}
.page__close {
  cursor: pointer;
  align-self: flex-end;
}
.page__header {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 3em;
  line-height: 44px;
  /* identical to box height */
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: #4d6a00;
  margin-bottom: 2%;
}
.page__description {
  max-width: 75%;
}
.page__sub {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.3em;
  line-height: 22px;
  letter-spacing: 0.05em;

  color: #000000;
}
.page__steps {
}
.steps {
  display: flex;
  flex-direction: column;
}
.steps__header {
  align-self: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5em;
  line-height: 22px;
  /* identical to box height */

  letter-spacing: 0.09em;

  color: #4f4f4f;
  margin-top: 2%;
  margin-bottom: 1%;
}
.steps__items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.steps__item {
  margin: 1%;
  flex-basis: 23%;
}

.step {
  position: relative;
  font-family: Montserrat;
  font-style: normal;
  font-size: 1em;
  line-height: 20px;
  /* or 129% */
  letter-spacing: 0.09em;
  color: #000000;
  /* margin: 0.5%; */
}
.wrapper_desc {
  position: relative;
  z-index: 2;
}
.step__title {
  font-weight: 600;
  margin-bottom: 5%;
  min-height: 30px;
}
.step__description {
  /* z-index: 2; */
}
.wrapper_num {
  position: absolute;
  left: 50%;
  top: 50%;
}
.step__number {
  /* z-index: 1; */
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 10em;
  line-height: 15px;
  /* or 10% */
  letter-spacing: 0.09em;

  color: #e5e5e5;
}
.page__date {
  align-self: flex-end;
  font-family: Montserrat;
  font-style: italic;
  font-weight: normal;
  font-size: 1em;
  line-height: 17px;
  /* identical to box height */

  letter-spacing: 0.09em;
  margin-top: 1%;
  color: #4d6a00;
}
.page__hr {
  margin-top: 4%;
  background: #4d6a00;
  height: 2px;
  /* margin: 0 10% 0 10%; */
}
.page__projects {
}
.projects {
}
.projects__header {
  margin-top: 2%;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 30px;
  line-height: 37px;
  /* identical to box height */

  text-align: center;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  margin-bottom: 2%;
}
.projects__items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.projects__item {
  text-decoration: none;
  color: white;
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1%;
  margin: 1%;
  background: gray;
  height: 25vh;
  position: relative;
}
.projects__item:hover .projects__title {
  top: -10%;
}
.projects__item:hover .projects__short-desc {
  opacity: 1;
}

.projects__blur {
  position: absolute;
  transition: 0.5s;
  background: #000;
  opacity: 0.4;
  height: 100%;
  width: 100%;
}
.projects__title {
  position: relative;
  top: 10%;
  transition: all 0.3s;
  z-index: 1;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1em;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}
.projects__short-desc {
  z-index: 1;
  text-align: center;
  transition: all 0.3s;
  opacity: 0;

  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 0.9em;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.05em;
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
@media (max-width: 992px) {
  .service__cover {
    height: 35vh;
  }
  .projects__item {
    flex-basis: 45%;
    height: 30vh;
  }
}
@media (max-width: 768px) {
  .service__cover {
    height: 30vh;
  }
  .steps__item {
    flex-basis: 98%;
    margin-bottom: 10%;
  }
  .page__header {
    font-size: 2.3em;
  }
  .projects__item {
    flex-basis: 98%;
    height: 45vh;
  }
  .projects__title {
    font-size: 1.8em;
  }
  .projects__short-desc {
    font-size: 1.7em;
  }
}
@media (max-width: 576px) {
  .service__cover {
    height: 40vh;
  }
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>