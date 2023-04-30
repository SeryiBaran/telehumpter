import { createRouter, createWebHashHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/404', name: 'NotFound', component: () => import('../views/NotFoundView.vue') },
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
      path: '/settings',
      name: 'settings',
      component: () => import('../views/UserSettingsView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for the users, others won't
  if (to.meta.requiresAuth) {
    const auth = getAuth()
    const currentUser = auth.currentUser
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
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
    const auth = getAuth()
    const currentUser = auth.currentUser
    if (currentUser)
      router.push('/')
  }
})

export default router
