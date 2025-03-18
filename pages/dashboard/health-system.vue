<template>
    <NuxtLayout name="gym">
        <v-app>
        <v-container fluid class=" pa-4">
           
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
                        <h1 class="text-h4 font-weight-bold mb-2">{{ planData.name }}</h1>
                        <p class="text-body-1 mb-4">
                            {{ formatDate(planData.startDate) }} - {{ formatDate(planData.endDate) }}
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
                                            <span>{{ dailyTotals[key] }} / {{ planData.dailyTargets[key] }}{{ key ===
                                                'calories' ? 'kcal' : 'g' }}</span>
                                        </div>
                                        <v-progress-linear
                                            :model-value="calculateProgressPercentage(dailyTotals[key], planData.dailyTargets[key])"
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

<script>
export default {
    data() {
        return {
            activeDay: 1,
            dailyMacros: {
                calories: { color: 'blue' },
                protein: { color: 'red' },
                carbs: { color: 'amber' },
                fats: { color: 'green' }
            },
            planData: {
                "name": "Custom Nutrition Plan for 20-Year-Old Male",
                "startDate": "2025-03-15T22:49:38.552Z",
                "endDate": "2025-03-22T22:49:38.552Z",
                "dailyTargets": {
                    "calories": 2500,
                    "protein": 150,
                    "carbs": 250,
                    "fats": 80
                },
                "meals": [
                    {
                        "day": 1,
                        "mealType": "Breakfast",
                        "recipes": [
                            {
                                "name": "Oatmeal with Berries and Nuts",
                                "ingredients": [
                                    "50g rolled oats",
                                    "200ml milk (almond/soy)",
                                    "50g mixed berries",
                                    "20g chopped almonds"
                                ],
                                "nutrition": {
                                    "calories": 350,
                                    "protein": 12,
                                    "carbs": 50,
                                    "fats": 10
                                },
                                "_id": "67d60402d62ff17a5f2a5da6"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5da5"
                    },
                    {
                        "day": 2,
                        "mealType": "Breakfast",
                        "recipes": [
                            {
                                "name": "Oatmeal with Berries and Nuts",
                                "ingredients": [
                                    "50g rolled oats",
                                    "200ml milk (almond/soy)",
                                    "50g mixed berries",
                                    "20g chopped almonds"
                                ],
                                "nutrition": {
                                    "calories": 350,
                                    "protein": 12,
                                    "carbs": 50,
                                    "fats": 10
                                },
                                "_id": "67d60402d62ff17a5f2a5da8"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5da7"
                    },
                    {
                        "day": 3,
                        "mealType": "Breakfast",
                        "recipes": [
                            {
                                "name": "Oatmeal with Berries and Nuts",
                                "ingredients": [
                                    "50g rolled oats",
                                    "200ml milk (almond/soy)",
                                    "50g mixed berries",
                                    "20g chopped almonds"
                                ],
                                "nutrition": {
                                    "calories": 350,
                                    "protein": 12,
                                    "carbs": 50,
                                    "fats": 10
                                },
                                "_id": "67d60402d62ff17a5f2a5daa"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5da9"
                    },
                    {
                        "day": 4,
                        "mealType": "Breakfast",
                        "recipes": [
                            {
                                "name": "Oatmeal with Berries and Nuts",
                                "ingredients": [
                                    "50g rolled oats",
                                    "200ml milk (almond/soy)",
                                    "50g mixed berries",
                                    "20g chopped almonds"
                                ],
                                "nutrition": {
                                    "calories": 350,
                                    "protein": 12,
                                    "carbs": 50,
                                    "fats": 10
                                },
                                "_id": "67d60402d62ff17a5f2a5dac"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dab"
                    },
                    {
                        "day": 5,
                        "mealType": "Breakfast",
                        "recipes": [
                            {
                                "name": "Oatmeal with Berries and Nuts",
                                "ingredients": [
                                    "50g rolled oats",
                                    "200ml milk (almond/soy)",
                                    "50g mixed berries",
                                    "20g chopped almonds"
                                ],
                                "nutrition": {
                                    "calories": 350,
                                    "protein": 12,
                                    "carbs": 50,
                                    "fats": 10
                                },
                                "_id": "67d60402d62ff17a5f2a5dae"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dad"
                    },
                    {
                        "day": 6,
                        "mealType": "Breakfast",
                        "recipes": [
                            {
                                "name": "Oatmeal with Berries and Nuts",
                                "ingredients": [
                                    "50g rolled oats",
                                    "200ml milk (almond/soy)",
                                    "50g mixed berries",
                                    "20g chopped almonds"
                                ],
                                "nutrition": {
                                    "calories": 350,
                                    "protein": 12,
                                    "carbs": 50,
                                    "fats": 10
                                },
                                "_id": "67d60402d62ff17a5f2a5db0"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5daf"
                    },
                    {
                        "day": 7,
                        "mealType": "Breakfast",
                        "recipes": [
                            {
                                "name": "Oatmeal with Berries and Nuts",
                                "ingredients": [
                                    "50g rolled oats",
                                    "200ml milk (almond/soy)",
                                    "50g mixed berries",
                                    "20g chopped almonds"
                                ],
                                "nutrition": {
                                    "calories": 350,
                                    "protein": 12,
                                    "carbs": 50,
                                    "fats": 10
                                },
                                "_id": "67d60402d62ff17a5f2a5db2"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5db1"
                    },
                    {
                        "day": 1,
                        "mealType": "Snack 1",
                        "recipes": [
                            {
                                "name": "Apple slices with peanut butter",
                                "ingredients": [
                                    "1 medium apple",
                                    "20g peanut butter"
                                ],
                                "nutrition": {
                                    "calories": 200,
                                    "protein": 6,
                                    "carbs": 25,
                                    "fats": 12
                                },
                                "_id": "67d60402d62ff17a5f2a5db4"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5db3"
                    },
                    {
                        "day": 2,
                        "mealType": "Snack 1",
                        "recipes": [
                            {
                                "name": "Apple slices with peanut butter",
                                "ingredients": [
                                    "1 medium apple",
                                    "20g peanut butter"
                                ],
                                "nutrition": {
                                    "calories": 200,
                                    "protein": 6,
                                    "carbs": 25,
                                    "fats": 12
                                },
                                "_id": "67d60402d62ff17a5f2a5db6"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5db5"
                    },
                    {
                        "day": 3,
                        "mealType": "Snack 1",
                        "recipes": [
                            {
                                "name": "Apple slices with peanut butter",
                                "ingredients": [
                                    "1 medium apple",
                                    "20g peanut butter"
                                ],
                                "nutrition": {
                                    "calories": 200,
                                    "protein": 6,
                                    "carbs": 25,
                                    "fats": 12
                                },
                                "_id": "67d60402d62ff17a5f2a5db8"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5db7"
                    },
                    {
                        "day": 4,
                        "mealType": "Snack 1",
                        "recipes": [
                            {
                                "name": "Apple slices with peanut butter",
                                "ingredients": [
                                    "1 medium apple",
                                    "20g peanut butter"
                                ],
                                "nutrition": {
                                    "calories": 200,
                                    "protein": 6,
                                    "carbs": 25,
                                    "fats": 12
                                },
                                "_id": "67d60402d62ff17a5f2a5dba"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5db9"
                    },
                    {
                        "day": 5,
                        "mealType": "Snack 1",
                        "recipes": [
                            {
                                "name": "Apple slices with peanut butter",
                                "ingredients": [
                                    "1 medium apple",
                                    "20g peanut butter"
                                ],
                                "nutrition": {
                                    "calories": 200,
                                    "protein": 6,
                                    "carbs": 25,
                                    "fats": 12
                                },
                                "_id": "67d60402d62ff17a5f2a5dbc"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dbb"
                    },
                    {
                        "day": 6,
                        "mealType": "Snack 1",
                        "recipes": [
                            {
                                "name": "Apple slices with peanut butter",
                                "ingredients": [
                                    "1 medium apple",
                                    "20g peanut butter"
                                ],
                                "nutrition": {
                                    "calories": 200,
                                    "protein": 6,
                                    "carbs": 25,
                                    "fats": 12
                                },
                                "_id": "67d60402d62ff17a5f2a5dbe"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dbd"
                    },
                    {
                        "day": 7,
                        "mealType": "Snack 1",
                        "recipes": [
                            {
                                "name": "Apple slices with peanut butter",
                                "ingredients": [
                                    "1 medium apple",
                                    "20g peanut butter"
                                ],
                                "nutrition": {
                                    "calories": 200,
                                    "protein": 6,
                                    "carbs": 25,
                                    "fats": 12
                                },
                                "_id": "67d60402d62ff17a5f2a5dc0"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dbf"
                    },
                    {
                        "day": 1,
                        "mealType": "Lunch",
                        "recipes": [
                            {
                                "name": "Chicken Salad Sandwich",
                                "ingredients": [
                                    "100g grilled chicken breast",
                                    "2 slices whole-wheat bread",
                                    "50g lettuce",
                                    "20g tomato"
                                ],
                                "nutrition": {
                                    "calories": 300,
                                    "protein": 30,
                                    "carbs": 30,
                                    "fats": 5
                                },
                                "_id": "67d60402d62ff17a5f2a5dc2"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dc1"
                    },
                    {
                        "day": 2,
                        "mealType": "Lunch",
                        "recipes": [
                            {
                                "name": "Chicken Salad Sandwich",
                                "ingredients": [
                                    "100g grilled chicken breast",
                                    "2 slices whole-wheat bread",
                                    "50g lettuce",
                                    "20g tomato"
                                ],
                                "nutrition": {
                                    "calories": 300,
                                    "protein": 30,
                                    "carbs": 30,
                                    "fats": 5
                                },
                                "_id": "67d60402d62ff17a5f2a5dc4"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dc3"
                    },
                    {
                        "day": 3,
                        "mealType": "Lunch",
                        "recipes": [
                            {
                                "name": "Chicken Salad Sandwich",
                                "ingredients": [
                                    "100g grilled chicken breast",
                                    "2 slices whole-wheat bread",
                                    "50g lettuce",
                                    "20g tomato"
                                ],
                                "nutrition": {
                                    "calories": 300,
                                    "protein": 30,
                                    "carbs": 30,
                                    "fats": 5
                                },
                                "_id": "67d60402d62ff17a5f2a5dc6"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dc5"
                    },
                    {
                        "day": 4,
                        "mealType": "Lunch",
                        "recipes": [
                            {
                                "name": "Chicken Salad Sandwich",
                                "ingredients": [
                                    "100g grilled chicken breast",
                                    "2 slices whole-wheat bread",
                                    "50g lettuce",
                                    "20g tomato"
                                ],
                                "nutrition": {
                                    "calories": 300,
                                    "protein": 30,
                                    "carbs": 30,
                                    "fats": 5
                                },
                                "_id": "67d60402d62ff17a5f2a5dc8"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dc7"
                    },
                    {
                        "day": 5,
                        "mealType": "Lunch",
                        "recipes": [
                            {
                                "name": "Chicken Salad Sandwich",
                                "ingredients": [
                                    "100g grilled chicken breast",
                                    "2 slices whole-wheat bread",
                                    "50g lettuce",
                                    "20g tomato"
                                ],
                                "nutrition": {
                                    "calories": 300,
                                    "protein": 30,
                                    "carbs": 30,
                                    "fats": 5
                                },
                                "_id": "67d60402d62ff17a5f2a5dca"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dc9"
                    },
                    {
                        "day": 6,
                        "mealType": "Lunch",
                        "recipes": [
                            {
                                "name": "Chicken Salad Sandwich",
                                "ingredients": [
                                    "100g grilled chicken breast",
                                    "2 slices whole-wheat bread",
                                    "50g lettuce",
                                    "20g tomato"
                                ],
                                "nutrition": {
                                    "calories": 300,
                                    "protein": 30,
                                    "carbs": 30,
                                    "fats": 5
                                },
                                "_id": "67d60402d62ff17a5f2a5dcc"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dcb"
                    },
                    {
                        "day": 7,
                        "mealType": "Lunch",
                        "recipes": [
                            {
                                "name": "Chicken Salad Sandwich",
                                "ingredients": [
                                    "100g grilled chicken breast",
                                    "2 slices whole-wheat bread",
                                    "50g lettuce",
                                    "20g tomato"
                                ],
                                "nutrition": {
                                    "calories": 300,
                                    "protein": 30,
                                    "carbs": 30,
                                    "fats": 5
                                },
                                "_id": "67d60402d62ff17a5f2a5dce"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dcd"
                    },
                    {
                        "day": 1,
                        "mealType": "Snack 2",
                        "recipes": [
                            {
                                "name": "Greek Yogurt with banana",
                                "ingredients": [
                                    "150g Greek yogurt",
                                    "1/2 banana"
                                ],
                                "nutrition": {
                                    "calories": 180,
                                    "protein": 15,
                                    "carbs": 20,
                                    "fats": 5
                                },
                                "_id": "67d60402d62ff17a5f2a5dd0"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dcf"
                    },
                    {
                        "day": 2,
                        "mealType": "Snack 2",
                        "recipes": [
                            {
                                "name": "Greek Yogurt with banana",
                                "ingredients": [
                                    "150g Greek yogurt",
                                    "1/2 banana"
                                ],
                                "nutrition": {
                                    "calories": 180,
                                    "protein": 15,
                                    "carbs": 20,
                                    "fats": 5
                                },
                                "_id": "67d60402d62ff17a5f2a5dd2"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dd1"
                    },
                    {
                        "day": 3,
                        "mealType": "Snack 2",
                        "recipes": [
                            {
                                "name": "Greek Yogurt with banana",
                                "ingredients": [
                                    "150g Greek yogurt",
                                    "1/2 banana"
                                ],
                                "nutrition": {
                                    "calories": 180,
                                    "protein": 15,
                                    "carbs": 20,
                                    "fats": 5
                                },
                                "_id": "67d60402d62ff17a5f2a5dd4"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dd3"
                    },
                    {
                        "day": 4,
                        "mealType": "Snack 2",
                        "recipes": [
                            {
                                "name": "Greek Yogurt with banana",
                                "ingredients": [
                                    "150g Greek yogurt",
                                    "1/2 banana"
                                ],
                                "nutrition": {
                                    "calories": 180,
                                    "protein": 15,
                                    "carbs": 20,
                                    "fats": 5
                                },
                                "_id": "67d60402d62ff17a5f2a5dd6"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dd5"
                    },
                    {
                        "day": 5,
                        "mealType": "Snack 2",
                        "recipes": [
                            {
                                "name": "Greek Yogurt with banana",
                                "ingredients": [
                                    "150g Greek yogurt",
                                    "1/2 banana"
                                ],
                                "nutrition": {
                                    "calories": 180,
                                    "protein": 15,
                                    "carbs": 20,
                                    "fats": 5
                                },
                                "_id": "67d60402d62ff17a5f2a5dd8"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dd7"
                    },
                    {
                        "day": 6,
                        "mealType": "Snack 2",
                        "recipes": [
                            {
                                "name": "Greek Yogurt with banana",
                                "ingredients": [
                                    "150g Greek yogurt",
                                    "1/2 banana"
                                ],
                                "nutrition": {
                                    "calories": 180,
                                    "protein": 15,
                                    "carbs": 20,
                                    "fats": 5
                                },
                                "_id": "67d60402d62ff17a5f2a5dda"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5dd9"
                    },
                    {
                        "day": 7,
                        "mealType": "Snack 2",
                        "recipes": [
                            {
                                "name": "Greek Yogurt with banana",
                                "ingredients": [
                                    "150g Greek yogurt",
                                    "1/2 banana"
                                ],
                                "nutrition": {
                                    "calories": 180,
                                    "protein": 15,
                                    "carbs": 20,
                                    "fats": 5
                                },
                                "_id": "67d60402d62ff17a5f2a5ddc"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5ddb"
                    },
                    {
                        "day": 1,
                        "mealType": "Dinner",
                        "recipes": [
                            {
                                "name": "Salmon with roasted vegetables",
                                "ingredients": [
                                    "120g salmon fillet",
                                    "100g broccoli",
                                    "50g carrots",
                                    "1 tbsp olive oil"
                                ],
                                "nutrition": {
                                    "calories": 400,
                                    "protein": 30,
                                    "carbs": 20,
                                    "fats": 20
                                },
                                "_id": "67d60402d62ff17a5f2a5dde"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5ddd"
                    },
                    {
                        "day": 2,
                        "mealType": "Dinner",
                        "recipes": [
                            {
                                "name": "Salmon with roasted vegetables",
                                "ingredients": [
                                    "120g salmon fillet",
                                    "100g broccoli",
                                    "50g carrots",
                                    "1 tbsp olive oil"
                                ],
                                "nutrition": {
                                    "calories": 400,
                                    "protein": 30,
                                    "carbs": 20,
                                    "fats": 20
                                },
                                "_id": "67d60402d62ff17a5f2a5de0"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5ddf"
                    },
                    {
                        "day": 3,
                        "mealType": "Dinner",
                        "recipes": [
                            {
                                "name": "Salmon with roasted vegetables",
                                "ingredients": [
                                    "120g salmon fillet",
                                    "100g broccoli",
                                    "50g carrots",
                                    "1 tbsp olive oil"
                                ],
                                "nutrition": {
                                    "calories": 400,
                                    "protein": 30,
                                    "carbs": 20,
                                    "fats": 20
                                },
                                "_id": "67d60402d62ff17a5f2a5de2"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5de1"
                    },
                    {
                        "day": 4,
                        "mealType": "Dinner",
                        "recipes": [
                            {
                                "name": "Salmon with roasted vegetables",
                                "ingredients": [
                                    "120g salmon fillet",
                                    "100g broccoli",
                                    "50g carrots",
                                    "1 tbsp olive oil"
                                ],
                                "nutrition": {
                                    "calories": 400,
                                    "protein": 30,
                                    "carbs": 20,
                                    "fats": 20
                                },
                                "_id": "67d60402d62ff17a5f2a5de4"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5de3"
                    },
                    {
                        "day": 5,
                        "mealType": "Dinner",
                        "recipes": [
                            {
                                "name": "Salmon with roasted vegetables",
                                "ingredients": [
                                    "120g salmon fillet",
                                    "100g broccoli",
                                    "50g carrots",
                                    "1 tbsp olive oil"
                                ],
                                "nutrition": {
                                    "calories": 400,
                                    "protein": 30,
                                    "carbs": 20,
                                    "fats": 20
                                },
                                "_id": "67d60402d62ff17a5f2a5de6"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5de5"
                    },
                    {
                        "day": 6,
                        "mealType": "Dinner",
                        "recipes": [
                            {
                                "name": "Salmon with roasted vegetables",
                                "ingredients": [
                                    "120g salmon fillet",
                                    "100g broccoli",
                                    "50g carrots",
                                    "1 tbsp olive oil"
                                ],
                                "nutrition": {
                                    "calories": 400,
                                    "protein": 30,
                                    "carbs": 20,
                                    "fats": 20
                                },
                                "_id": "67d60402d62ff17a5f2a5de8"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5de7"
                    },
                    {
                        "day": 7,
                        "mealType": "Dinner",
                        "recipes": [
                            {
                                "name": "Salmon with roasted vegetables",
                                "ingredients": [
                                    "120g salmon fillet",
                                    "100g broccoli",
                                    "50g carrots",
                                    "1 tbsp olive oil"
                                ],
                                "nutrition": {
                                    "calories": 400,
                                    "protein": 30,
                                    "carbs": 20,
                                    "fats": 20
                                },
                                "_id": "67d60402d62ff17a5f2a5dea"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5de9"
                    },
                    {
                        "day": 1,
                        "mealType": "Snack 3",
                        "recipes": [
                            {
                                "name": "Handful of mixed nuts and seeds",
                                "ingredients": [
                                    "30g mixed nuts and seeds"
                                ],
                                "nutrition": {
                                    "calories": 200,
                                    "protein": 6,
                                    "carbs": 5,
                                    "fats": 18
                                },
                                "_id": "67d60402d62ff17a5f2a5dec"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5deb"
                    },
                    {
                        "day": 2,
                        "mealType": "Snack 3",
                        "recipes": [
                            {
                                "name": "Handful of mixed nuts and seeds",
                                "ingredients": [
                                    "30g mixed nuts and seeds"
                                ],
                                "nutrition": {
                                    "calories": 200,
                                    "protein": 6,
                                    "carbs": 5,
                                    "fats": 18
                                },
                                "_id": "67d60402d62ff17a5f2a5dee"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5ded"
                    },
                    {
                        "day": 3,
                        "mealType": "Snack 3",
                        "recipes": [
                            {
                                "name": "Handful of mixed nuts and seeds",
                                "ingredients": [
                                    "30g mixed nuts and seeds"
                                ],
                                "nutrition": {
                                    "calories": 200,
                                    "protein": 6,
                                    "carbs": 5,
                                    "fats": 18
                                },
                                "_id": "67d60402d62ff17a5f2a5df0"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5def"
                    },
                    {
                        "day": 4,
                        "mealType": "Snack 3",
                        "recipes": [
                            {
                                "name": "Handful of mixed nuts and seeds",
                                "ingredients": [
                                    "30g mixed nuts and seeds"
                                ],
                                "nutrition": {
                                    "calories": 200,
                                    "protein": 6,
                                    "carbs": 5,
                                    "fats": 18
                                },
                                "_id": "67d60402d62ff17a5f2a5df2"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5df1"
                    },
                    {
                        "day": 5,
                        "mealType": "Snack 3",
                        "recipes": [
                            {
                                "name": "Handful of mixed nuts and seeds",
                                "ingredients": [
                                    "30g mixed nuts and seeds"
                                ],
                                "nutrition": {
                                    "calories": 200,
                                    "protein": 6,
                                    "carbs": 5,
                                    "fats": 18
                                },
                                "_id": "67d60402d62ff17a5f2a5df4"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5df3"
                    },
                    {
                        "day": 6,
                        "mealType": "Snack 3",
                        "recipes": [
                            {
                                "name": "Handful of mixed nuts and seeds",
                                "ingredients": [
                                    "30g mixed nuts and seeds"
                                ],
                                "nutrition": {
                                    "calories": 200,
                                    "protein": 6,
                                    "carbs": 5,
                                    "fats": 18
                                },
                                "_id": "67d60402d62ff17a5f2a5df6"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5df5"
                    },
                    {
                        "day": 7,
                        "mealType": "Snack 3",
                        "recipes": [
                            {
                                "name": "Handful of mixed nuts and seeds",
                                "ingredients": [
                                    "30g mixed nuts and seeds"
                                ],
                                "nutrition": {
                                    "calories": 200,
                                    "protein": 6,
                                    "carbs": 5,
                                    "fats": 18
                                },
                                "_id": "67d60402d62ff17a5f2a5df8"
                            }
                        ],
                        "_id": "67d60402d62ff17a5f2a5df7"
                    }
                ],
            }
        }
    },
    computed: {
        mealsByDay() {
            const mealOrder = {
                "Breakfast": 1,
                "Snack 1": 2,
                "Lunch": 3,
                "Snack 2": 4,
                "Dinner": 5
            };

            const organized = {};
            for (let day = 1; day <= 7; day++) {
                organized[day] = this.planData.meals
                    .filter(meal => meal.day === day)
                    .sort((a, b) => mealOrder[a.mealType] - mealOrder[b.mealType]);
            }
            return organized;
        },
        dailyTotals() {
            return this.calculateDailyNutrition(this.activeDay);
        }
    },
    methods: {
        calculateDailyNutrition(day) {
            return this.mealsByDay[day].reduce((totals, meal) => {
                meal.recipes.forEach(recipe => {
                    totals.calories += recipe.nutrition.calories;
                    totals.protein += recipe.nutrition.protein;
                    totals.carbs += recipe.nutrition.carbs;
                    totals.fats += recipe.nutrition.fats;
                });
                return totals;
            }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
            });
        },
        getDateForDay(day) {
            const startDate = new Date(this.planData.startDate);
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + day - 1);
            return this.formatDate(date);
        },
        calculateProgressPercentage(actual, target) {
            return Math.min(100, (actual / target) * 100);
        }
    }
}
</script>