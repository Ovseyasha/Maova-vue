import firebase from 'firebase/app'
import store from '../index'
export default {
  namespaced: true,
  state: {
    contacts: [],
    mails: [],
    mail: {}
  },
  getters: {
    contacts(state) {
      return state.contacts;
    },
    mails(state) {
      return state.mails;
    },
    mail(state) {
      return state.mail;
    }
  },
  mutations: {
    loadContacts(state, payload) {
      state.contacts = payload;
    },
    loadMails(state, payload) {
      state.mails = payload;
    },
    addMail(state, payload) {
      state.mails.push(payload);
    },
    getMailById(state, payload) {
      state.mail = payload;
    }
  },
  actions: {
    async loadContacts({ commit }) {
      const id = '-MANQPK_xhzGbZt821xh';
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        const contacts = await firebase.database().ref('contacts').once('value');
        const loadContacts = contacts.val();

        commit('loadContacts', loadContacts[id]);

        store.commit('common/setLoading', false)
      } catch (error) {
        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    },
    async editContacts({ commit }, payload) {
      const id = '-MANQPK_xhzGbZt821xh';
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        // здесь отправить на сервер
        const newContacts = payload.contacts;

        if (payload.price !== null) {
          console.log(payload.price);

          const fileName = payload.price.name;
          const storages = await firebase.storage().ref('contacts/price/' + id + '__' + fileName).put(payload.price)
          let fileUrl = await storages.ref.getDownloadURL();
          payload.contacts.price = fileUrl;
        }
        await firebase.database().ref('contacts').child(id).update(newContacts);
        store.dispatch('contacts/loadContacts');

        store.commit('common/setLoading', false)
      } catch (error) {
        // error logic here

        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    },
    // MAILS
    async loadMails({ commit }) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        const mails = await firebase.database().ref('mails').once('value');
        const loadMails = mails.val();
        // console.log(loadServices);
        const mailsArr = [];
        Object.keys(loadMails).forEach((key) => {
          const s = loadMails[key];
          mailsArr.push({
            ...s,
            id: key
          })
        });
        commit('loadMails', mailsArr);

        store.commit('common/setLoading', false)
      } catch (error) {
        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    },
    async addMail({ commit }, payload) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        // здесь отправить на сервер
        // console.log(payload);
        const newMail = payload;
        const mails = await firebase.database().ref('mails').push(newMail);
        // console.log(service.key);

        // done logic here
        commit('addMail', {
          ...newMail,
          id: mails.key
        });

        store.commit('common/setLoading', false)
      } catch (error) {
        // error logic here

        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    },
    async deleteMailById({ commit }, payload) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        // здесь отправить на сервер
        const id = payload;
        await firebase.database().ref('mails').child(id).remove();
        store.dispatch('contacts/loadMails');

        store.commit('common/setLoading', false)
      } catch (error) {
        // error logic here

        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    },
    async getMailById({ commit }, payload) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        // здесь отправить на сервер
        const id = payload;
        const mail = await firebase.database().ref('mails').child(id).once('value');
        // console.log(mail.val());
        commit('getMailById', mail.val());

        store.commit('common/setLoading', false)
      } catch (error) {
        // error logic here

        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    }
  }
}
