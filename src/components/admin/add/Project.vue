<template>
  <div class="ad">
    <a href="#" class="link-back" @click="$router.go(-1)">
      <i class="fas fa-arrow-circle-left"></i> Назад
    </a>
    <div class="ad__header">Добавление Проекта</div>
    <form @submit.prevent class="add">
      <input
        type="text"
        class="add__title add__input"
        placeholder="Название"
        v-model="project.title"
      />
      <input
        type="text"
        class="add__title add__input"
        placeholder="Краткое описание"
        v-model="project.subTitle"
      />
      <div class="add__img">
        <hr />
        <div class="add__header-img">Обложка</div>
        <img :src="imageUrl == ''? require('@/assets/default.jpg') : imageUrl" height="180px" />
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
      <div class="add__imgs imgs">
        <hr />
        <p class="imgs__header">Добавление фото</p>
        <div class="imgs__add">
          <input type="text" class="add__input" placeholder="Название" v-model="slideTitle" />
          <input
            type="file"
            class="form__input_file"
            style="display: none"
            accept="image/*"
            ref="fileInputSlide"
            @change="onfilePickedSlide"
          />
          <span>{{name}}</span>
          <button @click="onPickFileSlide" class="btn__skill">
            Выбрать фото
            <i class="fas fa-arrow-circle-up"></i>
          </button>
          <button class="add__btn add__btn_add" @click="addImgs">
            <i class="fas fa-plus-square"></i> Добавить
          </button>
        </div>
        <div class="imgs__items">
          <transition-group
            enter-active-class="animate__animated animate__faster animate__fadeInRight"
            leave-active-class="animate__animated animate__faster animate__fadeOutRight"
          >
            <div class="imgs__item" v-for="(slide,index) in project.imgs" :key="index">
              <template v-if="slide.img !== ''">
                <img :src="slide.url" alt class="imgs__img" />
                <div class="imgs__title">{{slide.title}}</div>
                <button class="add__btn add__btn_delete" @click="deleteSlide(index)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </template>
            </div>
          </transition-group>
        </div>
      </div>
      <div class="add__subs">
        <b>О компании</b>
        <button class="add__btn add__btn_add" @click="addAboutComp">
          <i class="fas fa-plus-square"></i> Добавить абзац
        </button>
        <!-- вывод циклом абзацы -->
        <transition-group
          enter-active-class="animate__animated animate__faster animate__fadeInRight"
          leave-active-class="animate__animated animate__faster animate__fadeOutRight"
        >
          <div class="add__sub sub" v-for="(sub, index) in project.aboutCompany" :key="index">
            <div class="sub__num">{{index + 1}}</div>
            <textarea
              class="sub__text add__input"
              placeholder="Новый абзац"
              v-model="project.aboutCompany[index]"
            ></textarea>
            <button class="add__btn add__btn_delete" @click="deleteAboutComp(index)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </transition-group>
      </div>
      <div class="add__subs">
        <b>Задачи</b>
        <button class="add__btn add__btn_add" @click="addTask">
          <i class="fas fa-plus-square"></i> Добавить абзац
        </button>
        <!-- вывод циклом абзацы -->
        <transition-group
          enter-active-class="animate__animated animate__faster animate__fadeInRight"
          leave-active-class="animate__animated animate__faster animate__fadeOutRight"
        >
          <div class="add__sub sub" v-for="(sub, index) in project.task" :key="index">
            <div class="sub__num">{{index + 1}}</div>
            <textarea
              class="sub__text add__input"
              placeholder="Новый абзац"
              v-model="project.task[index]"
            ></textarea>
            <button class="add__btn add__btn_delete" @click="deleteTask(index)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </transition-group>
      </div>
      <div class="add__category">
        <label for="category" class="add__header">Выберите предоставленную услугу:</label>
        <select id="category" class="category" v-model="project.nameOfService">
          <option class="category__item" v-for="(name,index) in category" :key="index">{{name}}</option>
        </select>
      </div>
      <button class="add__btn add__btn_save" @click="send">Сохранить</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      imageUrl: "",
      image: null,
      slideTitle: "",
      slideUrl: "",
      slideImg: null,
      project: {
        title: "",
        subTitle: "",
        img: "",
        imgs: [],
        aboutCompany: [""],
        task: [""],
        nameOfService: ""
      }
    };
  },
  computed: {
    category() {
      return this.$store.getters["services/servicesName"];
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
    // ------------------------------------------------
    onPickFileSlide() {
      this.$refs.fileInputSlide.click();
    },
    onfilePickedSlide(event) {
      const files = event.target.files;
      let fileName = files[0].name;
      this.name = fileName;
      if (fileName.lastIndexOf(".") <= 0) {
        return alert("please add a avild file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.slideUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.slideImg = files[0];
    },
    addImgs() {
      this.project.imgs.push({
        title: this.slideTitle,
        url: this.slideUrl,
        img: this.slideImg
      });
      this.slideTitle = "";
      this.slideUrl = "";
      this.name = "";
    },
    deleteSlide(index) {
      this.project.imgs.splice(index, 1);
    },
    addAboutComp() {
      this.project.aboutCompany.push("");
    },
    deleteAboutComp(index) {
      this.project.aboutCompany.splice(index, 1);
    },
    addTask() {
      this.project.task.push("");
    },
    deleteTask(index) {
      this.project.task.splice(index, 1);
    },
    send() {
      if (this.image == null) {
        return alert("you not change img");
      }
      for (let i = 0; i < this.project.imgs.length; i++) {
        this.project.imgs[i].url = "";
      }
      this.$store.dispatch("portfolio/addNewPorject", {
        project: this.project,
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
/*  */
.add__imgs {
}
.imgs {
  display: flex;
  flex-direction: column;
  width: 200px;
}
.imgs__header {
}
.imgs__add {
}
.imgs__url {
}
.add__input {
}
.imgs__title {
  font-size: 0.8em;
}

.imgs__item {
  margin-top: 2%;
  display: flex;
  flex-direction: column;
}
.imgs__items {
  display: flex;
}
.imgs__img {
  width: 200px;
}
.add__category {
  display: flex;
  flex-direction: column;
  margin-top: 2%;
  margin-bottom: 2%;
}
.add__header {
  font-weight: bold;
}
.category {
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
.category__item {
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
  margin: 2%;
}
</style>