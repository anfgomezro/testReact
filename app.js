const express = require('express');
const app = express();
const firebase = require('firebase/app');

const firebaseConfig = {
  apiKey: "AIzaSyApuT_oYAUO87wvix7xreFX353AProK9c0",
  authDomain: "testreact-415c8.firebaseapp.com",
  databaseURL: "https://testreact-415c8.firebaseio.com",
  projectId: "testreact-415c8",
  storageBucket: "testreact-415c8.appspot.com",
  messagingSenderId: "1085757976229",
  appId: "1:1085757976229:web:dad6c0bbb8e77e7483274c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

require('firebase/auth');

app.use(express.static('./dist'));
app.use(express.json());

app.post('/sign-up',(req,res) => {
  const {email, password} = req.body;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    if (error) {
      res.json({err : error.message});
    } else {
      res.json(req.body);
    }
  });
});

app.listen(3000, () => console.log('running server'));
