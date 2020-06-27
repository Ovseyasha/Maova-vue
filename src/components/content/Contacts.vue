<template>
  <div class="contacts">
    <div class="contacts__header">Контакты</div>

    <div class="contacts__main">
      <div class="contacts__links">
        <div class="contacts__link link">
          <div class="link__header">Позвоните мне:</div>
          <div class="contacts__loading" v-show="loading">
            <i class="fas fa-spinner"></i>
          </div>
          <a :href="'tel:' + contacts.phone" class="link__item">{{contacts.phone}}</a>
        </div>
        <div class="contacts__link link">
          <div class="link__header">Напишите мне:</div>
          <div class="contacts__loading" v-show="loading">
            <i class="fas fa-spinner"></i>
          </div>
          <a :href="'mailto:' + contacts.email" class="link__item">{{contacts.email}}</a>
        </div>
        <div class="contacts__link link">
          <div class="link__header">Я в социальных сетях</div>
          <div class="link__items">
            <a href="#" class="link__item">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="link__item">
              <i class="fab fa-behance"></i>
            </a>
            <a href="#" class="link__item">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <a :href="contacts.price" class="btn" target="_blank">скачать прайс</a>
      </div>
      <div class="contacts__form">
        <form class="form" @submit.prevent>
          <textarea
            class="form__textarea"
            placeholder="Задача"
            v-model.trim="$v.task.$model"
            :class="{'form__textarea_error': $v.task.$error && $v.task.required,  'form__textarea_success' : !$v.task.$error && $v.task.required}"
          ></textarea>
          <div class="form__inputs">
            <input
              type="text"
              placeholder="Имя"
              class="form__input"
              v-model.trim="$v.name.$model"
              :class="{'form__input_error': $v.name.$error && $v.name.required, 'form__input_success' : !$v.name.$error && $v.name.required}"
            />
            <input
              type="text"
              placeholder="Телефон"
              class="form__input"
              v-model.trim="$v.phone.$model"
              :class="{'form__input_error': $v.phone.$error && $v.phone.required, 'form__input_success' : !$v.phone.$error && $v.phone.required}"
            />
            <input
              type="email"
              placeholder="E-mail"
              class="form__input"
              v-model.trim="$v.email.$model"
              :class="{'form__input_error': $v.email.$error && $v.email.required, 'form__input_success' : !$v.email.$error && $v.email.required}"
            />
          </div>
          <transition
            class="services__items"
            enter-active-class="animate__fadeIn animate__animated animate__faster"
          >
            <span class="form__msg" v-show="showMsg">Письммо отправленно! Скоро мы вам ответим</span>
          </transition>
          <button type="submit" class="form__btn" @click="send">
            отправить
            <i class="form__loading fas fa-spinner" v-show="sendLoading"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, numeric } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      task: "",
      name: "",
      phone: "",
      email: "",
      sendLoading: false,
      showMsg: false
    };
  },
  validations: {
    task: {
      required,
      minLength: minLength(8)
    },
    name: {
      required,
      minLength: minLength(2)
    },
    phone: {
      required,
      numeric,
      minLength: minLength(11)
    },
    email: {
      required,
      email
    }
  },
  computed: {
    contacts() {
      return this.$store.getters["contacts/contacts"];
    },
    loading() {
      return this.$store.getters["common/loading"];
    }
  },
  methods: {
    send() {
      if (
        !this.$v.task.$error &&
        this.$v.task.required &&
        !this.$v.name.$error &&
        this.$v.name.required &&
        !this.$v.phone.$error &&
        this.$v.phone.required &&
        !this.$v.email.$error &&
        this.$v.email.required
      ) {
        this.sendLoading = true;
        this.$store
          .dispatch("contacts/addMail", {
            name: this.name,
            email: this.email,
            phone: this.phone,
            task: this.task
          })
          .then(() => {
            this.sendLoading = false;
            this.showMsg = true;
          });
        this.task = "";
        this.name = "";
        this.phone = "";
        this.email = "";
      } else {
        // вывод всех ошибок
        console.log("erroro");
      }
    }
  }
};
</script>

<style scoped>
.contacts {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.contacts__header {
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
.contacts__main {
  overflow: auto;
  margin-top: 6%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: 65vh;
}
.contacts__main::-webkit-scrollbar {
  width: 0px;
}
.contacts__loading {
  color: #4d6a00;
  position: absolute;
  animation-name: rotate;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  font-size: 2em;
  left: 10%;
  margin-top: 1%;
}
.contacts__links {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-weight: 35%;
  flex-basis: 30%;
  /* height: 100vh; */
}
.contacts__link {
}
.link {
}
.link__header {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 1.2em;
  line-height: 27px;
  /* identical to box height */

  /* letter-spacing: 0.09em; */

  color: #4f4f4f;
}
.link__items {
  display: flex;
  justify-content: space-between;
}
.link__item {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 2em;
  line-height: 44px;
  /* identical to box height */

  letter-spacing: 0.09em;

  color: #4d6a00;
  text-decoration: none;
}

.btn {
  font-size: 1.2em;
  background: none;
  color: #4d6a00;
  outline: none;
  border: 1px solid #4d6a00;
  /* padding: 8% 25%; */
  transition: all 0.3s;
  text-decoration: none;
  padding: 5% 18%;
}
.btn:hover {
  background: #4d6a00;
  color: #f2f2f2;
}
.contacts__form {
  flex-basis: 70%;
}
.form {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.form__textarea {
  padding: 2%;
  resize: none;
  outline: none;
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
  height: 40vh;
  margin-bottom: 2%;
}

/* .form__textarea:focus {
  border: 1px solid #4d6a00;
} */
.form__textarea_error {
  border: 1px solid #f57f6c;
}
.form__textarea_success {
  border: 1px solid #a0c601;
}
.form__inputs {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.form__input {
  outline: none;
  /* flex-basis: 30%; */
  /* margin: 1%; */
  padding: 1%;
  background: #f5f5f5;
  border: 1px solid #959595;
  box-sizing: border-box;
  font-family: Montserrat;
  font-style: italic;
  font-weight: normal;
  font-size: 1em;
  line-height: 22px;
  /* identical to box height */
  flex-basis: 32%;
  letter-spacing: 0.09em;
  margin-bottom: 2%;
}

/* .form__input:focus {
  border: 1px solid #4d6a00;
} */
.form__input_error {
  border: 1px solid #f57f6c;
}
.form__input_success {
  border: 1px solid #a0c601;
}
.form__btn {
  outline: none;
  align-self: flex-end;
  background: #000;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.2em;
  line-height: 22px;
  /* identical to box height */

  text-align: center;
  letter-spacing: 0.09em;
  text-transform: lowercase;
  border: none;
  /* Gray 6 */

  color: #f2f2f2;
  background: #4d6a00;

  padding: 2% 9%;
  cursor: pointer;
  transition: all 0.3s;
}
.form__btn:active {
  background: #2c3b01;
}
.form__loading {
  /* color: #4d6a00; */
  /* position: absolute; */
  animation-name: rotate;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.form__msg {
  font-size: 1.3em;
  position: relative;
  top: 40px;
  left: 40px;
}
@media (max-width: 1200px) {
  .contacts__links {
    flex-basis: 100%;
    margin: 0 auto;
    margin-bottom: 2%;
    align-items: center;
  }
  .btn {
    padding: 2% 8%;
  }
  .contacts__form {
    flex-basis: 100%;
    width: 100%;
  }
  .form__inputs {
    justify-content: center;
  }
  .form__input {
    flex-basis: 100%;
  }
}
@media (max-width: 992px) {
}
@media (max-width: 768px) {
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