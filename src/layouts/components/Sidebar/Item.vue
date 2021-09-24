<template>
  <div class="tree-item">
    <q-expansion-item
      expand-separator
      :content-inset-level="0.5"
      :icon="'dashboard'"
      :label="title"
      v-if="hasChildren"
     >
      <MenuItem v-for="(item,index) in children" :key="index"
        :title="item.meta.title"
        :icon="item.meta.icon"
        :children="item.children">
      </MenuItem>
     </q-expansion-item>
    <q-item v-else clickable v-ripple>
      <q-item-section avatar>
        <q-icon :name="'dashboard'" />
      </q-item-section>
      <q-item-section>{{title}}</q-item-section>
    </q-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { SysMenu } from 'src/models/menu/Menu';

export default defineComponent({
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    children: {
      type: Array as PropType<SysMenu[]>,
      default: null,
    },
  },
  setup(props) {
    const hasChildren = computed(() => (props.children && props.children.length > 0));
    return { hasChildren };
  },
});
</script>
