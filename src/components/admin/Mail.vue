<template>
  <div class="mail">
    <div class="mail__header">Просмотр письма</div>
    <div class="mail__info">
      <div class="mail__txt">Имя: {{mail.name}}</div>
      <a :href="'mailto:' + mail.email" class="mail__txt">Почта: {{mail.email}}</a>
      <a :href="'tel:' + mail.phone" class="mail__txt">Телефон: {{mail.phone}}</a>
    </div>
    <div class="mail__task">
      Задача:
      <br />
      {{mail.task}}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    mail() {
      let id = this.$route.params.id;
      this.$store.dispatch("contacts/getMailById", id);
      return this.$store.getters["contacts/mail"];
    }
  }
};
</script>

<style scoped>
.mail {
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mail__header {
  text-align: center;
  font-size: 2em;
  margin-bottom: 2%;
}
.mail__info {
  font-size: 1.2em;
  width: 50%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 2%;
  margin-bottom: 3%;
  border-bottom: 1px solid #4d6a00;
}
.mail__txt {
  color: #000;
  text-decoration: none;
}
a.mail__txt {
  color: #4d6a00;
}
.mail__task {
  font-size: 1.3em;
}
</style>