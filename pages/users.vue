<template>
  <div>
    <div v-if="users?.length == 0">No Users in the database</div>

    <div v-for="user in users">
      <UserCard :user="user" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth-check",
});
import { type UserInterface } from "~/prisma/interfaces";

const { data: users } = await useFetch<UserInterface[]>("/api/user", {
  method: "get",
});
</script>

<style scoped></style>
