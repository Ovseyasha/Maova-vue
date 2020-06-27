import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Content from '@/components/Content'
import About from '@/components/content/About'
import Services from '@/components/content/Services'
import Portfolio from '@/components/content/Portfolio'
import Project from '@/components/content/Project'
import Contacts from '@/components/content/Contacts'
// adminPanel
import Admin from '@/components/admin/Admin'
import AdminMenu from '@/components/admin/Menu'
import AdminLogin from '@/components/admin/Login'
import AdminAbout from '@/components/admin/About'

import AdminServices from '@/components/admin/Services'
import AdminServiceAdd from '@/components/admin/add/Service'
import AdminServiceEdit from '@/components/admin/edit/Service'

import AdminPortfolio from '@/components/admin/Portfolio'
import AdminPortfolioAdd from '@/components/admin/add/Project'
import AdminPortfolioEdit from '@/components/admin/edit/Project'

import AdminContacts from '@/components/admin/Contacts'
import AdminContactsView from '@/components/admin/Mail'


// 404
import Error404 from '@/components/Error'
// store
import store from '@/store/index'
import admin from '../store/modules/admin'
Vue.use(Router)

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
      "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/content',
      name: 'Content',
      component: Content,
      children: [
        {
          path: 'about',
          component: About
        },
        {
          path: 'services',
          component: Services
        },
        {
          path: 'portfolio',
          component: Portfolio
        },
        {
          path: 'portfolio/project/:id',
          component: Project
        },
        {
          path: 'contacts',
          component: Contacts
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      redirect: '/admin/login',

      children: [
        {
          path: 'login',
          component: AdminLogin,

        },
        {
          path: 'menu',
          component: AdminMenu,
          beforeEnter(to, from, next) {
            console.log();
            store.dispatch('admin/getAdmin').then((res) => {


              if (res !== false) {
                next();
              } else {
                next('/admin/login');
              }
            }).catch(e => {

            })
          },
        },
        {
          path: 'about',
          component: AdminAbout,
          beforeEnter(to, from, next) {
            console.log();
            store.dispatch('admin/getAdmin').then((res) => {


              if (res !== false) {
                next();
              } else {
                next('/admin/login');
              }
            }).catch(e => {

            })
          },
        },
        {
          path: 'services',
          component: AdminServices,
          beforeEnter(to, from, next) {
            console.log();
            store.dispatch('admin/getAdmin').then((res) => {


              if (res !== false) {
                next();
              } else {
                next('/admin/login');
              }
            }).catch(e => {

            })
          },
        },
        {
          path: 'services/add',
          component: AdminServiceAdd,
          beforeEnter(to, from, next) {
            console.log();
            store.dispatch('admin/getAdmin').then((res) => {


              if (res !== false) {
                next();
              } else {
                next('/admin/login');
              }
            }).catch(e => {

            })
          },
        },
        {
          path: 'services/edit/:id',
          component: AdminServiceEdit,
          beforeEnter(to, from, next) {
            console.log();
            store.dispatch('admin/getAdmin').then((res) => {


              if (res !== false) {
                next();
              } else {
                next('/admin/login');
              }
            }).catch(e => {

            })
          },
        },
        {
          path: 'portfolio',
          component: AdminPortfolio,
          beforeEnter(to, from, next) {
            console.log();
            store.dispatch('admin/getAdmin').then((res) => {


              if (res !== false) {
                next();
              } else {
                next('/admin/login');
              }
            }).catch(e => {

            })
          },
        },
        {
          path: 'portfolio/add',
          component: AdminPortfolioAdd,
          beforeEnter(to, from, next) {
            console.log();
            store.dispatch('admin/getAdmin').then((res) => {


              if (res !== false) {
                next();
              } else {
                next('/admin/login');
              }
            }).catch(e => {

            })
          },
        },
        {
          path: 'portfolio/edit/:id',
          component: AdminPortfolioEdit,
          beforeEnter(to, from, next) {
            console.log();
            store.dispatch('admin/getAdmin').then((res) => {


              if (res !== false) {
                next();
              } else {
                next('/admin/login');
              }
            }).catch(e => {

            })
          },
        },
        {
          path: 'contacts',
          component: AdminContacts,
          beforeEnter(to, from, next) {
            console.log();
            store.dispatch('admin/getAdmin').then((res) => {


              if (res !== false) {
                next();
              } else {
                next('/admin/login');
              }
            }).catch(e => {

            })
          },
        },
        {
          path: 'contacts/view/:id',
          component: AdminContactsView,
          beforeEnter(to, from, next) {
            console.log();
            store.dispatch('admin/getAdmin').then((res) => {


              if (res !== false) {
                next();
              } else {
                next('/admin/login');
              }
            }).catch(e => {

            })
          },
        },
        {
          path: 'login',
          component: AdminLogin,

        },
      ]
    },
    {
      path: '*',
      component: Error404
    }
  ],
  mode: 'history'
})
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}