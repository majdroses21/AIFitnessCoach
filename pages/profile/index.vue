<template>
    <NuxtLayout name="website">
            <v-container>
              <v-row>
                <v-col>
                  <p calss="text-primary">Name</p><h1>Ammar AJ </h1>
                </v-col>
                <v-col>
              <v-card class="mx-auto" max-width="500">
                <v-card-title class="headline">Setup personal information</v-card-title>
                <v-card-text>
                  <v-form ref="form" @submit.prevent="saveProfile">
                    <v-text-field
                    :rules="rules"
                      v-model="profile.age"
                      label="Age"
                      type="number"
                      outlined
                    ></v-text-field>
          
                    <v-text-field
                    :rules="rules"
                      v-model="profile.weight"
                      label="weight"
                      type="number"
                      outlined
                    ></v-text-field>
          
                    <v-text-field
                    :rules="rules"
                      v-model="profile.height"
                      label="Tall"
                      type="number"
                      outlined
                    ></v-text-field>
          
                    <v-select
                    :rules="rules"
                      v-model="profile.gender"
                      :items="genders"
                      label="gender"
                      outlined
                    ></v-select>
          
                    <v-btn type="submit" color="primary" large to="/exercises">generete exercises & Health system</v-btn>
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
      },
      genders: ["male", "female"],
    };
  },
  methods: {
    saveProfile() {
       if(this.$refs.form.valid){
        
       }

      console.log("تم توليد نظام رياضي و صحي بنجاح :", this.profile);
      alert("تم توليد نظام رياضي و صحي بنجاح ");
    },
  },
};
</script>

<script setup>
  const rules= [
        value => {
          if (value) return true

          return 'You must enter this field.'
        }
      ];
</script>