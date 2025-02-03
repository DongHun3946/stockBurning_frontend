import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '../pages/LoginPage.vue' 
import SignupPage from '../pages/SignupPage.vue'
import HomePage from '../pages/HomePage.vue'
import ModifyPage from '../pages/ModifyPage.vue'
import ModifyPwPage from '../pages/ModifyPwPage.vue';
import FindIdPage from '../pages/FindIdPage.vue';
import FindPwPage from '../pages/FindPwPage.vue';

const routes = [
  {
    path: '/',
    component: HomePage 
  },
  { 
    path: '/login', 
    component: LoginPage 
  },
  { 
    path: '/signup', 
    component: SignupPage 
  },
  {
    path: '/modify/info',
    component: ModifyPage
  },
  {
    path: '/modify/password',
    component: ModifyPwPage
  },
  {
    path: '/findid',
    component: FindIdPage
  },
  {
    path: '/findpw',
    component: FindPwPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
