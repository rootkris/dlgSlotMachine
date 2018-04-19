/*

    Data handler for preloading data from a SQL database into javascript

*/
function generateDataArray(dataIn){
    dataArray = []
    for(let i = 0; i<dataIn.length; i++){
        slotObject = {
            slotId: dataIn[i][0],
            slotType: dataIn[i][1],
            slotContent: dataIn[i][2],
            slotDesc: dataIn[i][3],
            slotSentence: dataIn[i][4]
        }
        dataArray[i] = slotObject
    }

    return dataArray
}