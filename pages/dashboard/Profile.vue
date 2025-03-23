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
                <v-text-field v-model="profile.age" label="age" type="number" outlined></v-text-field>
                <v-text-field v-model="profile.weight" label="weight" type="number" outlined></v-text-field>
                <v-text-field label="Tall" type="number" outlined></v-text-field>

                <v-select v-model="profile.gender" :items="genders" label="gender" outlined></v-select>

                <v-btn type="submit" color="primary" large>Update profile and regenerate AI plan</v-btn>
              </v-form>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-container>

  </NuxtLayout>
</template>


<script setup>
//TODO Add Loader To This Page
import axios from 'axios';
import { useAuthStore } from '~/store/auth';

definePageMeta({
  middleware: 'auth'
})
const apiUrl = useRuntimeConfig().public.API_URL;
const store = useAuthStore();
const userId = store.user._id;
const genders = ["Male", "Female"];
const profile = reactive({
  age: null,
  weight: null,
  height: null,
  gender: null,
});
onMounted(async () => {
  const { data } = await useFetch(apiUrl + '/profile/' + userId )
  const user = data.value.data.user;
  profile.age = user.personalInfo.age;
  profile.gender = user.personalInfo.gender;
  profile.height = user.healthMetrics.height;
  profile.weight = user.healthMetrics.weight;
  
})


const saveProfile = async () => {
  console.log('clicked');
  await axios.patch(apiUrl + '/profile/' + userId, profile, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
  }).then((response) => {
    const { generateNutritionPlan } = useFetch(apiUrl + '/ai/' + userId + '/nutrition-plan');
    const { generateWorkout } = useFetch(apiUrl + '/ai/' + userId + '/workout-plan');
    const { generateExercises } = useFetch(apiUrl + '/exercises/' + userId);
    navigateTo('/dashboard/exercises')
    // TODO Show Success Alert Here then wain 2s and go to exercises
    // setTimeout(() => {
      // Go here When add alert
    // }, 2000);

  });
}
</script>