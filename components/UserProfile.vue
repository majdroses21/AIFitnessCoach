<template>
  <div class="pa-4 text-center">
    <v-dialog persistent v-model="isCompleatInfo" max-width="600">
      <v-card prepend-icon="mdi-account" title="User Profile">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6" sm="6">
<<<<<<< HEAD
              <v-text-field :rules="rules" v-model="compleatProfile.age" label="Age" type="number" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field :rules="rules" v-model="compleatProfile.height" label="Tall" type="number" outlined />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field :rules="rules" v-model="compleatProfile.weight" label="weight" type="number" outlined />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select :rules="rules" v-model="compleatProfile.gender" :items="genders" label="gender" outlined />
=======
              <v-text-field :error-messages="v$.age.$errors.map(e => e.$message)" v-model="compleatProfile.age"
                label="Age" type="number" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field :error-messages="v$.height.$errors.map(e => e.$message)" v-model="compleatProfile.height"
                label="Tall" type="number" outlined />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field :error-messages="v$.weight.$errors.map(e => e.$message)" v-model="compleatProfile.weight"
                label="weight" type="number" outlined />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select :error-messages="v$.gender.$errors.map(e => e.$message)" v-model="compleatProfile.gender"
                :items="genders" label="gender" outlined />
>>>>>>> 187e2c0cf5c8eb0b2d2047666410bd74ffa78803
            </v-col>

          </v-row>

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

<<<<<<< HEAD
          <v-btn color="primary" text="Save & Generate AI Plans" variant="tonal" @click="submitProfile() ,dialog = false"></v-btn>
=======
          <v-btn color="primary" text="Save & Generate AI Plans" variant="tonal"
            @click="submitProfile(), dialog = false"></v-btn>
>>>>>>> 187e2c0cf5c8eb0b2d2047666410bd74ffa78803
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import axios from 'axios';
import { useAuthStore } from '~/store/auth';
<<<<<<< HEAD
=======
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
>>>>>>> 187e2c0cf5c8eb0b2d2047666410bd74ffa78803
const fls = ref(false)
const apiUrl = useRuntimeConfig().public.API_URL

const store = useAuthStore();

let isCompleatInfo = ref(null);
<<<<<<< HEAD
const compleatProfile = reactive( {
=======
const compleatProfile = reactive({
>>>>>>> 187e2c0cf5c8eb0b2d2047666410bd74ffa78803
  age: '',
  weight: '',
  height: '',
  gender: '',
  bodyFat: 18.2,
<<<<<<< HEAD
 
=======

>>>>>>> 187e2c0cf5c8eb0b2d2047666410bd74ffa78803
  activityLevel: "Very active",
  workout: ["Strength Training", "Yoga", "Swimming"],
  dietary: ["High Protein", "Low Carb"],
  availableEquipment: ["Dumbbells", "Resistance Bands", "Yoga Mat"],
  timeAvailability: 45,
  selectedFile: null,
});
<<<<<<< HEAD
const genders = ["male", "female"];
=======
const rules = {
  age: { required },
  weight: { required },
  height: { required },
  gender: { required },
};

const v$ = useVuelidate(rules, compleatProfile);
const genders = ["Male", "Female"];
>>>>>>> 187e2c0cf5c8eb0b2d2047666410bd74ffa78803
const userId = store.user._id;

const { data, error } = useFetch(apiUrl + '/profile/' + userId + '/completion', {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json'
  }
});
watch(data, (newValue) => {
  if (newValue && newValue.data) {
<<<<<<< HEAD
    console.log(newValue.data.isComplete, 88);
=======
>>>>>>> 187e2c0cf5c8eb0b2d2047666410bd74ffa78803
    isCompleatInfo.value = !newValue.data.isComplete;
  }
}, { immediate: true });

const submitProfile = async () => {
<<<<<<< HEAD
  try {
    const response = await axios.patch(apiUrl + '/profile/' + userId, {
=======
  const isValid = await v$.value.$validate();
  console.log(isValid);
  if (!isValid) return;
  try {
    await axios.patch(apiUrl + '/profile/' + userId, compleatProfile, {
>>>>>>> 187e2c0cf5c8eb0b2d2047666410bd74ffa78803
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
<<<<<<< HEAD
      body: JSON.stringify(compleatProfile)
    });

    if (!response.ok) throw new Error('Failed to update profile');

    const result = await response.json();
    console.log('Profile updated successfully:', result);
    navigateTo('/dashboard/exercises')

    // إغلاق الحوار بعد نجاح التحديث
    isCompleatInfo.value = false;
=======
    }).then((response) => {
      console.log(response);
      isCompleatInfo.value = false;
      const { generateNutritionPlan } = useFetch(apiUrl + '/ai/' + userId + '/nutrition-plan');
      const { generateWorkout } = useFetch(apiUrl + '/ai/' + userId + '/workout-plan');
      const { generateExercises } = useFetch(apiUrl + '/exercises/' + userId );
      //TODO Show Alert Here

    });
>>>>>>> 187e2c0cf5c8eb0b2d2047666410bd74ffa78803
  } catch (err) {
    console.error('Error updating profile:', err);
  }
};

</script>