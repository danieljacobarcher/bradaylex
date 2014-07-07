<?php
	session_start();

	$dbconnect = mysql_connect('bradaylex.db.9207679.hostedresource.com', 'bradaylex', 'Boobsrock1!');
	mysql_set_charset("utf8", $dbconnect);
	mysql_select_db("database"); //Connexion à la base*/

	if(isset($_GET['id'])){
		$id = $_GET['id'];
		$cookie_like = "like".$id;

		if($_COOKIE[$cookie_like] == "you like it"){
			$enleve = "UPDATE news_table_name SET likes=likes-1 WHERE id = $id";
			$enlever = mysql_query($enleve) or die (mysql_error());

			$cookie = "like".$id;

			setcookie($cookie,'',($_SERVER['REQUEST_TIME'] - (86400*60)));
			
		} else {
			$ajout = "UPDATE news_table_name SET likes=likes+1 WHERE id = $id";
			$ajouter = mysql_query($ajout) or die (mysql_error());

			$cookie = "like".$id;

			setcookie($cookie, 'you like it', (time() + (60*60*24*30)));

		}
	}

?>