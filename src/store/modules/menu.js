export default {
  namespaced: true,
  state: {
    list: [
      {
        title: 'Обо мне',
        link: '/content/about'
      },
      {
        title: 'Услуги',
        link: '/content/services'
      },
      {
        title: 'Портфолио',
        link: '/content/portfolio'
      },
      {
        title: 'Контакты',
        link: '/content/contacts'
      },
    ],
    adminList: [
      {
        title: 'Обо мне',
        link: '/admin/about'
      },
      {
        title: 'Услуги',
        link: '/admin/services'
      },
      {
        title: 'Портфолио',
        link: '/admin/portfolio'
      },
      {
        title: 'Контакты',
        link: '/admin/contacts'
      },
    ]
  },
  getters: {
    list(state) {
      return state.list;
    },
    adminList(state) {
      return state.adminList;
    }
  },
  mutations: {

  },
  actions: {

  }
}