import { defineStore } from "pinia";

import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  limitToLast,
  startAfter,
  endBefore,
} from "firebase/firestore";
import { db } from "@/firebase";

export const useAdminProductStore = defineStore("admin-product", {
  state: () => ({
    list: [],
    docList: [],
    filter: {
      search: "",
      status: "",
      sort: {
        updatedAt: "desc",
      },
    },
  }),
  getters: {
    list(state) {
      return state.docList.map((doc) => {
        const convertedProduct = doc.data();
        convertedProduct.productId = doc.id;
        convertedProduct.updatedAt = convertedProduct.updatedAt.toDate();
        return convertedProduct;
      });
    },
  },
  actions: {
    async loadProduct() {
      let productCol = query(
        collection(db, "products"),
        orderBy("updatedAt", this.filter.sort.updatedAt)
      );

      if (this.filter.search) {
        productCol = query(productCol, where("name", "==", this.filter.search));
      }

      if (this.filter.status) {
        productCol = query(
          productCol,
          where("status", "==", this.filter.status)
        );
      }

      productCol = query(productCol, limit(2));

      const productSnapshot = await getDocs(productCol);
      this.docList = productSnapshot.docs;
    },
    async loadNextProduct(mode) {
      let productCol = query(
        collection(db, "products"),
        orderBy("updatedAt", this.filter.sort.updatedAt)
      )

      if (mode === "next") {
        const lasDocument = this.docList[this.docList.length -1]
        /* ไปยังหน้าต่อไป */
        productCol = query(
          productCol,
          startAfter(lasDocument),
          limit(2)
        )
      } else {
        const firstDocument = this.docList[0]
        /* ย้อนกลับหน้า */
        productCol = query(
          productCol,
          endBefore(firstDocument),
          limitToLast(2)
        )
      }
      const productSnapshot = await getDocs(productCol);
      this.docList = productSnapshot.docs;
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
        productData.updatedAt = new Date();
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
          updatedAt: new Date(),
        };

        const productRef = doc(db, "products", productId);
        await setDoc(productRef, updateProduct);

        console.log("Product updated successfully:", updateProduct);
      } catch (error) {
        console.log("error", error);
      }
    },
    async removeProduct(productId) {
      try {
        const productRef = doc(db, "products", productId);
        await deleteDoc(productRef);
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});
