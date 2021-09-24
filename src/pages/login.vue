<template>
  <div>
    <q-layout view="hHh LpR fff" style="font-family: 微软雅黑">
      <q-header class="bg-white text-primary shadow-1">
        <q-toolbar>
          <q-toolbar-title>管理系统</q-toolbar-title>
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
            <q-card class="q-pa-md" style="width: 100%; max-width: 400px;">
              <q-form
                @submit="handleLogin"
                @reset="onReset"
                class="q-gutter-md">
                <q-input
                  outlined
                  v-model="loginBody.username"
                  dense
                  label="请输入用户名"
                  :rules="[ usernameValid]">
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
                <q-input
                  type="password"
                  outlined
                  v-model="loginBody.password"
                  dense
                  label="请输入密码"
                  :rules="[ passwordValid]">
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
                <div class="row justify-between">
                  <div class="col-8">
                    <q-input
                      outlined
                      v-model="loginBody.code"
                      dense
                      label="请输入验证码"
                      :rules="[ codeValid]">
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
                  <q-btn
                    label="登 录"
                    type="submit"
                    color="primary"
                    style="width: 120px" :loading="logining"/>
                  <q-btn label="重 置" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
              </q-form>
            </q-card>
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script lang="ts">
import { useQuasar } from 'quasar';
import { LoginBody } from 'src/models/common/BaseCommon';
import { defineComponent, ref, onMounted } from 'vue';
import { getCodeImg } from 'src/api/login';
import { encrypt, decrypt } from 'src/utils/jsencrypt';
import { useStore } from 'src/store/index';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'user-login',
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const loginBody = ref<LoginBody>({
      username: '',
      password: '',
      code: '',
      uuid: '',
    });
    const remember = ref(false);
    const logining = ref(false);
    const codeUrl = ref('');
    const usernameValid = (val: string):string|boolean => (val && val.length > 0) || '请输入用户名';
    const passwordValid = (val: string):string|boolean => (val && val.length > 0) || '请输入密码';
    const codeValid = (val: string):string|boolean => (val && val.length > 0) || '请输入验证码';
    const store = useStore();

    /**
     * 获取验证码
     */
    const getImgCode = async ():Promise<void> => {
      const rest = await getCodeImg();
      codeUrl.value = `data:image/gif;base64,${rest.img}`;
      loginBody.value.uuid = rest.uuid;
    };

    /**
     * 加载账号密码
     */
    const getCookie = () => {
      const uname = $q.cookies.get('username');
      const pwd = $q.cookies.get('password');
      const rememberMe = $q.cookies.get('rememberMe');
      if (uname) {
        loginBody.value.username = uname;
      }
      if (pwd) {
        loginBody.value.password = decrypt(pwd) as string;
      }
      if (rememberMe !== undefined) {
        remember.value = Boolean(rememberMe);
      }
    };
    /**
     * 处理登录
     */
    const handleLogin = () => {
      logining.value = true;
      if (remember.value) {
        const enpass = encrypt(loginBody.value.password) || '';
        $q.cookies.set('username', loginBody.value.username, { expires: 30 });
        $q.cookies.set('password', enpass, { expires: 30 });
        $q.cookies.set('rememberMe', remember.value.toString(), { expires: 30 });
      } else {
        $q.cookies.remove('username');
        $q.cookies.remove('password');
        $q.cookies.remove('rememberMe');
      }
      store.dispatch('userModule/Login', loginBody.value)
        .then(async (rest) => {
          // eslint-disable-next-line no-console
          console.log(rest);
          logining.value = false;
          // 路由跳转
          await router.push({
            path: '/',
            query: {
              ...route.query,
            },
          });
        }).catch(async (err) => {
          logining.value = false;
          loginBody.value.code = '';
          await getImgCode();
          // eslint-disable-next-line no-console
          console.error(err);
        });
    };
    /**
     * 重置
     */
    const onReset = () => {
      loginBody.value.code = '';
      loginBody.value.password = '';
      loginBody.value.username = '';
    };

    onMounted(async () => {
      getCookie();
      await getImgCode();
    });
    return {
      loginBody,
      remember,
      codeUrl,
      logining,
      handleLogin,
      onReset,
      getImgCode,
      usernameValid,
      passwordValid,
      codeValid,
    };
  },

});
</script>
