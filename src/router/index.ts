import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from '@/lib/supabaseInit'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/404' },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { restrictIfAuthorized: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { restrictIfAuthorized: true },
    },
    {
      path: '/workbox',
      name: 'workbox',
      component: () => import('../views/WorkBoxView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../views/PostsView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/UserSettingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/emailConfirmed',
      name: 'emailConfirmed',
      component: () => import('../views/EmailConfirmedView.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for the users, others won't
  if (to.meta.requiresAuth) {
    const isAuthorized = !!(await supabase.auth.getSession()).data.session
    // if the user is not logged in, redirect to the login page
    if (!isAuthorized) {
      return {
        path: '/login',
        query: {
          // we keep the current path in the query so we can redirect to it after login
          // with `router.push(route.query.redirect || '/')`
          redirect: to.fullPath,
        },
      }
    }
  }
  if (to.meta.restrictIfAuthorized) {
    const isAuthorized = !!(await supabase.auth.getSession()).data.session
    if (isAuthorized) router.push('/')
  }
})

export default router
