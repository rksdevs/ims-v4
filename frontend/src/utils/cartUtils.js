export const convertToDecimals = (num) => {
    return (Math.round(num * 100)/100).toFixed(2);
}

export const updateCart = (state) => {
     //calculate item price
     state.itemsPrice = convertToDecimals(state.items.reduce((acc,item)=> acc + (item.price + (item.price * item.Sgst/100) + (item.price * item.Cgst/100))*item.quantity, 0));

     //calculate shipping price - if order is above 1000rs shipping is free else 100rs shipping cost
    //  state.shippingPrice = convertToDecimals(state.itemsPrice > 1000 ? 0 : 100);

     //calculate tax price - 18%
    //  state.taxPrice = convertToDecimals(Number((0.18 * state.itemsPrice).toFixed(2)));

    //calculate discount
    const discountAmount = state.itemsPrice * state.discount/100 
     //calculate total price
     state.netAmount = (
         Number(state.itemsPrice) -
         Number(discountAmount)
     ).toFixed(2);

     localStorage.setItem('cart', JSON.stringify(state));

     return state;
}