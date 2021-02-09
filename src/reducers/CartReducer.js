export function CartReducer(cart = [], action) {
    switch (action.type) {
        case "ADD_ITEM":
            return cart.concat( [{...action.payload.item, quantity: "1"}] );
        
        case "REMOVE_ITEM":
            return cart.filter(item => item.id !== action.payload.id);
        
        case "CHANGE_QUANTITY":
            return cart.map(item => (item.id === action.payload.id) ?
                  ( { ...item, quantity: action.payload.quantity } ) : item
            );
        
        default:
            return cart;
    }
}