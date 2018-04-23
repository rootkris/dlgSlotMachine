//Modal activation
var modal = document.getElementById("infoModal")
var span = document.getElementsByClassName("close")[0]
var slot1 = document.getElementById("slot1")
var slot2 = document.getElementById("slot2")
var slot3 = document.getElementById("slot3")
var slot4 = document.getElementById("slot4")
var slot5 = document.getElementById("slot5")

slot1.onclick = function(){
    if(GAME_STATE == 0 && TURN_COUNT>0){
        modal.style.display = "block"
        document.getElementById("modal-body-id").innerHTML = "<p>You clicked: "+winnerSlots[0].desc+"</p>"
    }
    else if(TURN_COUNT==0){
        modal.style.display = "block"
        document.getElementById("modal-body-id").innerHTML = "<p>If you want more information, play the game first!</p>"
    }
}
slot2.onclick = function(){
    if(GAME_STATE == 0 && TURN_COUNT>0){
        modal.style.display = "block"
        document.getElementById("modal-body-id").innerHTML = "<p>You clicked: "+winnerSlots[1].desc+"</p>"
    }
    else if(TURN_COUNT==0){
        modal.style.display = "block"
        document.getElementById("modal-body-id").innerHTML = "<p>If you want more information, play the game first!</p>"
    }
}
slot3.onclick = function(){
    if(GAME_STATE == 0 && TURN_COUNT>0){
        modal.style.display = "block"
        document.getElementById("modal-body-id").innerHTML = "<p>You clicked: "+winnerSlots[2].desc+"</p>"
    }
    else if(TURN_COUNT==0){
        modal.style.display = "block"
        document.getElementById("modal-body-id").innerHTML = "<p>If you want more information, play the game first!</p>"
    }
}
slot4.onclick = function(){
    if(GAME_STATE == 0 && TURN_COUNT>0){
        modal.style.display = "block"
        document.getElementById("modal-body-id").innerHTML = "<p>You clicked: "+winnerSlots[3].desc+"</p>"
    }
    else if(TURN_COUNT==0){
        modal.style.display = "block"
        document.getElementById("modal-body-id").innerHTML = "<p>If you want more information, play the game first!</p>"
    }
}
slot5.onclick = function(){
    if(GAME_STATE == 0 && TURN_COUNT>0){
        modal.style.display = "block"
        document.getElementById("modal-body-id").innerHTML = "<p>You clicked: "+winnerSlots[4].desc+"</p>"
    }
    else if(TURN_COUNT==0){
        modal.style.display = "block"
        document.getElementById("modal-body-id").innerHTML = "<p>If you want more information, play the game first!</p>"
    }
}
span.onclick = function(){
    modal.style.display = "none"
}
window.onclick = function(event) {
    if(event.target == modal){
         modal.style.display = "none"
    }
}