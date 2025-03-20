<template>
  <div class="pa-4 text-center">
    <v-dialog persistent v-model="fls" max-width="600">
      <v-card prepend-icon="mdi-account" title="User Profile">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6" sm="6">
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
            </v-col>

          </v-row>

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" text="Save & Generate AI Plans" variant="tonal" @click="submitProfile() ,dialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import axios from 'axios';
import { useAuthStore } from '~/store/auth';
const fls = ref(false)
const apiUrl = useRuntimeConfig().public.API_URL

const store = useAuthStore();

let isCompleatInfo = ref(null);
const compleatProfile = reactive( {
  age: '',
  weight: '',
  height: '',
  gender: '',
  bodyFat: 18.2,
 
  activityLevel: "Very active",
  workout: ["Strength Training", "Yoga", "Swimming"],
  dietary: ["High Protein", "Low Carb"],
  availableEquipment: ["Dumbbells", "Resistance Bands", "Yoga Mat"],
  timeAvailability: 45,
  selectedFile: null,
});
const genders = ["male", "female"];
const userId = store.user._id;

const { data, error } = useFetch(apiUrl + '/profile/' + userId + '/completion', {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json'
  }
});
watch(data, (newValue) => {
  if (newValue && newValue.data) {
    console.log(newValue.data.isComplete, 88);
    isCompleatInfo.value = !newValue.data.isComplete;
  }
}, { immediate: true });

const submitProfile = async () => {
  try {
    const response = await axios.patch(apiUrl + '/profile/' + userId, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(compleatProfile)
    });

    if (!response.ok) throw new Error('Failed to update profile');

    const result = await response.json();
    console.log('Profile updated successfully:', result);
    navigateTo('/dashboard/exercises')

    // إغلاق الحوار بعد نجاح التحديث
    isCompleatInfo.value = false;
  } catch (err) {
    console.error('Error updating profile:', err);
  }
};

</script>