<?php
	
	require_once("../config/connexion.php");

	
	$req = $pkm->prepare(
			'SELECT * FROM users 
			LEFT JOIN pokemons 
			ON pokemons.id_users = users.fb_id
			ORDER BY level DESC'
		);
	$req->execute();
	$data = $req->fetchAll();
	

	
  header('Content-Type: text/x-json');
	
	die (json_encode($data));
	
?>