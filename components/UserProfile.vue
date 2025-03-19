<template>
  <div class="pa-4 text-center">
    <v-dialog persistent v-model="isCompleatInfo" max-width="600">
      <v-card prepend-icon="mdi-account" title="User Profile">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6" sm="6">
              <v-text-field :rules="rules" v-model="profile.age" label="Age" type="number" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field :rules="rules" v-model="profile.height" label="Tall" type="number" outlined />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field :rules="rules" v-model="profile.weight" label="weight" type="number" outlined />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select :rules="rules" v-model="profile.gender" :items="genders" label="gender" outlined />
            </v-col>

          </v-row>

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" text="Save" variant="tonal" @click="dialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>

const apiUrl = useRuntimeConfig().public.API_URL
let dialog = 1;
let isCompleatInfo = ref(null);
// let dialog = ref(false);
const profile = {
  age: null,
  weight: null,

  height: null,
  gender: null,
  selectedFile: null,
};
const genders = ["male", "female"];
const userId = '67dad9b394bdca3398b4bfc4';

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



</script>