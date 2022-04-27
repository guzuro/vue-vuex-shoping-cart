<template>
    <div class="catalog">
        <a-row
                type="flex"
                :gutter="16"
        >
            <a-col v-for="(product, _) in products"
                   class="gutter-row"
                   :key="product.id"
                   :xs="24"
                   :md="8"
            >
                <product-card
                        :product="product"
                        @addToCart="addToCart"
                />
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue';
    import {Product} from "@/models/Product";
    import ProductCard from "@/components/ProductCard.vue";

    @Component({
        components: {ProductCard}
    })
    export default class Catalog extends Vue {

        get products(): Array<Product> {
            return this.$store.getters.productsList
        }

        addToCart(product: Product): void {
            this.$store.dispatch('ADD_PRODUCT_TO_CART', product)
                .then(() => this.$message.success(`${product.name} добавлен в корзину`))
                .catch(this.$message.error)
        }

    }
</script>

<style scoped>
    .catalog {
        padding: 0 10px;
    }
</style>