<?php
	
	require_once("../config/connexion.php");
	
	$id = $_GET['userid'];
	$level = $_GET['level'];
	$levelup = $_GET['levelup'];
	$initxp = 0;

	
	$req = $pkm->prepare('UPDATE pokemons SET level=?, levelup=?, xp=? WHERE id_users= ?');
	$req->execute(array($level,$levelup,$initxp,$id));
	
	
?>