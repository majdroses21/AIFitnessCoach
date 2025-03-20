<template>
    <NuxtLayout name="website">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <h1 class="text-h2 font-weight-bold primary--text mb-4">Contact Us</h1>
            <p class="text-h6 secondary--text">
              We'd love to hear from you! Reach out to us for any inquiries or feedback.
            </p>
          </v-col>
        </v-row>
  
        <v-row class="mt-8">
          <v-col cols="12" md="6">
            <v-card class="pa-6">
              <h2 class="text-h4 font-weight-bold primary--text mb-4">Get in Touch</h2>
              <v-form @submit.prevent="submitForm">
                <v-text-field
                  v-model="name"
                  label="Your Name"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  label="Your Email"
                  outlined
                  required
                  type="email"
                ></v-text-field>
                <v-textarea
                  v-model="message"
                  label="Your Message"
                  outlined
                  required
                ></v-textarea>
                <v-btn color="primary" type="submit">Send Message</v-btn>
              </v-form>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="pa-6">
              <h2 class="text-h4 font-weight-bold primary--text mb-4">Our Location</h2>
              <v-img
              style="width:70%"
                src="../../public/contact.png"
                alt="Gym Location"
                class="rounded-lg mb-4"
              ></v-img>
              <p class="text-body-1 secondary--text">
                <v-icon color="primary">mdi-map-marker</v-icon>
                123 Fitness Street, Gym City, GC 12345
              </p>
              <p class="text-body-1 secondary--text">
                <v-icon color="primary">mdi-phone</v-icon>
                +123 456 7890
              </p>
              <p class="text-body-1 secondary--text">
                <v-icon color="primary">mdi-email</v-icon>
                info@gymfitness.com
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </NuxtLayout>
  </template>
  
  <script setup>
  const name = ref('');
  const email = ref('');
  const message = ref('');
  
  const submitForm = () => {
    // Handle form submission
    console.log('Form submitted:', { name: name.value, email: email.value, message: message.value });
    alert('Thank you for contacting us! We will get back to you soon.');
    name.value = '';
    email.value = '';
    message.value = '';
  };
  </script>
  
  <style scoped>
  .rounded-lg {
    border-radius: 12px;
  }
  </style>