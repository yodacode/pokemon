<?php
	
	define('DSN','mysql:host=localhost;dbname=pokemon');
	define('USER','root');
	define('PASSWORD','');
	
	try {
		$pkm = new PDO(DSN,USER,PASSWORD);
	} catch (PDOException $e){
		echo 'Connexion échouée : '.$e->getMessage();
	}
	
	//define('APP_ID','355558234538834');
	//define('APP_SECRET','e164f9f06cca2ca6ca30dee73a2aee30');
?>