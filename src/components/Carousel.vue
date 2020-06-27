<template>
  <div class="wrapper">
    <div class="v-carousel__title">{{carousel_data[this.currentSlideIndex].title}}</div>
    <div class="v-carousel" :style="{'left': '-' + (100 * this.currentSlideIndex)  + '%'}">
      <img class="slide" v-for="(item,index) in carousel_data" :key="index" :src="item.img" alt />
    </div>
    <div class="wraper__btn" v-if="isNotEmpty">
      <button class="slider__btn btn__prev" @click="prevSlide"></button>
      <button class="slider__btn btn__next" @click="nextSlide"></button>
    </div>
  </div>
</template>
<script>
import vCarouselItem from "./Carousel-item";
export default {
  name: "v-carousel",
  props: {
    carousel_data: null,
    interval: {
      type: Number,
      default: () => 0
    }
  },
  mounted() {
    if (this.interval > 0) {
      setInterval(() => {
        this.nextSlide();
      }, this.interval * 1000);
    }
  },
  data() {
    return {
      currentSlideIndex: 0
    };
  },
  computed: {
    isNotEmpty() {
      if (this.carousel_data.length > 1) {
        return true;
      }
    }
  },
  methods: {
    prevSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--;
      } else {
        this.currentSlideIndex = this.carousel_data.length - 1;
      }
    },
    nextSlide() {
      if (this.carousel_data.length - 1 == this.currentSlideIndex) {
        this.currentSlideIndex = 0;
      } else {
        this.currentSlideIndex++;
      }
    }
  },
  components: {
    vCarouselItem
  }
};
</script>
<style  scoped>
.wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}
.v-carousel {
  width: 100%;
  transition: left ease-out 0.3s;
  display: flex;
  position: relative;
}
.v-carousel__title {
  font-family: Montserrat;
  font-style: italic;
  font-weight: medium;
  font-size: 1em;
  line-height: 17px;
  letter-spacing: 0.09em;
  margin-bottom: 1%;
  color: #4d6a00;
}
.slider__btn {
  position: absolute;
  top: -8em;
  font-size: 50px;
  opacity: 0.5;
  color: #acacac;
  border: none;
  outline: none;
  background: none;
  position: relative;
}
.slider__btn:hover {
  opacity: 1;
}
.wraper__btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 100px;
  height: 100px;
  z-index: 1;
}
.btn__prev {
  background: url("../assets/left.svg") no-repeat;
  transform: scale(1);
  height: 100px;
  width: 50px;

  left: 30px;
}
.btn__next {
  background: url("../assets/right.svg") no-repeat;
  transform: scale(1);
  /* height: 500px; */
  width: 50px;

  right: 0px;
}
.slide {
  max-width: 100%;
  height: auto;
}
@media (max-width: 1920px) {
  .wraper__btn {
    top: 50px;
  }
}
@media (max-width: 1400px) {
  .wraper__btn {
    top: 160px;
  }
}
@media (max-width: 1200px) {
  .wraper__btn {
    top: 100px;
  }
}
@media (max-width: 992px) {
  .wraper__btn {
    top: 160px;
  }
}
@media (max-width: 768px) {
  .wraper__btn {
    top: 200px;
  }
}
@media (max-width: 576px) {
  .wraper__btn {
    top: 250px;
  }
}
</style>