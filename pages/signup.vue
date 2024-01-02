<template>
  <div>
    <form class="max-w-sm mx-auto" @submit.prevent="handleSignUp">
      <div class="mx-auto flex justify-center items-center">
        Already have an account?
        <NuxtLink
          to="/login"
          class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-28 ml-4 px-5 py-2.5 text-center"
        >
          Login
        </NuxtLink>
      </div>

      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
          >Your name</label
        >
        <input
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="name"
          v-model="form.name"
          required
        />
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

      <label
        class="block mb-2 text-sm font-medium text-gray-900"
        for="user_avatar"
        >Upload Profile Picture</label
      >
      <input
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 mb-5"
        aria-describedby="user_avatar_help"
        id="user_avatar"
        type="file"
        @change="handleFileChange"
      />

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
const form = ref({
  name: "",
  password: "",
  email: "",
});
const file: any = ref(null);
const handleFileChange = (event: any) => {
  file.value = event.target.files[0];
};

async function handleSignUp() {
  try {
    const formValue = new FormData();
    formValue.append("name", form.value.name);
    formValue.append("email", form.value.email);
    formValue.append("password", form.value.password);
    formValue.append("image", file.value);

    await useFetch("/api/user", {
      method: "POST",
      body: formValue,
    });
    navigateTo("/login");
  } catch (e) {
    console.log(e);
  }
}
definePageMeta({
  middleware: "guest",
});
</script>
