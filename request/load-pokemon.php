<?php
	
	require_once("../config/connexion.php");
	
	$id = $_GET['userid'];

	
	$req = $pkm->prepare('SELECT * FROM pokemons WHERE id= ?');
	$req->execute(array($id));
	$data = $req->fetchObject();
	
  header('Content-Type: text/x-json');
	
	die (json_encode($data));
	
?>