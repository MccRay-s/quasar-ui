<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const $q = useQuasar();
    $q.notify({
      type: 'negative',
      message: 'Submitted',
      position: 'top',
    });
  },
});
</script>
