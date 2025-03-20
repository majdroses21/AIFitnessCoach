<template>
    <v-app-bar class="pr-6" theme="" prominent>
        <v-app-bar-title class="text-button text-sm-4">
           {{ pageName }}
        </v-app-bar-title>
        <v-spacer class="hidden-xs"></v-spacer>
        <!-- <v-btn variant="text" to="/health-system">Health System</v-btn> -->
        <!-- <v-btn variant="text" to="/p2">Page 2</v-btn> -->
        <!-- <v-btn variant="text" to="/p3">AI Coach</v-btn> -->
        <!-- <v-btn href="#packages" color="lime lighten-1" variant="flat">Get Started</v-btn> -->
        <v-switch  @change="toggleTheme()"
         append-icon="mdi-theme-light-dark"
        >
    
        </v-switch>
    </v-app-bar>
</template>
<script setup>
 import { useTheme } from 'vuetify'
        const theme = useTheme()
        const themeCookie = useCookie('theme', { default: () => 'light' }) // استرجاع الثيم المحفوظ
        
        theme.global.name.value = themeCookie.value ;
        function toggleTheme() {
        const newTheme = theme.global.current.value.dark ? 'light' : 'dark';
        theme.global.name.value = newTheme;
          themeCookie.value = newTheme;
        }
defineProps({
    pageName: String
})

</script>