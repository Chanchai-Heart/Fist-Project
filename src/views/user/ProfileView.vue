<script setup>
import { ref, onMounted } from 'vue'
import UserLayout from '@/layouts/UserLayout.vue'

const profileImageUrl = ref('https://cdn-icons-png.flaticon.com/128/6976/6976288.png')
const name = ref('')
const email = ref('')

const handleFileUpload = (event) => {
  const file = event.target.files[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profileImageUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

/* ฟังก์ชันอัพเดทโปรไฟล์ */
const updateProfile = () => {
  const profileData = {
    imageUrl: profileImageUrl.value,
    name: name.value,
    email: email.value
  }
  localStorage.setItem('profile-Data', JSON.stringify(profileData))
  alert('Profile updated successfully!')
}

onMounted(() => {
  let profileData = localStorage.getItem('profile-Data')
  if (profileData) {
    profileData = JSON.parse(profileData)
    profileImageUrl.value = profileData.imageUrl
    name.value = profileData.name
    email.value = profileData.email
  }
})

</script>

<template>
  <main>
    <UserLayout>
      <div class="container mx-auto">
        <div class="border border-base-300 shadow-xl max-w-2xl mx-auto p-8 my-4">
          <div class="text-2xl font-Pacifico">Profile page</div>
          <div class="flex flex-col items-center">
            <div class="flex flex-col items-center">
              <div class="avatar">
                <div class="w-24 rounded-full">
                  <img :src="profileImageUrl">
                </div>
              </div>
              <input @change="handleFileUpload"
                class="file-input file-input-bordered file-input-sm w-full max-w-xs mt-6 bg-purple-300" type="file">
            </div>
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-Inter">Name</span>
            </label>
            <input v-model="name" type="text" placeholder="Type here" class="input input-bordered w-full" />
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-Inter">Email</span>
            </label>
            <input v-model="email" type="text" placeholder="Type here" class="input input-bordered w-full" />
          </div>
          <button @click="updateProfile" class="btn btn-neutral w-full mt-4 font-Inter">Update Profile</button>
        </div>
      </div>
    </UserLayout>
  </main>
</template>
