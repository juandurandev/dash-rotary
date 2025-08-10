<template>
    <div class="bg-white shadow rounded-lg p-6 mb-6">
        <div class="flex justify-between items-center mb-6">
            <h2      class="text-lg font-medium text-gray-900">
                Productos {{ products.length }} encontrados
            </h2>
        </div>

        <div v-if="products" class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="product in products" :key="product.id"
                class="bg-white border border-gray-200 rounded-4xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div class="aspect-square bg-gray-100 flex items-center justify-center p-4">
                    <img :src="product.image" :alt="product.title" class="max-w-full max-h-full object-contain" />
                </div>

                <div class="p-4">
                    <h3 class="text-md font-medium text-gray-900 mb-2 h-10 " :title="product.title">{{ product.title }}
                    </h3>
                    <p class="text-xs text-gray-500 my-3 capitalize">
                        {{ product.category }}
                    </p>
                    <div class="space-y-1 mb-3">
                        Precios
                        <p class="text-lg font-bold text-blue-600">
                            {{ product.price }} USD
                        </p>
                        <p class="text-sm text-gray-600">
                            {{ product.price * 131 }} VES
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


const products = ref(null);
const productsAPI = 'https://fakestoreapi.com/products';
const uniqueCategories = productsAPI + '/categories';

const getProducts = async () => {
    try {
        const response = await axios.get(productsAPI)
        products.value = response.data;
        console.log(products.value);
    } catch (error) {

    }
}

const getCategories = async () => {
    try {
        const response = await axios.get(uniqueCategories)
        products.value = response.data;
        console.log(products.value);
    } catch (error) {

    }
}

onMounted(() => {
    getProducts()
    getCategories()
})

</script>