import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { RoutesPaths } from './routes'
import { supabase } from '@/lib/supabaseInit'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: RoutesPaths.NOT_FOUND,
      name: 'NOT_FOUND',
      component: () => import('../views/NotFoundView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/404' },
    {
      path: RoutesPaths.HOME,
      name: 'HOME',
      component: HomeView,
    },
    {
      path: RoutesPaths.REGISTER,
      name: 'REGISTER',
      component: () => import('../views/RegisterView.vue'),
      meta: { restrictIfAuthorized: true },
    },
    {
      path: RoutesPaths.LOGIN,
      name: 'LOGIN',
      component: () => import('../views/LoginView.vue'),
      meta: { restrictIfAuthorized: true },
    },
    {
      path: RoutesPaths.WORKBOX,
      name: 'WORKBOX',
      component: () => import('../views/WorkBoxView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: RoutesPaths.POSTS,
      name: 'POSTS',
      component: () => import('../views/PostsView.vue'),
    },
    {
      path: RoutesPaths.SETTINGS,
      name: 'SETTINGS',
      component: () => import('../views/UserSettingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: RoutesPaths.EMAIL_CONFIRMED,
      name: 'EMAIL_CONFIRMED',
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
        path: RoutesPaths.LOGIN,
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
    if (isAuthorized) router.push(RoutesPaths.HOME)
  }
})

export default router
