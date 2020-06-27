<template>
  <div class="in">
    <form @submit.prevent class="login">
      <input
        class="login__input email"
        type="email"
        placeholder="email"
        v-model.trim="$v.email.$model"
        :class="{'login__input_error': $v.email.$error && $v.email.required, 'login__input_success' : !$v.email.$error && $v.email.required}"
      />
      <input
        class="login__input pas"
        type="password"
        placeholder="Пароль"
        v-model.trim="$v.pas.$model"
        :class="{'login__input_error': $v.pas.$error && $v.pas.required, 'login__input_success' : !$v.pas.$error && $v.pas.required}"
      />
      <button type="submit" class="login__btn" @click="send">
        Войти
        <i class="login__loading fas fa-spinner" v-show="loading"></i>
      </button>
      <div class="login__errors">
        <!-- циклом выводить ошибки -->
        <div class="login__error">{{errors}}</div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      pas: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    pas: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    loading() {
      return this.$store.getters["common/loading"];
    },
    errors() {
      return this.$store.getters["common/error"];
    }
  },
  methods: {
    send() {
      if (
        !this.$v.pas.$error &&
        this.$v.pas.required &&
        !this.$v.email.$error &&
        this.$v.email.required
      ) {
        // диспач на сервер
        const admin = {
          email: this.email,
          password: this.pas
        };
        this.$store
          .dispatch("admin/login", admin)
          .then(() => {
            this.$router.push("/admin/menu");
          })
          .catch(err => {
            this.error == err;
          });
      } else {
        // вывод всех ошибок
        console.log("erroro");
      }
    }
  }
};
</script>

<style scoped>
.in {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  display: flex;
  flex-direction: column;
  width: 25%;
}
.login__input {
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

  padding: 2% 5%;
  margin-bottom: 5%;
  outline: none;
}
.login__input_error {
  border: 1px solid #f57f6c;
}
.login__input_success {
  border: 1px solid #a0c601;
}
.email {
}
.pas {
}
.login__btn {
  cursor: pointer;
  border: none;
  outline: none;
  background: #4d6a00;
  padding: 2%;
  width: 50%;
  align-self: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1em;
  line-height: 22px;
  /* identical to box height */

  letter-spacing: 0.09em;
  text-transform: lowercase;

  /* Gray 6 */

  color: #f2f2f2;
}
.login__btn:active {
  color: #000;
}
.login__loading {
  /* transition: all 0.3s; */
  animation-name: rotate;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.login__errors {
}
.login__error {
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