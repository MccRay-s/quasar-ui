<template>
  <div class="tree-item" v-for="(item,index) in menus" :key="index">
    <menu-item
      :icon="item.meta.icon"
      :title="item.meta.title"
      :children="item.children">
    </menu-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SysMenu } from 'src/models/menu/Menu';
import MenuItem from './Item.vue';

export default defineComponent({
  name: 'MenuTree',
  components: {
    MenuItem,
  },
  props: {
    menus: {
      type: Array as PropType<SysMenu[]>,
      required: true,
    },
  },
  // setup(props) {
  //   return {
  //   };
  // },
});
</script>
