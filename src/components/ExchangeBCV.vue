<template>
            <div class="flex items-start flex-col">
                <div style="font-family: 'quicksand';" class="font-bold text-sm">
                    <div class="flex items-center justify-center border border-gray-200 p-2 bg-gray-200 rounded-lg">
                        1 USD <img class="h-5 w-5 ml-2" src="../assets/estados-unidos.png" alt="" />
                    </div>
                    <div class="flex items-center justify-center border border-gray-200 p-2 bg-gray-200 rounded-lg mt-1">
                        {{ dataBCV ?
                        dataBCV.price : 'Cargando...' }}
                    VES <img class="h-5 w-5 ml-2" src="../assets/venezuela.png" alt="">
                    </div>
                </div>

              <!--   <div style="font-family: 'quicksand';" class="flex items-center justify-center border border-gray-200 p-1 bg-gray-200 rounded-lg mt-1 text-sm"> <strong>{{
                    dataBCV ? dataBCV.last_update : 'Cargando' }}</strong></div> -->
            </div>
</template>

<script setup>
import { useBCV } from '../composables/useFetchBCV'

const { dataBCV } = useBCV()
</script>