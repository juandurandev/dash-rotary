<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-slate-200 border border-slate-800 rounded-3xl p-6 mt-5">
            <div class="flex items-start flex-col">
                <div class="">Tasa de cambio BCV :</div>
                <span style="font-family: 'quicksand';" class="text-slate-700 text-sm mr-1"><strong>
                        1 USD <img class="h-5 w-5" src="../assets/estados-unidos.png" alt="">
                        = {{ dataBCV ?
                            dataBCV.price : 'Cargando...' }}
                        VES <img class="h-5 w-5" src="../assets/venezuela.png" alt=""></strong></span>

                <div style="font-family: 'quicksand';" class="text-blue-700 text-sm">Ultima actualizacion: <strong>{{
                    dataBCV ? dataBCV.last_update : 'Cargando' }}</strong></div>
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