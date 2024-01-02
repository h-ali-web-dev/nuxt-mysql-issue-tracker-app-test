<template>
  <div class="mx-10 border-b-2 max-w-sm">
    <ul class="max-w-md divide-y divide-slate-600">
      <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <div class="flex-shrink-0">
            <img
              class="w-8 h-8 rounded-full"
              alt="user image"
              v-if="user!.image"
              :src="config.public.minioUrl+'/'+config.public.minioBucket+'/'+user!.image+'.jpg'"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ user?.name }}
            </p>
            <p class="text-sm text-gray-500 truncate">{{ user?.email }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  user: Object,
});
const config = useRuntimeConfig();
</script>
