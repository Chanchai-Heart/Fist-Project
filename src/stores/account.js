import { defineStore } from "pinia";

import {
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

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
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            this.user = user;

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              // ไม่สร้างข้อมูลใหม่
              this.profile = docSnap.data();
            } else {
              // ถ้ายังไม่มีข้อมูลให้สร้างข้อมูลใหม่
              const newUser = {
                name: user.displayName,
                role: "member",
                status: "Active",
                updateAt: new Date(),
              };
              await setDoc(docRef, newUser);
              this.profile = newUser;
            }
            if (this.profile.role === "admin") {
              this.isAdmin = true;
            }
            this.isLoggedIn = true;

            //สำหรับสร้าง user + สร้าง data เข้า collection user ทันที
            // member
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
        console.log("error store =", error.code);
        switch (error.code) {
          case "auth/invalid-email":
            throw new Error("อีเมลไม่ถูกต้อง");
          case "auth/wrong-password":
            throw new Error("รหัสผ่านไม่ถูกต้อง");
          default:
            throw new Error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        }
      }
    },
    async logout() {
      this.isLoggedIn = false;
      await signOut(auth);
    },
  },
});
