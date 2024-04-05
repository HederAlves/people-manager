import { defineStore } from 'pinia';
import { app } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  email: string;
  password: string;
  isAuthenticated: boolean;
}

export interface UserState {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface UserFirestoreData {
  name: string;
  email: string;
  password: string;
}

export const useAppStore = defineStore('app', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null,
    email: '',
    password: '',
    isAuthenticated: false
  }),

  actions: {
    async signUp(email: string, password: string) {
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

    async signIn(email: string, password: string) {
      try {
        this.loading = true;
        const auth = getAuth(app);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        this.isAuthenticated = true;
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
        this.isAuthenticated = false;
        this.loading = false;
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },
    async fetchUsers() {
      try {
        const db = getFirestore(app);
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollection);
        const users: UserState[] = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          users.push({
            id: doc.id, name: userData.name, email: userData.email,
            password: userData.password
          });
        });
        return users;
      } catch (error) {
        this.error = error.message;
        return [];
      }
    },

    async addUser(user: UserState) {
      try {
        const db = getFirestore(app);
        const usersCollection = collection(db, 'users');

        const { id, ...userData } = user;
        const userFirestoreData: UserFirestoreData = {
          name: userData.name,
          email: userData.email,
          password: userData.password
        };

        await addDoc(usersCollection, userFirestoreData);
        return true;
      } catch (error) {
        this.error = error.message;
        return false;
      }
    }
    ,
    async updateUser(user: UserState) {
      try {
        const db = getFirestore(app);
        const userDoc = doc(db, 'users', user.id);
        const userUpdateData = {
          name: user.name,
          email: user.email,
        };

        await updateDoc(userDoc, userUpdateData);
        return true;
      } catch (error) {
        this.error = error.message;
        return false;
      }
    }
    ,

    async deleteUser(userId: string) {
      try {
        const db = getFirestore(app);
        const userDoc = doc(db, 'users', userId);
        await deleteDoc(userDoc);
        return true;
      } catch (error) {
        this.error = error.message;
        return false;
      }
    }
  }
});
