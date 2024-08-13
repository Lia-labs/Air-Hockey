"use strict"
const ball = document.querySelector("#ball");
const mouse = document.querySelector("#mouse");
const playground = document.querySelector("#playground");




let cursorGameX;
let cursorGameY;

//Functions 
function dot(V1,V2){
    return V1[0]*V2[0]+V1[1]*V2[1]
}



window.addEventListener("mousemove", (ev)=>{
     cursorGameY = ev.clientY - playground.offsetTop -25;
     cursorGameX = ev.clientX - playground.offsetLeft -25;
    if (cursorGameY <= 950 && cursorGameY >= 500){
        mouse.style.top = cursorGameY + "px";
    }
    if (cursorGameX <= 550 && cursorGameX >=0){
        mouse.style.left = cursorGameX + "px";
    }

});

let StoredX;
let StoredY;
let Direc_X_Ball =0;
let Direc_Y_Ball =0;
let Velocity_Ball =[ 0 , 0];
let x_increment =0;
let y_increment =0;
let a;


function Timer() {
  let  intervalId = setInterval(() => {

        x_increment = (cursorGameX-StoredX);
        y_increment = (cursorGameY-StoredY);
        
        StoredX =cursorGameX;
        StoredY =cursorGameY;

        if ( Math.sqrt ( Math.pow (( mouse.offsetLeft + 25 ) - ( ball.offsetLeft + 25 ), 2 ) + Math.pow (( mouse.offsetTop + 25 )- 
        ( ball.offsetTop + 25 ), 2 )) < (( mouse.offsetHeight / 2 ) + ( ball.offsetHeight / 2 ))){
            
        Velocity_Ball = [x_increment,y_increment];
        console.log(Velocity_Ball);
        if (!( Math.abs( Velocity_Ball[0] ) < 0.01 && Math.abs( Velocity_Ball[1] ) < 0.01 )){


            let vect_normal = [( ball.offsetLeft + 25 ) - ( mouse.offsetLeft + 25 ),
                ( ball.offsetTop + 25 ) - ( mouse.offsetTop + 25 )];

            
            Velocity_Ball[0]= Velocity_Ball[0] *vect_normal[0];
            Velocity_Ball[1]= Velocity_Ball[1] *vect_normal[1];
                
            let distance_vect_normal = Math.sqrt( Math.pow( vect_normal[0] , 2 ) + Math.pow( vect_normal[1] , 2 ));

            let vect_normalizated = [ vect_normal[0] / distance_vect_normal , vect_normal[1] / distance_vect_normal ];
            //vect_init =[Direc_X_Ball,Direc_Y_Ball];
            let a=Velocity_Ball[0]-2*(dot(Velocity_Ball,vect_normalizated))*vect_normalizated[0];
            let b=Velocity_Ball[1]-2*(dot(Velocity_Ball,vect_normalizated))*vect_normalizated[1];
            let vect_reflec =[a,b];

            console.log(Velocity_Ball,vect_normalizated,vect_reflec);
            Velocity_Ball[0] = a;
            Velocity_Ball[1] = b;


            ball.style.left = ( mouse.offsetLeft + 25 ) + vect_normalizated[0] * ( ( ball.offsetHeight / 2 ) + ( mouse.offsetHeight / 2 ) );
            ball.style.top = ( mouse.offsetTop + 25 ) + vect_normalizated[1] * ( ( ball.offsetHeight / 2 ) + ( mouse.offsetHeight / 2 ) );






            }else{
                Velocity_Ball[0] = x_increment;
                Velocity_Ball[1] = y_increment;
        }


    
    
    }
    
    Velocity_Ball[0]= Velocity_Ball[0] * 0.99;
    Velocity_Ball[1]= Velocity_Ball[1] * 0.99;
    console.log(Velocity_Ball[1],Velocity_Ball[0]);
    if ( 1000 < (ball.offsetTop+50 + Velocity_Ball[1])){
        a=  (ball.offsetTop+50 + Velocity_Ball[1])-1000;
        ball.style.top = (ball.offsetTop + Velocity_Ball[1] -a) + "px";
    }
    else if (0 > (ball.offsetTop + Velocity_Ball[1])){
        a= Math.abs(ball.offsetTop + Velocity_Ball[1]);
        ball.style.top = (ball.offsetTop +Velocity_Ball[1]+a) + "px";
    }
    else if (600 < (ball.offsetLeft+ 50 + Velocity_Ball[0])){
        a=  (ball.offsetLeft+50 + Velocity_Ball[0])-600;
        ball.style.left = (ball.offsetLeft + Velocity_Ball[0]-a) + "px";
    }
    else if (0 > (ball.offsetLeft + Velocity_Ball[0])){
        a= Math.abs(ball.offsetLeft + Velocity_Ball[0]);
        ball.style.left = (ball.offsetLeft + Velocity_Ball[0] +a) + "px";
    }
    else{
        ball.style.top = (ball.offsetTop + Velocity_Ball[1]) + "px";
        ball.style.left = (ball.offsetLeft + Velocity_Ball[0]) + "px";
    }

    if (ball.offsetTop <= 0){
        Velocity_Ball[1] = Math.abs(Velocity_Ball[1]);
    }
    if (ball.offsetTop+50 >= 1000){
        Velocity_Ball[1] = -(Math.abs(Velocity_Ball[1]));
    }
    if (ball.offsetLeft <= 0){
        Velocity_Ball[0] = Math.abs(Velocity_Ball[0]);
    }
    if (ball.offsetLeft+50 >= 600){
        Velocity_Ball[0] = -(Math.abs(Velocity_Ball[0]));
    }

        
}, 1000 / 60.0);
return intervalId;
}


//Start
Timer();