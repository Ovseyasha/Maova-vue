<template>
  <!-- доделать страницу с проектом -->

  <div class="project">
    <div class="project__header">
      <a href="#" class="link-back" @click="$router.go(-1)">
        <i class="fas fa-arrow-circle-left"></i> Назад
      </a>
    </div>
    <div class="project__content">
      <div class="project__slider">
        <carousel :carousel_data="project.imgs"></carousel>
      </div>
      <div class="project__text content">
        <div class="content__title">{{project.subTitle}}</div>
        <div class="content__about-of-company">
          <div class="content__header">Деятельность компании:</div>
          <div class="content__sub" v-for="(sub,index) in project.aboutCompany" :key="index">{{sub}}</div>
        </div>
        <div class="content__task">
          <div class="content__header">Задача:</div>
          <div class="content__sub" v-for="(sub,index) in project.task" :key="index">{{sub}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel";
export default {
  async beforeMount() {
    let id = this.$route.params.id;
    await this.$store.dispatch("portfolio/loadProjectById", id);
    this.project = await this.$store.getters["portfolio/project"];
  },
  data() {
    return {
      project: {}
    };
  },
  computed: {
    loading() {
      return this.$store.getters["common/loading"];
    }
  },
  components: { Carousel }
};
</script>

<style scoped>
.slider__title {
  font-family: Montserrat;
  font-style: italic;
  font-weight: normal;
  font-size: 1em;
  line-height: 17px;
  letter-spacing: 0.09em;
  margin-bottom: 1%;
  color: #4d6a00;
}

.project {
}
.project__header {
  margin-bottom: 1%;
}
.link-back {
  text-decoration: none;
  color: #a6a6a6;
}
.link-back:hover {
  color: #808080;
}
.project__content {
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: space-between;
}
.project__content::-webkit-scrollbar {
  width: 0px;
}
.project__slider {
  width: 300%;
}
.project__text {
}
.content {
  margin-top: 1%;
  margin-left: 1.5%;
}
.content__title {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.8em;
  line-height: 35px;
  text-transform: uppercase;
  color: #4d6a00;
  margin-bottom: 15%;
}
.content__header {
  margin-bottom: 2%;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.1em;
  line-height: 22px;
  color: #000000;
}
.content__about-of-company {
}
.content__sub {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.1em;
  line-height: 22px;
  color: #000000;
  margin-bottom: 10%;
}
.content__task {
}
@media (max-width: 1400px) {
  .project__content {
    margin-top: 15%;
  }
}
@media (max-width: 1200px) {
  .project__content {
    flex-wrap: wrap;
    margin-top: 5%;
    height: 70vh;
  }
  .project__slider {
    width: 100%;
  }
  .content__title {
    margin-bottom: 2%;
  }
  .content__header {
    margin-bottom: 1%;
  }
  .content__sub {
    margin-bottom: 2%;
  }
  .project__text {
    height: auto;
  }
}
@media (max-width: 992px) {
  .project__content {
    height: 100%;
  }
  .content__title {
    margin-top: -10%;
  }
}
@media (max-width: 768px) {
}
@media (max-width: 576px) {
  .content__title {
    margin-top: -20%;
  }
}
</style>