<template>
  <div>
    <form class="max-w-sm mx-auto" @submit.prevent="handleLogin">
      <div class="mx-auto flex justify-center items-center">
        New User?
        <NuxtLink
          to="/signup"
          class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-28 ml-4 px-5 py-2.5 text-center"
        >
          SignUp
        </NuxtLink>
      </div>
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
          >Your email</label
        >
        <input
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="email"
          v-model="form.email"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Your password</label
        >
        <input
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          v-model="form.password"
          required
        />
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
const { signIn } = useAuth();
const form = ref({
  email: "test@test.com",
  password: "password",
});
async function handleLogin() {
  try {
    await signIn("credentials", form.value);
    navigateTo("/");
  } catch (e) {
    console.log(e);
  }
}
definePageMeta({
  middleware: "guest",
});
</script>
