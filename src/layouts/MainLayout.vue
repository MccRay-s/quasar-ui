<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>
      </q-list>
      <menu-tree :menus="menus">

      </menu-tree>
    </q-drawer>

    <q-page-container>
      <q-tabs
        dense
        ripple
        align="left"
        class="bg-white text-grey-7"
        :breakpoint="0">
        <q-tab label="mails" icon="mail" />
        <q-tab label="alarms" icon="alarm" />
      </q-tabs>
      <keep-alive>
        <transition mode="out-in">
          <q-page padding>
            <router-view />
          </q-page>
        </transition>
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getRouters } from 'src/api/menu';
import { SysMenu } from 'src/models/menu/Menu';
import MenuTree from './components/Sidebar/MenuTree.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    MenuTree,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const menus = ref<SysMenu[]>([]);
    const getMenu = async ():Promise<SysMenu[]> => {
      const menuList = await getRouters();
      return menuList;
    };
    onMounted(async () => {
      menus.value = await getMenu();
    });
    return {
      menus,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
