import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    checkout: {},
  }),
  getters: {
    summaryQuantity(state) {
      return state.items.reduce((acc, item) => acc + item.quantity, 0);
    },
    summaryPrice(state) {
      return state.items.reduce((acc, item) => {
        return acc + item.quantity * item.price;
      }, 0);
    },
  },

  actions: {
    loadCart() {
      /* ถ้ามีข้อมูลใน 'cart-data' จะทำการ load ข้อมูล */
      const previousCart = localStorage.getItem("cart-data");
      if (previousCart) {
        this.items = JSON.parse(previousCart);
      }
    },
    /* ในตอนที่เราเพิ่มสินค้าในตะกร้า จะทำการ save ข้อมูลลงใน 'cart-data' */
    addToCart(productData) {
      /* เมื่อเริ่มต้น ให้หาว่ามีสินค้าที่อยู่ในตะกร้าหรือไม่ 'findProductIndex' */
      const findProductIndex = this.items.findIndex(item => {
        return item.name === productData.name;
      });
      /* ถ้าไม่มี quantity = 1 */
      if (findProductIndex < 0) {
        productData.quantity = 1;
        this.items.push(productData);
      } else {
        /* ถ้ามี quantity = quantity + 1 */
        const currentItem = this.items[findProductIndex];
        this.updateQuantity(findProductIndex, currentItem.quantity + 1);
      }

      localStorage.setItem("cart-data", JSON.stringify(this.items));
    },
    updateQuantity(index, quantity) {
      this.items[index].quantity = quantity;
      localStorage.setItem("cart-data", JSON.stringify(this.items));
    },
    removeItemInCart(index) {
      this.items.splice(index, 1);
      localStorage.setItem("cart-data", JSON.stringify(this.items));
    },

    placeorder (userData) {
      const orderData = {
        ...userData, /* ...userData คือการการกระจายข้อมูลของ userData */
        totalPrice: this.summaryPrice,
        paymentMethod: 'Credit Card',
        createdDate: (new Date()).toLocaleDateString(),
        orderNumber: `AA${Math.floor((Math.random() * 90000) + 10000)}`,
        product: this.items
      }
      localStorage.setItem('order-data', JSON.stringify(orderData))
      },
    
      loadCheckout () {
        const orderData = localStorage.getItem('order-data')
        if (orderData) {
          this.checkout = JSON.parse(orderData)
      }
    }
  },
});
