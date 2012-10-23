<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
		<script type="text/javascript" src="js/pokemon.js"></script>
		<link type="text/css" rel="stylesheet" href="css/style.css" media="screen"/>
		<title>Pokemon</title>
	</head>
	<body>
		
		<div class="overflow" style="width:1px;height:1px">&nbsp;<?php include('preload-img.php');?></div>
		
		<h1>Pokemon</h1>
		<div class="gameboy">
			<div class="screen">
				<div class="fight">
					<div class="panel">
						<div class="rival-pokemon">
							<div class="overflow">
								<div class="stat">
									<div class="name"><span class="label">name : </span></div>
									<div class="currentPV"><span class="label">CurrentPV : </span></div>
									<div class="pv"><span class="label">pv : </span></div>
									<div class="level"><span class="label">level : </span></div>
									<div class="life-container"><div class="life"></div></div>

								</div>
								<div class="img"></div>
							</div>
						</div>
						<div class="my-pokemon">
							<div class="overflow">
								<div class="img"></div>
								<div class="stat">
									<div class="name"><span class="label">name : </span></div>
									<div class="currentPV"><span class="label">CurrentPV : </span></div>
									<div class="pv"><span class="label">pv : </span></div>
									<div class="level"><span class="label">level : </span></div>
									<div class="xp"><span class="label">xp : </span></div>
									<div class="categorie"><span class="label">Categorie : </span></div>
									<div class="life-container"><div class="life"></div></div>
								</div>
							</div>
						</div>
						<div class="command">
							<div class="talk"></div>
							<div class="action">
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
				<div class="sasha"></div>
			</div>
			<div class="joystick">
				<div class="arrow top btnUp"><span class="direction">up</span></div>
				<div class="overflow">
					<div class="arrow left"><span class="direction">left</span></div>
					<div class="arrow middle"><span class="direction">middle</span></div>
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