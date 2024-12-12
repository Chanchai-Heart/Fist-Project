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
      console.log("products", products);
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
        productData.updatedAt = new Date()
        const productCol = collection(db, "products");
        await addDoc(productCol, productData);
      } catch (error) {
        console.log("error", error);
      }
    },
    async updateProduct(productId, productData) {
      try {
        const updateProduct = {
        name: productData.name,
        imageUrl: productData.imageUrl,
        price: productData.price,
        quantity: productData.quantity,
        remainQuantity: productData.remainQuantity,
        about: productData.about,
        status: productData.status,
        updatedAt: new Date()
        }

        const productRef = doc(db, 'products', productId);
        await setDoc(productRef, updateProduct);

        console.log("Product updated successfully:", updateProduct);
        
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
