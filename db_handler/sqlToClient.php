<?php

$servername = 'd67184.mysql.zonevs.eu';

$username = 'd67184_dlguser';

$password = 'dlguseradmin';

$dbname = 'd67184_dlg';



$outputArray = array(array("id","type","content","desc","sentence"));



function retrieveData(){
   global $servername, $username, $password, $dbname;


    // Create connection

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection

    if ($conn->connect_error) {

        die("Error Code: 0" . $conn->connect_error);

    } 



    $sql = "SELECT id, slotType, slotContent, slotDesc, slotSentence FROM dataGame";

    $result = $conn->query($sql);



    if ($result->num_rows > 0) {

        $i = 0;

        while($row = $result->fetch_assoc()) {

            $outputArray[$i][0] = $row["id"];

            $outputArray[$i][1] = $row["slotType"];

            $outputArray[$i][2] = $row["slotContent"];

            $outputArray[$i][3] = $row["slotDesc"];

            $outputArray[$i][4] = $row["slotSentence"];

            $i = $i+1;

        }

    } else {

        echo "Error Code: 1";

    }

    $conn->close();



    echo "<script> let fromDatabase=".json_encode($outputArray)."</script>";

}



?>