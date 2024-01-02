<template>
  <LazyClientOnly>
    <div class="px-10 mb-4">
      <NuxtLink :to="`/issues/${issue!.id}`">
        <div
          href="#"
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100"
        >
          <img
            class="object-cover w-full rounded-t-lg h-56 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            v-if="issue!.image"
            :src="config.public.minioUrl+'/'+config.public.minioBucket+'/'+issue!.image+'.jpg'"
            alt="issue image"
          />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {{ issue!.title }}
            </h5>
            <p class="mb-3 font-normal text-red-700">
              {{ issue!.status }}
              <span v-if="issue!.assignedToUserId" class="font-extralight">
                - assigned to {{ issue!.assignedToUser.name }}</span
              >
            </p>
            <p v-html="output" class="mb-3 font-normal text-gray-700"></p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </LazyClientOnly>
</template>

<script lang="ts" setup>
import { marked } from "marked";

const props = defineProps({
  issue: Object,
});
const output = marked(props.issue!.description);

const config = useRuntimeConfig();
</script>
