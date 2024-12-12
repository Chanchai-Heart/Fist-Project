import { defineStore } from "pinia";

export const useAdminOrderStore = defineStore("order", {
  state: () => ({
    list: [
      {
        no: "A112234",
        customerName: "นายทดสอบ นะ",
        totalPrice: "25,000",
        status: "Payment Completed",
        address: "111/892 Nonthaburi Thailand 99999",
        paymentMethod: "Credit card",
        updatedAt: "9/15/2023, 11:50:24 PM",
        products: [
          {
            name: "product1",
            imageUrl:
              "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
            description: "รายละเอียดสินค้า 1",
            quantity: 10,
            about: "testt",
            status: "open",
            price: 100,
          },
          {
            name: "product2",
            imageUrl:
              "https://images.unsplash.com/photo-1458538977777-0549b2370168?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
            description: "รายละเอียดสินค้า 2",
            quantity: 10,
            about: "นี่คือสินค้าตัวใหม่ของเรา",
            status: "open",
            price: 100,
          },
          {
            name: "product3",
            imageUrl:
              "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
            description: "รายละเอียดสินค้า 3",
            quantity: 10,
            about: "testt3",
            status: "open",
            price: 100,
          },
          {
            name: "product4",
            imageUrl:
              "https://images.unsplash.com/photo-1530914547840-346c183410de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
            description: "รายละเอียดสินค้า 4",
            quantity: 10,
            about: "testt2",
            status: "open",
            price: 100,
          },
          {
            name: "product5",
            imageUrl:
              "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
            description: "รายละเอียดสินค้า 5",
            quantity: 10,
            about: "test2",
            status: "open",
            price: 100,
          },
          {
            name: "product6",
            imageUrl:
              "https://images.unsplash.com/photo-1525904097878-94fb15835963?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
            description: "รายละเอียดสินค้า 6",
            quantity: 10,
            about: "test2",
            status: "open",
            price: 100,
          },
          {
            name: "product7",
            imageUrl:
              "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
            description: "รายละเอียดสินค้า 7",
            quantity: 10,
            about: "test2",
            status: "open",
            price: 100,
          },
        ],
      },
    ],
  }),
  actions: {
    getOrder(index) {
      return this.list[index];
    },
  },
});
