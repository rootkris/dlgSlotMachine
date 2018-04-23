<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="./stylesheets/game.css">
    <?php include './db_handler/sqlToClient.php'; 
    
    retrieveData();
    echo "test";
    
    ?>
    <script src="./db_handler/dataHandler.js"></script>
	<script src="./gamejs/slot.js"></script>
	<script src="./gamejs/gameMain.js"></script>
    <title>Game Idea Bandit</title>

</head>
<body>

    <div class="loaderBody" id="loaderBody">
        <div class="loader" id="loader">
        </div>
    </div>

    <div class="gameBody" id="gameBody">

        <div class="gameBodyHeader">
            <button type="button" id=holdButton1 onclick="holdButtonToggler(0)" disabled>Hold 1</button>
            <button type="button" id=holdButton2 onclick="holdButtonToggler(1)" disabled>Hold 2</button>
            <button type="button" id=holdButton3 onclick="holdButtonToggler(2)" disabled>Hold 3</button>
            <button type="button" id=holdButton4 onclick="holdButtonToggler(3)" disabled>Hold 4</button>
            <button type="button" id=holdButton5 onclick="holdButtonToggler(4)" disabled>Hold 5</button>
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
            <button type="button" id="rollButton" onclick="initGame()">Roll</button>
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
      
    </div>
    <!-- Modal Script Init -->
    <script src="./gamejs/modal.js"></script>
    
</body>
</html>

