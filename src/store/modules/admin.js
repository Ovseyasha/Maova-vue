import firebase from 'firebase/app'
import store from '../index'
export default {
  namespaced: true,
  state: {
    admin: null
  },
  getters: {
    admin(state) {
      return state.admin;
    },
    checkAdmin(state) {
      return state.admin !== null;
    }
  },
  mutations: {
    setAdmin(state, payload) {
      state.admin = payload;
    }
  },
  actions: {
    async login({ commit }, payload) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        const admin = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
        commit('setAdmin', { id: admin.user.uid });

        store.commit('common/setLoading', false)
      } catch (error) {
        // error logic here

        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    },
    loggedAdmin({ commit }, payload) {
      commit('setAdmin', { id: payload.uid });;
    },
    getAdmin() {
      const admin = firebase.auth().currentUser
      return admin ? admin.uid : false;
    },
    async logOut({ commit }) {
      await firebase.auth().signOut();
      commit('setAdmin', null);
    }
  }
}
