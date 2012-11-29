<?php
	
	define('APP_ID','355558234538834');
	define('APP_SECRET','e164f9f06cca2ca6ca30dee73a2aee30');
	
	define('DSN','mysql:host=localhost;dbname=pokemon');
	define('USER','root');
	define('PASSWORD','');
	
	//for production
	/* define('APP_ID','444829792243191');
	define('APP_SECRET','494a4d9064937d42cd8a65a449100650');
	
	define('DSN','mysql:host=mysql51-41.perso;dbname=benjaminla41189');
	define('USER','benjaminla41189');
	define('PASSWORD','mBqFn0Rh'); */
	
	try {
		$pkm = new PDO(DSN,USER,PASSWORD);
	} catch (PDOException $e){
		echo 'Connexion échouée : '.$e->getMessage();
	}
	
	
?>