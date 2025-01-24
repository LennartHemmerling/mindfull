import { createRouter, createWebHistory } from 'vue-router'

import StartScreenVue from '@/views/StartScreenVue.vue'
import HomeView from '@/views/HomeView.vue'
import NewItemView from '@/views/NewItemView.vue'
import EditItemView from '@/views/EditItemView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'start',
            component: StartScreenVue
        },
        {
            path: '/:source',
            name: 'home',
            component: HomeView
        },
        {
            path: '/add-item/:source',
            name: 'add-item',
            component: NewItemView
        },
        {
            path: '/edit-item/:source/:id',
            name: 'edit-item',
            component: EditItemView
        }
    ]
})

export default router
