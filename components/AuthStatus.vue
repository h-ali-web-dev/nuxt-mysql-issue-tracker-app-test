<template>
  <div class="flex">
    <div v-if="status === 'authenticated'" class="flex space-x-4 items-center">
      <div
        class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 bg-white text-blue-600 font-semibold rounded-md shadow-sm hover:bg-gray-100 focus:bg-gray-100"
      >
        {{ status }} as
        {{ user?.name }}
      </div>
      <img
        class="rounded-full w-10 h-10"
        v-if="user?.image"
        :src="
          config.public.minioUrl +
          '/' +
          config.public.minioBucket +
          '/' +
          user?.image +
          '.jpg'
        "
        alt="user image"
      />
      <button @click="signOut()">Signout</button>
    </div>
    <div v-else>
      <NuxtLink to="/login">Login</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

const { signIn, signOut, session, status, cookies, getProviders, user } =
  useAuth();
</script>

<style scoped></style>
