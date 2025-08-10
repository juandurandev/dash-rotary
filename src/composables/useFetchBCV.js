import { ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify'

const dolarAPI = 'https://pydolarve.org/api/v1/dollar?page=bcv&monitor=usd';
const dataBCV = ref(null);

const getBCV = async () => {
    try {
        const response = await axios.get(dolarAPI)
        dataBCV.value = response.data;

        //console.log(dataBCV);
    } catch (error) {
        toast.error(`ERROR: No se pudo obtener el valor del BCV: ${error}`, {
            theme: 'dark',
            icon: '❌',
        })
    }
}

export const useBCV = () => {
    if (!dataBCV.value) {
        getBCV();
    }
    return { dataBCV, getBCV }
}