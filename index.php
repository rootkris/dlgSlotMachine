<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php include './db_handler/sqlToClient.php'; 
    
    retrieveData();
    echo "test";
    
    ?>
    <script src="./db_handler/dataHandler.js"></script>
	<script src="./gamejs/slot.js"></script>
	<script src="./gamejs/gameMain.js"></script>
    <title>Game Idea Bandit</title>

    <style>
    
    body{
        background-color:black;
        overflow: hidden;
    }

    canvas{
        position: relative;
        float:left;

    }

    .gameBody{
        background-color: white;
        position:relative;
        height: 600px;
        width: 800px;
        top: 150px;
        margin: 0 auto;
        
    }

    .gameBodyHeader{
        background-color: green;
        position: relative;
        width: 100%;
        height: 25%;
        z-index: 3;
    }

    .gameBodySlots{
        background-color: white;
        position: relative;
        width: 600px;
        height: 100%;
        left: 100px;
        z-index: 1;
        overflow: hidden;
    }

    .gameBodySlotsSides{
        background-color: gray;
        position: relative;
        width: 100%;
        height: 50%;
        z-index: 2;
    }

    .gameBodyFooter{
        background-color: blue;
        position: relative;
        width: 100%;
        height: 25%;
        z-index: 3;
    }
    .gameBodySlotsOverlay{
        background-color: white;
        position: relative;
        width: 100%;
        height: 75%;
        top: 25%;
        z-index: 3;
    }

        /* The Modal (background) */
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 15; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 300px; /* Full width */
        height: 600px; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    /* Modal Content */
    .modal-content {
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 0;
        border: 1px solid #888;
        width: 80%;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        -webkit-animation-name: animatetop;
        -webkit-animation-duration: 0.4s;
        animation-name: animatetop;
        animation-duration: 0.4s
    }

    /* Add Animation */
    @-webkit-keyframes animatetop {
        from {top:-300px; opacity:0} 
        to {top:0; opacity:1}
    }

    @keyframes animatetop {
        from {top:-300px; opacity:0}
        to {top:0; opacity:1}
    }

    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

        /* Add animation to "page content" */
    .animate-bottom {
        position: relative;
        -webkit-animation-name: animatebottom;
        -webkit-animation-duration: 1s;
        animation-name: animatebottom;
        animation-duration: 1s
    }

    @-webkit-keyframes animatebottom {
        from { bottom:-100px; opacity:0 } 
        to { bottom:0px; opacity:1 }
    }

    @keyframes animatebottom { 
        from{ bottom:-100px; opacity:0 } 
        to{ bottom:0; opacity:1 }
    }

    /* The Close Button */
    .close {
        color: white;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }

    .modal-header {
        padding: 2px 16px;
        background-color: #5cb85c;
        color: white;
    }

    .modal-body {padding: 2px 16px;}

    .modal-footer {
        padding: 2px 16px;
        background-color: #5cb85c;
        color: white;
    }

    .loader {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 999;
        width: 150px;
        height: 150px;
        margin: -75px 0 0 -75px;
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
    }
    .loaderBody{
        position: absolute;
        z-index: 998;
        width: 100%;
        height: 100%;
        background-color: black;
    }

    </style>

</head>
<body>

    <div class="loaderBody" id="loaderBody">
        <div class="loader" id="loader">
        </div>
    </div>

    <div class="gameBody" id="gameBody">

        <div class="gameBodyHeader">
            <button type="button" id=holdButton1 onclick="holdSelection(0)" disabled>Hold 1</button>
            <button type="button" id=holdButton2 onclick="holdSelection(1)" disabled>Hold 2</button>
            <button type="button" id=holdButton3 onclick="holdSelection(2)" disabled>Hold 3</button>
            <button type="button" id=holdButton4 onclick="holdSelection(3)" disabled>Hold 4</button>
            <button type="button" id=holdButton5 onclick="holdSelection(4)" disabled>Hold 5</button>
        </div>

        <div class="gameBodySlotsSides">
            <div class="gameBodySlots">
                <canvas id="slot1">

                </canvas>

                <canvas id="slot2">

                </canvas>

                <canvas id="slot3">

                </canvas>

                <canvas id="slot4">

                </canvas>

                <canvas id="slot5">

                </canvas>
                <div class="gameBodySlotsOverlay">

                </div>
            </div>
        </div>

        <div class="gameBodyFooter">
            <button type="button" id="rollButton" onclick="initRoll()">Roll</button>
            <button type="button" id="muteButton" onclick="muteToggle()">Music OFF</button>
        </div>
    </div>

    <div id="infoModal" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
          <div class="modal-header">
            <span class="close">&times;</span>
            <h2>Detailed Information</h2>
          </div>
          <div class="modal-body" id="modal-body-id">
            
          </div>
          <div class="modal-footer">
            <h3></h3>
          </div>
        </div>

        <script>
            //Modal activation
            var modal = document.getElementById("infoModal")
            var span = document.getElementsByClassName("close")[0]
            var slot1 = document.getElementById("slot1")
            var slot2 = document.getElementById("slot2")
            var slot3 = document.getElementById("slot3")
            var slot4 = document.getElementById("slot4")
            var slot5 = document.getElementById("slot5")
            
            slot1.onclick = function(){
                if(gameSession == 0 && turn>0){
                    modal.style.display = "block"
                    document.getElementById("modal-body-id").innerHTML = "<p>You clicked: "+winnersText[0]+"</p>"
                }
                else if(turn==0){
                    modal.style.display = "block"
                    document.getElementById("modal-body-id").innerHTML = "<p>If you want more information, play the game first!</p>"
                }
            }
            slot2.onclick = function(){
                if(gameSession == 0 && turn>0){
                    modal.style.display = "block"
                    document.getElementById("modal-body-id").innerHTML = "<p>You clicked: "+winnersText[1]+"</p>"
                }
                else if(turn==0){
                    modal.style.display = "block"
                    document.getElementById("modal-body-id").innerHTML = "<p>If you want more information, play the game first!</p>"
                }
            }
            slot3.onclick = function(){
                if(gameSession == 0 && turn>0){
                    modal.style.display = "block"
                    document.getElementById("modal-body-id").innerHTML = "<p>You clicked: "+winnersText[2]+"</p>"
                }
                else if(turn==0){
                    modal.style.display = "block"
                    document.getElementById("modal-body-id").innerHTML = "<p>If you want more information, play the game first!</p>"
                }
            }
            slot4.onclick = function(){
                if(gameSession == 0 && turn>0){
                    modal.style.display = "block"
                    document.getElementById("modal-body-id").innerHTML = "<p>You clicked: "+winnersText[3]+"</p>"
                }
                else if(turn==0){
                    modal.style.display = "block"
                    document.getElementById("modal-body-id").innerHTML = "<p>If you want more information, play the game first!</p>"
                }
            }
            slot5.onclick = function(){
                if(gameSession == 0 && turn>0){
                    modal.style.display = "block"
                    document.getElementById("modal-body-id").innerHTML = "<p>You clicked: "+winnersText[4]+"</p>"
                }
                else if(turn==0){
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
        </script>
      
    </div>
    
</body>
</html>

