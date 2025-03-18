<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider" nav>
          <template v-slot:append>
            <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list class="mb-3" density="compact" nav>
          <NuxtLink to="/dashboard" style="all: unset;">
            <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
          </NuxtLink>

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
          
        </v-list>
        <v-btn prepend-icon="mdi-theme-light-dark" @click="toggleTheme()"
        ></v-btn>
      </v-navigation-drawer>
      <v-main style="height: 370px"></v-main>
    </v-layout>
  </v-card>
</template>
<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme()
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
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