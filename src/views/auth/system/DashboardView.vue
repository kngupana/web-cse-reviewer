<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible" />
    </template>

    <template #content>
      <v-container
        fluid
        class="py-10 text-center"
        style="background: linear-gradient(to bottom, #e6e6fa, #f3f4f7)"
      >
        <!-- Top Quote -->
        <v-row justify="center">
          <v-col cols="12" md="8">
            <h1 class="text-4xl font-bold mb-4" style="color: #4b0082">
              Your Daily Dose of Motivation
            </h1>
            <p class="text-lg text-gray-700 mb-8">
              Stay inspired while preparing for your civil service exam.
            </p>

            <v-card class="pa-6 elevation-3 rounded-xl quote-card">
              <v-icon size="40" color="indigo">mdi-format-quote-close</v-icon>
              <blockquote class="mt-4 text-xl font-italic text-indigo-800">
                “{{ currentQuote.text }}”
              </blockquote>
              <div class="mt-2 text-indigo-600">— {{ currentQuote.author }}</div>
            </v-card>

            <!-- Refresh Button -->
            <v-btn class="mt-6" color="indigo lighten-2" dark elevation="1" @click="getRandomQuote">
              Inspire Me Again
            </v-btn>
          </v-col>
        </v-row>

        <!-- Divider -->
        <v-divider class="my-10" color="indigo lighten-3"></v-divider>

        <!-- CSE Quick Facts Carousel -->
        <v-row justify="center" class="my-10">
          <v-col cols="12" md="10">
            <h2 class="text-4xl font-bold mb-4" style="color: #4b0082">CSE Quick Facts</h2>
            <v-carousel hide-delimiter-background show-arrows height="200">
              <v-carousel-item v-for="(fact, i) in facts" :key="i">
                <v-sheet
                  class="pa-6 d-flex flex-column justify-center align-center"
                  style="
                    background: linear-gradient(to right, #e6e6fa, #f3f4f7);
                    border-radius: 12px;
                  "
                >
                  <div class="text-lg font-medium text-indigo-800 text-center">{{ fact }}</div>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>

        <!-- Why Pass Section -->
        <v-row class="mt-16" justify="center">
          <v-col cols="12" md="10">
            <h2 class="text-3xl font-bold mb-6" style="color: #4b0082">
              Why Pass the Civil Service Exam?
            </h2>
            <v-row>
              <v-col cols="12" md="4">
                <v-card class="pa-6 hover:shadow-lg transition card-feature">
                  <v-icon size="40" color="indigo">mdi-school</v-icon>
                  <h3 class="text-xl font-bold mt-3">Secure a Government Job</h3>
                  <p class="text-gray-700 mt-2">
                    Government careers offer stability, benefits, and long-term growth.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-6 hover:shadow-lg transition card-feature">
                  <v-icon size="40" color="indigo">mdi-cash</v-icon>
                  <h3 class="text-xl font-bold mt-3">Better Pay</h3>
                  <p class="text-gray-700 mt-2">
                    Passing the CSE opens doors to well-compensated public service roles.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-6 hover:shadow-lg transition card-feature">
                  <v-icon size="40" color="indigo">mdi-star</v-icon>
                  <h3 class="text-xl font-bold mt-3">Respect & Impact</h3>
                  <p class="text-gray-700 mt-2">
                    Be part of nation-building and inspire your community by serving with integrity.
                  </p>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- Tips to Pass the Civil Service Exam Section -->
        <v-row class="mt-16" justify="center">
          <v-col cols="12" md="10">
            <h2 class="text-3xl font-bold mb-6" style="color: #4b0082">
              Tips to Pass the Civil Service Exam
            </h2>
            <v-row>
              <v-col cols="12" md="6">
                <v-card class="pa-6 hover:shadow-lg transition card-feature">
                  <v-icon size="40" color="indigo">mdi-book-open-page-variant</v-icon>
                  <h3 class="text-xl font-bold mt-3">Review Consistently</h3>
                  <p class="text-gray-700 mt-2">
                    Stay consistent with your studies. Dedicate a set time every day to review your
                    materials.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-6 hover:shadow-lg transition card-feature">
                  <v-icon size="40" color="indigo">mdi-chart-line</v-icon>
                  <h3 class="text-xl font-bold mt-3">Take Practice Tests</h3>
                  <p class="text-gray-700 mt-2">
                    Simulate the exam environment by taking timed practice tests regularly.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-6 hover:shadow-lg transition card-feature">
                  <v-icon size="40" color="indigo">mdi-podium</v-icon>
                  <h3 class="text-xl font-bold mt-3">Understand the Exam Structure</h3>
                  <p class="text-gray-700 mt-2">
                    Familiarize yourself with the format of the exam and focus on key topics.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-6 hover:shadow-lg transition card-feature">
                  <v-icon size="40" color="indigo">mdi-clock-time-four</v-icon>
                  <h3 class="text-xl font-bold mt-3">Manage Your Time</h3>
                  <p class="text-gray-700 mt-2">
                    Master time management during your studies and while taking the exam to avoid
                    rushing.
                  </p>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- Daily Review Reminders -->
        <v-row class="mt-16" justify="center">
          <v-col cols="12" md="10">
            <h2 class="text-3xl font-bold mb-6" style="color: #4b0082">Daily Review Reminders</h2>
            <v-row>
              <v-col v-for="(reminder, index) in reminders" :key="index" cols="12" sm="6" md="4">
                <v-card class="pa-5 mb-4 elevation-2 rounded-lg quote-grid-card">
                  <div class="text-base font-medium text-indigo-800 mb-2">{{ reminder }}</div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'

const isDrawerVisible = ref(true)

const quotes = ref([
  {
    text: 'Success usually comes to those who are too busy to be looking for it.',
    author: 'Henry David Thoreau',
  },
  { text: 'Don’t watch the clock; do what it does. Keep going.', author: 'Sam Levenson' },
  { text: 'Push yourself, because no one else is going to do it for you.', author: 'Anonymous' },
  { text: 'It always seems impossible until it’s done.', author: 'Nelson Mandela' },
  { text: "Believe you can and you're halfway there.", author: 'Theodore Roosevelt' },
  { text: 'Hard work beats talent when talent doesn’t work hard.', author: 'Tim Notke' },
])

const currentQuote = ref(quotes.value[0])

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.value.length)
  currentQuote.value = quotes.value[randomIndex]
}

const facts = ref([
  'The CSE Professional exam has 170 items and lasts 3 hours and 10 minutes.',
  'Coverage includes Verbal, Numerical, Analytical, and General Information.',
  'You must get at least 80% to pass the Civil Service Exam.',
  'Review common math shortcuts to save time on exam day.',
  'Be familiar with the Philippine Constitution and Code of Conduct for Public Officials.',
])

const reminders = ref([
  'Set a daily review schedule—and stick to it!',
  'Take at least one timed mock exam each week.',
  'Focus more on your weak subjects during the final 2 weeks.',
  'Use flashcards to master government acronyms and laws.',
  'Don’t forget to take short breaks during long study sessions.',
  'Sleep well the night before your actual exam day.',
])
</script>

<style scoped>
.quote-card {
  background: linear-gradient(to right, #f3f4f7, #e6e6fa);
  transition: transform 0.3s ease;
}
.quote-card:hover {
  transform: scale(1.02);
}
.card-feature {
  background: linear-gradient(to right, #f3f4f7, #e6e6fa);
  border-radius: 16px;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
}
.card-feature:hover {
  box-shadow: 0 8px 24px rgba(75, 0, 130, 0.2);
  transform: translateY(-4px);
}
.quote-grid-card {
  background: linear-gradient(to right, #f3f4f7, #e6e6fa);
  transition: box-shadow 0.3s ease;
}
.quote-grid-card:hover {
  box-shadow: 0 6px 20px rgba(75, 0, 130, 0.15);
}
</style>
