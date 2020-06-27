<template>
  <div class="about">
    <div class="about__header">Обо мне</div>
    <div class="ab">
      <div class="about__loading" v-show="loading">
        <i class="fas fa-spinner"></i>
      </div>
      <template v-if="!loading">
        <div class="about__description description">
          <img :src="img" alt="avatar" class="description__img description__item" />
          <span class="description__text description__item">
            <p class="description__sub" v-for="(sub,index) in about" :key="index">{{sub}}</p>
          </span>
        </div>
        <div class="about__skills skills">
          <div class="skills__header">Основные инструменты которые я использую в работе</div>
          <div class="skills__items">
            <div class="skills__item skill" v-for="skill in skills" :key="skill.title">
              <img :src="skill.img" alt class="skill__img" />
              <div class="skill__title">{{ skill.title }}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    img() {
      return this.$store.getters["about/img"];
    },
    skills() {
      return this.$store.getters["about/skills"];
    },
    about() {
      return this.$store.getters["about/about"];
    },
    loading() {
      return this.$store.getters["common/loading"];
    }
  }
};
</script>

<style scoped>
.about {
  color: #000000;
}
.about__loading {
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
.about__header {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 2.5em;
  line-height: 37px;
  /* identical to box height */
  text-align: center;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  margin-bottom: 2%;
}
.ab {
  overflow: auto;
  height: 77vh;
}
.ab::-webkit-scrollbar {
  width: 0px;
}
.about__description {
}
.description {
}

.description__img {
  float: left;
  margin-right: 2%;
  margin-bottom: 2%;
}
.description__text {
  /* float: left; */
}
.description__sub {
  /* float: left; */
  margin: 0 0 1% 0;
  padding: 0;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.2em;
  line-height: 22px;
  letter-spacing: 0.05em;
}
.about__skills {
}
.skills {
  margin-top: 6%;
}
.skills__header {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.2em;
  line-height: 22px;
  /* identical to box height */
  letter-spacing: 0.09em;
  color: #4f4f4f;
  border-bottom: 2px solid #c4c4c4;
  margin-bottom: 1%;
  padding-bottom: 0.5%;
}
.skills__items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.skills__item {
  flex-basis: 5%;
  margin: 2%;
}

@media (max-width: 1200px) {
  /* .description__item {
    flex-basis: 100%;
    margin: 0;
  } */
}
@media (max-width: 992px) {
  .skills__item {
    flex-basis: 15%;
    margin-bottom: 2%;
  }
  .skill__img {
    width: 80%;
  }
}
@media (max-width: 768px) {
  .skills__item {
    flex-basis: 20%;
    margin-bottom: 2%;
  }
}
@media (max-width: 576px) {
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