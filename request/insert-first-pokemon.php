<?php
	
	require_once("../config/connexion.php");
	
	$pokemon = $_GET['pokemon'];
	$data = array();
	
	
	if ($pokemon == 'bulbizarre') {
	
		$data['nom'] = 'bulbizarre';
		$data['type'] = 'plante';
		$data['img'] = 'bulbizarre.png';
		$data['xp'] = 0;
		$data['levelup'] = 316;
		$data['pv'] = 45;
		$data['currentpv'] = 45;
		$data['attack1'] = 'charge';
		$data['attack2'] = 'tranchHerbe';
		$data['attack3'] = 'rugissement';
		$data['defense'] = 49;
		$data['attack'] = 49;
		$data['level'] = 6;
		
	 } elseif ($pokemon == 'salameche') {
			
		$data['nom'] = 'salameche';
		$data['type'] = 'feu';
		$data['img'] = 'salameche.png';
		$data['xp'] = 0;
		$data['levelup'] = 316;
		$data['pv'] = 39;
		$data['currentpv'] = 39;
		$data['attack1'] = 'griffe';
		$data['attack2'] = 'flammeche';
		$data['attack3'] = 'rugissement';
		$data['defense'] = 43;
		$data['attack'] = 52;
		$data['level'] = 6;
		
	 } elseif ($pokemon == 'carapuce') {
		
		$data['nom'] = 'carapuce';
		$data['type'] = 'eau';
		$data['img'] = 'carapuce.png';
		$data['xp'] = 0;
		$data['levelup'] = 316;
		$data['pv'] = 44;
		$data['currentpv'] = 44;
		$data['attack1'] = 'charge';
		$data['attack2'] = 'ecume';
		$data['attack3'] = 'grosYeux';
		$data['defense'] = 65;
		$data['attack'] = 48;
		$data['level'] = 6;
	
	 }
	
	$data['userid'] = $_GET['userid'];
	echo $data['nom'];
	
	
	
	$req = $pkm->prepare(
		'INSERT into pokemons (nom, type, img, xp, levelup, pv, currentpv, attack1, attack2, attack3, defense, attack, level, id_users) 
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
	);
	$req->execute(
		array(
			$data['nom'],
			$data['type'],
			$data['img'],
			$data['xp'],
			$data['levelup'],
			$data['pv'],
			$data['currentpv'],
			$data['attack1'],
			$data['attack2'],
			$data['attack3'],
			$data['defense'],
			$data['attack'],
			$data['level'],
			$data['userid']
		)
	);

	
?>