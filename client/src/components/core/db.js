import firebase from 'firebase'

export const db = firebase.initializeApp({ databaseURL: 'https://fir-vue-4ffa4.firebaseio.com/' }).database()