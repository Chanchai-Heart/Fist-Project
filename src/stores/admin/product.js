import { defineStore } from "pinia";

import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

export const useAdminProductStore = defineStore("admin-product", {
  state: () => ({
    list: [],
    loaded: false,
  }),
  actions: {
    async loadProduct() {
      const productCol = collection(db, "products");
      const productSnapshot = await getDocs(productCol);
      const products = productSnapshot.docs.map((doc) => {
        const convertedProduct = doc.data();
        convertedProduct.productId = doc.id;
        convertedProduct.updatedAt = convertedProduct.updatedAt.toDate();
        return convertedProduct;
      });
      this.list = products;
    },
    async getProduct(productId) {
      try {
        const productRef = doc(db, "products", productId);
        const productSnapshot = await getDoc(productRef);
        return productSnapshot.data();
      } catch (error) {
        console.log("error", error);
      }
      return this.list[index];
    },
    async addProduct(productData) {
      try {
        productData.remainQuantity = productData.quantity;
        productData.updatedAt = new Date().toISOString();
        const productCol = collection(db, "products");
        await addDoc(productCol, productData);
      } catch (error) {
        console.log("error", error);
      }
    },
    async updateProduct(index, productData) {
      try {
        const updateProduct = {}
        updateProduct.name = productData.name;
        updateProduct.image = productData.image;
        updateProduct.price = productData.price;
        updateProduct.quantity = productData.quantity;
        updateProduct.remainQuantity = productData.remainQuantity;
        updateProduct.status = productData.status;
        updateProduct.updatedAt = new Date()

        const productRef = doc(db, 'products', productId);
        await setDoc(productRef, updateProduct);

      } catch (error) {
        console.log("error", error);
      }
    },
    async removeProduct(productId) {
      try {
        const productRef = doc(db, 'products', productId);
        await deleteDoc(productRef);
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});
