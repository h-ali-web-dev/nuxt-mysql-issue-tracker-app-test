<template>
  <div>
    <CreateIssue />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
  middleware: "auth-check",
});
</script>
