// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const createFirebaseApp = (config = {}) => {
  try {
    return getApp()
  } catch {
    return initializeApp(config)
  }
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAlFWxhySejdZQYll5mgYpojQqkWDomSaE',
  authDomain: 'spinach-49a50.firebaseapp.com',
  databaseURL: 'https://spinach-49a50-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'spinach-49a50',
  storageBucket: 'spinach-49a50.appspot.com',
  messagingSenderId: '844203536040',
  appId: '1:844203536040:web:4a1f03c49e1a433c265c9d',
  measurementId: 'G-33N50QXNT9'
}

const app = createFirebaseApp(firebaseConfig)

// export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const database = getDatabase(app)
