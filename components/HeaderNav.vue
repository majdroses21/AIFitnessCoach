<template>
        <v-app-bar theme="dark" prominent>
            <v-app-bar-title class="text-h4 font-weight-bold">
                AI Fitness Coach
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn variant="text" :href="'#features'">Features</v-btn>
            <v-btn variant="text" to="/Healthy">healthy system</v-btn>
            <v-btn variant="text" to="/about">About us</v-btn>
            <v-btn variant="text" to="/contact">Contact us</v-btn>
            <!-- <v-btn variant="text">Community</v-btn> -->
            <v-btn href="" to="/login" color="lime lighten-1" variant="flat">Get Started</v-btn>
        </v-app-bar>
</template>