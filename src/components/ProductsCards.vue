<template>
    <div class="max-w-7xl mx-auto">
        <StatisticsCards :totalProduct="filteredCategories.length" />
        <div v-if="filteredCategories.length >= 0" class="bg-white shadow rounded-lg px-6 pb-6 mb-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-lg font-medium text-gray-900">
                    Productos {{ filteredCategories.length }} encontrados
                </h2>

                <div class="">
                    <label for="categories"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccionar
                        una opcion</label>
                    <select v-model="selectedCategory" id="categories"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected value="">Seleccionar Categoria</option>
                        <option v-for="category in categories" :value="category">{{ categoriesFormat(category) }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <div v-for="product in filteredCategories" :key="product.id"
                    class="bg-white border border-gray-200 rounded-4xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div class="aspect-square bg-gray-100 flex items-center justify-center p-4">
                        <img :src="product.image" :alt="product.title" class="max-w-full max-h-full object-contain" />
                    </div>

                    <div class="p-4">
                        <h3 class="text-md font-medium text-gray-900 mb-2 h-10 " :title="product.title">{{ product.title
                            }}
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
                                {{ priceFormatVES(product.price * 131) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div v-else class="max-w-7xl mx-auto flex items-center justify-center my-2">
            <CustomLoader />
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted,computed } from 'vue';
import axios from 'axios';
import { showErrorMessage } from '../utils/toastUtils';
import { categoriesFormat } from '../composables/useCategoriesFormat';
import { priceFormatVES } from '../composables/usePriceFormatVES';


const products = ref([]);
const categories = ref(null);
const selectedCategory = ref('');
const productsAPI = 'https://fakestoreapi.com/products';
const uniqueCategories = productsAPI + '/categories';

const getProducts = async () => {
    try {
        const response = await axios.get(productsAPI)
        products.value = response.data;
        console.log(products.value);
    } catch (error) {
        showErrorMessage(`ERROR: No se pudo obtener los productos: ${error}`);
    }
}

const getCategories = async () => {
    try {
        const response = await axios.get(uniqueCategories)
        categories.value = response.data;
        console.log(categories.value);
    } catch (error) {
        showErrorMessage(`ERROR: No se pudo obtener las categorias: ${error}`)
    }
}

const filteredCategories = computed(() => {
    if (!selectedCategory || selectedCategory.value === '') {
        return products.value;
    }

    return products.value.filter(product => product.category === selectedCategory.value);

})

onMounted(() => {
    getProducts()
    getCategories()
})

</script>