const ball = document.querySelector("#ball");
const mouse = document.querySelector("#mouse");
const playground = document.querySelector("#playground");




let cursorGameX;
let cursorGameY;

window.addEventListener("mousemove", (ev)=>{
     cursorGameY = ev.clientY - playground.offsetTop -7.5;
     cursorGameX = ev.clientX - playground.offsetLeft -7.5;
    if (cursorGameY <= 985 && cursorGameY >= 500){
        mouse.style.top = cursorGameY + "px";
    }
    if (cursorGameX <= 585 && cursorGameX >=0){
        mouse.style.left = cursorGameX + "px";
    }

});

let StoredX;
let StoredY;
let Direc_X_Ball =0;
let Direc_Y_Ball =0;
let Velocity_Ball=0;
let x_increment =0;
let y_increment =0;


function Timer() {
    intervalId = setInterval(() => {

        x_increment = cursorGameX-StoredX;
        y_increment = cursorGameY-StoredY;
        distance = Math.sqrt(Math.pow((cursorGameX-StoredX),2) + Math.pow((cursorGameY-StoredY),2));
        velocity = distance/(1/60);
       // console.log(velocity);
        StoredX =cursorGameX;
        StoredY =cursorGameY;
        console.log(cursorGameX,mouse.offsetLeft,ball.offsetLeft,"//", cursorGameY,mouse.offsetHeight,ball.offsetTop)
    if (Math.sqrt(Math.pow(mouse.offsetLeft - (ball.offsetLeft), 2) + Math.pow(mouse.offsetTop- (ball.offsetTop), 2)) < mouse.offsetHeight+ ball.offsetHeight){
    Velocity_Ball =velocity/60;
    Direc_X_Ball = x_increment;
    Direc_Y_Ball = y_increment;
    }
    
    Velocity_Ball= Velocity_Ball * 0.99;
    ball.style.top = (ball.offsetTop + (Velocity_Ball*Direc_Y_Ball)) + "px";
    ball.style.left = (ball.offsetLeft + (Velocity_Ball*Direc_X_Ball)) + "px";

    if (ball.offsetTop <= 0){
        Direc_Y_Ball = Math.abs(Direc_Y_Ball);
    }
    if (ball.offsetTop+15 >= 1000){
        Direc_Y_Ball = -(Math.abs(Direc_Y_Ball));
    }
    if (ball.offsetLeft <= 0){
        Direc_X_Ball = Math.abs(Direc_X_Ball);
    }
    if (ball.offsetLeft+15 >= 600){
        Direc_X_Ball = -(Math.abs(Direc_X_Ball));
    }

        
}, 1000 / 60.0);
return intervalId;
}


//Start
Timer();