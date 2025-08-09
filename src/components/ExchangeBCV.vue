<template>
    <div class="bg-blue-200 border border-blue-800 rounded-md p-4 my-6 mx-2">
        <div class="flex items-center">
            <span class="text-blue-500 mr-2 text-xl">💱</span>
            <span class="text-blue-700 text-sm mr-1">Tasa de cambio BCV :</span>
            <span style="font-family: 'quicksand';" class="text-blue-700 text-sm"><strong> 1 USD = {{ dataBCV ?
                dataBCV.price : 'Cargando...' }}
                    VES</strong></span>
            <span style="font-family: 'quicksand';" class="text-blue-700 text-sm"></span>
        </div>
    </div>

</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'

const dolarAPI = 'https://pydolarve.org/api/v1/dollar?page=bcv&monitor=usd';
const dataBCV = ref(null)


const getDolarBCV = async () => {
    try {
        const response = await axios.get(dolarAPI)
        dataBCV.value = response.data;

        console.log(dataBCV);
    } catch (error) {
        toast.error('ERROR: No se pudo obtener el valor del BCV: ' + error, {
            theme: 'dark',
            icon: '❌',
        })
    }
}

onMounted(() => {
    getDolarBCV()
})

</script>