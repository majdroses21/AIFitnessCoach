<template>
    <NuxtLayout name="gym">
        <v-app>
            <v-progress-linear color="primary" class="mt-8" indeterminate height="30px" v-if="loading"> Wait to generete AI
                answere </v-progress-linear>
        <v-container v-if="!loading" fluid class=" pa-4">
           
            <v-row justify="center">
                <v-col cols="12" md="10" lg="8">
                    <v-card class="mb-1">
                        <v-card-title class="text-h4 primary--text">
                          <v-icon large left color="success">mdi-food-apple</v-icon>
                          Healthy System
                        
                        </v-card-title>
          
                        <v-card-subtitle>Your way to a healthy, integrated diet</v-card-subtitle>
                      </v-card>
                </v-col>
                <v-col cols="12" md="10" lg="8">
                    <v-card class="pa-6 mb-6">
                        <h1 class="text-h4 font-weight-bold mb-2">{{ systemName }}</h1>
                        <p class="text-body-1 mb-4">
                            {{ formatDate(startDate) }} - {{ formatDate(endDate) }}
                        </p>

                        <!-- Day Selection -->
                        <v-sheet class="d-flex overflow-x-auto mb-6 pb-2">
                            <v-btn v-for="day in 7" :key="day" @click="activeDay = day"
                                :color="activeDay === day ? 'primary' : 'grey-lighten-1'" variant="flat" class="mx-1"
                                rounded>
                                Day {{ day }}
                            </v-btn>
                        </v-sheet>

                        <!-- Daily Content -->
                        <div class="mb-6">
                            <h2 class="text-h5 font-weight-medium mb-3">{{ getDateForDay(activeDay) }}</h2>

                            <!-- Nutrition Progress -->
                            <v-card class="pa-4 mb-6">
                                <h3 class="text-h6 font-weight-medium mb-3">Daily Nutrition</h3>
                                <v-row>
                                    <v-col cols="12" md="6" v-for="(macro, key) in dailyMacros" :key="key">
                                        <div class="d-flex justify-space-between mb-1">
                                            <span class="text-capitalize">{{ key }}</span>
                                            <span>{{ dailyTotals[key] }} / {{ dailyTargets[key] }}{{ key ===
                                                'calories' ? 'kcal' : 'g' }}</span>
                                        </div>
                                        <v-progress-linear
                                            :model-value="calculateProgressPercentage(dailyTotals[key], dailyTargets[key])"
                                            :color="macro.color" height="8" rounded></v-progress-linear>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <!-- Meals -->
                            <div>
                                <h3 class="text-h6 font-weight-medium mb-4">Meals</h3>
                                <v-card v-for="(meal, idx) in mealsByDay[activeDay]" :key="idx" class="mb-4 pa-4"
                                    variant="outlined">
                                    <h4 class="text-h6 font-weight-medium mb-2">{{ meal.mealType }}</h4>
                                    <v-card v-for="(recipe, recipeIdx) in meal.recipes" :key="recipeIdx"
                                        class="mb-4 pa-3" variant="flat">
                                        <v-card-title class="text-h6">{{ recipe.name }}</v-card-title>

                                        <v-card-text>
                                            <div class="mb-3">
                                                <span class="font-weight-medium">Ingredients:</span>
                                                <v-list density="compact" class="mt-1">
                                                    <v-list-item v-for="(ingredient, ingIdx) in recipe.ingredients"
                                                        :key="ingIdx" :title="ingredient" class="pa-0"></v-list-item>
                                                </v-list>
                                            </div>

                                            <v-row>
                                                <v-col v-for="(value, key) in recipe.nutrition" :key="key" cols="6"
                                                    sm="3">
                                                    <v-card variant="flat" class="pa-2 text-center bg-grey-lighten-4">
                                                        <div class="font-weight-medium">{{ value }}{{ key === 'calories'
                                                            ? '' : 'g' }}</div>
                                                        <div class="text-caption text-grey-darken-1 text-capitalize">{{
                                                            key }}</div>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-card>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
    </NuxtLayout>

</template>


<script setup>
import axios from 'axios';
import { useAuthStore } from '~/store/auth';
const apiUrl = useRuntimeConfig().public.API_URL
const store = useAuthStore();
const userId = store.user._id; 
const calories = ref(null);
const carbs = ref(null);
const fats = ref(null);
const protein = ref(null);
const startDate = ref(null);
const endDate = ref(null);
const systemName = ref(null);
const meals = ref(null);
const dailyTargets = ref(null);
let loading = ref(null)




loading.value = true
axios.get(apiUrl+ `/ai/${userId}/nutrition-plan/user`).then((res) => {
    loading.value = false
    const dt = res.data.data[0];
    calories.value = dt.dailyTargets.calories;
    carbs.value = dt.dailyTargets.carbs;
    fats.value = dt.dailyTargets.fats;
    protein.value = dt.dailyTargets.protein;
    calories.value = dt.dailyTargets.calories;
    startDate.value = dt.startDate;
    endDate.value = dt.endDate;
    meals.value = dt.meals;
    systemName.value = dt.name;
    dailyTargets.value = dt.dailyTargets;
    
})


definePageMeta({
  middleware: 'auth'
})

const activeDay = ref(1);

const dailyMacros = reactive({
  calories: { color: 'blue' },
  protein: { color: 'red' },
  carbs: { color: 'amber' },
  fats: { color: 'green' }
});



const mealOrder = {
  Breakfast: 1,
  'Snack 1': 2,
  Lunch: 3,
  'Snack 2': 4,
  Dinner: 5
};

const mealsByDay = computed(() => {
  const organized = {};
  for (let day = 1; day <= 7; day++) {
    organized[day] = meals.value
      .filter(meal => meal.day === day)
      .sort((a, b) => mealOrder[a.mealType] - mealOrder[b.mealType]);
  }
  return organized;
});

const calculateDailyNutrition = day => {
  return mealsByDay.value[day]?.reduce(
    (totals, meal) => {
      meal.recipes.forEach(recipe => {
        totals.calories += recipe.nutrition.calories;
        totals.protein += recipe.nutrition.protein;
        totals.carbs += recipe.nutrition.carbs;
        totals.fats += recipe.nutrition.fats;
      });
      return totals;
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );
};

const dailyTotals = computed(() => calculateDailyNutrition(activeDay.value));

const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
};

const getDateForDay = day => {
  const _startDate = new Date(startDate.value);
  const date = new Date(_startDate);
  date.setDate(_startDate.getDate() + day - 1);
  return formatDate(date);
};

const calculateProgressPercentage = (actual, target) => Math.min(100, (actual / target) * 100);
</script>