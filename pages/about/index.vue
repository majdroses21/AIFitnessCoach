<template>
    <NuxtLayout name="website">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <h1 class="text-h2 font-weight-bold primary--text mb-4">About Us</h1>
            <p class="text-h6 secondary--text">
              We are dedicated to helping you achieve your fitness goals.
            </p>
          </v-col>
        </v-row>
  
        <v-row class="mt-8">
          <v-col cols="12" md="6">
            <v-img
              src="../../public/aboutImg.jpg"
              alt="Gym Image"
              class="rounded-lg"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="text-h4 font-weight-bold primary--text mb-4">Our Mission</h2>
            <p class="text-body-1 secondary--text">
              At our gym, we believe in empowering individuals to lead healthier lives. Our mission is to provide a welcoming
              environment where everyone, regardless of their fitness level, can achieve their goals. With state-of-the-art
              equipment, expert trainers, and a supportive community, we are here to guide you every step of the way.
            </p>
            <v-btn color="primary" class="mt-4" to="/contact">Contact Us</v-btn>
          </v-col>
        </v-row>
  
        <v-row class="mt-8">
          <v-col cols="12" class="text-center">
            <h2 class="text-h4 font-weight-bold primary--text mb-4">Why Choose Us?</h2>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-4 text-center">
              <v-icon size="64" color="primary">mdi-dumbbell</v-icon>
              <h3 class="text-h5 font-weight-bold mt-4">Modern Equipment</h3>
              <p class="text-body-1 secondary--text">
                We offer the latest fitness equipment to ensure you get the best workout experience.
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-4 text-center">
              <v-icon size="64" color="primary">mdi-account-group</v-icon>
              <h3 class="text-h5 font-weight-bold mt-4">Expert Trainers</h3>
              <p class="text-body-1 secondary--text">
                Our certified trainers are here to guide you and help you reach your fitness goals.
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-4 text-center">
              <v-icon size="64" color="primary">mdi-heart</v-icon>
              <h3 class="text-h5 font-weight-bold mt-4">Supportive Community</h3>
              <p class="text-body-1 secondary--text">
                Join a community of like-minded individuals who are passionate about fitness.
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </NuxtLayout>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .rounded-lg {
    border-radius: 12px;
  }
  </style>