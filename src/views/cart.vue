<template>
    <a-spin :spinning="spinner">
        <div class="cart">
            <h1>Корзина</h1>
            <a-list
                    item-layout="horizontal"
                    :data-source="cartProducts"
            >
                <a-list-item
                        slot="renderItem"
                        slot-scope="item, index"
                        class="cart"
                >
                    <div class="cart-data">
                        <div class="cart-header">
                            <div class="cart-name">
                                {{ item.product.name }}

                            </div>
                            <div class="cart-price">
                                {{ item.product.price }} / {{ item.product.unit }}
                            </div>
                        </div>
                        <div class="cart-info">
                            <a-input-number
                                    id="inputNumber"
                                    v-model="item.quantity"
                                    :min="0"
                                    @change="(value) => onChange(value, item)"
                            />
                        </div>
                    </div>
                </a-list-item>
            </a-list>
            <div class="total">
                <p>
                    <b>Тотал:</b> {{ total }}
                </p>
                <a-button
                        :disabled="!cartProducts.length"
                        @click="doPayment"
                >
                    Заказать
                </a-button>
            </div>
        </div>
    </a-spin>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from "vue-class-component";
    import {Product} from "@/models/Product";

    @Component
    export default class Cart extends Vue {

        spinner = false

        get total(): number {
            const result = this.cartProducts.reduce((accumulator, p) => {
                return (accumulator + p.product.price * p.quantity)
            }, 0)
            return +result.toFixed(2)
        }

        get cartProducts(): Array<{ product: Product, quantity: number }> {
            return this.$store.getters.cartLines
        }

        doPayment(): void {
            this.spinner = true

            this.$notification.open({
                message: 'Успешно',
                description:
                    'Ващ заказ успешно сформирован! Вы будите перенаправлены в каталог...',
                duration: 2.5
            });

            setTimeout(() => {
                this.$store.commit('CLEAR_CART')
                this.$router.push({name: "Catalog"})
            }, 3000)
        }

        onChange(value: number, line: { quantity: number, product: Product }): void {
            this.$store.commit('UPDATE_CART_LINE_QUANTITY', line)
        }
    }
</script>

<style scoped>
    .cart-data {
        width: 100%;
        padding: 0px 25px;
        display: flex;
        justify-content: space-between;
    }

    .total {
        width: 100%;
        text-align: right;
        font-size: 1.2rem;
    }
</style>