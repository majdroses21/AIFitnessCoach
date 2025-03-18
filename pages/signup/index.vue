<template>
<NuxtLayout name="auth">
    <div class="login pa-16 pb-0">
        <v-row>
           
            <v-col sm="12" class="" style="display: flex;flex-direction: column; justify-content: center;align-items: center;height:100vh" md="4"> 
               <div> 
                <!-- <v-img src="../../public/gym_icon_127275.png" width="200px" height="200px" alt=""></v-img> -->
                <h1 class="text-orange-darken-2">Welcome to our wrbsite, Create Account to continue</h1>
                <v-btn color="grey" to="/login">You Have Account?</v-btn> </div></v-col>
                
      <v-spacer></v-spacer>
      
      <v-col sm="12" class="" md="6" style="display: flex;flex-direction: column; justify-content: center;align-items: center;">
        <v-card  variant="tonal" theme="" style="width:100%;backdrop-filter: blur(10px);border-radius: 25px;" class="pa-8 pb-16">
        <v-form @submit.prevent="submit" style=" width:100%">
            <v-text-field v-model="name" :rules="rules" variant="solo" label="Name" append-icon="mdi-email">

            </v-text-field>

            <v-text-field v-model="email" :rules="rules" variant="solo" type="email" label="Email" append-icon="mdi-email">

            </v-text-field>

             
            <div style="display: flex;">
                <v-text-field :rules="rules" variant="solo" :type="pas==true ? 'text' : 'password'" label="Password" class=""
                  append-icon="mdi-key">
  
                </v-text-field>
                <v-checkbox return-object label="Show" style="margin:0 !important; padding:0 !important"
                  v-model="pas"></v-checkbox>
              </div>
              
            <v-btn variant="flat" color="success" class="mt-2" type="submit" block style="border-radius: 25px;">Submit</v-btn>
            <v-btn color="white" variant="text" style="right:0;position: absolute" class="mt-4">Forgot your password?</v-btn>
          
        </v-form>
        </v-card>
      </v-col>
            </v-row>
    </div>
  </NuxtLayout>
</template>

<style scoped>
  .login{
    background-image: url('../../public/pexels-victorfreitas-841131.jpg');
    background-position: center;
    background-size: cover;
  }
   </style>

<script setup>
const API_URL= useRuntimeConfig().public.API_URL;
import axios from 'axios';
  import { ref } from 'vue';
  const password = ref("")
  const email = ref("")
  const name = ref("")
  const age = ref("")
  const pas = ref("false")
  const gender =ref("")
  const gender1= ref(["male","female"])
 const form = {
        name: '',
        email: '',
        password: ''
      };
  const rules= [
        value => {
          if (value) return true

          return 'You must enter this field.'
        }
      ];
   const submit=  async function() {
      try {
        const response = await axios.post(`${API_URL}/auth/signup`, form);
        console.log('Signup successful:', response.data);
        // يمكنك إضافة إعادة توجيه أو عرض رسالة نجاح هنا
      } catch (error) {
        console.error('Signup failed:', error.response ? error.response.data : error.message);
        // يمكنك عرض رسالة خطأ هنا
      }
    }
</script>