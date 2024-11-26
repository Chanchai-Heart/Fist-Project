import { defineStore } from "pinia";

export const useAdminProductStore = defineStore("admin-product", {
  state: () => ({
    list: [
      {
        name: "Product 1",
        image:
          "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
        price: 100,
        quantity: 10,
        remainQuantity: 5,
        status: "open",
        updatedAT: new Date().toISOString(),
      },
    ],
  }),
  actions: {
    getProduct(index) {
      return this.list[index];
    },
    addProduct(productData) {
      productData.remainQuantity = productData.quantity;
      productData.updatedAT = new Date().toISOString();
      this.list.push(productData);
    },
    updateProduct(index, productData) {
      this.list[index].name = productData.name;
      this.list[index].image = productData.image;
      this.list[index].price = productData.price;
      this.list[index].quantity = productData.quantity;
      this.list[index].remainQuantity = productData.remainQuantity;
      this.list[index].status = productData.status;
      productData.updatedAT = new Date().toISOString();
    },
    removeProduct(index) {
      this.list.splice(index, 1);
    },
  },
});
