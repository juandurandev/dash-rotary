<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-2">
        <div style="font-family: 'quicksand';" class="text-2xl m-2 font-bold">Estadísticas</div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
            <div class="bg-white overflow-hidden shadow border border-gray-300 rounded-4xl hover:shadow-lg transition-shadow duration-300">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 bg-pink-100 p-3 rounded-4xl">
                            <div class="h-8 w-8 text-blue-500 text-2xl">
                                <img src="../assets/paquete-abierto.webp" loading="lazy" alt="">
                            </div>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-md sm:text-md md:text-lg lg:text-lg font-medium text-gray-500 truncate">Total de Productos</dt>
                                <dd style="font-family: 'quicksand';" class="text-3xl sm:text-2xl md:text-4xl lg:text-4xl font-bold text-gray-900">{{ totalProduct ? totalProduct : '0'  }}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow border border-gray-300 rounded-4xl hover:shadow-lg transition-shadow duration-300">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 bg-blue-100 p-3 rounded-4xl">
                            <div class="h-8 w-8 text-blue-500 text-2xl">
                                <img src="../assets/etiqueta.webp" loading="lazy" alt="">
                            </div>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-md sm:text-md md:text-lg lg:text-lg font-medium text-gray-500 truncate">Categorias Unicas </dt>
                                <dd style="font-family: 'quicksand';" class="text-3xl sm:text-2xl md:text-4xl lg:text-4xl font-bold text-gray-900">{{ category }}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow border border-gray-300  rounded-4xl hover:shadow-lg transition-shadow duration-300">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 bg-purple-200 p-3 rounded-4xl">
                            <div class="h-8 w-8  text-blue-500 text-2xl">
                                <img src="../assets/dolar.webp" loading="lazy" alt="">
                            </div>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-md sm:text-md md:text-lg lg:text-lg font-medium text-gray-500 truncate">Precio Promedio</dt>
                                <dd style="font-family: 'quicksand';" class="text-3xl sm:text-2xl md:text-4xl lg:text-4xl font-bold text-gray-900">${{ average }}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
  totalProduct: Number,
  category: Number,
  average:Number
})
</script>