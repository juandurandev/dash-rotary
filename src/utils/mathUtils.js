export const getMaxPrice = (products) => {
    if (!products || products.length === 0) return 0;
     
    const productWithMaxPrice = Math.max(...products.map(p => p.price));
    return Math.ceil(productWithMaxPrice);
}