<template>
  <div>
    <h1 class="text-center font-extrabold">Create an Issue</h1>
    <form class="max-w-xl mx-auto" @submit.prevent="createIssue">
      <div class="mb-5">
        <label class="block mb-2 text-sm font-medium text-gray-900"
          >Title</label
        >
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="email"
          v-model="form.title"
          required
        />
      </div>
      <div class="mb-5">
        <label class="block mb-2 text-sm font-medium text-gray-900"
          >Description Markdown</label
        >
        <MarkdownEditor />
      </div>
      <div class="mb-5">
        <fieldset class="flex flex-row space-x-4">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Issue Status:</label
          >
          <legend class="sr-only">Status</legend>
          <div v-for="status in statuses">
            <div :key="status" class="flex items-center mb-4">
              <input
                type="radio"
                v-model="form.status"
                :name="status"
                :value="status"
                class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              />
              <label
                :for="status"
                class="block ms-2 text-sm font-medium text-gray-900"
              >
                {{ status }}
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="mb-5">
        <label class="block mb-2 text-sm font-medium text-gray-900"
          >Assign to User</label
        >
        <select
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          v-model="form.assignedToUserId"
        >
          <option :value="null">Please select User</option>
          <option v-for="user in users" :value="user.id">
            {{ user.name }} ({{ user.email }})
          </option>
        </select>
      </div>
      <label
        class="block mb-2 text-sm font-medium text-gray-900"
        for="user_avatar"
        >Upload Issue Image</label
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
import { type UserInterface } from "~/prisma/interfaces";
const { data: users } = await useFetch<UserInterface[]>("/api/user", {
  method: "get",
});
const file: any = ref(null);
const handleFileChange = (event: any) => {
  file.value = event.target.files[0];
};
const statuses = ["OPEN", "IN_PROGRESS", "CLOSED"];
const form = ref({
  title: "test title",
  status: "OPEN",
  assignedToUserId: null,
});
async function createIssue() {
  try {
    const description = useState("descriptionValue").value;
    const formValue = new FormData();
    formValue.append("title", form.value.title);
    formValue.append("status", form.value.status);
    //@ts-ignore
    formValue.append("description", description);
    //@ts-ignore
    formValue.append("assignedToUserId", form.value.assignedToUserId);
    formValue.append("image", file.value);

    await useFetch("/api/issue", {
      method: "POST",
      body: formValue,
    });
    useState("descriptionValue", () => "");
    navigateTo("/issues");
  } catch (e) {
    console.log(e);
  }
}
</script>
