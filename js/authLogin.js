// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDvrU6sLDBFNpnFKEdoLmacw26ItyyZKs",
  authDomain: "smart-gardent-31211.firebaseapp.com",
  databaseURL: "https://smart-gardent-31211-default-rtdb.firebaseio.com",
  projectId: "smart-gardent-31211",
  storageBucket: "smart-gardent-31211.appspot.com",
  messagingSenderId: "498783498415",
  appId: "1:498783498415:web:f7b119118be0b083bea45a",
  measurementId: "G-M2GZC4P9HZ",
};
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("singin");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var database = getFirestore();
const auth = getAuth(app);
let Login = document.getElementById("login");
Login.addEventListener("click", (event) => {
  event.preventDefault();
  var email = document.getElementById("emailL").value;
  var password = document.getElementById("passwordL").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      var ref = doc(database, "UserAuthList", userCredential.user.uid);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        sessionStorage.setItem(
          "user-info",
          JSON.stringify({
            username: docSnap.data().username,
          })
        );
        sessionStorage.setItem(
          "user-cred",
          JSON.stringify(userCredential.user)
        );
        window.location.href = "../index.html";
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
});
let register = document.getElementById("sighUp");
register.addEventListener("click", (event) => {
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var username = document.getElementById("username").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed up
      var ref = doc(database, "UserAuthList", userCredential.user.uid);
      await setDoc(ref, {
        username: username,
      });
      alert("Registration successfully!!");
      window.location.href = "../auth/auth.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
});
