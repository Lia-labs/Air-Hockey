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
let Velocity_Ball=0;
let x_increment =0;
let y_increment =0;


function Timer() {
    intervalId = setInterval(() => {
        distan = Math.sqrt(Math.pow(cursorGameX-StoredX,2)+Math.pow(cursorGameY-StoredY,2));
        x_increment = (cursorGameX-StoredX)/distan;
        y_increment = (cursorGameY-StoredY)/distan;
        distance = Math.sqrt(Math.pow((cursorGameX-StoredX),2) + Math.pow((cursorGameY-StoredY),2));
        velocity = distance/(1/60);
       // console.log(velocity);
        StoredX =cursorGameX;
        StoredY =cursorGameY;
        //console.log(cursorGameX,mouse.offsetLeft,ball.offsetLeft,"//", cursorGameY,mouse.offsetHeight,ball.offsetTop)
    if (Math.sqrt(Math.pow((mouse.offsetLeft+25) - (ball.offsetLeft+25), 2) + Math.pow((mouse.offsetTop+25)- (ball.offsetTop+25), 2)) <(( mouse.offsetHeight/2)+(ball.offsetHeight/2))){
        if (velocity/60 > 50){
            Velocity_Ball = 50;
        }else{
            if (velocity/60 + Velocity_Ball > 50){
                Velocity_Ball = 50;
            }else{
                Velocity_Ball =velocity/60 + Velocity_Ball;
            }
        }

    console.log(Velocity_Ball);
    if (!Direc_X_Ball < 0.01 && !Direc_Y_Ball < 0.01){
        //Direc_X_Ball = x_increment;
        //Direc_Y_Ball = y_increment;
        vect_normal = [(ball.offsetLeft+25)-(mouse.offsetLeft+25),(ball.offsetTop+25)-(mouse.offsetTop+25)];
       // vect_normal = [(mouse.offsetLeft+25)-(ball.offsetLeft+25),(mouse.offsetTop+25)-(ball.offsetTop+25)];

        distance_vect_normal =Math.sqrt(Math.pow(vect_normal[0],2)+Math.pow(vect_normal[1],2));
        vect_normalizated = [vect_normal[0]/distance_vect_normal, vect_normal[1]/distance_vect_normal];
        vect_init =[Direc_X_Ball,Direc_Y_Ball];
        a=vect_init[0]-2*(dot(vect_init,vect_normalizated))*vect_normalizated[0];
        b=vect_init[1]-2*(dot(vect_init,vect_normalizated))*vect_normalizated[1];
        vect_reflec =[a,b];

        console.log(vect_normalizated,vect_init,vect_reflec);
        Direc_X_Ball=a;
        Direc_Y_Ball=b;


        }else{
            Direc_X_Ball = x_increment;
            Direc_Y_Ball = y_increment;

        }


    
    
    }
    
    Velocity_Ball= Velocity_Ball * 0.99;
    if ( 1000 < (ball.offsetTop+50 + (Velocity_Ball*Direc_Y_Ball))){
        a=  (ball.offsetTop+50 + (Velocity_Ball*Direc_Y_Ball))-1000;
        ball.style.top = (ball.offsetTop + (Velocity_Ball*Direc_Y_Ball) -a) + "px";
    }
    else if (0 > (ball.offsetTop + (Velocity_Ball*Direc_Y_Ball))){
        a= Math.abs(ball.offsetTop + (Velocity_Ball*Direc_Y_Ball));
        ball.style.top = (ball.offsetTop + (Velocity_Ball*Direc_Y_Ball)+a) + "px";
    }
    else if (600 < (ball.offsetLeft+ 50 + (Velocity_Ball*Direc_X_Ball))){
        a=  (ball.offsetLeft+50 + (Velocity_Ball*Direc_X_Ball))-600;
        ball.style.left = (ball.offsetLeft + (Velocity_Ball*Direc_X_Ball)-a) + "px";
    }
    else if (0 > (ball.offsetLeft + (Velocity_Ball*Direc_X_Ball))){
        a= Math.abs(ball.offsetLeft + (Velocity_Ball*Direc_X_Ball));
        ball.style.left = (ball.offsetLeft + (Velocity_Ball*Direc_X_Ball)+a) + "px";
    }
    else{
        ball.style.top = (ball.offsetTop + (Velocity_Ball*Direc_Y_Ball)) + "px";
        ball.style.left = (ball.offsetLeft + (Velocity_Ball*Direc_X_Ball)) + "px";
    }

    if (ball.offsetTop <= 0){
        Direc_Y_Ball = Math.abs(Direc_Y_Ball);
    }
    if (ball.offsetTop+50 >= 1000){
        Direc_Y_Ball = -(Math.abs(Direc_Y_Ball));
    }
    if (ball.offsetLeft <= 0){
        Direc_X_Ball = Math.abs(Direc_X_Ball);
    }
    if (ball.offsetLeft+50 >= 600){
        Direc_X_Ball = -(Math.abs(Direc_X_Ball));
    }

        
}, 1000 / 60.0);
return intervalId;
}


//Start
Timer();