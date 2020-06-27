<template>
  <div class="content">
    <div class="wrapper">
      <transition
        mode="out-in"
        class="block"
        enter-active-class="animate__animated animate__slideInRight animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <router-view class="content__page"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.content {
  background: linear-gradient(
      180deg,
      rgba(196, 196, 196, 0.3) 0%,
      rgba(196, 196, 196, 0.3) 100%
    ),
    url("../assets/bg2.jpg") no-repeat center center fixed;
  background-size: cover;
  background-blend-mode: normal, multiply;
  height: 100vh;
  font-size: 14px;
  position: relative;
}

.content__page {
  margin-top: 6%;
}
.wrapper {
  margin: 0 10% 0 10%;
  /* position: relative; */
}

@media (max-width: 1200px) {
  .content {
    top: 2%;
  }
  .content::-webkit-scrollbar {
    width: 0px;
  }
}
@media (max-width: 992px) {
}
@media (max-width: 768px) {
  .content {
    top: 4%;
  }
}
@media (max-width: 576px) {
  .content {
    top: 6%;
  }
}
</style>