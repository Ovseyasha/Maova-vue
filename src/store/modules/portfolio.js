import firebase from 'firebase/app'
import store from '../index'
export default {
  namespaced: true,
  state: {
    projects: [],
    project: null
  },
  getters: {
    projects(state) {
      return state.projects;
    },
    project(state) {
      return state.project;
    }
  },
  mutations: {
    LoadProjects(state, payload) {
      state.projects = payload;
    },
    addNewService(state, payload) {
      state.projects.push(payload);
    },
    loadProjectById(state, payload) {
      state.project = payload;
    }
  },
  actions: {
    async LoadProjects({ commit }) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        const projects = await firebase.database().ref('projects').once('value');
        const loadProjects = projects.val();
        // console.log(loadServices);
        const projectsArray = [];
        Object.keys(loadProjects).forEach((key) => {
          const s = loadProjects[key];
          projectsArray.push({
            ...s,
            id: key
          })
        });
        commit('LoadProjects', projectsArray);

        store.commit('common/setLoading', false)
      } catch (error) {
        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    },
    async addNewPorject({ commit }, payload) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        // здесь отправить на сервер

        const newProject = payload.project;
        const project = await firebase.database().ref('projects').push(newProject);
        // ---------------------- BG -------------------------------------------

        let key = project.key;
        const fileName = payload.img.name;
        const storages = await firebase.storage().ref('projects/bg/' + key + '__' + fileName + '_').put(payload.img);

        let imageUrl = await storages.ref.getDownloadURL();

        await firebase.database().ref('projects').child(key).update({ img: imageUrl });
        // ---------------------- SLIDER -------------------------------------------
        for (let i = 0; i < newProject.imgs.length; i++) {
          if (typeof (newProject.imgs[i].img) !== 'string') {


            const slideName = newProject.imgs[i].img.name;
            const slideFile = newProject.imgs[i].img;
            const storagesSlide = await firebase.storage().ref('projects/slides/' + key + '__' + slideName + '_').put(slideFile);
            console.log('go?');
            let slideUrl = await storagesSlide.ref.getDownloadURL();
            console.log(slideUrl);

            let index = i;
            let title = newProject.imgs[i].title;
            await firebase.database().ref('projects/' + key + '/imgs/' + index).update({ img: slideUrl, title: title });
            console.log('await');
          }
        }
        // done logic here
        commit('addNewService', {
          ...newProject,
          id: project.key
        });

        store.commit('common/setLoading', false)
      } catch (error) {
        // error logic here

        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    },
    async editProject({ commit }, payload) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        // здесь отправить на сервер
        let newProject = payload.project;
        const id = payload.id;
        // ---------------------- BG -------------------------------------------
        if (typeof (payload.img) !== 'string') {
          const fileName = payload.img.name;
          const storages = await firebase.storage().ref('projects/bg/' + id + '__' + fileName).put(payload.img);
          let imageUrl = await storages.ref.getDownloadURL();
          newProject.img = imageUrl;
        }
        // ---------------------- SLIDER -------------------------------------------
        for (let i = 0; i < newProject.imgs.length; i++) {
          if (typeof (newProject.imgs[i].img) !== 'string') {
            let slideUrl;
            const slideName = newProject.imgs[i].img.name;
            const slideFile = newProject.imgs[i].img;
            const storagesSlide = await firebase.storage().ref('projects/slides/' + id + '__' + slideName + '_').put(slideFile);
            console.log('go?');
            slideUrl = await storagesSlide.ref.getDownloadURL();
            console.log(slideUrl);

            let index = i;
            let title = newProject.imgs[i].title;
            newProject.imgs[i].img = slideUrl;
            // await firebase.database().ref('projects/' + id + '/imgs/' + index).update({ img: slideUrl, title: title });
            console.log('await');
          }
        }

        await firebase.database().ref('projects').child(id).update(newProject);
        store.dispatch('portfolio/LoadProjects');

        store.commit('common/setLoading', false)
      } catch (error) {
        // error logic here

        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    },
    async deleteProjectById({ commit }, payload) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        // здесь отправить на сервер
        const id = payload;
        await firebase.database().ref('projects').child(id).remove();
        store.dispatch('portfolio/LoadProjects');

        store.commit('common/setLoading', false)
      } catch (error) {
        // error logic here

        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    },
    async loadProjectById({ commit }, payload) {
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        // здесь отправить на сервер
        const id = payload;
        const project = await firebase.database().ref('projects').child(id).once('value');
        const loadProject = project.val();

        commit('loadProjectById', loadProject);


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
