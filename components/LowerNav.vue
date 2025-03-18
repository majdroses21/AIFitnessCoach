<template>
    <v-bottom-navigation class="mobile-nav" :elevation="1" grow>

        <v-btn value="favorites" to="/dashboard">
            <v-icon>mdi-home</v-icon>

            <span>Home</span>
        </v-btn>

        <v-btn value="/dashboard/health-system" to="/dashboard/health-system">
            <v-icon>mdi-food-apple</v-icon>

            <span>Health System</span>
        </v-btn>

        <v-btn value="/dashboard/exercises" to="/dashboard/exercises">
            <v-icon>mdi-dumbbell</v-icon>

            <span>Exercises</span>
        </v-btn>

        <v-btn value="/dashboard/Profile" to="/dashboard/Profile">
            <v-icon>mdi-account</v-icon>

            <span>Profile</span>
        </v-btn>

        <v-btn value="/dashboard/ai-coach" to="/dashboard/ai-coach">
            <v-icon>mdi-robot</v-icon>

            <span>AI Coach</span>
        </v-btn>
    </v-bottom-navigation>
</template>
<style scoped>
.mobile-nav {
  display: none; 
}

@media (max-width: 600px) { 
  .mobile-nav {
    display: block; 
  }
}
</style>