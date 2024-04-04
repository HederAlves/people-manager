<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" class="text-center">
        <h2 class="text-h5 font-weight-bold">Login</h2>
        <v-form @submit.prevent="login">
          <input v-model="email" label="Email" type="email" />
          <input v-model="password" label="Password" type="password" />
          <v-btn type="submit" color="primary">Login</v-btn>
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/app';
import { useRouter } from 'vue-router';

const store = useAppStore();
const router = useRouter();

let email = '';
let password = '';
let errorMessage = '';

const login = async () => {
  try {
    await store.signIn(email, password);
    router.push('/dashboard');
  } catch (error) {
    errorMessage = errorMessage;
  }
}

</script>


<style scoped>
.error-message {
  color: red;
}

input {
  background: #ffffff;
  margin: 0px 5px;
  color: black;
}
</style>
