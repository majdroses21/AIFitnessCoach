<template>
        <v-app-bar theme="dark" prominent>
            <v-app-bar-title style="min-width:70px" class="text-h4 text-sm-button hidden-sm-and-down font-weight-bold">
                AI Fitness Coach
            </v-app-bar-title>
            <v-app-bar-title style="min-width:70px" class="text-h4 hidden-md-and-up font-weight-bold">
                <v-icon>mdi-dumbbell</v-icon>
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn
            class="hidden-md-and-up"
      color="lime lighten-1"
    >Menu
      <v-icon>mdi-menu-down-outline</v-icon>

      <v-menu activator="parent">
        <v-list>
          <v-list-item>
            <v-btn href="" to="/login" color="lime lighten-1" variant="flat">Get Started</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn variant="text" :href="'#science'">Science</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn variant="text" to="/about">About us</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn variant="text" to="/contact">Contact us</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn variant="text" :href="'#features'">Features</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
    <v-btn class="hidden-sm-and-down" variant="text" to="/">Home</v-btn>
            <v-btn class="hidden-sm-and-down" variant="text" :href="'#features'">Features</v-btn>
            
            <v-btn class="hidden-sm-and-down" variant="text" :href="'#science'">Science</v-btn>
            <v-btn class="hidden-sm-and-down" variant="text" to="/about">About us</v-btn>
            <v-btn class="hidden-sm-and-down" variant="text" to="/contact">Contact us</v-btn>
            <!-- <v-btn variant="text">Community</v-btn> -->
            <v-btn class="hidden-sm-and-down" href="" to="/login" color="lime lighten-1" variant="flat">Get Started</v-btn>
        </v-app-bar>
</template>