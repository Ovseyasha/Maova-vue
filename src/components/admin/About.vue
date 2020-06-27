<template>
  <div class="about">
    <a href="#" class="link-back" @click="$router.go(-1)">
      <i class="fas fa-arrow-circle-left"></i> Назад
    </a>
    {{image}}
    <div class="about__header">Страница Обо мне</div>
    <div class="about__container">
      <div class="about__form">
        <div class="avatar__wrapper">
          <img :src="img" class="form__avatar" height="400px" v-show="imageUrl == ''" />
          <img :src="imageUrl" class="form__avatar" height="400px" v-show="imageUrl !== ''" />
          <input
            type="file"
            class="form__input_file"
            style="display: none"
            accept="image/*"
            ref="fileInput"
            @change="onfilePicked"
          />
          <button @click="onPickFile" class="btn__avatar">
            Изменить фото
            <i class="fas fa-arrow-circle-up"></i>
          </button>
        </div>
        <div class="form__subs">
          <!-- циклом вывести абзацы -->
          <transition-group
            enter-active-class="animate__animated animate__faster animate__fadeInUp"
            leave-active-class="animate__animated animate__faster animate__fadeOutDown"
          >
            <div class="form__sub sub" v-for="(sub,index) in about" :key="index">
              <button class="sub__number">{{index + 1}}</button>
              <textarea class="sub__text" v-model="newAbout[index]"></textarea>
              <button class="sub_delete" @click="deleteSub(index)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </transition-group>

          <div class="form__btns">
            <button class="form__btn add" @click="addSub">
              <i class="fas fa-plus-square"></i> Добавить
            </button>
          </div>
        </div>
      </div>
      <div class="about__skills skills">
        <div class="skills__header">Добавить инструменты</div>
        <div class="skills__add">
          <img :src="skillImgUrl" width="40px" />
          <input type="text" class="skills__new-title" placeholder="Название" v-model="nameSkill" />
          <input
            type="file"
            class="form__input_file"
            style="display: none"
            accept="image/*"
            ref="fileInputSkill"
            @change="onfilePickedSkill"
          />
          <button @click="onPickFileSkill" class="btn__skill">
            Выбрать значек фото
            <i class="fas fa-arrow-circle-up"></i>
          </button>
          <button class="form__btn add" @click="addSkill">
            <i class="fas fa-plus-square"></i> Добавить
          </button>
        </div>
        <hr />
        <transition-group
          class="skills__items"
          enter-active-class="animate__animated animate__faster animate__fadeInRight"
          leave-active-class="animate__animated animate__faster animate__fadeOutRight"
        >
          <!-- Вывести циклом скилы -->
          <div class="skills__item" v-for="(skill,index) in skills" :key="index">
            <img :src="skill.img" class="skills__img" v-if="typeof(skill.img) == 'string'" />
            <img :src="skill.url" class="skills__img" v-else />
            <div class="skills__title">{{skill.title}}</div>
            <button class="skills__delete" @click="deleteSkill(index)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </transition-group>

        <button class="about__save-all" @click="saveAs">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      image: null,
      skillImgUrl: "",
      skillImg: null,
      newAbout: [],
      newSkills: [],
      nameSkill: "",
      urlSkill: ""
    };
  },
  computed: {
    img() {
      return this.$store.getters["about/img"];
    },
    about() {
      this.newAbout = this.$store.getters["about/about"];
      return this.newAbout;
    },
    skills() {
      this.newSkills = this.$store.getters["about/skills"];
      return this.newSkills;
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
    // ------------------------------------------------------------
    onPickFileSkill() {
      this.$refs.fileInputSkill.click();
    },
    onfilePickedSkill(event) {
      const files = event.target.files;
      let fileName = files[0].name;
      if (fileName.lastIndexOf(".") <= 0) {
        return alert("please add a avild file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.skillImgUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.skillImg = files[0];
    },
    addSub() {
      this.newAbout.push("");
    },
    deleteSub(index) {
      this.newAbout.splice(index, 1);
    },
    addSkill() {
      let name = this.nameSkill;
      let imgUrl = this.skillImgUrl;
      let img = this.skillImg;
      this.newSkills.push({
        url: imgUrl,
        img: img,
        title: name
      });
      this.nameSkill = "";
      this.skillImgUrl = "";
      this.skillImg = null;
    },
    deleteSkill(index) {
      this.newSkills.splice(index, 1);
    },
    saveAs() {
      let ab = this.newAbout;
      let skls = this.newSkills;
      let ig = this.image == null ? this.img : this.image;
      for (let i = 0; i < skls.length; i++) {
        skls[i].url = "";
      }
      this.$store.dispatch("about/saveAs", {
        // потом заменить на нормальную загрузку изображения
        img: ig,
        about: ab,
        skills: skls
      });
    }
  }
};
</script>

<style scoped>
.about {
}
.link-back {
  text-decoration: none;
  color: grey;
}
.btn__avatar {
  margin-top: 10%;
  background: #4d6a00;
  outline: none;
  border: none;
  padding: 4% 2%;
  color: #f2f2f2;
  cursor: pointer;
  font-size: 1.2em;
}
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
.about__header {
  text-align: center;
  font-size: 2em;
}
.about__container {
  display: flex;
  flex-direction: column;
}
.about__form {
  display: flex;
  width: 100%;
}

.about__save-all {
  width: 15%;
  align-self: center;
  margin-top: 2%;
  outline: none;
  border: none;
  background: #4d6a00;
  color: #f2f2f2;
  font-size: 1.3em;
  padding: 1% 2%;
  cursor: pointer;
}
.about__save-all:active {
  background: #415900;
}
.avatar__wrapper {
  display: flex;
  flex-direction: column;
}
.form__avatar {
}
.form__label {
  margin-top: 1%;
}
input[type="file"] {
  background: none;
}
.form__subs {
  display: flex;
  flex-direction: column;
  flex-basis: 79%;
  height: 100%;
}

.form__sub {
}
.sub {
  display: flex;
  margin: 1%;
}
.sub__number {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1%;
  font-weight: bold;
  outline: none;
  border: none;
  background: none;
  font-size: 1.2em;
}
.sub__text {
  outline: #4d6a00;
  background: #f5f5f5;
  border: 1px solid #959595;
  box-sizing: border-box;
  font-family: Montserrat;
  font-style: italic;
  font-weight: normal;
  font-size: 1em;
  line-height: 22px;
  /* identical to box height */
  letter-spacing: 0.09em;

  resize: vertical;
  width: 100%;
  min-height: 60px;
  padding: 1%;
}
.sub_delete {
  cursor: pointer;
  border: none;
  background: none;
  font-size: 1.4em;
  outline: none;
  margin-left: 1%;
}
.sub_delete:active {
  color: rgb(90, 90, 90);
}

.form__btns {
  display: flex;
  justify-content: space-evenly;
}
.form__btn {
}
.add {
  outline: none;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 1.3em;
}
.save {
  background: #4d6a00;
  border: none;
  outline: none;
  padding: 1% 2%;
  color: #f2f2f2;
  cursor: pointer;
  font-size: 1.2em;
}
.save:active {
  background: #465f00;
}
.add:active {
  color: rgb(90, 90, 90);
}
.about__skills {
  display: flex;
  flex-direction: column;
}
.skills {
}
.skills__header {
}
.skills__add {
  margin-bottom: 2%;
  display: flex;

  align-items: center;
}
.skills__new-title {
  margin: 0 2%;
  outline: #4d6a00;
  background: #f5f5f5;
  border: 1px solid #959595;
  box-sizing: border-box;
  font-family: Montserrat;
  font-style: italic;
  font-weight: normal;
  font-size: 1em;
  line-height: 22px;
  /* identical to box height */
  letter-spacing: 0.09em;

  padding: 0.5%;
}
.skills__add-img {
}
.skills__add-btn {
  background: #4d6a00;
  outline: none;
  border: none;
  padding: 1% 2%;
  color: #f2f2f2;
  cursor: pointer;
  font-size: 1.2em;
}
.skills__add-btn:active {
  background: #465f00;
}
.skills__items {
  display: flex;
  justify-content: space-between;
}
.skills__item {
  max-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.skills__img {
}
.skills__title {
  text-align: center;
  margin-top: 5%;
  margin-bottom: 5%;
}
.skills__delete {
  cursor: pointer;
  border: none;
  background: none;
  font-size: 1.4em;
  outline: none;
  margin-left: 1%;
}
.skills__delete:active {
  color: rgb(90, 90, 90);
}
</style>