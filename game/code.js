
//GLOBALS
var inArr = [["Adventure", "Sci-Fi", "Crime", "Thriller", "Su ema", "Puzzle",
"lolol", "Midagiveel", "teretere", "boooo","chicka","chicka","Adventure", "Sci-Fi", "Crime", 
"Thriller", "Su ema", "Puzzle","lolol", "Midagiveel", "teretere", "boooo","chicka","chicka"],["blablbal","olololol","afdefefaef","feseret"],
["blablbal","olololol","afdefefaef","feseret","gfoksr","oafkeosef","orei332"],["3","1","4","5","5,","743","534","632"],
["3","1","4","5"]]
/*
var inArr2 = ["blablbal","olololol","afdefefaef","feseret"]
var inArr4 = ["blablbal","olololol","afdefefaef","feseret","gfoksr","oafkeosef","orei332"]
var inArr3 = ["3","1","4","5","5,","743","534","632"]
var inArr5 = ["3","1","4","5"]
*/

var turn = 0 // how many rolls have been rolled so a turn counter basically

var winArr = [[],[],[],[],[]] // declaring winArray for win condition slot positions

var slotSpeeds = [0,0,0,0,0] // Declaring slot speeds per roll

var slotStates = [0,0,0,0,0] // Declaring slot states(if they want to be held for a roll)

var slotPositions = [0,0,0,0,0] // Slot positions to control the slot speeds

var winners = [0,0,0,0,0] // Winners array per roll
var winnersCache = [0,0,0,0,0]
var winnersText = ["","","","",""]
var winnersTextCache = ["","","","",""]

var gameSession = 0
//GLOBALS

function getRandomInt(max){
    return Math.floor(Math.random()* Math.floor(max))
}

window.onload = function(){
    canvasSize(inArr[0], "slot1")
    drawBoxes(inArr[0], "slot1", 0)
    canvasSize(inArr[1], "slot2")
    drawBoxes(inArr[1], "slot2", 1)
    canvasSize(inArr[2], "slot3")
    drawBoxes(inArr[2], "slot3", 2)
    canvasSize(inArr[3], "slot4")
    drawBoxes(inArr[3], "slot4", 3)
    canvasSize(inArr[4], "slot5")
    drawBoxes(inArr[4], "slot5", 4)

    document.getElementById("loader").style.display = "none" // Hides loading screen
}


//Canvas size by the size of the array, width is constant
function canvasSize(a, canvasName){
    document.getElementById(canvasName).style.height = 2*(65*(a.length))+"px" //Height
    document.getElementById(canvasName).style.width = 120+"px" //Width
}

function selectPosition(slotNumber){ // Generates a position randomly for a value
    var result = getRandomInt(winArr[slotNumber].length)
    result = winArr[slotNumber][result]
    return result;
}

function selectWinners(){
    for(i=0; i<5; i++){
        winners[i] = selectPosition(i)
        for(k=0; k<winArr[i].length; k++){
            if(winners[i] == winArr[i][k]){
                winnersText[i] = inArr[i][k]
            }
        }
    }
}

function cacheWinners(){
    if(turn == 0){
        // Inital turn dont cache winners, since no winners have been stored
    }
    else{
        for(i=0; i<5; i++){
            winnersCache[i] = winners[i]
            for(k=0; k<winArr[i].length; k++){
                if(winnersCache[i] == winArr[i][k]){
                    winnersTextCache[i] = inArr[i][k]
                }
            }
        }
    }
}

function holdSelection(inputNumber){
    if(turn == 0){
        // Inital turn the buttons do nothing and are disabled.
    }
    else{

        if(slotStates[inputNumber] == 0){
            slotStates[inputNumber] = 1
        }
        else{
            slotStates[inputNumber] = 0
        }
    }
}

function toggleButtons(){
    // Toggles hold buttons and roll button
    if(gameSession == 1){
        document.getElementById("holdButton1").disabled = true
        document.getElementById("holdButton2").disabled = true
        document.getElementById("holdButton3").disabled = true
        document.getElementById("holdButton4").disabled = true
        document.getElementById("holdButton5").disabled = true
        document.getElementById("rollButton").disabled = true
    }
    else{
        document.getElementById("holdButton1").disabled = false
        document.getElementById("holdButton2").disabled = false
        document.getElementById("holdButton3").disabled = false
        document.getElementById("holdButton4").disabled = false
        document.getElementById("holdButton5").disabled = false
        document.getElementById("rollButton").disabled = false

    }
}


function drawBoxes(inputArray, canvasName, slotNumber){
    var c = document.getElementById(canvasName)
    var ctx = c.getContext("2d")
    c.width = c.clientWidth   // To make sure the image is not blurry and acts properly,
    c.height = c.clientHeight // canvas is set to user resolution
    ctx.textAlign = "center" 
    ctx.font = "bold 16px Arial"

    for(var i=0; i<inputArray.length; i++){ //Adds all options in array
        ctx.fillText(inputArray[i],60,64*(i+1)) // Options
        winArr[slotNumber][i] = 0-64*i // Creates win condition offset values
        ctx.fillText(inputArray[i],60,64*(i+1+inputArray.length)) // For animation to give full effect, adding all rows
        //again
    }

    var startPos = selectPosition(slotNumber) //Selects starting positions

    c.style.top = startPos+"px"

}

function slotSpeed(slotNumber){ //Max and min speeds
    var values = winArr[slotNumber].length

    if(values < 5){
        values = 5
    }
    if(values > 15){
        values = 16
    }

    slotSpeeds[slotNumber] = values
}

function slotOffset(canvasName, slotNumber){ //This animates the slots
    var c = document.getElementById(canvasName)
    var max = winArr[slotNumber].length - 1
    var slotDefault = (winArr[slotNumber][max])-64
    c.style.top = c.offsetTop-1*slotSpeeds[slotNumber]+"px"
    if(c.offsetTop <= slotDefault){
        c.style.top = 0+"px"
    }
    slotPositions[slotNumber] = c.offsetTop
}

function initRoll(){ //Initiates the rolling of the slots
    var counter = 0
    gameSession = 1
    toggleButtons()
    for(i=0; i<5; i++){ //Slot speeds are appended to a global array
        slotSpeed(i)
    }
    cacheWinners() // Caches last winners
    selectWinners() // Winners are selected
    for(j=0; j<5; j++){
        if(slotStates[j] == 1){
            slotSpeeds[j] = 0
            winners[j] = cacheWinners[j]
            winnersText[j] = winnersTextCache[j]
        }
    }
    var timerloop = setInterval(function(){ // Animation starts
        console.log(counter)

        if(counter > 500){ //After 500 cycles starts to slow down
            var check=0
            for(i=0; i<5; i++){ // Checks every slot and starts to slow them down if slot positions are 500pxs away from win result
                if(winners[i]+500-slotPositions[i]>0){
                    slotSpeeds[i]--
                }
                if(slotSpeeds[i] < 1 && slotStates[i] == 0){
                    slotSpeeds[i] = 1
                }
                if((slotSpeeds[i] == 0 && slotStates[i] == 1) || (slotSpeeds[i] == 1 && slotPositions[i] == winners[i])){
                    check++
                }
                else{
                    slotOffset("slot"+(i+1),i)
                }
            }
            if(check == 5){
                clearInterval(timerloop) // Loop end
                turn++
                counter = 0
                gameSession = 0
                slotStates = [0,0,0,0,0]
                toggleButtons()
            }
        }
        else{
            slotOffset("slot1", 0)
            slotOffset("slot2", 1)
            slotOffset("slot3", 2)
            slotOffset("slot4", 3)
            slotOffset("slot5", 4)
            counter++
        }

    },10)

}
