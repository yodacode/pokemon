<?php
	
	require_once("../config/connexion.php");
	
	$id = $_GET['userid'];
	$xp = $_GET['xp'];

	
	$req = $pkm->prepare('UPDATE pokemons SET xp=? WHERE id_users= ?');
	$req->execute(array($xp,$id));
	
	
	
?>