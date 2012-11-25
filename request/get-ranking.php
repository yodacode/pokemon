<?php
	
	require_once("../config/connexion.php");
	
	
	/* $friends = $facebook->api('me/friends','GET');
	
	for($i=0; $i < count($friends['data']); $i++){
		$friendsId =  $friends['data'][$i]['id'];
		$imgUrl = 'https://graph.facebook.com/'.$friends['data'][$i]['id'].'/picture';
		echo '<img friendid="'.$friendsId.'" src="'.$imgUrl.'"/>';
	} */
	
	
	//$id = $_GET['userid'];

	
	$req = $pkm->prepare(
			'SELECT * FROM users 
			LEFT JOIN pokemons 
			ON pokemons.id_users = users.fb_id
			ORDER BY level'
		);
	$req->execute();
	$data = $req->fetchAll();
	

	
  header('Content-Type: text/x-json');
	
	die (json_encode($data));
	
?>