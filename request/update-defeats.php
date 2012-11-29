<?php
	
	require_once("../config/connexion.php");
	
	$id = $_GET['userid'];
	
	$req = $pkm->prepare('UPDATE users SET defeats=defeats+1 WHERE fb_id = ?');
	$req->execute(array($id));
	
?>