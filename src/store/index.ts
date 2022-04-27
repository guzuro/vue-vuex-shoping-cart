import Vue from 'vue'
import Vuex from 'vuex'
import {Product} from "@/models/Product";

Vue.use(Vuex)

type RootState = {
    products: Array<Product>
    cart: Array<{ id: number, quantity: number }>
}

export default new Vuex.Store<RootState>({
    state: {
        products: [
            {
                id: Math.random(),
                name: "Апельсины",
                price: 145.74,
                unit: "kg"
            },
            {
                id: Math.random(),
                name: "Мандарины",
                price: 111.98,
                unit: "kg"
            },
            {
                id: Math.random(),
                name: "Яблоки",
                price: 87.00,
                unit: "kg"
            },
            {
                id: Math.random(),
                name: "Бананы",
                price: 97.14,
                unit: "kg"
            }
        ],
        cart: []
    },
    getters: {
        productsList: (state): Array<Product> => state.products,
        cartTotalQuantity: (state): number => state.cart.length,
        cartLines: (state): Array<{ product: Product | undefined, quantity: number }> => {
            return state.cart.map(({id, quantity}) => {
                const product = state.products.find(product => product.id === id)

                return {
                    product,
                    quantity
                }
            })
        }

    },
    mutations: {
        CLEAR_CART: (state) => {
            state.cart = []
        },
        UPDATE_CART: (state, product: Product) => {
            const productInCart = state.cart.find(value => product.id === value.id)
            if (productInCart) {
                productInCart.quantity++
            } else {
                state.cart.push({
                    id: product.id,
                    quantity: 1
                })
            }
        },
        UPDATE_CART_LINE_QUANTITY: (state, payload: { quantity: number, product: Product }) => {
            const productInCart = state.cart.find(value => payload.product.id === value.id)
            if (payload.quantity === 0) {
                state.cart = state.cart.filter(value => value.id !== payload.product.id)
            } else {
                if (productInCart) {
                    productInCart.quantity = payload.quantity
                }
            }
        }

    },
    actions: {
        ADD_PRODUCT_TO_CART: ({commit}, product: Product) => {
            commit('UPDATE_CART', product)
        },
    },
    modules: {}
})
