<template>
  <div>
    <div v-if="issues!.length == 0">No Issues in the database</div>
    <div v-for="issue in issues">
      <IssueCard :issue="issue" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth-check",
});
import { type IssueInterface } from "~/prisma/interfaces";

const { data: issues } = await useFetch<IssueInterface[]>("/api/issue", {
  method: "get",
});
</script>

<style scoped></style>
