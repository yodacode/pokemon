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
		echo "Vous êtes connecté";
	} else  {
		echo "Vous n'etes pas connecté";
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
		<script type="text/javascript" src="js/pokemon.js"></script>
		<script type="text/javascript" src="js/facebook.js"></script>
		<link type="text/css" rel="stylesheet" href="css/sanitize.css" media="screen"/>
		<link type="text/css" rel="stylesheet" href="css/style.css" media="screen"/>
		<title>Pokemon</title>
	</head>
	<body>
		
		<div class="pause">pause</div>
		<div class="play">play</div>
		<div class="overflow" style="width:1px;height:1px">&nbsp;<?php include('preload-img.php');?></div>
		<div class="gameboy">
			<div class="screen">
			<div class="loader">Chargement...</div>
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
									<div class="xp"><span class="label">xp : </span></div>
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
	
	</body>
</html>