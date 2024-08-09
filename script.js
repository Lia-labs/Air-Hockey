
const mouse = document.querySelector("#mouse");
const playground = document.querySelector("#playground");






window.addEventListener("mousemove", (ev)=>{
    let cursorGameY = ev.clientY - playground.offsetTop -7.5;
    let cursorGameX = ev.clientX - playground.offsetLeft -7.5;
    console.log(cursorGameX, cursorGameY);
    if (cursorGameY <= 985 && cursorGameY >= 500){
        mouse.style.top = cursorGameY + "px";
    }
    if (cursorGameX <= 585 && cursorGameX >=0){
        mouse.style.left = cursorGameX + "px";
    }

});

