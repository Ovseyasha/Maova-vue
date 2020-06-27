<template>
  <div class="ad">
    <a href="#" class="link-back" @click="$router.go(-1)">
      <i class="fas fa-arrow-circle-left"></i> Назад
    </a>
    <p class="loading" v-show="loading">
      <i class="fas fa-spinner"></i>
    </p>
    <div class="ad__header">Редактирование Услуги</div>
    <transition
      class="services__items"
      enter-active-class="animate__fadeIn animate__animated animate__faster"
    >
      <form @submit.prevent class="add" v-show="!loading">
        <input
          type="text"
          class="add__title add__input"
          placeholder="Название"
          v-model="service.title"
        />
        <div class="add__subs">
          <button class="add__btn add__btn_add" @click="addDescSub">
            <i class="fas fa-plus-square"></i> Добавить абзац
          </button>
          <!-- вывод циклом абзацы -->
          <transition-group
            enter-active-class="animate__animated animate__faster animate__fadeInRight"
            leave-active-class="animate__animated animate__faster animate__fadeOutRight"
          >
            <div class="add__sub sub" v-for="(sub, index) in service.description" :key="index">
              <div class="sub__num">{{index + 1}}</div>
              <textarea
                class="sub__text add__input"
                placeholder="Новый абзац"
                v-model="service.description[index]"
              ></textarea>
              <button class="add__btn add__btn_delete" @click="deleteDescSub(index)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </transition-group>
        </div>
        <div class="add__img">
          <hr />
          <div class="add__header-img">Обложка</div>
          <img :src="imageUrl == ''? service.img : imageUrl" height="180px" />
          <input
            type="file"
            class="form__input_file"
            style="display: none"
            accept="image/*"
            ref="fileInput"
            @change="onfilePicked"
          />
          <button @click="onPickFile" class="btn__skill">
            Выбрать Картинку
            <i class="fas fa-arrow-circle-up"></i>
          </button>
        </div>
        <div class="add__steps steps">
          <hr />
          <div class="steps__header">Этапы работы</div>
          <button class="add__btn add__btn_add" @click="addStep">
            <i class="fas fa-plus-square"></i> Добавить
          </button>
          <div class="steps__items">
            <!-- Вывести циклом -->
            <transition-group
              enter-active-class="animate__animated animate__faster animate__fadeInRight"
              leave-active-class="animate__animated animate__faster animate__fadeOutRight"
            >
              <div class="steps__item" v-for="(step,index) in service.steps" :key="index">
                <div class="steps__num">{{index + 1}}</div>
                <textarea
                  class="steps__title add__input"
                  placeholder="Заголовок"
                  v-model="service.steps[index].title"
                ></textarea>
                <textarea
                  class="steps__desc add__input"
                  placeholder="Описание"
                  v-model="service.steps[index].description"
                ></textarea>
                <button class="add__btn add__btn_delete" @click="deleteStep(index)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </transition-group>
          </div>
        </div>
        <div class="add__date">
          <div class="add__date-header">Срок выполнения:</div>
          <input
            type="text"
            class="add__new-date add__input"
            placeholder="Пример: Срок выполнения от 25 дней"
            v-model="service.date"
          />
        </div>
        <button class="add__btn add__btn_save" @click="send">Сохранить</button>
      </form>
    </transition>
  </div>
</template>

<script>
export default {
  beforeMount() {
    let id = this.$route.params.id;
    this.$store.dispatch("services/loadServiceById", id).then(() => {
      let loadService = this.$store.getters["services/service"];

      this.service.title = loadService.title;
      this.service.description = loadService.description;
      this.service.img = loadService.img;
      this.service.steps = loadService.steps;
      this.service.date = loadService.date;
      this.serviceId = id;
    });
  },
  data() {
    return {
      imageUrl: "",
      image: null,
      service: {
        title: "",
        description: [""],
        img: "",
        steps: [
          {
            title: "",
            description: ""
          }
        ],
        date: ""
      },
      serviceId: null
    };
  },
  computed: {
    loading() {
      return this.$store.getters["common/loading"];
    }
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onfilePicked(event) {
      const files = event.target.files;
      let fileName = files[0].name;
      if (fileName.lastIndexOf(".") <= 0) {
        return alert("please add a avild file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
    addDescSub() {
      this.service.description.push("");
    },
    deleteDescSub(index) {
      this.service.description.splice(index, 1);
    },
    addStep() {
      this.service.steps.push({
        title: "",
        description: ""
      });
    },
    deleteStep(index) {
      this.service.steps.splice(index, 1);
    },
    send() {
      if (this.image == null) {
        // return alert("you not change img");
        this.image = this.service.img;
      }
      this.$store.dispatch("services/editServices", {
        service: this.service,
        id: this.serviceId,
        img: this.image
      });
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.btn__skill {
  /* margin-top: 10%; */
  background: #4d6a00;
  outline: none;
  border: none;
  padding: 1% 2%;
  color: #f2f2f2;
  cursor: pointer;
  font-size: 1.2em;
}
.ad {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.add {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.link-back {
  text-decoration: none;
  color: grey;
  align-self: start;
}
.ad__header {
  font-size: 2em;
  text-align: center;
  margin-bottom: 1%;
}
.ad__header_id {
  font-size: 0.5em;
}
.add__input {
  font-family: Montserrat;
  font-style: italic;
  font-weight: normal;
  font-size: 1em;
  line-height: 22px;
  /* identical to box height */

  letter-spacing: 0.09em;
  padding: 0.5%;
  background: #f5f5f5;
  border: 1px solid #959595;
  box-sizing: border-box;
  outline: none;
  resize: vertical;
  margin: 1%;
}
.add__title {
}
.add__btn {
  margin: 1%;
  padding: 1% 2%;
  outline: none;
  border: none;
  font-size: 1em;
  cursor: pointer;
}
.add__btn_add {
  background: #4d6a00;
  color: #f2f2f2;
}
.add__btn_add:active {
  background: #3f5600;
}
.add__btn_delete {
  color: #4f4f4f;
  background: none;
  box-sizing: border-box;
  font-size: 1.7em;
}
.add__btn_delete:active {
  color: grey;
}
.add__btn_save {
  background: #4d6a00;
  color: #f2f2f2;
  width: 25%;
  align-self: center;
}
.add__btn_save:active {
  background: #3f5600;
}
.add__sub {
  display: flex;
  justify-content: space-between;

  align-items: center;
}
.sub {
}
.sub__num {
  font-weight: bold;
}
.sub__text {
  width: 90%;
}
.sub__delete {
}
.add__header-img {
  margin-top: 2%;
  margin-bottom: 2%;
}
.add__img {
}
.add__img-view {
}
.add__img-add {
}
.add__steps {
}
.steps {
  display: flex;
  flex-direction: column;
}
.steps__header {
  display: flex;
}
.steps__add {
}
.steps__items {
}
.steps__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.steps__num {
  font-weight: bold;
}
.steps__title {
}
.steps__desc {
}
.steps__delete {
}
.add__date {
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
}
.add__new-date {
}
.add__btn {
}
.loading {
  color: #4d6a00;
  position: absolute;
  animation-name: rotate;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  font-size: 8em;
  left: 45%;
  /* top: 700%; */
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