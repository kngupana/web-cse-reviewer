<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible" />
    </template>

    <template #content>
      <v-container fluid class="py-10 text-center stylish-bg">
        <!-- Top Quote -->
        <v-row justify="center">
          <v-col cols="12" md="8">
            <h1 class="text-4xl font-bold mb-4 stylish-title">Your Daily Dose of Motivation</h1>
            <p class="text-lg text-gray-700 mb-8">
              Stay inspired while preparing for your civil service exam.
            </p>

            <v-card class="pa-6 elevation-4 rounded-xl quote-card">
              <v-icon size="40" color="indigo">mdi-format-quote-close</v-icon>
              <blockquote class="mt-4 text-xl font-italic text-indigo-800">
                “{{ currentQuote.text }}”
              </blockquote>
              <div class="mt-2 text-indigo-600">— {{ currentQuote.author }}</div>
            </v-card>

            <!-- Refresh Button -->
            <v-btn class="mt-6 fancy-btn" @click="getRandomQuote"> Inspire Me Again </v-btn>
          </v-col>
        </v-row>

        <!-- Divider -->
        <v-divider class="my-10" color="indigo lighten-3"></v-divider>

        <!-- CSE Quick Facts Carousel -->
        <v-row justify="center" class="my-10">
          <v-col cols="12" md="10">
            <h2 class="text-4xl font-bold mb-4 stylish-title">CSE Quick Facts</h2>
            <v-carousel hide-delimiter-background show-arrows height="200">
              <v-carousel-item v-for="(fact, i) in facts" :key="i">
                <v-sheet
                  class="pa-6 d-flex flex-column justify-center align-center fact-item"
                  style="
                    background: linear-gradient(to right, #e6e6fa, #f3f4f7);
                    border-radius: 10px;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                  "
                >
                  <div class="text-lg font-medium text-indigo-800 text-center">{{ fact }}</div>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>

        <!-- Promo Section -->
        <v-row justify="center" class="mt-16">
          <v-col cols="12" md="10">
            <h2 class="text-3xl font-bold mb-6 stylish-title">Exclusive Promo Offers</h2>
            <v-row>
              <v-col v-for="(promo, index) in promos" :key="index" cols="12" sm="6" md="4">
                <v-card class="pa-6 mb-4 promo-card">
                  <v-icon size="40" color="orange">mdi-sale</v-icon>
                  <h3 class="text-xl font-bold mt-3 text-orange-600">{{ promo.title }}</h3>
                  <p class="text-gray-700 mt-2">{{ promo.description }}</p>
                  <v-btn class="mt-4" color="orange" @click="goToPromoLink(promo.link)">
                    Learn More
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- Why Pass Section -->
        <v-row class="mt-16" justify="center">
          <v-col cols="12" md="10">
            <h2 class="text-3xl font-bold mb-6 stylish-title">Why Pass the Civil Service Exam?</h2>
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

        <!-- Tips Section -->
        <v-row class="mt-16" justify="center">
          <v-col cols="12" md="10">
            <h2 class="text-3xl font-bold mb-6 stylish-title text-center">
              Tips to Pass the Civil Service Exam
            </h2>
            <v-row>
              <v-col v-for="(tip, i) in tips" :key="i" cols="12" sm="6" md="4">
                <v-card class="pa-6 mb-4 tip-card">
                  <v-icon size="40" color="indigo">mdi-lightbulb-on</v-icon>
                  <h3 class="text-xl font-bold mt-3">{{ tip.title }}</h3>
                  <p class="text-gray-700 mt-2">{{ tip.desc }}</p>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- Reminders Section -->
        <v-row class="mt-16" justify="center">
          <v-col cols="12" md="10">
            <h2 class="text-3xl font-bold mb-6 stylish-title text-center">
              Daily Review Reminders
            </h2>
            <v-row>
              <v-col v-for="(reminder, index) in reminders" :key="index" cols="12" sm="6" md="4">
                <v-card
                  class="pa-6 mb-4 elevation-4 reminder-card transition-all transform hover:scale-105 hover:shadow-2xl"
                >
                  <!-- Icon Section -->
                  <v-icon size="48" color="indigo" class="mb-4"> mdi-lightbulb-on </v-icon>
                  <!-- Reminder Text -->
                  <div class="text-lg font-semibold text-teal-800">{{ reminder }}</div>
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

const promos = ref([
  {
    title: 'Early Bird Discount!',
    description: 'Sign up for review sessions and get a 20% discount on all packages.',
    link: '/promos/early-bird',
  },
  {
    title: 'Free Mock Exam!',
    description: 'Get a free mock exam with every purchase of our premium reviewer bundle.',
    link: '/promos/free-mock',
  },
  {
    title: 'Refer a Friend',
    description: 'Refer a friend to our review course and get a voucher for your next purchase.',
    link: '/promos/refer-a-friend',
  },
])

const tips = ref([
  {
    title: 'Review Consistently',
    desc: 'Stay consistent with your studies. Dedicate a set time every day to review your materials.',
  },
  {
    title: 'Take Practice Tests',
    desc: 'Simulate the exam environment by taking timed practice tests regularly.',
  },
  {
    title: 'Understand the Exam Structure',
    desc: 'Familiarize yourself with the format of the exam and focus on key topics.',
  },
  {
    title: 'Manage Your Time',
    desc: 'Master time management during your studies and while taking the exam to avoid rushing.',
  },
])

const reminders = ref([
  'Set a daily review schedule—and stick to it!',
  'Take at least one timed mock exam each week.',
  'Focus more on your weak subjects during the final 2 weeks.',
  'Use flashcards to master government acronyms and laws.',
  'Don’t forget to take short breaks during long study sessions.',
  'Sleep well the night before the exam to stay alert.',
])
</script>

<style scoped>
/* General Layout Styles */
.stylish-bg {
  background: linear-gradient(135deg, #d4a5f9, #f3e6f5); /* Vibrant gradient */
  border-radius: 3px;
  padding: 20px;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.1); /* Enhanced shadow for elevation */
}

/* Title Styling */
.stylish-title {
  color: #4b0082; /* Bold purple */
  font-family: 'Poppins', sans-serif; /* Modern sans-serif font */
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1); /* Glowing text shadow */
  transition: color 0.3s ease;
}

.stylish-title:hover {
  color: #f39c12; /* Vibrant orange on hover */
}

/* Quote Card Styling */
.quote-card {
  background: #fff; /* White background for contrast */
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15); /* Soft but prominent shadow */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.quote-card:hover {
  transform: scale(1.05); /* Slight scaling on hover */
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.2); /* More intense shadow on hover */
}

.v-icon {
  transition:
    transform 0.3s ease,
    color 0.3s ease;
}

.quote-card:hover .v-icon {
  transform: rotate(45deg); /* Icon rotates dramatically */
  color: #9b59b6; /* Purple color on hover */
}

/* Button Styling */
.fancy-btn {
  background-color: #f39c12;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  padding: 15px 30px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.fancy-btn:hover {
  background-color: #e67e22;
  transform: translateY(-5px); /* Floating effect */
}

/* Carousel and Fact Cards */
.fact-item {
  background: linear-gradient(135deg, #ffccff, #e6e6fa); /* Subtle pastel gradient */
  border-radius: 15px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
  padding: 25px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.fact-item:hover {
  transform: translateY(-5px); /* Lift effect */
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2); /* Deeper shadow */
}

/* Promo Card Styling */
.promo-card {
  background-color: #fff;
  border-radius: 18px;
  padding: 25px;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.promo-card:hover {
  transform: scale(1.05); /* Slight scaling on hover */
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.2); /* More prominent shadow */
}

/* Reminder Card Styling */
.reminder-card {
  background-color: #f3e6f5; /* Light violet */
  border-radius: 18px;
  padding: 25px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.3s ease;
}

.reminder-card:hover {
  transform: scale(1.05); /* Lift on hover */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2); /* Intense shadow */
  background-color: #f0c9e7; /* Darker violet on hover */
}

/* Icon Hover Effect */
.reminder-card .v-icon {
  transition:
    transform 0.3s ease,
    color 0.3s ease;
}

.reminder-card:hover .v-icon {
  transform: rotate(20deg); /* Rotating icon on hover */
  color: #f39c12; /* Orange color */
}

/* Tip Card Styling */
.tip-card {
  background: linear-gradient(135deg, #ffddc1, #e6e6fa); /* Soft pastel gradient */
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.tip-card:hover {
  transform: scale(1.05); /* Lift effect */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2); /* More shadow on hover */
}

/* Transition Effects */
.transition-all {
  transition: all 0.3s ease;
}

.hover\:scale-105:hover {
  transform: scale(1.05); /* Scaling effect on hover */
}
</style>
