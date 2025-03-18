<template>
  <v-app>
    <v-layout>
      <!-- Sidebar -->
      <Sidebar />

      <v-layout>
        <!-- Header -->
        <GymHeader :pageName="pageName" />

        <!-- Main Content -->
        <v-main>
          <slot />
        </v-main>
      </v-layout>
    </v-layout>

    <LowerNav/>
  </v-app>
</template>
<script setup>

const pageName = 'AI Fitness Coach'
</script>
