<?php 
	require_once("api/facebook.php"); 
	require_once("config/connexion.php");
		
	$facebook = new Facebook(array(
		'appId'  => APP_ID,
		'secret' => APP_SECRET,
		'fileUpload' => false
	));

	$user = $facebook->getUser();

	if($user){
		$user_profile = $facebook->api('/me');
		$req = $pkm->prepare('SELECT * FROM users WHERE fb_id= ?');
		$req->execute(array($user_profile['id']));
		
		if(count($req->fetchAll()) == 0) {
			$req = $pkm->prepare('INSERT into users (fb_id, nom, prenom, login, direction, positiony, positionx, map) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
			$req->execute(array($user_profile['id'],$user_profile['last_name'],$user_profile['first_name'],$user_profile['email'],'up',4,5,'chen'));
		}	
	} else  {
		echo "Vous n'etes pas connecté à l'application";
	}
?>
<!DOCTYPE html>
<html xmlns:fb="http://ogp.me/ns/fb#">
	<head>
		<meta property="og:tag name" content="tag value"/>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
		<script type="text/javascript" src="js/pokemon.js"></script>
		<link type="text/css" rel="stylesheet" href="css/sanitize.css" media="screen"/>
		<link type="text/css" rel="stylesheet" href="css/style.css" media="screen"/>
		<title>Pokemon</title>
	</head>
	<body>
		<div id="fb-root"></div>
		<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1&appId=355558234538834";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
	<div class="container">
		<div id="friendList">
		</div>
		<div class="pause">pause</div>
		<div class="play">play</div>
		<div class="overflow" style="width:1px;height:1px">&nbsp;<?php include('preload-img.php');?></div>
		<div class="gameboy">
		<div class="loader">...</div>
			<div class="screen">
			<div class="options">
					<div class="sidebar">
						<ul>
							<li class="share-pokemon"><a href="#">Mon pokemon</a></li>
							<li class="friends-pokemons"><a href="#">Pokemons de mes amis</a></li>
						</ul>
					</div>
				<div class="content">
					<div class="list-pokemons">
						<ul></ul>
					</div>
				</div>
			</div>
			<div class="fight">
					<div class="panel">
						<div class="rival-pokemon">
							<div class="overflow">
								<div class="stat">
									<div class="overflow">
										<span class="name"></span>
										<span class="level"><span class="label">Lv</span></span>
									</div>
									<div class="overflow life-block">
										<div class="label-life">HP</div>
										<div class="life-container"><div class="life"></div></div>
									</div>
									<div class="overflow">
										<span class="currentPV"></span>
										<span class="pv"><span class="label"> / </span></span>
									</div>
								</div>
								<div class="img"></div>
							</div>
						</div>
						<div class="my-pokemon">
							<div class="overflow">
								<div class="img"></div>
								<div class="stat">
									<div class="overflow">
										<span class="name"></span>
										<span class="level"><span class="label">Lv</span></span>
									</div>
									<div class="overflow life-block" >
										<div class="label-life">HP</div>
										<div class="life-container"><div class="life"></div></div>
									</div>
									<div class="overflow">
										<span class="currentPV"></span>
										<span class="pv"><span class="label"> / </span></span>
									</div>
									<div class="overflow xp-block">
										<div class="xp-container"><div class="xp-bar"></div></div>
									</div>
									<!--<div class="xp"><span class="label">xp : </span></div>-->
								</div>
							</div>
						</div>
						<div class="command">
							<div class="dialogue">
								<div class="content"></div>
							</div>
							<div class="talk">
								<div class="content"></div>
							</div>
							<div class="action">
								<div class="content">
									<div class="do">
										<ul>
											<li class="item"><span class="code">attack</span>Attaquer</li>
											<li class="item"><span class="code">run</span>Fuite</li>
										</ul>
									</div>
									<div class="attack"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="sasha"></div>
				
				<div class="dialogue-maps">
					<div class="content">
					</div>
				</div>
				<div class="pkm-container">
					<div class="pkm salameche">
						<img src="img/pokemon/front/salameche.png"/>
					</div>
					<div class="pkm carapuce">
						<img src="img/pokemon/front/carapuce.png"/>
					</div>
					<div class="pkm bulbizarre">
						<img src="img/pokemon/front/bulbizarre.png"/>
					</div>
				</div>
			</div>
			<div class="joystick">
				<div class="arrow top btnUp"><span class="direction">up</span></div>
				<div class="overflow">
					<div class="arrow left"><span class="direction">left</span></div>
					<div class="arrow middle"><span class="direction">up</span></div>
					<div class="arrow right"><span class="direction">right</span></div>
					<div class="arrow bottom"><span class="direction">down</span></div>
				</div>
			</div>
			<div class="cmd">
				<div class="overflow">
					<div class="button b"></div>
					<div class="button a"></div>
				</div>
			</div>
			<div class="control">
				<div class="button select"></div>
				<div class="button start"></div>
			</div>
		</div>
	</div>
	<div class="facebook-block">
		<div class="content">
			<div class="section">
				<img src="img/logo-pokemon.jpg" class="logo"/>
			</div>
			<div class="section">
				<fb:like href="https://apps.facebook.com/pkm-rpg-esgi/" send="true" width="450" show_faces="true" font="arial"></fb:like>
			</div>
			<div class="section">
				<fb:comments href="https://apps.facebook.com/pkm-rpg-esgi/" num_posts="2" width="470"></fb:comments>
			</div>
			<div class="section">
				<h2 class="title-help">Clique sur la photo pour inviter un amis à jouer</h2>
				<button class="load-friends">Inviter mes amis facebook</button>
			</div>
			<div class="section">
				<div class="friends-list">
					<?php 
						$friends = $facebook->api('me/friends','GET');
						for($i=0; $i < count($friends['data']); $i++){
							$friendsId =  $friends['data'][$i]['id'];
							$imgUrl = 'https://graph.facebook.com/'.$friends['data'][$i]['id'].'/picture';
							echo '<img friendid="'.$friendsId.'" src="'.$imgUrl.'"/>';
						}
					?>
				</div>
			</div>
		</div>
	</div>
	</body>
</html>