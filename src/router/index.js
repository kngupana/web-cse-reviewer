import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/auth/system/DashboardView.vue'
import { getUserInformation, isAuthenticated } from '@/utils/supabase'
import ForbiddenView from '@/views/errors/ForbiddenView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'
import UploadReviewerView from '@/views/auth/system/UploadReviewerView.vue'
import AccountSettingsView from '@/views/auth/system/AccountSettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Auth Pages
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false },
    },

    // System Pages
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/upload',
      name: 'uploadrivewer',
      component: UploadReviewerView,
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: AccountSettingsView,
      meta: { requiresAuth: true, isDefault: true }
    },

    // Error Pages
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView,
    },
    {
      path: '/:catchAll(.*)',
      component: NotFoundView,
    },
  ],
})

router.beforeEach(async (to) => {
  const isLoggedIn = await isAuthenticated()

  //Redirect to appropriate page if accessing home route
  if (to.name === 'home') {
    return isLoggedIn ? { name: 'dashboard' } : { name: 'login' }
  }

  //If logged in, prevent access to login or register pages
  if (isLoggedIn && !to.meta.requiresAuth) {
    //redirect the user to the dashboard page
    return { name: 'dashboard' }
  }

  // If not logged in , prevent access to system pages
  if (!isLoggedIn && to.meta.requiresAuth) {
    //redirect the user to the login page
    return { name: 'login' }
  }

  //Check if the user is logged in
  if (isLoggedIn) {
    //Retrieve information
    const userMetadata = await getUserInformation()
    // Get the user_metadata
    const isAdmin = userMetadata.is_admin

    //remove this comment if not need;Boolean Approach
    //const isCashier = userMetadata.is_cashier
    //remove this comment if not need; String Approach
    //const isCashier =userMetadata.role === 'Cashier'

    // Restrict access to admin-only routes
    if (!isAdmin && to.meta.requiresAdmin) {
      return { name: 'forbidden' }
    }
  }
})

export default router
