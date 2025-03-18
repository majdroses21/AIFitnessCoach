<template>
  <NuxtLayout name="gym">
    <v-container>
      <v-row>
        <v-col lg="4" col="12">
          <p calss="text-primary">Name</p>
          <h1>Ammar AJ </h1>
            
          <v-avatar color="grey" rounded="10" size="90" >
            <v-img :src="this.image2" cover></v-img>
          </v-avatar>
        <v-file-input style="" class="bg-orange  mt-10" v-model="this.image2" @change="this.onFileSelected2()"
        label="صورة الحساب" type="file" accept="image/*" placeholder="Pick an avatar"
        append-icon="mdi-camera"></v-file-input>
        <v-btn class="mt-4" @click="console.log(this.image2)">تغيير</v-btn>
        <pre> {{ this.image2 }} </pre>

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

                <v-btn type="submit" color="primary" large to="/dashboard/exercises">generete exercises & Health system</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
     
        </v-col>
      </v-row>
    </v-container>
 
  </NuxtLayout>
</template>


<script>
export default {
  data() {
    return {
      profile: {
        age: null,
        weight: null,
        height: null,
        gender: null,
        selectedFile: null,
      
        image2:"",

      },
      genders: ["male", "female"],
    };
  },
  methods: {
    onFileSelected2: function () {

const allowedTypes = ['image/jpeg', 'image/png'];
if (this.image2) {
    if (allowedTypes.includes(this.image2.type)) {
        const objectURL = URL.createObjectURL(this.image2);
        this.image2 = objectURL;
    }else { this.err = true; this.image2 = '' }
}
},
    saveProfile() {
      if (this.$refs.form.valid) {

      }

      console.log("تم توليد نظام رياضي و صحي بنجاح :", this.profile);
      alert("تم توليد نظام رياضي و صحي بنجاح ");
    },
  },
};
</script>

<script setup>
const rules = [
  value => {
    if (value) return true

    return 'You must enter this field.'
  }
];
</script>