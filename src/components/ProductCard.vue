<template>
    <a-card
            class="product-card"
            :title="product.name"
    >
        <div class="body">
            {{ product.price }} / {{ product.unit }}
        </div>
        <template slot="actions" class="ant-card-actions">
            <a-icon
                    key="shop"
                    type="plus"
                    @click="addToCart"
            />
        </template>
    </a-card>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {Emit, Prop} from "vue-property-decorator";
    import {Product} from "@/models/Product";

    @Component
    export default class ProductCard extends Vue {
        @Prop({
            type: Object, required: true, default: () => {
            }
        }) product!: Product

        @Emit('addToCart')
        addToCart(): Product {
            return this.product
        }
    }
</script>

<style scoped>
    .product-card {
        max-width: 500px;
        width: 100%;
        margin: 0 auto 5px auto;
    }
</style>