<template>
  <NuxtLayout name="gym">
    <v-container class="pb-13">
      <v-row>
        <v-col lg="4" col="12">
          <p calss="text-primary">Name</p>
          <h1>{{ store.user.personalInfo.name }} </h1> 

        </v-col>
        <v-spacer></v-spacer>
        <v-col lg="6" cols="12">
          <v-card class="mx-auto" max-width="500">
            <v-card-title class="headline">Setup personal information</v-card-title>
            <v-card-text>
              <v-form ref="form" @submit.prevent="saveProfile">
                <v-text-field :rules="rules" v-model="profile.age" label="Age" type="number" outlined></v-text-field>

                <v-text-field :rules="rules" v-model="profile.weight" label="weight" type="number"
                  outlined></v-text-field>

                <v-text-field :rules="rules" v-model="profile.height" label="Tall" type="number"
                  outlined></v-text-field>

                <v-select :rules="rules" v-model="profile.gender" :items="genders" label="gender" outlined></v-select>

                <v-btn type="submit" color="primary" large to="/dashboard/exercises">generete exercises & Health
                  system</v-btn>
              </v-form>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-container>

  </NuxtLayout>
</template>


<script setup>
import { useAuthStore } from '~/store/auth';

definePageMeta({
  middleware: 'auth'
})

const store = useAuthStore();
const profile = {
  age: null,
  weight: null,
  height: null,
  gender: null,
  selectedFile: null,


};
const genders = ["male", "female"];



  const form = ref(null)
 const saveProfile = () => {
    // if ($refs.form.valid) {

    // }
  }
// alert("تم توليد نظام رياضي و صحي بنجاح ");
const rules = [
  value => {
    if (value) return true

    return 'You must enter this field.'
  }
];
</script>
