<?php
	
	require_once("../config/connexion.php");
	$id = $_GET['userid'];
	$map = $_GET['map'];
	$req = $pkm->prepare('UPDATE users SET map=? WHERE id= ?');
	$req->execute(array($map,$id));
	$data = $req->fetchObject();
	
?>