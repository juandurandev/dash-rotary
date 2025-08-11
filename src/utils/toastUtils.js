import { toast } from "vue3-toastify"
export const showErrorMessage = (message) => {
    toast.error(message, {
        theme: 'dark',
        icon: '❌',
    })
}

export const showSuccess = (message) => {
    toast.success(message, {
        theme: 'dark',
        icon: '✅',
    })
}