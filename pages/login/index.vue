<template>
<NuxtLayout name="auth">
    <div class="login pa-16 pb-0">
        <v-row>
           
            <v-col sm="12" class="" style="display: flex;flex-direction: column; justify-content: center;align-items: center;height:100vh" md="4"> 
               <div> 
                <!-- <v-img src="../../public/gym_icon_127275.png" width="200px" height="200px" alt=""></v-img> -->
                <h1 class="text-orange-darken-2">Welcome Back, SignIn to continue</h1>
                <v-btn color="grey" to="/signup">Dont Have Account?</v-btn> </div></v-col>
                
      <v-spacer></v-spacer>
      
      <v-col sm="12" md="6" style="display: flex;flex-direction: column; justify-content: center;align-items: center;">
        <v-card  variant="tonal" theme="" style="width:100%;backdrop-filter: blur(10px);border-radius: 25px;" class="pa-8 pb-16">
        <v-form @submit.prevent style=" width:100%">

            <v-text-field v-model="email" :rules="rules" variant="solo" type="email" label="Email" class="mb-5" append-icon="mdi-email">

            </v-text-field>
            <div style="display: flex;">
              <v-text-field v-model="password" :rules="rules" variant="solo" :type="pas==true ? 'text' : 'password'" label="Password" class=""
                append-icon="mdi-key">

              </v-text-field>
              <v-checkbox return-object label="Show" style="margin:0 !important; padding:0 !important"
                v-model="pas"></v-checkbox>
            </div>
            <v-btn style="border-radius: 25px;" to="/profile" variant="flat" color="success" class="mt-2" type="submit" block>Login</v-btn>
            <v-btn variant="text" style="right:0;position: absolute" class="mt-4">Forgot your password?</v-btn>
          </v-form>
        </v-card>
      </v-col>
            </v-row>
    </div>
  </NuxtLayout>
</template>

<style scoped>
  .login{
    background-image: url('../../public/pexels-estudiopolaroid-3112004.jpg');
    background-size: cover;
    background-position: center;
    
  }
   </style>

<script setup>
  import { ref } from 'vue';
  const pas = ref("false")
  const password = ref("")
  const email = ref("")
  const rules= [
        value => {
          if (value) return true

          return 'You must enter this field.'
        }
      ];
</script>