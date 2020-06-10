<?php
// SERVER, USER, PASSWORT, DATENBANK
$con=mysqli_connect("es5.siteground.eu","coasta09_usr","HOLSEA2020!!","coasta09_HolSea", "3306");
		
if ($con->connect_error) {
	die("Verbindung fehlgeschlagen: " . $con->connect_error); // Verbinde dich oder DIE!!!
}
?>