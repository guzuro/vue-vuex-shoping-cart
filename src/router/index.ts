import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Catalog',
        component: () => import("@/views/catalog.vue")
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import("@/views/cart.vue")
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
