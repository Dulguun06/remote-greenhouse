let progressCircular = document.querySelector(".progress-circular");
let btn = document.querySelector(".bar-btn-1");
let inp = document.querySelector(".input-bar-1");
let value = document.querySelector(".value");
let start = 0;

btn.addEventListener("click", bar);
function bar() {
  let progress = setInterval(() => {
    if (start < inp.value) {
      start++;
      progressEND();
    } else {
      start--;
      progressEND();
    }
    function progressEND() {
      value.textContent = `${start}%`;
      progressCircular.style.background = `conic-gradient(#880bea ${
        start * 1.8
      }deg, #ededed 0deg)`;
      if (start == inp.value) {
        clearInterval(progress);
        inp.value = "";
      }
    }
  }, 50);
}
