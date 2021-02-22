export function addItem(item){
    return {
        type: "ADD_ITEM",
        payload: { item: item }
    }
}

export function removeItem(id){
    return {
        type: "REMOVE_ITEM",
        payload: { id: id }
    }
}

export function changeQuantity(id, quantity){
    return {
        type: "CHANGE_QUANTITY",
        payload: { id, quantity }
    }
}

export function getTotalPrice(cart){
    if (cart.length > 0) {
        const priceXquantity = (item) => (item.quantity * item.price);
        const sumPrice = (cont, item) => cont + item;
        return cart.map(priceXquantity).reduce(sumPrice, 0).toFixed(2);
    }
    return "0.00";
}