<?php
	session_start();
	$dbconnect = mysql_connect('bradaylex.db.9207679.hostedresource.com', 'bradaylex', 'Boobsrock1!');
	mysql_set_charset("utf8", $dbconnect);
	mysql_select_db("database");


	if(isset($_POST['id_news']) && isset($_POST['name']) && isset($_POST['mail']) && isset($_POST['comment'])) {
	
		$id_news = $_POST['id_news'];
		$pseudo = $_POST['name'];
		$message = $_POST['comment'];
			
		$com = "INSERT INTO comments_table_name (id_news, pseudo, comment) VALUES ($id_news, \"$pseudo\", \"$message\")";
		$ajout_com = mysql_query($com);

		$nb_com = "UPDATE news_table_name SET comments=comments+1 WHERE id= $id_news";
		$update_nb_com = mysql_query($nb_com);

		$cookie = "comment".$id_news;

		setcookie($cookie, 'you comment it', (time() + (60*60*24*30*12)));
		
		header('location:news.html?#news_'.$id_news.'');

	}
		
	mysql_close();//Deconnexion du serveur
?>