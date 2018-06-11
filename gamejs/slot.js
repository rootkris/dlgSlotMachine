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
        returnArray[i].winPos = i*height + 4
        console.log(returnArray[i])
    }

    return returnArray
}

function getRandomInt(max){
    return Math.floor(Math.random()* Math.floor(max))
}


function drawSlot(slotArray, slotCanvas, sWidth, sHeight){
    let tempHeight = sHeight*2
    var c = document.getElementById(slotCanvas)
    var pixr = window.devicePixelRatio
    let font = 16*pixr
    c.style.height = 2*(64*(slotArray.length))+"px" //Height
    c.style.width = 120+"px" //Width
    var ctx = c.getContext("2d")
    c.width = c.clientWidth*pixr  // To make sure the image is not blurry and acts properly,
    c.height = c.clientHeight*pixr // canvas is set to user resolutions
    ctx.textAlign = "center" 
    ctx.font = font+"px Arial"

    for(let i = 0; i<slotArray.length; i++){
        let sliced = null
        let floor = 0
        let c_index = 0
        let index = 0
        let splitter = slotArray[i].content
        if(splitter.includes("%") === true){
            while(splitter.includes("%") === true){
                c_index = splitter.indexOf("%")
                sliced = splitter.slice(index,c_index)
                ctx.fillText(sliced, sWidth*pixr, -font+(sHeight*(i+1))*pixr+(font*floor))
                ctx.fillText(sliced, sWidth*pixr, -font+(sHeight*(i+1+slotArray.length))*pixr+(font*floor))
                splitter = splitter.replace("%","")
                floor += 1
                index = c_index
            }
            sliced = splitter.slice(index)
            ctx.fillText(sliced, sWidth*pixr, -font+(sHeight*(i+1))*pixr+(font*floor))
            ctx.fillText(sliced, sWidth*pixr, -font+(sHeight*(i+1+slotArray.length))*pixr+(font*floor))

        }
        else{
            ctx.fillText(slotArray[i].content, sWidth*pixr, (sHeight*(i+1))*pixr)
            ctx.fillText(slotArray[i].content, sWidth*pixr, (sHeight*(i+1+slotArray.length))*pixr)
            }

        console.log(slotCanvas)
    }

    c.style.top = randomSlotPosition(slotArray)
}

function randomSlotPosition(slotArray){
    result = getRandomInt(slotArray.length)
    result = slotArray[result]
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


