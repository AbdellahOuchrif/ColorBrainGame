const COLORSENG = {
    0:"Red",
    1:"Green",
    2:"Blue",
    3:"Yellow",
    4:"Orange",
    5:"Purple",
    6:"Black"
}

const r = document.querySelector(':root');
const Button1 = document.getElementById('button1');
const Button2 = document.getElementById('button2');
const sessionTotal = document.getElementById('sessionTotal');
const CurrentColorName = document.getElementById('current_color_name');
const ColorContainer = document.getElementById("color-container");
const PlayButton = document.getElementById("play");
const modal = document.getElementById('Modal');
const messageContent = document.getElementById('message-content');
const Fireworks= document.getElementById('Fireworks');

let [milliseconds,seconds] = [0,0];
let timerRef = document.querySelector('.timerDisplay');
var int = null;
var sessionSeconds = 0;
var sessionTens = 0;
var sessionCounter = 0;
var sessionScore = Array();
var tryResult = false;


function session(){
    if(sessionCounter <= 4){
        PlayButton.style.display = "none";
        Play();
    }else{
        showInstructions("Great job! Keep up the good work. Ready for another round? Let's go!");
        showFireworks();
        SetButtonColor("", "", "", "");
        disableButtons(true);
        CurrentColorName.innerHTML = "";
        PlayButton.style.display = "block";
        sessionCounter = 0;
    }
}

let ColorKey1;
function Play() {
    disableButtons(false);
    sessionCounter++;
    ColorKey1 = Math.floor(Math.random() * 7);
    let rand2;
    do { 
        rand2 = Math.floor(Math.random() * 7);
    } while(ColorKey1 === rand2);
    let CurrentColor = COLORSENG[ColorKey1];
    let ColorName = COLORSENG[rand2];
    SetColor(CurrentColor);
    SetName(ColorName);
    let ButtonColor = [CurrentColor, ColorName];
    let ButtonValue = [ColorKey1, rand2];
    let RandomNumber = Math.round(Math.random());
    switch(RandomNumber){
        case 0:
            SetButtonColor(ButtonColor[RandomNumber], ButtonValue[RandomNumber], ButtonColor[1], ButtonValue[1]);
            break;
        case 1:
            SetButtonColor(ButtonColor[RandomNumber], ButtonValue[RandomNumber], ButtonColor[0], ButtonValue[0]);
            break;
    }
    startTimer();
}


function CheckAnswer(color) {
    if(ColorKey1 == color) {
        tryResult = true;
    }else{
        tryResult = false;
    }
    showScore();
    pauseTimer();
    setTimeout(function () {   
        resetTimer();
        removeScore();
        session();
    }, 1000);
}

function SetColor(DisplayedColor) {
    r.style.setProperty('--current-color-displayed', DisplayedColor);
}


function SetName(NameColor) {
    CurrentColorName.innerHTML = NameColor;
}

function SetButtonColor(ButtonColor1, ButtonValue1, ButtonColor2, ButtonValue2) {
    Button1.innerHTML = ButtonColor1;
    Button1.value = ButtonValue1;
    Button2.innerHTML = ButtonColor2;
    Button2.value = ButtonValue2;
}


//Format a number to get a two digits one instead of a single digit number.
function formatNumber(num){
    let numberString = num.toLocaleString('en-US', {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    });
    return numberString;
}


//Starts the timer of a Try.
function startTimer(){
    if(int !== null){
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
}

function pauseTimer(){
    clearInterval(int);
}

//Resets the timer of a Try.
function resetTimer() {
    sessionTimer(seconds, milliseconds);
    clearInterval(int);
    [milliseconds, seconds] = [0, 0];
    timerRef.innerHTML = '00 : 00 ';
}

function displayTimer(){
    milliseconds++;
    if(milliseconds == 100){
        milliseconds = 0;
        seconds++;
    }

    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;
    
    timerRef.innerHTML = ` ${s} : ${ms}`;
}

//Calculates the Total of Time in a Session.
function sessionTimer(s, ms){
    sessionSeconds += s;
    if((sessionTens + ms) < 100){
        sessionTens += ms;
    }else{
        sessionTens = (sessionTens + ms) % 100;
        sessionSeconds++;
    }

    sessionScore.push([sessionSeconds, sessionTens, tryResult]);
}



function showScore() {

    disableButtons(true);
    if(tryResult){
        ColorContainer.style.boxShadow = "0 0 100px 10px rgb(24, 252, 0)";
        ColorContainer.style.backgroundColor = "#D0FFBC";
    }else{
        ColorContainer.style.boxShadow = "0 0 100px 10px rgb(255,0,0)";
        ColorContainer.style.backgroundColor = "#FF9A98";
    }

}


function removeScore() {
    disableButtons(false);
    ColorContainer.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    ColorContainer.style.border = "none";
    ColorContainer.style.boxShadow = "none";
}


function disableButtons(param) {
    Button1.disabled = param;
    Button2.disabled = param;
}


function showInstructions(message) {
    messageContent.textContent = "";
    messageContent.textContent = message;
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    Fireworks.style.display = 'none';
}

// Add animation classes to the modal
function addModalAnimationClasses() {
    modal.classList.add('modal-show');
}

function removeModalAnimationClasses() {
    modal.classList.remove('modal-show');
}

function showFireworks() {
    Fireworks.style.display = 'block';
}


window.onload = showInstructions("Instructions: Click the correct color name as quickly as possible. Be careful, the colors might not match the names!");