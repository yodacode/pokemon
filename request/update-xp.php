<?php
	
	require_once("../config/connexion.php");
	
	$id = $_GET['userid'];
	$xp = $_GET['xp'];
	
	$req = $pkm->prepare('UPDATE pokemons SET xp=? WHERE id_users= ?');
	$req->execute(array($xp,$id));
	
	$req2 = $pkm->prepare('UPDATE users SET victories=victories+1 WHERE fb_id = ?');
	$req2->execute(array($id));
	
	
?>