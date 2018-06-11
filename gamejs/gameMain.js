/*

GLOBALS

*/

//User defined globals
let SET_SLOT_HEIGHT = 60
let SET_SLOT_WIDTH = 60
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
let TURN_COUNT = 0
let winnerSlots = []
let slotStates = [0,0,0,0,0]
let ideaBox = ""

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
    SLOTS = [SLOT_1,SLOT_2,SLOT_3,SLOT_4,SLOT_5]

    //Draw all the slots
    load_status = "Drawing slots on canvas"
    drawSlot(SLOT_1, SLOT_CANVAS_1, SET_SLOT_WIDTH, SET_SLOT_HEIGHT)
    drawSlot(SLOT_2, SLOT_CANVAS_2, SET_SLOT_WIDTH, SET_SLOT_HEIGHT)
    drawSlot(SLOT_3, SLOT_CANVAS_3, SET_SLOT_WIDTH, SET_SLOT_HEIGHT)
    drawSlot(SLOT_4, SLOT_CANVAS_4, SET_SLOT_WIDTH, SET_SLOT_HEIGHT)
    drawSlot(SLOT_5, SLOT_CANVAS_5, SET_SLOT_WIDTH, SET_SLOT_HEIGHT)
    ideaBox = document.getElementById("ideaText")
    ideaBox.innerHTML = "Roll to find an idea!"

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
    if(slotStates[holdButtonNumber] == 0){
        slotStates[holdButtonNumber] = 1
    }
    else{
        slotStates[holdButtonNumber] = 0
    }
}

function selectWinners(){
    for(let i=0; i<5; i++){
        if(slotStates[i] == 0){
            winnerSlots[i] = (randomSlotPosition(SLOTS[i]))
            
        }
    }
}

function initGame(){
    GAME_STATE = 1
    TURN_COUNT += 1
    document.getElementById("ideaText").innerHTML = "Calculating..."
    document.getElementById(ROLL_BUTTON).disabled = true
    document.getElementById(HOLD_BUTTON_1).disabled = true
    document.getElementById(HOLD_BUTTON_2).disabled = true
    document.getElementById(HOLD_BUTTON_3).disabled = true
    document.getElementById(HOLD_BUTTON_4).disabled = true
    document.getElementById(HOLD_BUTTON_5).disabled = true
    let counter = 0
    let gameDone = 0
    let start_gap = 150
    let stop_gap = 50
    let slotsClosed = 0
    let SPEED = INITIAL_SPEED 
    selectWinners()

    var timerloop = setInterval(function(){
        for(let i = 0; i<SLOTS.length; i++){
            if(slotStates[i] == 0){
                slotAnimation(SLOTS[i], SLOTCANVAS[i], SPEED)
            }
            else{
                slotStates[i] = 1
            }
        }

        if(counter>start_gap){
            if(slotStates[slotsClosed] == 0){
                document.getElementById(SLOTCANVAS[slotsClosed]).style.top = -winnerSlots[slotsClosed].winPos+"px"
                slotStates[slotsClosed] = 1
            }
            slotsClosed += 1
            start_gap = start_gap + stop_gap
            if(slotsClosed == 5){
                clearInterval(timerloop) // Loop end
                GAME_STATE = 0
                slotStates = [0,0,0,0,0]
                ideaBox.innerHTML = winnerSlots[2].sentence+" game for "+winnerSlots[0].sentence+" with "+winnerSlots[3].sentence+
                " that is based on "+winnerSlots[4].sentence+" and the need for "+winnerSlots[1].sentence
                document.getElementById(ROLL_BUTTON).disabled = false
                document.getElementById(HOLD_BUTTON_1).disabled = false
                document.getElementById(HOLD_BUTTON_2).disabled = false
                document.getElementById(HOLD_BUTTON_3).disabled = false
                document.getElementById(HOLD_BUTTON_4).disabled = false
                document.getElementById(HOLD_BUTTON_5).disabled = false
            }
        }
        
        counter++

    },10)
    
}


