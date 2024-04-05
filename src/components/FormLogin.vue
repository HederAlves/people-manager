<template>
  <v-container class="flex flex-col gap-5 justify-center min-h-full">
    <h1 class="text-h5 text-center font-weight-bold mt-10">Login</h1>
    <v-col class="text-center">
      <v-form @submit.prevent="login">
        <input class="text-black bg-white mx-4 " v-model="email" label="Email" type="email" />
        <input class="text-black bg-white mx-4" v-model="password" label="Password" type="password" />
        <v-btn type="submit" color="primary">Entrar</v-btn>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </v-form>
    </v-col>
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
    if (store.isAuthenticated) {
      router.push('/users');
    } else {
      errorMessage = "Usuário não autenticado.";
    }
  } catch (error) {
    errorMessage = "Erro ao fazer login: " + errorMessage;
  }
}
</script>
