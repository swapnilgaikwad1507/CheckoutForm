import { CART_PRODUCTS_KEY } from "./constnats";

export const removeProductFromCartUtils = (prodId) => {
    var cartProducts = JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY)) ?
        JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY)) : []

    var items = cartProducts.filter((item) => {
        return item.id !== prodId
    });

    localStorage.setItem(CART_PRODUCTS_KEY, JSON.stringify(items));

    return items
}