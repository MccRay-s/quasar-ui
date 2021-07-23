<template>
  <div>
    <q-layout view="hHh LpR fff" style="font-family: 微软雅黑">
      <q-header class="bg-white text-primary shadow-1">
        <q-toolbar>
          <q-toolbar-title> 管理系统</q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <div class="q-pa-sm row justify-center">
          <div class="col" style="width: 100%; max-width: 400px">
            <div class="q-mb-xl">
              <h4 class="q-ma-sm">
                <strong>管理系统</strong>
              </h4>
            </div>
            <router-view />
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
