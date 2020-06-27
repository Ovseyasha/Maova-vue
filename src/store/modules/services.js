import firebase, { storage } from 'firebase/app'
import store from '../index'
export default {
  namespaced: true,
  state: {
    services: [],
    service: null
  },
  getters: {
    services(state) {
      return state.services;
    },
    servicesName(state) {
      let arrName = [];
      for (let i = 0; i < state.services.length; i++) {
        arrName.push(state.services[i].title);
      }
      return arrName;
    },
    service(state) {
      return state.service;
    }
  },
  mutations: {
    addNewService(state, payload) {
      state.services.push(payload);
    },
    loadServices(state, payload) {
      state.services = payload;
    },
    loadServiceById(state, payload) {
      state.service = payload;
    }
  },
  actions: {
    async loadServices({ commit }) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        const services = await firebase.database().ref('services').once('value');
        const loadServices = services.val();
        // console.log(loadServices);
        const servicesArray = [];
        Object.keys(loadServices).forEach((key) => {
          const s = loadServices[key];
          servicesArray.push({
            ...s,
            id: key
          })
        });
        commit('loadServices', servicesArray);

        store.commit('common/setLoading', false)
      } catch (error) {
        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)

        throw error
      }
    },
    async addNewService({ commit }, payload) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        // здесь отправить на сервер
        // console.log(payload);
        let newService = payload.service;
        const service = await firebase.database().ref('services').push(newService);
        // console.log(service.key);

        let imageUrl;
        let key = service.key;
        const fileName = payload.img.name;
        const storages = await firebase.storage().ref('services/bg/' + key + '__' + fileName + '_').put(payload.img);

        imageUrl = await storages.ref.getDownloadURL();

        await firebase.database().ref('services').child(key).update({ img: imageUrl });

        newService.img = imageUrl;
        // done logic here
        commit('addNewService', {
          ...newService,
          id: service.key
        });

        store.commit('common/setLoading', false)
      } catch (error) {
        // error logic here

        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    },
    async editServices({ commit }, payload) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        // здесь отправить на сервер
        // console.log(payload);

        const id = payload.id;
        let newService = payload.service;
        if (typeof (payload.img) !== 'string') {
          const fileName = payload.img.name;
          const storages = await firebase.storage().ref('services/bg/' + id + '__' + fileName + '_').put(payload.img);

          let imageUrl = await storages.ref.getDownloadURL();



          newService.img = imageUrl;
        }



        await firebase.database().ref('services').child(id).update(newService);


        store.dispatch('services/loadServices');

        store.commit('common/setLoading', false)
      } catch (error) {
        // error logic here

        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    },

    async deleteServicesById({ commit }, payload) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        // здесь отправить на сервер
        const id = payload;
        await firebase.database().ref('services').child(id).remove();
        store.dispatch('services/loadServices');

        store.commit('common/setLoading', false)
      } catch (error) {
        // error logic here

        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    },
    async loadServiceById({ commit }, payload) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        // здесь отправить на сервер
        const id = payload;
        const service = await firebase.database().ref('services').child(id).once('value');
        const loadService = service.val();
        // console.log(loadService);

        commit('loadServiceById', loadService);


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