/*

GLOBALS

*/

//User defined globals
let SET_SLOT_HEIGHT = 64
let SET_SLOT_WIDTH = 64
let SLOT_TYPE_1 = "targetGroup"
let SLOT_TYPE_2 = "problem"
let SLOT_TYPE_3 = "genre"
let SLOT_TYPE_4 = "designElement"
let SLOT_TYPE_5 = "learningMethod"
let SLOT_CANVAS_1 = "slot1"
let SLOT_CANVAS_2 = "slot2"
let SLOT_CANVAS_3 = "slot3"
let SLOT_CANVAS_4 = "slot4"
let SLOT_CANVAS_5 = "slot5"
let SLOTCANVAS = [SLOT_CANVAS_1, SLOT_CANVAS_2, SLOT_CANVAS_3, SLOT_CANVAS_4, SLOT_CANVAS_5]
let ROLL_BUTTON = "rollButton"
let HOLD_BUTTON_1 = "holdButton1"
let HOLD_BUTTON_2 = "holdButton2"
let HOLD_BUTTON_3 = "holdButton3"
let HOLD_BUTTON_4 = "holdButton4"
let HOLD_BUTTON_5 = "holdButton5"
let INITIAL_SPEED = 48

//System defined globals
let SLOT_1
let SLOT_2
let SLOT_3
let SLOT_4
let SLOT_5
let SLOTS = [SLOT_1,SLOT_2,SLOT_3,SLOT_4,SLOT_5]
let GAME_STATE = 0
let winnerSlots = []
let slotStates = [0,0,0,0,0]
let holdStates = [0,0,0,0,0]

/*

    Loads all preloadable game elements and data

*/

window.onload = function(){

    let load_status = "Loading started"

    //Retrieve data from database
    load_status = "Retrieving data from database"
    let generateData = generateDataArray(fromDatabase)

    //Generate content for all slots
    load_status = "Generating content for slots"
    SLOT_1 = generateSlotContent(SLOT_TYPE_1, generateData, SET_SLOT_HEIGHT)
    SLOT_2 = generateSlotContent(SLOT_TYPE_2, generateData, SET_SLOT_HEIGHT)
    SLOT_3 = generateSlotContent(SLOT_TYPE_3, generateData, SET_SLOT_HEIGHT)
    SLOT_4 = generateSlotContent(SLOT_TYPE_4, generateData, SET_SLOT_HEIGHT)
    SLOT_5 = generateSlotContent(SLOT_TYPE_5, generateData, SET_SLOT_HEIGHT)

    //Draw all the slots
    load_status = "Drawing slots on canvas"
    drawSlot(SLOT_1, SLOT_CANVAS_1, SET_SLOT_WIDTH, SET_SLOT_HEIGHT)
    drawSlot(SLOT_2, SLOT_CANVAS_2, SET_SLOT_WIDTH, SET_SLOT_HEIGHT)
    drawSlot(SLOT_3, SLOT_CANVAS_3, SET_SLOT_WIDTH, SET_SLOT_HEIGHT)
    drawSlot(SLOT_4, SLOT_CANVAS_4, SET_SLOT_WIDTH, SET_SLOT_HEIGHT)
    drawSlot(SLOT_5, SLOT_CANVAS_5, SET_SLOT_WIDTH, SET_SLOT_HEIGHT)

    load_status = "Configuring buttons"
    document.getElementById(ROLL_BUTTON).disabled = false
    document.getElementById(HOLD_BUTTON_1).disabled = true
    document.getElementById(HOLD_BUTTON_2).disabled = true
    document.getElementById(HOLD_BUTTON_3).disabled = true
    document.getElementById(HOLD_BUTTON_4).disabled = true
    document.getElementById(HOLD_BUTTON_5).disabled = true

    load_status = "Loading completed!"
    document.getElementById("loaderBody").style.display = "none" // Hides loading screen

}

/* 

    Game Controller

*/
function holdButtonToggler(holdButtonNumber){
    if(holdStates[holdButtonNumber] == 0){
        holdStates[holdButtonNumber] = 1
    }
    else{
        holdStates[holdButtonNumber] = 0
    }
}

function selectWinners(){
    for(let i=0; i<5; i++){
        if(holdStates[i] == 0){
            winnerSlots[i] = randomSlotPosition(SLOTS[i])
        }
    }
}

function initGame(){
    GAME_STATE = 1
    document.getElementById(ROLL_BUTTON).disabled = true
    document.getElementById(HOLD_BUTTON_1).disabled = true
    document.getElementById(HOLD_BUTTON_2).disabled = true
    document.getElementById(HOLD_BUTTON_3).disabled = true
    document.getElementById(HOLD_BUTTON_4).disabled = true
    document.getElementById(HOLD_BUTTON_5).disabled = true

    selectWinners()

    var timerloop = setInterval(function(){
        let SPEED = INITIAL_SPEED 
        let counter = 0
        let gameDone = 0

        if(counter > 300){
            for(let i = 0; i<SLOTS.length; i++){
                if(holdStates[i] == 0){
                    document.getElementById(SLOTCANVAS[i]).style.top = (document.getElementById(SLOTCANVAS[i]).style.top)+250+(7*i)+"px"
                    SPEED--
                    slotAnimation(SLOTS[i], SLOTCANVAS[i], SPEED)
                }
            }
            if(counter > 301){
                for(let i = 0; i<SLOTS.length; i++){
                    if(holdStates[i] == 0){
                        SPEED--
                        if(SPEED < 1){
                            SPEED = 1
                        }
                        if(document.getElementById(SLOTCANVAS[i]).style.top == winnerSlots[i].winPos){
                            slotStates[i] = 1
                        }
                        else{
                            slotAnimation(SLOTS[i], SLOTCANVAS[i], SPEED)
                        }
                    }
                }
                for(let i = 0; i<slotStates.length; i++){
                    gameDone = gameDone + slotStates[i]
                }
                if(gameDone == 5){
                    clearInterval(timerloop)
                    counter = 0
                    GAME_STATE = 0
                    slotStates = [0,0,0,0,0]
                    holdStates = [0,0,0,0,0]
                    document.getElementById(ROLL_BUTTON).disabled = false
                    document.getElementById(HOLD_BUTTON_1).disabled = false
                    document.getElementById(HOLD_BUTTON_2).disabled = false
                    document.getElementById(HOLD_BUTTON_3).disabled = false
                    document.getElementById(HOLD_BUTTON_4).disabled = false
                    document.getElementById(HOLD_BUTTON_5).disabled = false
                }
                else{
                    gameDone = 0
                }
            }
            counter++
        }
        else{
            
            for(let i = 0; i<SLOTS.length; i++){
                if(holdStates[i] == 0){
                    slotAnimation(SLOTS[i], SLOTCANVAS[i], SPEED)
                }
                else{
                    slotStates[i] = 1
                }
            }
            counter++
        }

    },10)
    
}


