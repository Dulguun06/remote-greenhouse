let progressCircular = document.querySelector(".progress-circular");
let progressCircular_2 = document.querySelector(".progress-circular-2");
let progressCircular_3 = document.querySelector(".progress-circular-3");
let progressCircular_4 = document.querySelector(".progress-circular-4");

let value = document.querySelector(".value");
let value_2 = document.querySelector(".value-2");
let value_3 = document.querySelector(".value-3");
let value_4 = document.querySelector(".value-4");

var fan_element = document.getElementById("fan");
var door_element = document.getElementById("door");
var alarm1_element = document.getElementById("alarm_1");
var alarm2_element = document.getElementById("alarm_2");

let efan_val, fan_val, door_val;

let start = 0,
  start_2 = 0,
  start_3 = 0,
  start_4 = 0;

var database = firebase.database();
var data, data_hum, data_out, data_sun;

function get_exit_fan() {
  var efan_ref = database.ref("exit_fan");
  efan_ref.on("value", function (snapshot) {
    efan_val = snapshot.val();
  });
}
function get_enter_fan() {
  var fan_ref = database.ref("enter_fan");
  fan_ref.on("value", function (snapshot) {
    fan_val = snapshot.val();
  });
}
function get_door() {
  var door_ref = database.ref("door");
  door_ref.on("value", function (snapshot) {
    door_val = snapshot.val();
  });
}

function get_temperature() {
  var user_ref = database.ref("temperature");
  user_ref.on("value", function (snapshot) {
    data = snapshot.val();
  });
}

function get_hum() {
  var user_ref_2 = database.ref("hum");
  user_ref_2.on("value", function (snapshot) {
    data_hum = snapshot.val();
  });
}

function get_out_temp() {
  var user_ref_3 = database.ref("temp_out");
  user_ref_3.on("value", function (snapshot) {
    data_out = snapshot.val();
  });
}

function get_sun() {
  var user_ref_4 = database.ref("sun");
  user_ref_4.on("value", function (snapshot) {
    data_sun = snapshot.val();
  });
}
function check() {
  get_door();
  get_exit_fan();
  get_enter_fan();
  get_temperature();

  if (fan_val == 0 && efan_val == 0) fan_element.className = "off_circle";
  else fan_element.className = "circle";

  if (door_val == 0) door_element.className = "off_circle";
  else door_element.className = "circle";

  if (data < 50) alarm1_element.className = "off_circle";
  else alarm1_element.className = "circle";
  if (data > 10) alarm2_element.className = "off_circle";
  else alarm2_element.className = "circle";
}

function bar_in() {
  get_temperature();
  let progress = setInterval(() => {
    if (start < data) {
      start++;
      progressEND();
    } else {
      start--;
      progressEND();
    }
    function progressEND() {
      value.textContent = `${start}°`;
      progressCircular.style.background = `conic-gradient(#880bea ${
        start * 1.8
      }deg, #ededed 0deg)`;
      if (start == data) {
        clearInterval(progress);
        data = "";
      }
    }
  }, 1);
}

function bar_hum() {
  get_hum();
  let progress_2 = setInterval(() => {
    if (start_2 < data_hum) {
      start_2++;
      progressEND_2();
    } else {
      start_2--;
      progressEND_2();
    }
    function progressEND_2() {
      value_2.textContent = `${start_2}%`;
      progressCircular_2.style.background = `conic-gradient(#880bea ${
        start_2 * 1.8
      }deg, #ededed 0deg)`;
      if (start_2 == data_hum) {
        clearInterval(progress_2);
        data_hum = "";
      }
    }
  }, 1);
}

function bar_out() {
  get_out_temp();
  let progress_3 = setInterval(() => {
    if (start_3 < data_out) {
      start_3++;
      progressEND_3();
    } else {
      start_3--;
      progressEND_3();
    }
    function progressEND_3() {
      value_3.textContent = `${start_3}°`;
      progressCircular_3.style.background = `conic-gradient(#880bea ${
        start_3 * 1.8
      }deg, #ededed 0deg)`;
      if (start_3 == data_out) {
        clearInterval(progress_3);
        data_out = "";
      }
    }
  }, 1);
}

function bar_sun() {
  get_sun();
  let progress_4 = setInterval(() => {
    if (start_4 < data_sun) {
      start_4++;
      progressEND_4();
    } else {
      start_4--;
      progressEND_4();
    }
    function progressEND_4() {
      value_4.textContent = `${start_4}%`;
      progressCircular_4.style.background = `conic-gradient(#880bea ${
        start_4 * 1.8
      }deg, #ededed 0deg)`;
      if (start_4 == data_sun) {
        clearInterval(progress_4);
        data_sun = "";
      }
    }
  }, 1);
}

setInterval(bar_in, 1000);
setInterval(bar_out, 1000);
setInterval(bar_hum, 1000);
setInterval(bar_sun, 1000);
setInterval(check, 1000);
