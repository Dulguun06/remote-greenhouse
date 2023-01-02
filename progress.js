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
let progressCircular=document.querySelector(".progress-circular");
let btn=document.querySelector(".bar-btn-1");
let inp=document.querySelector(".input-bar-1");
let value=document.querySelector(".value");
let start=0;
const dbRef=ref(db);

btn.addEventListener("click",bar);
function bar(){
    let progress=setInterval(()=>{
        if(start<inp.value){
            start++;
            progressEND();
        }else{
            start--;
            progressEND();
        }
        function progressEND(){
            value.textContent=`${start}%`
            progressCircular.style.background=`conic-gradient(#880bea ${start*1.8}deg, #ededed 0deg)`
            if(start==inp.value){
                clearInterval(progress);
                inp.value="";
            }
        }
    },50);
}
