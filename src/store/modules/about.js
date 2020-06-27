import firebase, { storage } from 'firebase/app'
import store from '../index'
export default {
  namespaced: true,
  state: {
    about: {}
  },
  getters: {
    img(state) {
      return state.about.img;
    },
    skills(state) {
      return state.about.skills;
    },
    about(state) {
      return state.about.about;
    }
  },
  mutations: {
    loadAbout(state, payload) {
      state.about = payload;
    },
    saveAs(state, payload) {
      console.log(payload);

      state.about = payload;
    }
  },
  actions: {
    // -MA0mY_wLX4ydQIAna1e

    async saveAs({ commit }, payload) {
      const id = '-MA0mY_wLX4ydQIAna1e';
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        // done logic here
        const newAbout = {
          // img: payload.img,
          about: payload.about,
          skills: payload.skills
        };
        // ------------------ AVATAR ---------------------------------------------------------------------
        if (typeof (payload.img) !== 'string') {
          let imageUrl;
          let key;

          const data = await firebase.database().ref('about').child(id).update(newAbout);
          key = id;
          const fileName = payload.img.name;
          const ext = fileName.slice(fileName.lastIndexOf('.'));
          const storages = await firebase.storage().ref('about/avatar/' + key + '.' + ext).put(payload.img);

          imageUrl = await storages.ref.getDownloadURL();

          await firebase.database().ref('about').child(key).update({ img: imageUrl });
        }

        // ------------------ SKILLLS ---------------------------------------------------------------------
        for (let i = 0; i < payload.skills.length; i++) {
          if (typeof (payload.skills[i].img) !== 'string') {
            let skillUrl;
            let key = id;
            console.log(payload.skills);

            const skillName = payload.skills[i].img.name;
            // const skilExt = skillName.slice(skillName.lastIndexOf('.'));
            const sklsFile = payload.skills[i].img;
            const storagesSkill = await firebase.storage().ref('about/skills/' + key + '__' + skillName + '_').put(sklsFile);
            console.log('go?');
            skillUrl = await storagesSkill.ref.getDownloadURL();
            let index = i;
            let title = payload.skills[i].title;
            await firebase.database().ref('about/' + id + '/skills/' + index).update({ img: skillUrl, title: title });
            console.log('await');
          } else {
            await firebase.database().ref('about/' + id).update({ skills: payload.skills });
          }

        }

        store.dispatch('about/loadAbout');

        store.commit('common/setLoading', false)
      } catch (error) {
        // error logic here

        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)
        throw error
      }
    },
    async loadAbout({ commit }, payload) {
      const id = '-MA0mY_wLX4ydQIAna1e';
      store.commit('common/clearError')
      store.commit('common/setLoading', true)
      try {
        // done logic here
        const about = await firebase.database().ref('about').once('value');
        const loadAbout = about.val();
        commit('loadAbout', loadAbout[id]);

        store.commit('common/setLoading', false)
      } catch (error) {
        // error logic here

        store.commit('common/setLoading', false)
        store.commit('common/setError', error.message)

        throw error
      }
    },
  }
}