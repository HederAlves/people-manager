<template>
  <v-container>
    <h2 class="ml-5">Adicionar Usuário</h2>
    <v-form @submit.prevent="addUser">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="newUser.name" label="Nome" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="newUser.email" label="Email" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="newUser.password" label="Password" type='password' required></v-text-field>
          </v-col>
        </v-row>
        <v-btn type="submit" color="primary">Adicionar Usuário</v-btn>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </v-container>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore, UserState } from '../stores/app';

let errorMessage = '';

const store = useAppStore();
const newUser = ref<UserState>({
  id: '',
  name: '',
  email: '',
  password: ''
});

const addUser = async () => {
  try {
    if (newUser.value.name && newUser.value.email) {
      const success = await store.addUser(newUser.value);
      if (success) {
        newUser.value = {
          id: '',
          name: '',
          email: '',
          password: ''
        };
        window.location.reload()
      }
    }
  } catch (error) {
    errorMessage = "Erro ao adicionar usuário: " + errorMessage;
  }
};
</script>
