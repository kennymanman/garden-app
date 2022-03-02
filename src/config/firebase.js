import * as firebase from 'firebase'
import 'firebase/firestore';



// Initialize Firebase
const firebaseConfig = {
  // apiKey: "AIzaSyAr__Fqj7l8rLc_E7rA3gr8vqueINTUeU8",
  // authDomain: "fir-project-f34a6.firebaseapp.com",
  // projectId: "fir-project-f34a6",
  // storageBucket: "fir-project-f34a6.appspot.com",
  // messagingSenderId: "686941071047",
  // appId: "1:686941071047:web:2310b0e8c9fc91fdeb80e2",
  // measurementId: "G-FP531TK5X2"
  apiKey: "AIzaSyCFPn3RcZa8NGi7poe8pa3lzZn0Xb8Q3z4",
  authDomain: "grossaryshopping.firebaseapp.com",
  databaseURL: "https://grossaryshopping-default-rtdb.firebaseio.com",
  projectId: "grossaryshopping",
  storageBucket: "grossaryshopping.appspot.com",
  messagingSenderId: "731992047828",
  appId: "1:731992047828:web:26ad39ec2df8b6f9847b41",
  measurementId: "G-KKQPGB1N5E"
};
  
export default Fire = firebase.default.initializeApp(firebaseConfig);
const firestore = firebase.default.firestore();

export{
  firestore
}

  