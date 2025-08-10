<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-blue-200 border border-blue-800 rounded-3xl p-6 mt-5">
            <div class="flex items-start flex-col">

                <span style="font-family: 'quicksand';" class="text-blue-700 text-sm mr-1">Tasa de cambio BCV : <strong>
                        1 USD = {{ dataBCV ?
                            dataBCV.price : 'Cargando...' }}
                        VES</strong></span>
                <span style="font-family: 'quicksand';" class="text-blue-700 text-sm">Ultima actualizacion: <strong>{{
                    dataBCV ? dataBCV.last_update : 'Cargando' }}</strong></span>
                <!-- <button 
                @click="clearFilters"
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Limpiar Filtros
              </button> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { useBCV } from '../composables/useFetchBCV'

const { dataBCV } = useBCV()
</script>