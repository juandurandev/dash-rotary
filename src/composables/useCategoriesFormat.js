
export const categoriesFormat = (categoryName) => {
    const categoriesNames = {
        "men's clothing": "Ropa de Hombre",
        "women's clothing": "Ropa de Mujer",
        "jewelery": "Joyería",
        "electronics": "Electrónicos"
    }

    return categoriesNames[categoryName] || category;
}