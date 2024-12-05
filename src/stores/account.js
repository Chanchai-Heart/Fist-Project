import { defineStore } from "pinia";

import {
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

export const useAccountStore = defineStore("account", {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    user: {},
  }),
  actions: {
    async checkAuth() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.user = user;
            this.isLoggedIn = true;
            resolve(true);
          } else {
            this.isLoggedIn = false;
            resolve(false);
          }
        });
      });
    },
    async signInWithGoogle() {
      try {
        const result = await signInWithPopup(auth, provider);
        this.isLoggedIn = true;
        this.user = result.user;
        console.log(this.user);
      } catch (error) {
        console.log(error);
      }
    },
    async signInAdmin(email, password) {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        this.isLoggedIn = true;
        this.isAdmin = true;
        this.user = result.user;
      } catch (error) {
        console.log('error store =',error.code);
        switch (error.code){
          case 'auth/invalid-email':
          throw new Error('อีเมลไม่ถูกต้อง')
          default:
          throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
        }
      }
    },
    async logout() {
      this.isLoggedIn = false;
      await signOut(auth);
    },
  },
});
