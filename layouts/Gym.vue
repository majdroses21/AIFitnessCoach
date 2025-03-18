<template>
  <v-app>
    <v-layout>
      <!-- Sidebar -->
      <Sidebar class="hidden-sm-and-down" />

      <v-layout>
        <!-- Header -->
        <GymHeader :pageName="pageName" />

        <!-- Main Content -->
        <v-main>
          <slot />
        </v-main>
      </v-layout>
    </v-layout>

    <LowerNav class="hidden-md-and-up"/>
  </v-app>
</template>
<script setup>

const pageName = 'AI Fitness Coach'
</script>
