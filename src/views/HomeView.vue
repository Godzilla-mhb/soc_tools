<template>
  <div class="home">
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="cacheList">
        <component :is="Component"
                   :key="route.fullPath" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useTabBarStore } from "../store";
import { computed } from "vue";
import { Options, Vue } from "vue-class-component";

const tabBarStore = useTabBarStore();
const cacheList = computed(() => tabBarStore.getCacheList);
console.log("cacheList", cacheList);
// @Options({
//   components: {},
// })
// export default class HomeView extends Vue {}
</script>
