/*

    Slot functionality and animation

*/

function generateSlotContent(type, targetData, height){ //Initial data input
    let slotData = 0
    generateResult = []
    for(let i = 0; i<targetData.length; i++){
        if(targetData[i].slotType == type){
            let slotData = {
                content: targetData[i].slotContent,
                desc: targetData[i].slotDesc,
                sentence: targetData[i].slotSentence,
                winPos: 0
            }
            generateResult[i] = slotData         
        }
    }

    var returnArray = new Array() //Clears empty array slots
    for(let i = 0; i<generateResult.length; i++){
        if(generateResult[i]){
            returnArray.push(generateResult[i])
        }
    }

    for(let i = 0; i<returnArray.length; i++){ //Calculates win positions
        returnArray[i].winPos = (i+1)*height
    }

    return returnArray
}

function getRandomInt(max){
    return Math.floor(Math.random()* Math.floor(max))
}


function drawSlot(slotArray, slotCanvas, sWidth, sHeight){
    var c = document.getElementById(slotCanvas)
    c.style.height = 2*(65*(slotArray.length))+"px" //Height
    c.style.width = 120+"px" //Width
    var ctx = c.getContext("2d")
    c.width = c.clientWidth   // To make sure the image is not blurry and acts properly,
    c.height = c.clientHeight // canvas is set to user resolution
    ctx.textAlign = "center" 
    ctx.font = "bold 16px Arial"

    for(let i = 0; i<slotArray.length; i++){
        ctx.fillText(slotArray[i].content, sWidth, sHeight*(i+1))
        ctx.fillText(slotArray[i].content, sWidth, sHeight*(i+1+slotArray.length))
        console.log(slotCanvas)
    }

    c.style.top = randomSlotPosition(slotArray)
}

function randomSlotPosition(slotArray){
    result = getRandomInt(slotArray.length)
    result = slotArray[result].winPos
    return result
}

function slotAnimation(slotArray, canvas, speed){
    let c = document.getElementById(canvas)
    let range = -(slotArray.length*64)
    c.style.top = c.offsetTop-speed+"px"
    if(c.offsetTop <= range){
        c.style.top = 0+"px"
    }

}


