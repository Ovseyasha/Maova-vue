<template>
  <div class="contacts">
    <a href="#" class="link-back" @click="$router.go(-1)">
      <i class="fas fa-arrow-circle-left"></i> Назад
    </a>
    <div class="contacts__header">Персональные данные</div>
    <p class="loading" v-show="loading">
      <i class="fas fa-spinner"></i>
    </p>
    <transition
      class="services__items"
      enter-active-class="animate__fadeIn animate__animated animate__faster"
    >
      <form class="contacts__form form" @submit.prevent v-show="!loading">
        <input type="email" class="form__input" placeholder="Ваш Email" v-model="contacts.email" />
        <input type="text" class="form__input" placeholder="Ваш Телефон" v-model="contacts.phone" />
        <!-- пофиксить и сделать input:file -->
        <!--  -->
        <!--  -->
        <!--  -->
        <!--  -->
        <!-- <input
          type="text"
          class="form__input"
          placeholder="Ссылка на прайс"
          v-model="contacts.price"
        />-->
        <input
          type="file"
          class="form__input_file"
          style="display: none"
          accept="application/pdf"
          ref="fileInput"
          @change="onfilePicked"
        />
        {{fileName}}
        <button @click="onPickFile" class="btn__skill">
          Обновить прайслист
          <i class="fas fa-arrow-circle-up"></i>
        </button>
        {{error}}
        <!--  -->
        <!--  -->
        <!--  -->
        <!--  -->
        <button type="submit" class="form__btn" @click="editContacts">Сохранить</button>
      </form>
    </transition>
    <div class="contacts__list list">
      <div class="list__header">Ваши письма</div>
      <div class="list__items">
        <transition-group
          enter-active-class="animate__animated animate__faster animate__fadeInRight"
          leave-active-class="animate__animated animate__faster animate__fadeOutRight"
        >
          <div class="list__item" v-for="mail in mails" :key="mail.id">
            <div class="list__name list__colums">{{mail.name}}</div>
            <a :href="'mailto:' + mail.email" class="list__email list__colums">{{mail.email}}</a>
            <router-link class="list__view list__colums" :to="'contacts/view/' + mail.id">
              <i class="far fa-eye"></i>
            </router-link>
            <button class="list__delete list__colums" @click="open(mail.id, mail.name)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </transition-group>
      </div>
    </div>
    <transition
      enter-active-class="animate__animated animate__faster animate__flipInX"
      leave-active-class="animate__animated animate__faster animate__flipOutX"
    >
      <div class="modal" v-show="modal">
        <div class="modal__text">Вы Действительно хотите удалить Письмо от "{{name}}"?</div>
        <div class="modal__btns">
          <button class="modal__btn close" @click="modal = !modal">Отмена</button>
          <button class="modal__btn del" @click="deleteMail(MailId)">Удалить</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contact: {
        email: "",
        phone: "",
        price: ""
      },
      modal: false,
      MailId: null,
      name: null,
      fileUrl: "",
      file: null,
      fileName: ""
    };
  },
  computed: {
    contacts() {
      let lContacts = this.$store.getters["contacts/contacts"];
      this.contact = lContacts;
      return this.contact;
    },
    mails() {
      return this.$store.getters["contacts/mails"];
    },
    loading() {
      return this.$store.getters["common/loading"];
    },
    error() {
      return this.$store.getters["common/error"];
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
      this.fileName = fileName;
      const fileReader = new FileReader();
      // fileReader.addEventListener("load", () => {
      //   this.fileUrl = fileReader.result;
      // });
      fileReader.readAsDataURL(files[0]);
      this.file = files[0];
    },
    editContacts() {
      let con = this.contacts;
      let file = this.file;
      if (con.price == "") {
        return;
      }
      this.$store.dispatch("contacts/editContacts", {
        contacts: con,
        price: file
      });
    },
    open(id, name) {
      this.modal = true;
      this.MailId = id;
      this.name = name;
    },
    deleteMail(id) {
      this.$store.dispatch("contacts/deleteMailById", id);
      this.modal = false;
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
  margin-right: 2%;
}
.contacts {
  display: flex;
  flex-direction: column;
}
.link-back {
  text-decoration: none;
  color: grey;
}
.contacts__form {
  display: flex;
  justify-content: center;
}
.contacts__header {
  /* margin: 2% 0; */
  padding-bottom: 1%;
  font-size: 1.3em;
  text-align: center;
}
.form {
}
.form__input {
  margin: 0 2%;
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
}
.form__btn {
  padding: 1% 2%;
  outline: none;
  border: none;
  font-size: 1em;
  cursor: pointer;
  background: #4d6a00;
  color: #f2f2f2;
}
.form__btn:active {
  background: #3f5600;
}
.contacts__list {
}
.list {
  display: flex;
  flex-direction: column;
}
.list__header {
  margin: 2% 0;
  padding-bottom: 1%;
  font-size: 2em;
  text-align: center;
  border-bottom: 2px solid grey;
}
.list__items {
  display: flex;
  flex-direction: column;
}
.list__item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2%;
}
.list__colums {
  flex-basis: 25%;
}
.list__name {
  font-weight: bold;
}
.list__email {
  font-style: italic;
  text-decoration: none;
  color: #4d6a00;
}
.list__view {
  font-size: 1.7em;
  color: #000;
}
.list__view:active {
  color: grey;
}
.list__delete {
  cursor: pointer;
  outline: none;
  border: none;
  background: none;
  font-size: 1.7em;
}
.list__delete:active {
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
.loading {
  color: #4d6a00;
  position: absolute;
  animation-name: rotate;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  font-size: 8em;
  left: 45%;
  top: 25%;
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