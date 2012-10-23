var initPokemon = function() {
		
	
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	
	/**
	 * Class : Screen(jQuery screen)
	 * @Docs : Permet de construir un objet Screen 
	 */
	var ScreenConstructor = function Screen (screen){
		this.cellWidth = 30; 
		this.cellHeight = 30;
		this.width = screen.width();
		this.height = screen.height();
	};
	
	
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	
	/**
	 * Class : Sasha(jQuery sasha, string direction, obj position)
	 * @Docs : Permet de construir un objet Sasha
	 */
	var SashaConstructor = function Sasha(sashaDiv, direction, position) {
		this.y = position.top;
		this.x = position.left;
		this.sashaDiv = sashaDiv;
		this.direction = direction;
		this.step = 'a';
		this.sashaDiv.append('<img src="get-image.php?img=img/sacha-'+this.direction+'-stop.png"/>');
		this.sashaDiv.css({'top':(this.y*Screen.cellHeight)+'px', 'left':(this.x*Screen.cellWidth)+'px'});
	};
	
	
	/**
	 * method : moving(direction)
	 * @Docs : Permet de faire bougé Sasha en method de la direction
	 */
	SashaConstructor.prototype.moving = function(direction){
		this.direction = direction;
		this.sashaDiv.empty();
	 	this.sashaDiv.append('<img src="get-image.php?img=img/sacha-'+direction+'-'+this.step+'.png"/>');
		if(this.step == 'a') {
			this.step = 'b';
		} else if(this.step == 'b') {
			this.step = 'a';
		}
	};
	
	/**
	 * method : forward(direction)
	 * @Docs : Permet de faire avancer la position de Sasha
	 * return la position de la case précédente
	 */
	SashaConstructor.prototype.forward = function(){
		var prevCoords = {	
			x : this.x,
			y : this.y
		};
		
		switch (this.direction){
			case 'right' : 
				this.x += 1;
				break;
			case 'left' : 
				this.x -= 1;
				break;
			case 'up' : 
				this.y -= 1;
				break;
			case 'down' : 
				this.y += 1;
				break;
		}
		return prevCoords;
	};
	
	/**
	 * method : updateRender(direction)
	 * @Docs : Permet de mettre à jour le rendu de Sasha sur la carte
	 */
	SashaConstructor.prototype.updateRender = function(coords, progress){
		var top = coords.y*Screen.cellHeight;
		var left = coords.x*Screen.cellWidth;
		switch (this.direction){
			case 'right' : 
				left += Screen.cellWidth * progress;
				break;
			case 'left' : 
				left -= Screen.cellWidth * progress;
				break;
			case 'up' : 
				top -= Screen.cellHeight * progress;
				break;
			case 'down' : 
				top += Screen.cellHeight * progress;
				break;
		} 		
		this.sashaDiv.css({
			'top' : top+'px',
			'left' : left+'px',
		}); 
	};
	
	/**
	 * method : playMove(string direction)
	 * @Docs : Permet de faire de jouer la method move
	 */
	SashaConstructor.prototype.playMove = function(direction){
		this.timerMove = null;
		var self = this;
		this.timerMove = window.setInterval(function(){
			self.moving(direction)
		},100);

	};
	
	/**
	 * method : stopMove(string direction)
	 * @Docs : Permet l'arrêt de la method move
	 */
	SashaConstructor.prototype.stopMove = function(direction){
		this.sashaDiv.empty();
	 	this.sashaDiv.append('<img src="get-image.php?img=img/sacha-'+direction+'-stop.png"/>');
		var self = this;
		window.clearInterval(self.timerMove);
	};
	
	/**
	 * method : moveTo(string direction)
	 * @Docs : Permet de faire bouger Sasha sur la map
	 */
	SashaConstructor.prototype.moveTo = function(direction){
		
		this.timerMoveTo = null;
		this.previousTime = +(new Date);
		this.currentTime = +(new Date);
		this.timeGoCell = 300;
		this.progress = 0;
		this.currentStep = 0;
		
		var self = this;
		
		
		if(this.canMoveTo(direction)){
		
			var prevPosition = Sasha.forward();
			
			this.timerMoveTo = window.setInterval(function(){
			
				//Calcul du pourcentage de progression dans la case obtenu par le ratio du temps parcouru sur le temps que l'on met à parcourir une cellule
				self.currentTime = +(new Date);
				self.progress = ((self.currentTime - self.previousTime) % self.timeGoCell) / self.timeGoCell;
				var newStep = Math.floor((self.currentTime - self.previousTime) / self.timeGoCell);
				
				//si on change de case alors on marque le new step et on clear l'interval 
				if(newStep != self.currentStep){
					self.currentStep = newStep;
					var action = Sasha.getAction();
					if(action){
						Sasha.updateRender(prevPosition, 1);
						clearInterval(self.timerMoveTo);
						self.timerMoveTo = null;
						Sasha.doAction(action);
					} else if(self.canMoveTo(self.direction)){
						prevPosition = Sasha.forward();
						Sasha.updateRender(prevPosition, self.progress);
					} else{
						Sasha.updateRender(prevPosition, 1);
						clearInterval(self.timerMoveTo);
						self.timerMoveTo = null;
					} 
				} else {
					Sasha.updateRender(prevPosition, self.progress);
				}
			},30);
			
		}		
	};
	
	/**
	 * method : getAction()
	 * @Docs : permet de savoir sur quelle action se trouve Sasha
	 * return action
	 */
	SashaConstructor.prototype.getAction = function(){
		if(Math.floor(Math.random()*Map.map[Sasha.y][Sasha.x].proba) == 1){
			return Map.map[Sasha.y][Sasha.x].action;
		} else {
			return null;
		}
 	}
	
	/**
	 * method : getAction()
	 * @Docs : permet de savoir sur quelle action se trouve Sasha
	 * return action
	 */
	SashaConstructor.prototype.doAction = function(action){
		if(action == 'fight'){
			Fight.playFight();
		}
 	}
	
	/**
	 * method : canMoveTo(string direction)
	 * @Docs : Permet de tester si Sasha peut bouger sur la map
	 */
	SashaConstructor.prototype.canMoveTo = function(direction){
		var ScreenWidthSize = (Screen.width/Screen.cellWidth);
		var ScreenHeightSize = (Screen.height/Screen.cellWidth);
		if(Control.statment[direction] != 'press') return false;
		switch (direction){
			case 'right' : 
				if(this.x+1 >= ScreenWidthSize){
					return false;
				} else{
					return Map.isWalkable(this.y,this.x+1);
				}	
			case 'left' : 
				if(this.x-1 < 0){
					return false;
				} else {
					return Map.isWalkable(this.y,this.x-1)
				}
			case 'up' : 
				if(this.y-1 < 0){
					return false;
				} else {
					return Map.isWalkable(this.y-1,this.x);
				}
			case 'down' : 
				if(this.y+1 >= ScreenHeightSize){
					return false;
				} else {
					return Map.isWalkable(this.y+1,this.x);	
				}
		}
	};
	
	/**
	 * method : moveNext)
	 * @Docs : Permet de changer la position de Sasha
	 */
	SashaConstructor.prototype.moveNext = function () {
		if (this.direction == 'up') this.y -= 1
		else if (this.direction == 'left') this.x -= 1
		else if (this.direction == 'right')this.x += 1
		else if (this.direction == 'down') this.y += 1
  };
	
	
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	
	/**
	 * Class : Sprite()
	 * @Docs : Permet de construir un object Sprite qui correspond à une case 
	 */
	var SpriteConstructor = function Sprite() {
		this.x = 0;
		this.y = 0;
	};
	
	
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	
	/**
	 * Class : Control()
	 * @Docs : Permet de catché la direction et l'etat du bouton  
	 */
	var ControlConstructor = function Control() {
		var self = this;
		this.statment = {
			up : 'nopress',
			down : 'nopress',
			right : 'nopress',
			left : 'nopress'
		}
		$('.arrow').mousedown(function(){
			Sasha.direction = $(this).find('.direction').text();
			self.statment[Sasha.direction] = 'press';
			if (Sasha.timerMoveTo) return ;
			Sasha.playMove(Sasha.direction);
			Sasha.moveTo(Sasha.direction);
		});
		$(window).mouseup(function () {
			self.statment[Sasha.direction] = 'nopress';
			Sasha.stopMove(Sasha.direction);
			
		});
	};
	
	
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	
	/**
	 * Class : Map()
	 * @Docs : Permet de construir le tableau et ses coordonnées y puis x  
	 */
	var MapConstructor = function Map(width,height) {
		this.map = [];
		for(var y = 0; y < height; y++){
			this.map[y] = [];
			for(var x = 0 ;x < width; x++){
				this.map[y][x] = new CellConstructor(x,y);
			}
		}
	};
	

	/**
	 * method : addItems()
	 * @Docs : Permet d'ajouter les items sur la map  
	 */
	MapConstructor.prototype.addItems = function(items){
		for(var i = 0; i < items.length; i++){
			for(var x = 0; x < items[i].value.width; x++){
				for(var y = 0; y < items[i].value.height; y++){
					var currentCell = this.map[y+items[i].value.coords.y][x+items[i].value.coords.x];
					currentCell.addSprite(items[i].value.img,x,y);
					currentCell.action = items[i].value.action;
					currentCell.proba = items[i].value.proba;
				}
			}
		}
	};
	
	/**
	 * method : isWalkable()
	 * return : true | false
	 * @Docs : permet de savoir si la case est walkable  
	 */
	MapConstructor.prototype.isWalkable = function(y, x){		
		var actionSprite = Map.map[y][x].action;
		switch (actionSprite){
			case 'conflict' : return false;
			case 'exit' : return true;
			case 'fight' : return true;
			case 'change' : return true;
			default : return true;
		}
	};

	
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


	/**
	 * method : Item(int y, int x, int height, int width, string img, string action [,int proba])
	 * @Docs : Permet de construir une Item  
	 */
	var ItemConstructor = function Item(y, x, height, width, img, action){
		this.width = width;
		this.height = height;
		this.coords = {x:x, y:y};
		this.img = 'get-image.php?img=img/'+img;
		this.action = action.action;
		this.proba = action.proba;
	};

	
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	
	/**
	 * Class : Cell()
	 * @Docs : Permet de construir une cellule  
	 */
	var CellConstructor = function Cell(x,y) {
		this.sprite = null;
		this.x = x;
		this.y = y;
		this.render = [];
	};
	
	/**
	 * method : addSprite()
	 * @Docs : Recupère les coordonnées et coupe l'image en sprite grâce à la method updateRender
	 */
	CellConstructor.prototype.addSprite = function(img,x,y) {
		this.sprite = { img : img, x : x, y : y };
		var render = $('<div class="sprite"></div>').appendTo('.screen');
		render.width(Screen.cellWidth);
		render.height(Screen.cellHeight);
		render.css({
			'position' : 'absolute',
			'top' : (this.y*Screen.cellHeight)+'px',
			'left' : (this.x*Screen.cellWidth)+'px',
			'overflow' : 'hidden'
		});
		render.css({
			'background-image' : 'url('+this.sprite.img+')',
			'background-position' : (this.sprite.x*Screen.cellWidth*-1)+'px '+(this.sprite.y*Screen.cellHeight*-1)+'px'
		});
		this.render.push(render);
	};
	

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	/**
	 * Class : Fight()
	 * @Docs : Permet de construir un fight
	 */
	var FightConstructor = function Fight() {
		this.pokemonA = null;
		this.pokemonB = null;
		this.winner = null;
		this.looser = null;
		this.panel = $('.screen .fight');
		this.actionBlock = this.panel.find('.command .action');
		this.attackBlock = this.panel.find('.command .action .attack');
		this.doBlock = this.panel.find('.command .action .do');
		this.talkBlock = this.panel.find('.command .talk');
	}
	
	/**
	 * method : playFight()
	 * @Docs : Permet de jouer l'introduction de la fight
	 */
	FightConstructor.prototype.playFight = function () {
		var timerIntro = null;
		var nbPlay = 0;
		var isDisplay = false;
		var self = this;
		$('.screen .fight .panel').hide();
		timerIntro = window.setInterval(function(){
			if(nbPlay > 16){
				window.clearInterval(timerIntro);
				self.panel.css('background-color','#FFF');
				Sasha.sashaDiv.fadeOut(300,Fight.loadFight([Pokemon, Pokemon.randomPokemon()]));
			} else {
				if(isDisplay){
					self.panel.hide();
					isDisplay = false;
				} else {
					self.panel.show();
					isDisplay = true;
				}
				nbPlay += 1;
			}
		},100);	
	};
	
	/**
	 * method : loadFight(array [myPokemon, rivalPokemon])
	 * @Docs : Permet de charger un combat 
	 */
	FightConstructor.prototype.loadFight = function(pokemon){
		var self = this;
		this.attackBlock.hide();
		this.doBlock.hide();
		$('.screen .fight .panel').fadeIn(200, function(){
			$('.my-pokemon .img').animate({
				left : 0,
				opacity : 1
			},500,function(){
				$('.rival-pokemon .img').animate({
					left : 250,
					opacity : 1
				},500,function(){
					self.talkBlock.append(pokemon[1].name+ ' veut se battre <br/>'+pokemon[0].name+' en Avant !').hide().slideDown(900,function(){self.doBlock.show()});
					
				});
			});
		});
		for(var i=0; i < pokemon.length; i++){
			var equip = null;
			if(i == 0) equip = 'my-pokemon';
			else equip = 'rival-pokemon';
			for(var j in pokemon[i]){
				if(j == 'img'){
					if(equip == 'my-pokemon'){
						this.panel.find('.'+equip+' .'+j).append('<img src="'+pokemon[i][j].imgBack+'"/>');
					} else if (equip == 'rival-pokemon'){
						this.panel.find('.'+equip+' .'+j).append('<img src="'+pokemon[i][j].imgFront+'"/>');
					}
				} else {
					this.panel.find('.'+equip+' .'+j).append(pokemon[i][j]);
				}
			}
		}
		for(var i = 0; i < pokemon[0].capacite.length; i++){
			this.attackBlock.append('<div class="item">'+pokemon[0].capacite[i]+'</div>');
		}	
		this.doBlock.find('.item').click(function(){
			var codeAction = $(this).find('.code').text();
			if(codeAction == 'attack'){
				self.doBlock.hide();
				self.attackBlock.show();
			} else if (codeAction == 'run'){
				Fight.stopFight();
			}
		});
		this.attackBlock.find('.item').click(function(){
			Attack.launchAttack($(this).text(),pokemon[0],pokemon[1]);
		});
	};
	
	/**
	 * method : stopFight()
	 * @Docs : Permet de stoper la fight pour revenir à l'ecran map
	 */
	FightConstructor.prototype.stopFight = function () {
		this.panel.hide();
		alert('Combat terminé');
	};

	
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


	/**
	 * Class : Attack()
	 * @Docs : Permet de construir une attack
	 */
	var AttackConstructor = function Attack() {
		this.name = null;
		this.categorie = null;
		this.precision = null;
		this.puissance = null;
	};
	
	/**
	 * method : launchAttack(string type, obj pokemonAttack, obj pokemonDefender)
	 * @Docs : permet de faire le calcul de l'attaque en fonction du pokemon attaqué et du pokemon qui defend
	 * return damage
	 */
	AttackConstructor.prototype.launchAttack = function (name, pokemonAttack, pokemonDefender) {
		this.name = name;
		this.pokemonAttack = pokemonAttack;
		this.pokemonDefender = pokemonDefender;
		var getRandom = function getRandomInt (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		var attackerLevel = this.pokemonAttack.level;
		var defenderDefense = this.pokemonDefender.defense;
		var attackerAttack = this.pokemonAttack.attack;
		var attack = Attack.getAttack(this.name);
		var attackPower = attack.power;
		var random = getRandom(85,100);
		var damage = Math.floor(((((2 * attackerLevel / 5 + 2) * attackerAttack * attackPower / defenderDefense) / 50) + 2) * random / 100);
		//console.log('AttackerLevel : '+attackerLevel,'AttackPower: '+attackPower,'defenderDefense: '+defenderDefense,'random: '+random, 'attackerAttack: '+attackerAttack);
		console.log('Damage : '+damage);
		return damage;
	};
	
	/**
	 * method : launchAttack(string type, obj pokemonAttack, obj pokemonDefender)
	 * @Docs : permet de faire le calcul de l'attaque en fonction du pokemon attaqué et du pokemon qui defend
	 */
	AttackConstructor.prototype.getAttack = function (name) {
		var listAttack = {
				flammeche : 
					{
						name : 'Flammèche',
						type : 'feu',
						power : 40,
						precision : 100
					},
				rugissement : 
					{
						name : 'Rugissement',
						type : 'normal',
						power : 0,
						precision : 100
					},
				grosYeux : 
					{
						name : 'Gros yeux',
						type : 'normal',
						power : 0,
						precision : 100
					},
				griffe : 
					{
						name : 'griffe',
						type : 'normal',
						power : 40,
						precision : 100
					},
				charge : 
					{
						name : 'Charge',
						type : 'normal',
						power : 50,
						precision : 100
					},
				mimiQueue : 
					{
						name : 'Mimi queue',
						type : 'normal',
						power : 0,
						precision : 100
					},
				ecume : 
					{
						name : 'Ecume',
						type : 'eau',
						power : 20,
						precision : 100
					},
				tranchHerbe : 
					{
						name : 'Tranch\'Herbe',
						type : 'plante',
						power : 55,
						precision : 95
					},
				jetSable : 
					{
						name : 'Jet de sable',
						type : 'sol',
						power : 0,
						precision : 100
					},
				tornade : 
					{
						name : 'Jet de sable',
						type : 'vol',
						power : 40,
						precision : 100
					}
			};
		
		if(name){
			return listAttack[name];
		} else {
			return listAttack;
		}
	};
	 
	 
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	/**
	 * Class : Pokemon(string name, array capacite, string categorie, string img, stat objet)
	 * @Docs : Permet de construir un pokemon
	 */
	var PokemonConstructor = function Pokemon (name, capacite, categorie, img, stat) {
		this.name = name;
		this.capacite = capacite;
		this.categorie = categorie;
		this.img = { imgFront : 'img/pokemon/front/'+img, imgBack : 'img/pokemon/back/'+img}
		this.defense = stat.defense;
		this.attack = stat.attack;
		this.level = stat.level;
		this.xp = stat.xp;
		this.pv = stat.pv;
		this.currentPV = stat.currentPV;
	}
	
	/**
	 * method : randomPokemon()
	 * @Docs : Permet de selectionner un pokemon au hasard
	 * return : obj pokemon
	 */
	PokemonConstructor.prototype.randomPokemon = function Pokemon () {
		var listPokemon = [];
		var rivalPokemon = new PokemonConstructor('carapuce', ['charge','ecume','gros yeux'], 'eau', 'carapuce.png', {defense:65, attack:48, level:5, xp:0, currentPV:44, pv:44});
		for(var i in rivalPokemon.getPokemon()){
			if(rivalPokemon.getPokemon()[i].savage){
				listPokemon.push(rivalPokemon.getPokemon()[i]);
			}
		}
		var nbPokemon = listPokemon.length-1;
		var pokemonRandom = listPokemon[Math.round(Math.random()*nbPokemon)];
		var rivalPokemon = new PokemonConstructor(
			pokemonRandom.name, 
			[
				pokemonRandom.capacite[0],
				pokemonRandom.capacite[1],
				pokemonRandom.capacite[2]
			], 
			pokemonRandom.type, 
			pokemonRandom.img, 
			{
				defense:pokemonRandom.stat.defense, 
				attack:pokemonRandom.stat.attack, 
				level:pokemonRandom.stat.level, 
				xp:pokemonRandom.stat.xp, 
				currentPV:pokemonRandom.stat.currentPV, 
				pv:pokemonRandom.stat.pv
			}
		);
		return rivalPokemon;
	}
	
	/**
	 * method : getPokemon(string name)
	 * @Docs : Permet de selctionner un pokemon ou un contenant l'ensemble des pokemon 
	 * return : obj pokemon
	 */
	PokemonConstructor.prototype.getPokemon = function Pokemon(name) {
		var listPokemon = {
			carapuce : 
				{
					name : 'carapuce',
					type : 'eau',
					capacite : ['charge','ecume','grosYeux'],
					img : 'carapuce.png',
					stat : {defense:65, attack:48, level:5, xp:0, currentPV:44, pv:44},
					savage : false
				},
			salameche : 
				{
					name : 'salameche',
					type : 'feu',
					capacite : ['griffe','flammeche','rugissement'],
					img : 'salameche.png',
					stat : {defense:43, attack:52, level:5, xp:0, currentPV:39, pv:39},
					savage : false
				},
			bulbizarre : 
				{
					name : 'bulbizarre',
					type : 'plante',
					capacite : ['charge','tranchHerbe','rugissement'],
					img : 'bulbizarre.png',
					stat : {defense:49, attack:49, level:5, xp:0, currentPV:45, pv:45},
					savage : false
				},
			roucool : 
				{
					name : 'roucool',
					type : 'normal',
					capacite : ['griffe','flammeche','gros yeux'],
					img : 'roucool.png',
					stat : {defense:40, attack:45, level:5, xp:0, currentPV:40, pv:40},
					savage : true
				},
			rattata : 
				{
					name : 'Rattata',
					type : 'normal',
					capacite : ['charge','mimiQueue','ViveAttaque'],
					img : 'rattata.png',
					stat : {defense:40, attack:45, level:5, xp:0, currentPV:40, pv:40},
					savage : true
				},
		};
		if(name){
			return listPokemon[name];
		} else {
			return listPokemon;
		}
	
	}



	
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	
	/**
	 * @Docs : Instaciation des objets 
	 */
	var Screen = new ScreenConstructor($('.screen'));
	var Sasha = new SashaConstructor($('.sasha'), 'down', {top : 6, left : 5});
	var Sprite = new SpriteConstructor();
	var Control = new ControlConstructor();
	var Map = new MapConstructor(Screen.width/Screen.cellWidth, Screen.height/Screen.cellHeight);
	var Fight = new FightConstructor();
	var Attack = new AttackConstructor();
	var Pokemon = new PokemonConstructor('salameche', ['griffe','flammeche','grosYeux'], 'feu', 'salameche.png', {defense:43, attack:52, level:5, xp:0, currentPV:39, pv:39});
	
	
	var items = 
		[
		
			//Création map professeur Chen
			{name : 'floor', value :  new ItemConstructor(0, 0, 9, 11, 'maps/chen/bg-floor.jpg', { action : 'allow'})},
			{name : 'wall', value :  new ItemConstructor(0, 1, 2, 9, 'maps/chen/wall-top.jpg', { action : 'conflict', proba : 1})},
			{name : 'exit', value :  new ItemConstructor(8, 4, 1, 2, 'maps/chen/exit.jpg', { action : 'allow'})},
			{name : 'computer', value :  new ItemConstructor(1, 1, 3, 3, 'maps/chen/computer.png', { action : 'conflict', proba : 1})},
			{name : 'machine', value :  new ItemConstructor(2, 6, 1, 1, 'maps/chen/machine-small.jpg', { action : 'conflict', proba : 1})},
			{name : 'bigMachine', value :  new ItemConstructor(1, 7, 2, 1, 'maps/chen/machine-big.jpg', { action : 'conflict', proba : 1})},
			{name : 'bigMachine', value :  new ItemConstructor(1, 8, 2, 1, 'maps/chen/machine-big.jpg', { action : 'conflict', proba : 1})},
			{name : 'wallBorderLeft', value :  new ItemConstructor(0, 0, 9, 1, 'maps/chen/wall-border.jpg', { action : 'conflict', proba : 1})},
			{name : 'wallBorderRight', value :  new ItemConstructor(0, 10, 9, 1, 'maps/chen/wall-border.jpg', { action : 'conflict', proba : 1})},
			{name : 'chen', value :  new ItemConstructor(3, 5, 1, 1, 'maps/chen/chen.png', { action : 'conflict', proba : 1})},
			{name : 'table', value :  new ItemConstructor(4, 6, 2, 3, 'maps/chen/desk.png', { action : 'conflict', proba : 1})},
			{name : 'combat', value :  new ItemConstructor(5, 1, 2, 3, 'maps/chen/leaf.png', { action : 'fight', proba : 3})},
			
			//Création map bourg palet
			
		
		];

		Map.addItems(items);
	
};




$(function () { setTimeout(initPokemon, 50); });