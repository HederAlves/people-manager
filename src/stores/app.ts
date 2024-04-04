// store/app.ts
import { defineStore } from 'pinia';
import { app } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  email: string;
  password: string;
}

export const useAppStore = defineStore('app', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null,
    email: '',
    password: ''
  }),

  actions: {
    async signUp(email, password) {
      try {
        this.loading = true;
        const auth = getAuth(app);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        this.loading = false;
        this.error = null;
      } catch (error) {
        this.loading = false;
        this.error = error.message;
      }
    },

    async signIn(email, password) {
      try {
        this.loading = true;
        const auth = getAuth(app);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        this.loading = false;
        this.error = null;
      } catch (error) {
        this.loading = false;
        this.error = error.message;
      }
    },

    async signOut() {
      try {
        const auth = getAuth(app);
        await signOut(auth);
        this.user = null;
        this.loading = false;
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    }
  }
});
