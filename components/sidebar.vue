<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer style="" v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider" nav>
          <template v-slot:append>
            <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list style="height:80%" class="mb-3" density="compact" nav>
      

          <NuxtLink to="/dashboard/health-system" style="all: unset;">
            <v-list-item prepend-icon="mdi-food-apple" title="Health System" value="/dashboard/health-system"></v-list-item>
          </NuxtLink>
          
          <NuxtLink to="/dashboard/exercises" style="all: unset;">
            <v-list-item prepend-icon="mdi-dumbbell" title="Exercises" value="exercises"></v-list-item>
          </NuxtLink>

          <NuxtLink to="/dashboard/ai-coach" style="all: unset;">
            <v-list-item prepend-icon="mdi-robot" title="AI Coach" value="ai-coach"></v-list-item>
          </NuxtLink>
          
          <NuxtLink to="/dashboard/Profile" style="all: unset;">
            <v-list-item prepend-icon="mdi-account" title="Profile" value="Profile"></v-list-item>
          </NuxtLink>
<<<<<<< HEAD
          <v-list-item style="position:absolute;bottom:0" class="text-red-darken-2 logout" prepend-icon="mdi-logout" title="logout" value="logout">
=======
          <v-list-item @click="logMeOut()" style="position:absolute;bottom:0" class="text-red-darken-2 logout" prepend-icon="mdi-logout" title="logout" value="logout">
>>>>>>> 187e2c0cf5c8eb0b2d2047666410bd74ffa78803
             <v-tooltip activator="parent">Logout</v-tooltip>

          </v-list-item>
        </v-list>
       
      </v-navigation-drawer>
      <v-main style="height: 100vh"></v-main>
    </v-layout>
  </v-card>
</template>
<style>
 .logout{transition: 0.4s;}
 .logout:hover{
  rotate: -20deg;
 }
</style>
<script setup>
<<<<<<< HEAD

=======
import { useAuthStore } from '~/store/auth';

const store = useAuthStore();
const logMeOut = () => {
  console.log('Get Out');
  store.logout()
}
>>>>>>> 187e2c0cf5c8eb0b2d2047666410bd74ffa78803
</script>
<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
    }
  },
}
</script>