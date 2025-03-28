<template>
  <NuxtLayout name="gym">
    <v-app class="ex pb-13" theme="">
      <v-progress-linear color="primary" class="mt-8" indeterminate height="30px" v-if="load"> Wait to generete AI
        answere </v-progress-linear>
      <v-container v-if="!load">
        <v-row>
          <v-col cols="12">
            <v-card class="mb-1">
              <v-card-title class="text-h4 primary-text">
                <v-icon large left color="primary">mdi-dumbbell</v-icon>
                Workout Plan
              
              </v-card-title>

              <v-card-subtitle>Your personalized fitness journey</v-card-subtitle>
            </v-card>

          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4">
            <v-card class="text-center" elevation="2">
              <v-icon>mdi-dumbbell</v-icon>
              <v-card-text class="text-primary ">
                <div class="text-h5 primary--text">{{ totalExercises }}</div>
                <div>Exercises</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="text-center" elevation="2">
              <v-icon>mdi-timer-outline</v-icon>
              <v-card-text class="text-primary ">
                <div class="text-h5 primary--text">{{ totalDuration }} min</div>
                <div>Total Duration</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="text-center" elevation="2">
              <v-icon>mdi-fire</v-icon>
              <v-card-text class="text-primary ">
                <div class="text-h5 primary--text">{{ totalCalories }}</div>
                <div>Total Calories</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Filter Controls -->
        <v-row class="mt-4">
          <v-col cols="12" sm="6" md="4">
            <v-select v-model="difficultyFilter" :items="difficultyLevels" label="Filter by Difficulty" clearable
              outlined dense></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select v-model="muscleFilter" :items="allMuscles" label="Filter by Muscle Group" clearable outlined
              dense></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="searchQuery" label="Search Exercises" prepend-inner-icon="mdi-magnify" outlined dense
              clearable></v-text-field>
          </v-col>
        </v-row>

        <!-- Exercise Cards -->
        <v-row>
          <v-col v-for="exercise in filteredExercises" :key="exercise._id" cols="12" md="6" lg="4">
            <v-card class="mx-auto exercise-card" elevation="3" :class="difficultyColorClass(exercise.difficulty)">

              <v-card-title class="text-h6">
                {{ exercise.name }}
                <v-spacer></v-spacer>
                <v-chip small :color="difficultyColor(exercise.difficulty)" text-color="white">
                  {{ exercise.difficulty }}
                </v-chip>
              </v-card-title>

              <v-card-text>
                <p>{{ exercise.description }}</p>

                <v-row class="mt-2">
                  <v-col cols="6">
                    <div class="caption grey--text">Duration</div>
                    <div>
                      <v-icon small color="blue">mdi-clock-outline</v-icon>
                      {{ exercise.duration }} min
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="caption grey--text">Calories</div>
                    <div>
                      <v-icon small color="orange">mdi-fire</v-icon>
                      {{ exercise.caloriesBurned }}
                    </div>
                  </v-col>
                </v-row>

                <div class="mt-3">
                  <div class="caption grey--text mb-1">Target Muscles</div>
                  <v-chip v-for="muscle in exercise.targetMuscles" :key="muscle" class="mr-1 mb-1" small outlined>
                    {{ muscle }}
                  </v-chip>
                </div>
              </v-card-text>

              <v-divider></v-divider>

              <v-expansion-panels flat>
                <v-expansion-panel>
                  <v-expansion-panel-title class="py-1">
                    <div class="text-subtitle-2">
                      <v-icon small left>mdi-lightbulb-outline</v-icon>
                      Tips
                    </div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-list dense>
                      <v-list-item v-for="(tip, i) in exercise.tips" :key="i" append-icon="mdi-check" class="px-0">
                        {{ tip }}
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>

              <v-card-actions>
                <div style="position: absolute;bottom:0;display: flex;justify-content: space-between;">
                  <v-btn text color="primary" @click="addToFavorites(exercise)">
                    <v-icon left>{{ isFavorite(exercise) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                    {{ isFavorite(exercise) ? 'Favorited' : 'Favorite' }}
                  </v-btn>
                  <v-btn text color="primary" @click="startExercise(exercise)">
                    <v-icon left>mdi-play</v-icon>
                    Start
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Empty State -->
        <v-row v-if="filteredExercises.length === 0">
          <v-col cols="12" class="text-center">
            <v-card class="pa-6">
              <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200" contain></v-img>
              <div class="text-h6 mt-4">No exercises found</div>
              <div class="subtitle-1 grey--text">Try adjusting your filters</div>
              <v-btn color="primary" class="mt-4" @click="resetFilters">
                Reset Filters
              </v-btn>
            </v-card>
          </v-col>
        </v-row>

        <!-- Exercise Dialog -->
        <v-dialog v-model="exerciseDialog" max-width="500">
          <v-card v-if="selectedExercise">
            <v-card-title>
              {{ selectedExercise.name }}
              <v-spacer></v-spacer>
              <v-btn icon @click="exerciseDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <div class="text-h6 mb-2">Timer</div>
                  <v-progress-linear v-model="timerProgress" height="25" striped color="primary">
                    <template v-slot:default>
                      {{ formatTime(timerRemaining) }}
                    </template>
                  </v-progress-linear>
                 <pre> {{ timerRemaining }} </pre>
                </v-col>
              </v-row>
              <v-row class="mt-4">
                <v-col cols="12">
                  <div class="text-h6 mb-2">Instructions</div>
                  <p>{{ selectedExercise.description }}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div class="text-h6 mb-2">Tips</div>
                  <v-list dense>
                    <v-list-item v-for="(tip, i) in selectedExercise.tips" :key="i" append-icon="mdi-check">

                      {{ tip }}
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="toggleTimer">
                <v-icon left>{{ timerRunning ? 'mdi-pause' : 'mdi-play' }}</v-icon>
                {{ timerRunning ? 'Pause' : 'Start' }}
              </v-btn>
              <v-btn color="error" @click="resetTimer">
                <v-icon left>mdi-refresh</v-icon>
                Reset
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-app>
  </NuxtLayout>
</template>
<!-- 
<script>
import axios from 'axios';
import { useAuthStore } from '~/store/auth';

export default {
  name: 'WorkoutPlan',
  
  data() {
    return {
      load: true,
      // Original data from API
      workoutData: {
        status: "success",
        data: {
          plan: [
            {
              _id: "67d6299bd498ee732f72cc97",
              name: "Dumbbell Bench Press",
              description: "Lie on a bench with feet flat on the floor. Hold dumbbells at chest height, palms facing each other. Lower dumbbells slowly to your chest, keeping your elbows slightly bent. Push dumbbells back up to starting position.",
              difficulty: "intermediate",
              targetMuscles: [
                "Pectorals",
                "Triceps",
                "Shoulders"
              ],
              equipment: [],
              createdBy: "67d3968af0eafbf665b44e7d",
              tips: [
                "Maintain a controlled movement throughout the exercise.",
                "Avoid bouncing the dumbbells off your chest."
              ],
              caloriesBurned: 200,
              duration: 30,
              createdAt: "2025-03-16T01:30:03.448Z",
              updatedAt: "2025-03-16T01:30:03.448Z"
            },
            {
              _id: "67d6299bd498ee732f72cc98",
              name: "Resistance Band Rows",
              description: "Loop a resistance band around a sturdy object at chest height. Hold the ends of the band with both hands, maintaining a straight back. Pull the band towards your chest, squeezing your shoulder blades together. Slowly return to starting position.",
              difficulty: "intermediate",
              targetMuscles: [
                "Back",
                "Biceps",
                "Forearms"
              ],
              equipment: [],
              createdBy: "67d3968af0eafbf665b44e7d",
              tips: [
                "Keep your core engaged throughout the exercise.",
                "Avoid arching your back."
              ],
              caloriesBurned: 150,
              duration: 30,
              createdAt: "2025-03-16T01:30:03.448Z",
              updatedAt: "2025-03-16T01:30:03.448Z"
            },
            {
              _id: "67d6299bd498ee732f72cc99",
              name: "Yoga Sun Salutations",
              description: "A sequence of poses that involves flowing movements from forward bend to backbend, ending in a standing forward bend. Specific instructions for each pose can be found online or through a yoga video.",
              difficulty: "intermediate",
              targetMuscles: [
                "Entire Body"
              ],
              equipment: [],
              createdBy: "67d3968af0eafbf665b44e7d",
              tips: [
                "Focus on proper breathing and alignment.",
                "Listen to your body and modify as needed."
              ],
              caloriesBurned: 100,
              duration: 20,
              createdAt: "2025-03-16T01:30:03.448Z",
              updatedAt: "2025-03-16T01:30:03.448Z"
            },
            {
              _id: "67d6299bd498ee732f72cc9a",
              name: "Swimming (Freestyle)",
              description: "Maintain a consistent rhythm, proper breathing technique, and streamlined body position to maximize efficiency and avoid injury.",
              difficulty: "intermediate",
              targetMuscles: [
                "Entire Body"
              ],
              equipment: [],
              createdBy: "67d3968af0eafbf665b44e7d",
              tips: [
                "Maintain proper form and breathing for efficient movement.",
                "Listen to your body and stop if you feel pain."
              ],
              caloriesBurned: 350,
              duration: 45,
              createdAt: "2025-03-16T01:30:03.448Z",
              updatedAt: "2025-03-16T01:30:03.448Z"
            },
            {
              _id: "67d6299bd498ee732f72cc9b",
              name: "Bodyweight Squats",
              description: "Stand with feet shoulder-width apart, toes slightly outward. Lower your hips as if sitting in a chair, keeping your back straight and chest up. Push through your heels to return to standing position.",
              difficulty: "beginner",
              targetMuscles: [
                "Quads",
                "Glutes",
                "Hamstrings"
              ],
              equipment: [],
              createdBy: "67d3968af0eafbf665b44e7d",
              tips: [
                "Keep your knees aligned with your toes.",
                "Engage your core to maintain stability."
              ],
              caloriesBurned: 120,
              duration: 25,
              createdAt: "2025-03-16T01:30:03.448Z",
              updatedAt: "2025-03-16T01:30:03.448Z"
            },
            {
              _id: "67d6299bd498ee732f72cc9c",
              name: "Tree Pose (Vrksasana)",
              description: "Stand tall, shift your weight onto your left leg, and place the sole of your right foot against your inner left thigh. Bring your hands to prayer position or extend them overhead. Hold for 30 seconds, then repeat on the other side.",
              difficulty: "beginner",
              targetMuscles: [
                "Legs",
                "Core"
              ],
              equipment: [],
              createdBy: "67d3968af0eafbf665b44e7d",
              tips: [
                "Maintain balance and focus.",
                "Engage core muscles for stability."
              ],
              caloriesBurned: 50,
              duration: 15,
              createdAt: "2025-03-16T01:30:03.449Z",
              updatedAt: "2025-03-16T01:30:03.449Z"
            }
          ]
        }
      },

      // Filters
      difficultyFilter: null,
      muscleFilter: null,
      searchQuery: '',

      // Favorites
      favorites: [],

      // Exercise timer
      selectedExercise: null,
      exerciseDialog: false,
      timerRunning: false,
      timerRemaining: 0,
      timerProgress: 0,
      timerInterval: null,
    }
  },

  computed: {
    exercises() {
      return this.workoutData.data.plan;
    },

    filteredExercises() {
      return this.exercises.filter(exercise => {
        // Filter by difficulty
        if (this.difficultyFilter && exercise.difficulty !== this.difficultyFilter) {
          return false;
        }

        // Filter by muscle group
        if (this.muscleFilter && !exercise.targetMuscles.includes(this.muscleFilter)) {
          return false;
        }

        // Filter by search query
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          return (
            exercise.name.toLowerCase().includes(query) ||
            exercise.description.toLowerCase().includes(query) ||
            exercise.targetMuscles.some(muscle => muscle.toLowerCase().includes(query))
          );
        }

        return true;
      });
    },

    difficultyLevels() {
      const levels = new Set();
      this.exercises.forEach(exercise => {
        levels.add(exercise.difficulty);
      });
      return Array.from(levels);
    },

    allMuscles() {
      const muscles = new Set();
      this.exercises.forEach(exercise => {
        exercise.targetMuscles.forEach(muscle => {
          muscles.add(muscle);
        });
      });
      return Array.from(muscles).sort();
    },

    totalExercises() {
      return this.exercises.length;
    },

    totalDuration() {
      return this.exercises.reduce((total, exercise) => total + exercise.duration, 0);
    },

    totalCalories() {
      return this.exercises.reduce((total, exercise) => total + exercise.caloriesBurned, 0);
    }
  },
  methods: {
  getWorkout: async function(){
     
  },
    difficultyColor(difficulty) {
      switch (difficulty) {
        case 'beginner':
          return 'success';
        case 'intermediate':
          return 'warning';
        case 'advanced':
          return 'error';
        default:
          return 'primary';
      }
    },

    difficultyColorClass(difficulty) {
      return "`border-left-4 border-${difficultyColor(exercise.difficulty)}`"
    },

    resetFilters() {
      this.difficultyFilter = null;
      this.muscleFilter = null;
      this.searchQuery = '';
    },

    addToFavorites(exercise) {
      const index = this.favorites.findIndex(fav => fav._id === exercise._id);
      if (index === -1) {
        this.favorites.push(exercise);
      } else {
        this.favorites.splice(index, 1);
      }

      // In a real app, you would save this to localStorage or a database
      localStorage.setItem('workout-favorites', JSON.stringify(this.favorites));
    },

    isFavorite(exercise) {
      return this.favorites.some(fav => fav._id === exercise._id);
    },

    startExercise(exercise) {
      this.selectedExercise = exercise;
      this.timerRemaining = exercise.duration * 60; // Convert to seconds
      this.timerProgress = 0;
      this.exerciseDialog = true;
    },

    toggleTimer() {
      if (this.timerRunning) {
        clearInterval(this.timerInterval);
        this.timerRunning = false;
      } else {
        this.timerRunning = true;
        this.timerInterval = setInterval(() => {
          if (this.timerRemaining > 0) {
            this.timerRemaining--;
            this.timerProgress = 100 - (this.timerRemaining / (this.selectedExercise.duration * 60) * 100);
          } else {
            clearInterval(this.timerInterval);
            this.timerRunning = false;
            // Play sound or show notification
            this.playCompletionSound();
          }
        }, 1000);
      }
    },

    resetTimer() {
      clearInterval(this.timerInterval);
      this.timerRunning = false;
      this.timerRemaining = this.selectedExercise.duration * 60;
      this.timerProgress = 0;
    },

    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    },

    playCompletionSound() {
      // In a real app, you would play a sound here
      console.log('Exercise completed!');
    }
  },

  created() {
    setTimeout(async () => {
      this.load = false

    }, 5000);
    // Load favorites from localStorage in a real app
    const savedFavorites = localStorage.getItem('workout-favorites');
    if (savedFavorites) {
      try {
        this.favorites = JSON.parse(savedFavorites);
      } catch (e) {
        console.error('Error loading favorites', e);
      }
    }
  }
}
</script> -->



<script setup>

import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/store/auth';
import { NuxtLayout } from '#components';
import axios from 'axios';
const store= useAuthStore();
const API_URL = useRuntimeConfig().public.API_URL;
definePageMeta({
  middleware: 'auth'
})
let load = ref(true);
const workoutData = ref({
  status: "success",
  data: {
    // plan: [
    //         {
    //           _id: "67d6299bd498ee732f72cc97",
    //           name: "Dumbbell Bench Press",
    //           description: "Lie on a bench with feet flat on the floor. Hold dumbbells at chest height, palms facing each other. Lower dumbbells slowly to your chest, keeping your elbows slightly bent. Push dumbbells back up to starting position.",
    //           difficulty: "intermediate",
    //           targetMuscles: [
    //             "Pectorals",
    //             "Triceps",
    //             "Shoulders"
    //           ],
    //           equipment: [],
    //           createdBy: "67d3968af0eafbf665b44e7d",
    //           tips: [
    //             "Maintain a controlled movement throughout the exercise.",
    //             "Avoid bouncing the dumbbells off your chest."
    //           ],
    //           caloriesBurned: 200,
    //           duration: 30,
    //           createdAt: "2025-03-16T01:30:03.448Z",
    //           updatedAt: "2025-03-16T01:30:03.448Z"
    //         },
    //         {
    //           _id: "67d6299bd498ee732f72cc98",
    //           name: "Resistance Band Rows",
    //           description: "Loop a resistance band around a sturdy object at chest height. Hold the ends of the band with both hands, maintaining a straight back. Pull the band towards your chest, squeezing your shoulder blades together. Slowly return to starting position.",
    //           difficulty: "intermediate",
    //           targetMuscles: [
    //             "Back",
    //             "Biceps",
    //             "Forearms"
    //           ],
    //           equipment: [],
    //           createdBy: "67d3968af0eafbf665b44e7d",
    //           tips: [
    //             "Keep your core engaged throughout the exercise.",
    //             "Avoid arching your back."
    //           ],
    //           caloriesBurned: 150,
    //           duration: 30,
    //           createdAt: "2025-03-16T01:30:03.448Z",
    //           updatedAt: "2025-03-16T01:30:03.448Z"
    //         },
    //         {
    //           _id: "67d6299bd498ee732f72cc99",
    //           name: "Yoga Sun Salutations",
    //           description: "A sequence of poses that involves flowing movements from forward bend to backbend, ending in a standing forward bend. Specific instructions for each pose can be found online or through a yoga video.",
    //           difficulty: "intermediate",
    //           targetMuscles: [
    //             "Entire Body"
    //           ],
    //           equipment: [],
    //           createdBy: "67d3968af0eafbf665b44e7d",
    //           tips: [
    //             "Focus on proper breathing and alignment.",
    //             "Listen to your body and modify as needed."
    //           ],
    //           caloriesBurned: 100,
    //           duration: 20,
    //           createdAt: "2025-03-16T01:30:03.448Z",
    //           updatedAt: "2025-03-16T01:30:03.448Z"
    //         },
    //         {
    //           _id: "67d6299bd498ee732f72cc9a",
    //           name: "Swimming (Freestyle)",
    //           description: "Maintain a consistent rhythm, proper breathing technique, and streamlined body position to maximize efficiency and avoid injury.",
    //           difficulty: "intermediate",
    //           targetMuscles: [
    //             "Entire Body"
    //           ],
    //           equipment: [],
    //           createdBy: "67d3968af0eafbf665b44e7d",
    //           tips: [
    //             "Maintain proper form and breathing for efficient movement.",
    //             "Listen to your body and stop if you feel pain."
    //           ],
    //           caloriesBurned: 350,
    //           duration: 45,
    //           createdAt: "2025-03-16T01:30:03.448Z",
    //           updatedAt: "2025-03-16T01:30:03.448Z"
    //         },
    //         {
    //           _id: "67d6299bd498ee732f72cc9b",
    //           name: "Bodyweight Squats",
    //           description: "Stand with feet shoulder-width apart, toes slightly outward. Lower your hips as if sitting in a chair, keeping your back straight and chest up. Push through your heels to return to standing position.",
    //           difficulty: "beginner",
    //           targetMuscles: [
    //             "Quads",
    //             "Glutes",
    //             "Hamstrings"
    //           ],
    //           equipment: [],
    //           createdBy: "67d3968af0eafbf665b44e7d",
    //           tips: [
    //             "Keep your knees aligned with your toes.",
    //             "Engage your core to maintain stability."
    //           ],
    //           caloriesBurned: 120,
    //           duration: 25,
    //           createdAt: "2025-03-16T01:30:03.448Z",
    //           updatedAt: "2025-03-16T01:30:03.448Z"
    //         },
    //         {
    //           _id: "67d6299bd498ee732f72cc9c",
    //           name: "Tree Pose (Vrksasana)",
    //           description: "Stand tall, shift your weight onto your left leg, and place the sole of your right foot against your inner left thigh. Bring your hands to prayer position or extend them overhead. Hold for 30 seconds, then repeat on the other side.",
    //           difficulty: "beginner",
    //           targetMuscles: [
    //             "Legs",
    //             "Core"
    //           ],
    //           equipment: [],
    //           createdBy: "67d3968af0eafbf665b44e7d",
    //           tips: [
    //             "Maintain balance and focus.",
    //             "Engage core muscles for stability."
    //           ],
    //           caloriesBurned: 50,
    //           duration: 15,
    //           createdAt: "2025-03-16T01:30:03.449Z",
    //           updatedAt: "2025-03-16T01:30:03.449Z"
    //         }
    //       ]
  }
});
onMounted( async () => {
  load.value=true
    let response=  await axios.get(`${API_URL}/exercises/${store.user._id}`)
    console.log(response.data);
    workoutData.value = response.data; 
    load.value=false
})
const difficultyFilter = ref(null);
const muscleFilter = ref(null);
const searchQuery = ref('');

const favorites = ref([]);

const selectedExercise = ref(null);
const exerciseDialog = ref(false);
let timerRunning = ref(false);
let timerRemaining = ref(0);
let timerProgress = ref(0);
let timerInterval = ref(null);

const exercises = computed(() => workoutData.value.data.plan);

const filteredExercises = computed(() => {
  return exercises.value.filter(exercise => {
    if (difficultyFilter.value && exercise.difficulty !== difficultyFilter.value) {
      return false;
    }
    if (muscleFilter.value && !exercise.targetMuscles.includes(muscleFilter.value)) {
      return false;
    }
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      return (
        exercise.name.toLowerCase().includes(query) ||
        exercise.description.toLowerCase().includes(query) ||
        exercise.targetMuscles.some(muscle => muscle.toLowerCase().includes(query))
      );
    }
    return true;
  });
});

const difficultyLevels = computed(() => {
  const levels = new Set();
  exercises.value.forEach(exercise => {
    levels.add(exercise.difficulty);
  });
  return Array.from(levels);
});

const allMuscles = computed(() => {
  const muscles = new Set();
  exercises.value.forEach(exercise => {
    exercise.targetMuscles.forEach(muscle => {
      muscles.add(muscle);
    });
  });
  return Array.from(muscles).sort();
});

const totalExercises = computed(() => exercises.value.length);

const totalDuration = computed(() => exercises.value.reduce((total, exercise) => total + exercise.duration, 0));

const totalCalories = computed(() => exercises.value.reduce((total, exercise) => total + exercise.caloriesBurned, 0));

function difficultyColor(difficulty) {
  switch (difficulty) {
    case 'beginner':
      return 'success';
    case 'intermediate':
      return 'warning';
    case 'advanced':
      return 'error';
    default:
      return 'primary';
  }
}

function difficultyColorClass(difficulty) {
  return `border-left-4 border-${difficultyColor(difficulty)}`;
}
function isFavorite(exercise) {
      return this.favorites.some(fav => fav._id === exercise._id);
    }
function resetFilters() {
  difficultyFilter.value = null;
  muscleFilter.value = null;
  searchQuery.value = '';
}
function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
function startExercise(exercise) {
  selectedExercise.value = exercise;
  timerRemaining.value = exercise.duration * 60; // Convert to seconds
  timerProgress.value = 0;
  exerciseDialog.value = true;
}
function addToFavorites(exercise) {
  const index = favorites}
 function toggleTimer() {
      if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
      } else {
        timerRunning = true;
timerInterval = setInterval(() => {
  if (timerRemaining.value > 0) {
    timerRemaining.value--;
    timerProgress.value = 100 - (timerRemaining / (selectedExercise.value.duration * 60) * 100);
  } else {
    clearInterval(timerInterval);
    timerRunning = false;
  }
}, 1000);
      }
    }

  function resetTimer() {
      clearInterval(timerInterval);
      timerRunning = false;
      timerRemaining = selectedExercise.value.duration * 60;
      timerProgress = 0;
    }

</script>



<style>
.exercise-card {
  transition: 0.6s !important;
  height: 100%;
  display: flex;
  flex-direction: column;

}

.exercise-card:hover {
  scale: 1.07;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}

/* Custom border styles for difficulty levels */
.border-success {
  border-left: 4px solid var(--v-success-base) !important;
}

.border-warning {
  border-left: 4px solid var(--v-warning-base) !important;
}

.border-error {
  border-left: 4px solid var(--v-error-base) !important;
}

.border-primary {
  border-left: 4px solid var(--v-primary-base) !important;
}

</style>
