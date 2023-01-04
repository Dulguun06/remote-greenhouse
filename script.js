var firebaseConfig = {
  apiKey: "AIzaSyBd_QQdJ9IBXfu0oGA6WIeHZ7YjI05rqrg",
  authDomain: "remote-greenhouse.firebaseapp.com",
  databaseURL: "https://remote-greenhouse-default-rtdb.firebaseio.com",
  projectId: "remote-greenhouse",
  storageBucket: "remote-greenhouse.appspot.com",
  messagingSenderId: "67159095877",
  appId: "1:67159095877:web:07921ec9c5b461af89412c",
};
firebase.initializeApp(firebaseConfig);

$(document).ready(function () {
  var database = firebase.database();

  var enter_fan;
  var exit_fan;
  var door;
  var Led4Status;

  database.ref().on("value", function (snap) {
    enter_fan = snap.val().enter_fan;
    exit_fan = snap.val().exit_fan;
    door = snap.val().door;
    Led4Status = snap.val().Led4Status;
    if (enter_fan == "1") {
      document.getElementById("unact").style.display = "none";
      document.getElementById("act").style.display = "block";
    } else {
      document.getElementById("unact").style.display = "block";
      document.getElementById("act").style.display = "none";
    }
    if (exit_fan == "1") {
      document.getElementById("unact1").style.display = "none";
      document.getElementById("act1").style.display = "block";
    } else {
      document.getElementById("unact1").style.display = "block";
      document.getElementById("act1").style.display = "none";
    }
    if (door == "1") {
      document.getElementById("unact2").style.display = "none";
      document.getElementById("act2").style.display = "block";
    } else {
      document.getElementById("unact2").style.display = "block";
      document.getElementById("act2").style.display = "none";
    }
    if (Led4Status == "1") {
      document.getElementById("unact3").style.display = "none";
      document.getElementById("act3").style.display = "block";
    } else {
      document.getElementById("unact3").style.display = "block";
      document.getElementById("act3").style.display = "none";
    }
  });

  $(".toggle-btn").click(function () {
    var firebaseRef = firebase.database().ref().child("enter_fan");
    if (enter_fan == "1") {
      firebaseRef.set("0");
      enter_fan = "0";
    } else {
      firebaseRef.set("1");
      enter_fan = "1";
    }
  });
  $(".toggle-btn1").click(function () {
    var firebaseRef = firebase.database().ref().child("exit_fan");
    if (exit_fan == "1") {
      firebaseRef.set("0");
      exit_fan = "0";
    } else {
      firebaseRef.set("1");
      exit_fan = "1";
    }
  });
  $(".toggle-btn2").click(function () {
    var firebaseRef = firebase.database().ref().child("door");
    if (door == "1") {
      firebaseRef.set("0");
      door = "0";
    } else {
      firebaseRef.set("1");
      door = "1";
    }
  });
  $(".toggle-btn3").click(function () {
    var firebaseRef = firebase.database().ref().child("Led4Status");
    if (Led4Status == "1") {
      firebaseRef.set("0");
      Led4Status = "0";
    } else {
      firebaseRef.set("1");
      Led4Status = "1";
    }
  });
});
