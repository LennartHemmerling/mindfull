import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NewItemView from '@/views/NewItemView.vue'
import EditItemView from '@/views/EditItemView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/add-item',
            name: 'add-item',
            component: NewItemView
        },
        {
            path: '/edit-item:id',
            name: 'edit-item',
            component: EditItemView
        }
    ]
})

export default router
