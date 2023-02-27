const firebaseConfig = {
  apiKey: "AIzaSyAVwsc66YuTvSFRjDyzSaPhOZAPVDqobb4",
  authDomain: "resumewebapp-37416.firebaseapp.com",
  projectId: "resumewebapp-37416",
  storageBucket: "resumewebapp-37416.appspot.com",
  messagingSenderId: "1040433477186",
  appId: "1:1040433477186:web:f1703e74d7954193885fdb",
  measurementId: "G-6G6WZJ39DG"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()


//active user to home page (mainpage)
firebase.auth().onAuthStateChanged((user) =>{
  if(user){
    location.replace("resume.html")
  }
})


// Set up our register function
function register () {
// Get all our input fields
email = document.getElementById('email').value
password = document.getElementById('password').value


// Validate input fields
if (validate_email(email) == false || validate_password(password) == false) {
  alert('Email or Password is Outta Line!!')
  return
  // Don't continue running the code
}

// Move on with Auth
auth.createUserWithEmailAndPassword(email, password)
.then(function() {
  // Declare user variable
  var user = auth.currentUser

  // Add this user to Firebase Database
  var database_ref = database.ref()

  // Create User data
  var user_data = {
    email : email,
    last_login : Date.now()
  }

  // Push to Firebase Database
  database_ref.child('users/' + user.uid).set(user_data)

  // DOne
  alert('User Created!!')
})
.catch(function(error) {
  // Firebase will use this to alert of its errors
  var error_code = error.code
  var error_message = error.message

  alert(error_message)
})
}

// Set up our login function
function login () {
// Get all our input fields
email = document.getElementById('email').value
password = document.getElementById('password').value

// Validate input fields
if (validate_email(email) == false || validate_password(password) == false) {
  alert('Email or Password is Outta Line!!')
  return
  // Don't continue running the code
}

auth.signInWithEmailAndPassword(email, password)
.then(function() {
  // Declare user variable
  var user = auth.currentUser

  // Add this user to Firebase Database
  var database_ref = database.ref()

  // Create User data
  var user_data = {
    last_login : Date.now()
  }

  // Push to Firebase Database
  database_ref.child('users/' + user.uid).update(user_data)

  // DOne
  alert('User Logged In!!')

})
.catch(function(error) {
  // Firebase will use this to alert of its errors
  var error_code = error.code
  var error_message = error.message

  alert(error_message)
})
}



// signout function
function signOut(){
  auth.signOut();
  alert("SignOut Successfully from Resume Builder");
}


// Validate Functions

//validatiing email
function validate_email(email) {
expression = /^[^@]+@\w+(\.\w+)+\w$/
if (expression.test(email) == true) {
  // Email is good
  return true
} else {
  // Email is not good
  return false
}
}


// firebase password validation
function validate_password(password) {
// Firebase only accepts lengths greater than 6
if (password < 6) {
  return false
} else {
  return true
}
}
