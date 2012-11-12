<?php
	
	require_once("../config/connexion.php");
	
	$id = 1;
	
	$req = $pkm->prepare('SELECT * FROM users WHERE id= ?');
	$req->execute(array($id));
	$data = $req->fetchObject();
	
  header('Content-Type: text/x-json');
	
	die (json_encode($data));
	
?>