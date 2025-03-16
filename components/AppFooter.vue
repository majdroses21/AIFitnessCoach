<template>
    <v-footer
        class="bg-grey-darken-4 text-center d-flex flex-column" dark
      >
        <div>
          <v-btn
            v-for="icon in ['mdi-facebook', 'mdi-twitter', 'mdi-instagram']"
            :key="icon"
            class="mx-4"
            :icon="icon"
            variant="text"
          ></v-btn>
        </div>
  
        <div class="pt-4">
          <v-btn
            v-for="link in ['About us','Contact us', 'Science', 'Features','terms' , 'Privacy']"
            :key="link"
            variant="text"
            class="mx-3"
            color="white"
          >
            {{ link }}
          </v-btn>
        </div>
  
        <v-divider class="my-4"></v-divider>
  
        <div class="text-white">
          {{ new Date().getFullYear() }} — <strong>AI Fitness Coach</strong>
        </div>
      </v-footer>
</template>