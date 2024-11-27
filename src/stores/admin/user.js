import { defineStore } from "pinia";

export const useAdminUserStore = defineStore("admin-user", {
  state: () => ({
    list: [
      {
        fullName: "chanchai",
        role: "Admin",
        status: "Active",
        updatedAT: new Date().toISOString(),
      },
    ],
  }),
  actions: {
    getUser(index) {
      return this.list[index];
    },
    updateUser(index, userData) {
      const fields = ["fullName", "role", "status"];
      // for (const field of fields) {
      //     this.list[index][field] = userData[field];
      // }
      fields.map((field) => (this.list[index][field] = userData[field]));

      this.list[index].updatedAt = new Date().toISOString();
    },
    removeUser(index) {
      this.list.splice(index, 1);
    },
  },
});
