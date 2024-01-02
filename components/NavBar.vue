<template>
  <nav class="border-b mb-5 px-5 py-3">
    <div class="flex justify-between">
      <div class="flex gap-3">
        <ul v-for="link in links" class="flex space-x-6">
          <li :key="link.href">
            <NuxtLink
              :to="link.href"
              :class="`${
                useRoute().path === link.href
                  ? 'text-blue-600'
                  : 'text-gray-900'
              }`"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <AuthStatus />
    </div>
  </nav>
</template>

<script lang="ts" setup>
const links = [
  { label: "Create Issue", href: "/" },
  { label: "Issues", href: "/issues" },
  { label: "Users", href: "/users" },
];
</script>
