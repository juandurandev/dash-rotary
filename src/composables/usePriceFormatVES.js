export const priceFormatVES = (price) => {
    let precio = new Intl.NumberFormat('es-VE',{
        minimumFractionDigits:2,
        maximumFractionDigits:2
    }).format(price)

    return precio + ' VES'
}