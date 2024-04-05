<template>
  <v-container>
    <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
  
    <h2 class="my-4">Lista de Usuários</h2>
    <v-row>
      <v-col v-for="user in users" :key="user.id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ user.name }}</v-card-title>
          <v-card-subtitle>{{ user.email }}</v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" @click="openEditModal(user)">Editar</v-btn>
            <v-btn color="error" @click="deleteUser(user.id)">Excluir</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  
    <v-dialog class="" v-model="editModal" max-width="600px">
      <v-card>
        <v-card-title>Editar Usuário</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateUser">
            <v-text-field v-model="editedUser.name" label="Nome"></v-text-field>
            <v-text-field v-model="editedUser.email" label="Email"></v-text-field>
            <v-btn type="submit" color="primary">Salvar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAppStore, UserState } from '../stores/app';

const store = useAppStore();
const editModal = ref(false);
const errorMessage = ref('');
const users = ref<UserState[]>([]);
const editedUser = ref<UserState>({
  id: '',
  name: '',
  email: '',
  password: ''
});

const openEditModal = (user: UserState) => {
  editedUser.value = { ...user };
  editModal.value = true;
};

const updateUser = async () => {
  try {
    const success = await store.updateUser(editedUser.value);
    if (success) {
      users.value = await store.fetchUsers();
      editModal.value = false;
    }
  } catch (error) {
    errorMessage.value = 'Erro ao atualizar usuário: ' + errorMessage;
  }
};

const deleteUser = async (userId: string) => {
  try {
    const success = await store.deleteUser(userId);
    if (success) {
      users.value = users.value.filter(user => user.id !== userId);
    }
  } catch (error) {
    errorMessage.value = 'Erro ao excluir usuário: ' + errorMessage;
  }
};

onMounted(async () => {
  users.value = await store.fetchUsers();
});
</script>
