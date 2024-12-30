import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '../pages/LoginPage.vue' // 로그인 페이지 컴포넌트
import SignupPage from '../pages/SignupPage.vue'// 회원가입 페이지 컴포넌트
import HomePage from '../pages/HomePage.vue'; // 메인 페이지 컴포넌트

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
