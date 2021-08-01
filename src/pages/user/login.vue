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
      <div class="row justify-between">
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
        <div class="col" style="margin-left: 22px;">
          <img
            @click="getImgCode"
            height="40"
            width="101"
            :src="codeUrl"
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
import { defineComponent, ref, onMounted } from 'vue';
import { getCodeImg, login } from '@/api/login';
import { encrypt, decrypt } from '@/utils/jsencrypt';

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
    const codeUrl = ref(null);

    /**
     * 获取验证码
     */
    const getImgCode = async () => {
      const rest = await getCodeImg();
      codeUrl.value = `data:image/gif;base64,${rest.data.img}`;
      uuid.value = rest.data.uuid;
    };

    /**
     * 加载账号密码
     */
    const getCookie = () => {
      const uname = $q.cookies.get('username');
      const pwd = $q.cookies.get('password');
      const rememberMe = $q.cookies.get('rememberMe');
      if (uname) {
        username.value = uname;
      }
      if (pwd) {
        password.value = decrypt(pwd);
      }
      if (rememberMe === undefined) {
        remember.value = Boolean(rememberMe);
      }
    };
    /**
     * 处理登录
     */
    const onLogin = async () => {
      logining.value = true;
      if (remember.value) {
        const enpass = encrypt(password.value) || '';
        $q.cookies.set('username', username.value, { expires: 30 });
        $q.cookies.set('password', enpass, { expires: 30 });
        $q.cookies.set('rememberMe', remember.value.toString(), { expires: 30 });
      } else {
        $q.cookies.remove('username');
        $q.cookies.remove('password');
        $q.cookies.remove('rememberMe');
      }
      try {
        const rest = await login(username.value, password.value, code.value, uuid.value);
        console.log(rest);
        $q.notify({
          type: 'positive',
          icon: 'done',
          message: '登录成功',
          position: 'top',
        });
      } catch (err) {
        logining.value = false;
        getImgCode();
      }
    };
    const onReset = () => {
      code.value = null;
      password.value = null;
    };

    getImgCode();

    getCookie();

    onMounted(async () => {

    });
    return {
      code, password, username, uuid, remember, codeUrl, logining, onLogin, onReset, getImgCode,
    };
  },

});
</script>
