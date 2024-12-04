import { defineStore } from "pinia";

export const useAdminProductStore = defineStore("admin-product", {
  state: () => ({
    list: [],
    loaded: false,
  }),
  actions: {
    loadProduct() {
      const products = localStorage.getItem("admin-products");
      if (products) {
        this.list = JSON.parse(products);
        this.loaded = true;
      }
    },
    getProduct(index) {
      if (!this.loaded) {
        this.loadProduct();
      }
      return this.list[index];
    },
    addProduct(productData) {
      productData.remainQuantity = productData.quantity;
      productData.updatedAT = new Date().toISOString();
      this.list.push(productData);
      localStorage.setItem("admin-products", JSON.stringify(this.list));
    },
    updateProduct(index, productData) {
      const fields = [
        "name",
        "imageUrl",
        "price",
        "quantity",
        "remainQuantity",
        "status",
      ];
      /* การเขียนฟังก์ชั่นแบบที่ 1 */
      // this.list[index].name = productData.name;
      // this.list[index].image = productData.image;
      // this.list[index].price = productData.price;
      // this.list[index].quantity = productData.quantity;
      // this.list[index].remainQuantity = productData.remainQuantity;
      // this.list[index].status = productData.status;
      /* การเขียนฟังก์ชั่นแบบที่ 2 */
      // for (const field of fields) {
      //   this.list[index][field] = productData[field];
      // }
      /* การเขียนฟังก์ชั่นแบบที่ 3 */
      fields.map((field) => (this.list[index][field] = productData[field]));
      
      productData.updatedAT = new Date().toISOString();
      localStorage.setItem("admin-products", JSON.stringify(this.list));
    },
    removeProduct(index) {
      this.list.splice(index, 1);
    },
  },
});
