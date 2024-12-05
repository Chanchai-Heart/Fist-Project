import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyApO-BVsCcwZSUVTbyVEW7mL5ZA6TwDMpQ',
    authDomain: 'easy-ecommerce2455.firebaseapp.com',
    databaseURL: 'https://easy-ecommerce2455-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'easy-ecommerce2455',
    storageBucket: 'easy-ecommerce2455.firebasestorage.app',
    messagingSenderId: '222727939409',
    appId: '1:222727939409:web:509628ba732f7e78d29f70'
  };

  const app = initializeApp(firebaseConfig)

  const db = getFirestore(app)
  connectFirestoreEmulator(db, '127.0.0.1', 8080)

  const auth = getAuth(app)
  connectAuthEmulator(auth, 'http://127.0.0.1:9099')

  export {
    db,
    auth
};