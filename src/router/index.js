import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/Home.vue')
    },

    {
      path: '/favorites',
      name: 'Favorites',
      component: () => import('@/pages/Favorites.vue')
    },

    {
      path: '/cart',
      name: 'Drawer',
      component: () => import('@/pages/Drawer.vue')
    },

    {
      path: '/status',
      name: 'Status',
      component: () => import('@/components/Status.vue')
    },

    {
      path: '/product-card/:id',
      name: 'product-card',
      component: () => import('@/pages/Product.vue')
    }
  ],
  mode: 'history'
})

export default router
