import { defineStore } from "pinia";

import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

export const useAdminUserStore = defineStore("admin-user", {
  state: () => ({
    list: [],
  }),
  actions: {
    async loadUser() {
      const usersCol = collection(db, 'users')
      const userSnapshot = await getDocs(usersCol)
      const userList = userSnapshot.docs.map(doc => {
        let convertedUser = doc.data()
        convertedUser.uid = doc.id
        convertedUser.updateAt = convertedUser.updateAt.toDate()
        return convertedUser
      });
      this.list = userList
    },
    async getUser(uid) {
      try{
        const userRef = doc(db, 'users', uid)
        const userSnapshot = await getDoc(userRef)
        return userSnapshot.data()
      } catch (error) {
        console.log('error',error)
      }
    },
    async updateUser(uid, userData) {
      const updatedUser ={
        fullname: userData.fullname,
        status: userData.status,
        role: userData.role,
        updateAt: new Date()
      }
      const docRef = doc(db, 'users', uid)
      await setDoc(docRef, updatedUser)
    },
  },
});
