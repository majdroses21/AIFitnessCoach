<template>
  <NuxtLayout name="auth">
    <div class="login pa-16 pb-0">
      <v-row>

        <v-col sm="12" class=""
          style="display: flex;flex-direction: column; justify-content: center;align-items: center;height:100vh" md="4">
          <div>
            <!-- <v-img src="../../public/gym_icon_127275.png" width="200px" height="200px" alt=""></v-img> -->
            <h1 class="text-orange-darken-2">Welcome Back, SignIn to continue</h1>
            <v-btn color="grey" to="/signup">Dont Have Account?</v-btn>
          </div>
        </v-col>

        <v-spacer></v-spacer>

        <v-col sm="12" md="6"
          style="display: flex;flex-direction: column; justify-content: center;align-items: center;">
          <v-card variant="tonal" theme="" style="width:100%;backdrop-filter: blur(10px);border-radius: 25px;"
            class="pa-8 pb-16">
            <v-form ref="form" @submit.prevent="submit" style=" width:100%">

              <v-text-field v-model="email" :rules="emailrulea" variant="solo" type="email" label="Email" class="mb-5"
                append-icon="mdi-email">

              </v-text-field>
              <div style="display: flex;">
                <v-text-field v-model="password" :rules="rules" variant="solo" :type="pas == true ? 'text' : 'password'"
                  label="Password" class="" append-icon="mdi-key">

                </v-text-field>
                <v-checkbox class="text-white" return-object label="Show"
                  style="margin:0 !important; padding:0 !important" v-model="pas"></v-checkbox>
              </div>
              <v-alert v-if="errorMessage" type="error" icon="mdi-alert-circle">
                {{ errorMessage }}
              </v-alert>
              <v-btn style="border-radius: 25px;" variant="flat" color="success" class="mt-2" type="submit"
                block>Login</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.login {
  background-image: url('../../public/pexels-estudiopolaroid-3112004.jpg');
  background-size: cover;
  background-position: center;

}
</style>

<script setup>
 definePageMeta({
  middleware: 'guest'
})
import axios from 'axios';
import { useAuthStore } from '~/store/auth';

const API_URL = useRuntimeConfig().public.API_URL;
const store = useAuthStore();
const pas = ref("false")
const password = ref("")
const email = ref("")
const form = ref(null)
const rules = [
  value => {
    if (value) return true

    return 'يجب عليك ملئ هذا الحقل.'
  }
];
const emailrulea = [
  v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'البريد الالكتروني غير صحيح ']
var errorMessage = ref("");
const submit = async function () {
  const personalInfo = reactive({
    email: email.value,
    password: password.value
  });
  console.log(personalInfo);
  form.value.validate()
    .then(async valid => {
      if (valid.valid == true) {
        {
          try {
            const response = await axios.post(`${API_URL}/auth/login`, {
              password: personalInfo.password,
              email: personalInfo.email
            });
            console.log('login successful:', response.data);
            errorMessage.value = ''
            store.loginSave(response.data.data.user,response.data.data.token);
            navigateTo('/dashboard/profile')

          } catch (error) {
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            if (error.response.data.message == "Invalid credentials") {
              errorMessage.value = " البريد الالكتروني او كلمة المرور خطأ"

            }
            email.value = '';
            password.value = ''
          }

        }
      }
    })
}
</script>