<template>
  <q-card class="q-pa-md" style="width: 100%; max-width: 400px;">
    <q-form
      @submit="onLogin"
      @reset="onReset"
      class="q-gutter-md">
      <q-input
        outlined
        v-model="username"
        dense
        label="请输入用户名"
        :rules="[ (val) => (val && val.length > 0) || '请输入用户名']">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input
        type="password"
        outlined
        v-model="password"
        dense
        label="请输入密码"
        :rules="[ (val) => (val && val.length > 0) || '请输入密码']">
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>
      <div class="row">
        <div class="col-8">
          <q-input
            outlined
            v-model="code"
            dense
            label="请输入验证码"
            :rules="[ (val) => (val && val.length > 0) || '请输入验证码']">
            <template v-slot:prepend>
              <q-icon name="verified_user" />
            </template>
          </q-input>
        </div>
        <div class="col offset-md-1">
          <q-img
            height="40px"
            spinner-color="white"
            class="rounded-borders"
            src="https://placeimg.com/500/300/nature"
          />
        </div>
      </div>
      <q-toggle v-model="remember" label="记住密码" />
      <div>
        <q-btn label="登 录" type="submit" color="primary" style="width: 120px"/>
        <q-btn label="重 置" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const $q = useQuasar();

    const code = ref(null);
    const password = ref(null);
    const username = ref(null);
    const uuid = ref(null);
    const remember = ref(false);
    const logining = ref(false);

    function onLogin() {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Submitted',
      });
    }
    function onReset() {
      code.value = null;
      password.value = null;
    }
    return {
      code, password, username, uuid, remember, logining, onLogin, onReset,
    };
  },
});
</script>
