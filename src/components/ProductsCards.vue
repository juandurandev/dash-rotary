<template>
    <div class="max-w-7xl mx-auto  rounded-4xl mt-2">
        <StatisticsCards class="mt-3" v-if="categories && filteredProducts" :totalProduct="filteredProducts.length"
            :category="categoriesCounts" :average="averagePrice" />


        <div class="w-full flex justify-center mb-6">
            <button style="font-family: 'quicksand';" @click="showFilter"
            class="flex justify-center items-center font-bold text-gray-500 px-3 py-1 rounded cursor-pointer bg-gray-100 rounded-xl border border-gray-300 hover:bg-gray-200 duration-300">
            Filtrar <img class="ml-2 h-5 w-5" src="../assets/filtrar.png" alt="">
        </button>
        </div>

        <div v-if="filteredProducts.length >= 0" class="bg-white shadow rounded-lg px-6 pb-6 mb-6">
            <div v-if="showFilters" class="grid grid-cols-1 md:grid-cols-2 bg-white-200 border border-gray-300 rounded-3xl p-3">
                <div class="p-2">
                    <label for="categories"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccionar
                        una opcion</label>
                    <select v-model="selectedCategory" id="categories"
                        class="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected value="">Seleccionar Categoria</option>
                        <option v-for="category in categories" :value="category">{{ categoriesFormat(category) }}
                        </option>
                    </select>
                </div>
                <div class="flex flex-col items-center  w-full">

                    <div class=" w-full px-4">
                        <label for="minmax-range"
                            class="block  text-sm font-medium text-gray-900 dark:text-white">Precio
                            Minimo</label>
                        <input id="minmax-range" v-model="minPrice" type="range"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                        <br>
                        <span class="font-medium ml-1">${{ minPrice }}</span>
                    </div>

                    <div class="w-full px-4">

                        <label for="minmax-range"
                            class="block  text-sm font-medium text-gray-900 dark:text-white">Precio
                            Maximo</label>
                        <input id="minmax-range" v-model="maxPrice" :max="getMaxPrice(products)" type="range"
                            class="w-full  h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                        <br>
                        <p class="font-medium ml-1">${{ maxPrice }}</p>
                    </div>

                </div>
            </div>

            <div class="flex justify-between items-center mb-4 ml-2">
                <h2 style="font-family: 'quicksand';" class="text-2xl mt-3 font-medium text-gray-900">
                    Productos encontrados <span class="text-3xl font-bold">{{ filteredProducts.length }}</span> 
                </h2>
            </div>
            <div v-if="filteredProducts.length === 0" class="flex items-center justify-center mx-auto">
                <NotFoundProduct />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                <div v-for="product in paginatedProducts" :key="product.id"
                    class="bg-white border border-gray-200 rounded-4xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div class="aspect-square bg-gray-100 flex items-center justify-center p-4">
                        <img :src="product.image" :alt="product.title" loading="lazy"
                            class="max-w-full max-h-full object-contain" />
                    </div>

                    <div class="p-4">
                        <h3 class="text-md font-medium text-gray-900 mb-2 h-10 " :title="product.title">{{ product.title
                        }}
                        </h3>
                        <p class="text-xs text-gray-500 my-3 capitalize">
                            {{ categoriesFormat(product.category) }}
                        </p>
                        <div class="space-y-1 mb-3">
                            Precios
                            <p class="text-lg font-medium text-emerald-600">
                                ${{ product.price }} USD
                            </p>
                            <p class="text-sm text-gray-600">
                                {{ priceFormatVES(product.price * dataBCV.price) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="totalPages > 1" class="flex justify-center mt-6 space-x-2">
                <button @click="actualPage--" :disabled="actualPage === 1"
                    class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer">
                    <img class="h-3 w-3" src="../assets/flecha.png" alt="">
                </button>

                <button v-for="page in totalPages" :key="page" @click="actualPage = page"
                    :class="['px-3 py-1 rounded cursor-pointer', actualPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300']">
                    {{ page }}
                </button>

                <button @click="actualPage++" :disabled="actualPage === totalPages"
                    class="  px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer ">
                    <img class="h-3 w-3" src="../assets/flecha-correcta.png" alt="">
                </button>
            </div>
        </div>
        <div v-else class="max-w-7xl mx-auto flex items-center justify-center my-2">
            <CustomLoader />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { showErrorMessage } from '../utils/toastUtils';
import { getMaxPrice } from '../utils/mathUtils';
import { categoriesFormat } from '../composables/useCategoriesFormat';
import { priceFormatVES } from '../composables/usePriceFormatVES';
import { useBCV } from '../composables/useFetchBCV'

const { dataBCV } = useBCV()
const products = ref([]);
const categories = ref(null);
const selectedCategory = ref('');
const productsAPI = 'https://fakestoreapi.com/products';
const uniqueCategories = productsAPI + '/categories';
const minPrice = ref(0);
const maxPrice = ref(0);
const actualPage = ref(1);
const itemsPerPage = ref(5);
const showFilters = ref(false);

// getting the products from the api and initialize maxPrice for the filter
const getProducts = async () => {
    try {
        const response = await axios.get(productsAPI)
        products.value = response.data;
        maxPrice.value = await getMaxPrice(products.value);
        //console.log(products.value);
    } catch (error) {
        showErrorMessage(`ERROR: No se pudo obtener los productos: ${error}`);
    }
}

// getting categories from the api
const getCategories = async () => {
    try {
        const response = await axios.get(uniqueCategories)
        categories.value = response.data;
        //console.log(categories.value);
    } catch (error) {
        showErrorMessage(`ERROR: No se pudo obtener las categorias: ${error}`)
    }
}

// aplicacion y modificacion de filtros
const filteredProducts = computed(() => {
    let filtered = products.value;

    if (selectedCategory.value) {
        filtered = products.value.filter(product => product.category === selectedCategory.value);
    }

    if (minPrice.value !== null) {
        filtered = filtered.filter(product => product.price >= minPrice.value);
    }

    if (maxPrice.value !== null) {
        filtered = filtered.filter(product => product.price <= maxPrice.value);
    }

    return filtered;
})


const paginatedProducts = computed(() => {
    const start = (actualPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredProducts.value.slice(start, end);
});

// cantidad de paginas
const totalPages = computed(() => {
    const total = Math.ceil(filteredProducts.value.length / itemsPerPage.value);
    return total
});

// stadistica de categories
const categoriesCounts = computed(() => {

    const productCategories = filteredProducts.value.map(product => product.category);
    const uniques = new Set(productCategories);

    return uniques.size;
})

// estadisticas para calcular el promedio del precio de los productos, si se quiere cambiar por pagina
// cambiar filteredProducts por paginatedProducts
const averagePrice = computed(() => {
    if (filteredProducts.value.length === 0) return 0;
    //console.log(filteredProducts);
    const initialValue = 0;
    const productSum = filteredProducts.value.reduce((accum, product) => accum + product.price, initialValue);
    const average = productSum / filteredProducts.value.length;
    return average.toFixed(2);
})

const showFilter = () => {
    showFilters.value = !showFilters.value;
}

// devuelve a la pagina principal basado si cambia esas variables
watch([maxPrice, minPrice, selectedCategory], () => {
    actualPage.value = 1;
})

onMounted(() => {
    getProducts()
    getCategories()
})

</script>
