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
		if(Math.floor(Math.random()*Map.map[Sasha.y][Sasha.x].proba) == 0){
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
		} else if(action == 'change') {
			Init.updateRender(Map.map[Sasha.y][Sasha.x].map);
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
		this.allow = true;
		var self = this;
		this.statment = {
			up : 'nopress',
			down : 'nopress',
			right : 'nopress',
			left : 'nopress'
		}
		if(this.allow){
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
		}
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
					currentCell.map = items[i].value.map;
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
		this.map = action.map;
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
	 * @Docs : Permet de construir une fight
	 */
	var FightConstructor = function Fight() {
		this.winner = null;
		this.looser = null;
		this.panel = $('.screen .fight');
		this.commandBlock = this.panel.find('.command');
		this.actionBlock = this.panel.find('.command .action');
		this.attackBlock = this.panel.find('.command .action .attack');
		this.doBlock = this.panel.find('.command .action .do');
		this.talkBlock = this.panel.find('.command .talk .content');
		this.jeton = 0;
		this.myPokemon = null;
		this.rivalPokemon = null;
		var self = this;
		
		this.doBlock.find('.item').click(function(){
			var codeAction = $(this).find('.code').text();
			self.doAction(codeAction,[self.myPokemon, self.rivalPokemon]);
		}); 
		
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
		SoundCity.soundPause();
		SoundFight.soundPlay();
	
		self.panel.css('background-color','#000');
		$('.screen .fight .panel').hide();
		timerIntro = window.setInterval(function(){
			if(nbPlay > 16){
				window.clearInterval(timerIntro);
				self.panel.css('background','url(img/bg-fight.jpg)');
				Sasha.sashaDiv.hide();
				Fight.loadFight([Pokemon, Pokemon.randomPokemon()],self.jeton);
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
	FightConstructor.prototype.loadFight = function(pokemon,jeton){
		this.attackBlock.hide();
		this.doBlock.hide();
		this.myPokemon = pokemon[0];
		this.rivalPokemon = pokemon[1];
		var self = this;
		
		$('.screen .fight .panel').fadeIn(200, function(){
			$('.my-pokemon .img').animate({
				left : 0,
				opacity : 1
			},500,function(){
				$('.rival-pokemon .img').animate({
					left : 230,
					opacity : 1
				},500,function(){
					Dialogue.startDialogue(
						[
							self.rivalPokemon.name+ ' sauvage veut se battre !',
							self.myPokemon.name+' en Avant ! On va lui montrer de quoi on est capable',
							'Il va falloir attaquer cet enfoiré tu es chaud ? mon petit '+self.myPokemon.name
						]
					);					
					self.talkBlock.append('Sélectionner une action à effectuer');
					self.doBlock.show();
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
					this.panel.find('.'+equip+' .'+j).append('<span class="value">'+pokemon[i][j]+'</span>');
				}
			}
		}	
		for(var i = 0; i < this.myPokemon.capacite.length; i++){
			this.attackBlock.append(
				'<div class="item">'+
					'<div class="code hidden">'+
						this.myPokemon.capacite[i]+
					'</div>'+
					'<div class="value">'+
						Attack.getAttack(this.myPokemon.capacite[i]).name+
					'</div>'+
				'</div>'
				);
		}	
	};
	
	
	/**
	 * method : doAction()
	 * @Docs : Permet d'effectuer une action lié à l'attaque
	 */
	FightConstructor.prototype.doAction = function (action, pokemon) {
		var self = this;
		if(action == 'attack'){
				this.attackBlock.hide();
				this.doBlock.hide();
				this.attackBlock.show();
				this.attackBlock.find('.item').click(function(){
					var codeAttack = $(this).find('.code').text();
					Attack.launchAttack(codeAttack,self.jeton);
				});

		}
	};
	
	/**
	 * method : updateRender(obj pokemonAttack, obj pokemonDefender)
	 * @Docs : permet de mettre à jour le render aprés les damage causé suite à une attaque
	 */
	FightConstructor.prototype.updateRender = function (pokemonAttack,pokemonDefender) {
		var $lifeBar = null;
		var RestPercentLife = Math.ceil(  (pokemonDefender.currentPV / pokemonDefender.pv)*100);
		var $pokemonTeam = null;
		var self = this;
		if(this.jeton === 0){//c'est une attaque de moi on update rival	
			$pokemonTeam = $('.rival-pokemon');
			this.jeton = 1;
		} else if(this.jeton === 1) { //c'est une attaque rival on update me
			$pokemonTeam = $('.my-pokemon');
			this.jeton = 0;
		}	
		var $lifeBar = $pokemonTeam.find('.life-container .life');
		if(RestPercentLife <= 0){
			$pokemonTeam.find('.currentPV .value').text(0);
			$lifeBar.animate({
				width : RestPercentLife+'%'
			},function(){
				$pokemonTeam.find('.img').animate({
					top : 900
				},function(){
					Fight.stopFight();	
				});
			});	
		} else {
			$pokemonTeam.find('.currentPV .value').text(pokemonDefender.currentPV);
			$lifeBar.animate({
				width : RestPercentLife+'%'
			},function(){
				if(self.jeton === 1){
					Attack.launchAttack(Pokemon.getRandomAttack(self.rivalPokemon),self.jeton);
				}	
			});
		}
	};
	
	/**
	 * method : clearFight()
	 * @Docs : Permet vider le template de la fight
	 */
	FightConstructor.prototype.clearFight = function () {	
		this.jeton = 0;
		Fight.actionBlock.show();
		Fight.attackBlock.empty();
		this.panel.find('.value').empty();
		this.panel.find('.talk .content').empty();
		this.panel.find('.img').empty();
		this.panel.find('.currentPV').empty();
		this.panel.find('.rival-pokemon .img').css({left : 340, top : 0 ,opacity : 0});
		this.panel.find('.rival-pokemon .life').css({width:100+'%'});
		this.panel.find('.my-pokemon .img').css({left : -130, top : 65 ,opacity : 0});
	}
	
	
	
	/**
	 * method : stopFight()
	 * @Docs : Permet de stoper la fight pour revenir à l'ecran map
	 */
	FightConstructor.prototype.stopFight = function () {
		var self = this;
		if(this.winner == 0) {
			Dialogue.startDialogue(['Trooop cool vous avez gagné','Le pokemon va gagner un max de xp'],function(){
				Sasha.sashaDiv.show();
				self.panel.hide();
				self.clearFight();
				SoundFight.soundPause();
			
				SoundCity = new SoundConstructor('pallet-town');
				SoundCity.soundPlay();
		});					
		} else if(this.winner == 1) {
			Dialogue.startDialogue(['Oooooooooooh non on a perdu']);					
		}
	
		
	};

	
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	/**
	 * Class : Dialogue()
	 * @Docs : Permet de construir un dialogue
	 */
	var DialogueConstructor = function Dialogue(){
		this.next = $('.button.a');
		var self = this;
		this.blockDialogue = $('.command .dialogue');
		this.next.click(function(){
			if (self.listDialogue.length <= 0) {
				return;
			}
			if (self.animStart){
				self.blockDialogue.find('.content').stop().css({width:300,height:60});
				self.animStart = false;
				return;
			}
			self.currentDialogue += 1;
			if(self.currentDialogue < self.listDialogue.length){
				self.blockDialogue.find('.content').empty().css({width:0,height:22});
				self.animation(self.currentDialogue);
			} else {

				self.listDialogue = [];
				self.blockDialogue.fadeOut(function () {
					if (typeof self.callback == 'function') {
						var cb = self.callback;
						self.callback = null;
						return cb();
					}
			  });
			}
		});	
	};
	
	/**
	 * method : startDialog(array listDialog, [function callback]) 
	 * @Docs : prend une liste de dialogues et les affiche à la chaine dans le bloc 
	 */
	DialogueConstructor.prototype.startDialogue = function (listDialogue, callback){
		this.listDialogue = listDialogue;
		this.currentDialogue = 0;
		this.callback = callback || null;
		this.animation();
	}
	
	
	/**
	 * method : startDialog(array listDialog 
	 * @Docs : prend une liste de dialogues et les affiche à la chaine dans le bloc 
	 */
	DialogueConstructor.prototype.animation = function (){
		this.blockDialogue.show().find('.content').html(this.listDialogue[this.currentDialogue]);
		this.animStart = true;
		var self = this;
		this.blockDialogue.find('.content').animate({
			width : 300
		},300,function(){
			$(this).animate({
				height:60
			},300,function(){
				$(this).append('<div class="arrow"></div>');
				self.animStart = false;
			});
		});

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
	AttackConstructor.prototype.launchAttack = function (name, jeton) {
		this.name = name;
		var self = this;
		if(jeton == 0){
			this.pokemonAttack = Fight.myPokemon;
			this.pokemonDefender = Fight.rivalPokemon;
		} else if(jeton == 1) {
			this.pokemonAttack = Fight.rivalPokemon;
			this.pokemonDefender = Fight.myPokemon;
		}	
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
		this.pokemonDefender.currentPV -= damage;
		Dialogue.startDialogue(
			[
				this.pokemonAttack.name+' se prépare à attaquer',
				this.pokemonAttack.name+' envoie l\'attaque '+this.name
			], function () { 
				if(Fight.myPokemon.currentPV <= 0){
					Fight.winner = 1;
					Fight.looser = 0;
				} else if(Fight.rivalPokemon.currentPV <= 0){
					Fight.winner = 0;
					Fight.looser = 1;
				}		
				Attack.attackAnim(self.name,jeton);
				Fight.updateRender(self.pokemonAttack,self.pokemonDefender);
				if(jeton == 1){
					Fight.actionBlock.show();
				} else {
					Fight.actionBlock.hide();
				}
			});	
	};
	
	/**
	 * method : attackAnim(string name, int jeton)
	 * @Docs : permet d'animer l'attaque 
	 */
	AttackConstructor.prototype.attackAnim = function (name, jeton) {
		$myPokemonImg = $('.my-pokemon .img');
		$rivalPokemonImg = $('.rival-pokemon .img');
		
		if(name == 'charge'){
			if(jeton == 0){
				$myPokemonImg.animate({
					'left' : 15
				},100,function(){
					$myPokemonImg.animate({
						'left':0
					},400,function(){
						$rivalPokemonImg.fadeOut(100,function(){
							$(this).fadeIn(100,function(){
								$(this).fadeOut(100,function(){
									$(this).fadeIn(100);
								});
							});
						});
					});
				});
			}
			if(jeton == 1){
				$rivalPokemonImg.animate({
					'left' : 200
				},100,function(){
					$rivalPokemonImg.animate({
						'left':230
					},400,function(){
						$myPokemonImg.fadeOut(100,function(){
							$(this).fadeIn(100,function(){
								$(this).fadeOut(100,function(){
									$(this).fadeIn(100);
								});
							});
						});
					});
				});
			}
		} else {
			if(jeton == 0){
				$myPokemonImg.animate({
					'left' : 15
				},100,function(){
					$myPokemonImg.animate({
						'left':0
					},400,function(){
						$rivalPokemonImg.fadeOut(100,function(){
							$(this).fadeIn(100,function(){
								$(this).fadeOut(100,function(){
									$(this).fadeIn(100);
								});
							});
						});
					});
				});
			}
			if(jeton == 1){
				$rivalPokemonImg.animate({
					'left' : 200
				},100,function(){
					$rivalPokemonImg.animate({
						'left':230
					},400,function(){
						$myPokemonImg.fadeOut(100,function(){
							$(this).fadeIn(100,function(){
								$(this).fadeOut(100,function(){
									$(this).fadeIn(100);
								});
							});
						});
					});
				});
			}
		}
	};
	
	/**
	 * method : getAttack([string name])
	 * @Docs : permet de récuperer un ou les objets attack
	 * return obj attack
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
					},
				ViveAttaque : 
					{
						name : 'Vive attaque',
						type : 'normal',
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
					savage : true
				},
			salameche : 
				{
					name : 'salameche',
					type : 'feu',
					capacite : ['griffe','flammeche','rugissement'],
					img : 'salameche.png',
					stat : {defense:43, attack:52, level:5, xp:0, currentPV:39, pv:39},
					savage : true
				},
			bulbizarre : 
				{
					name : 'bulbizarre',
					type : 'plante',
					capacite : ['charge','tranchHerbe','rugissement'],
					img : 'bulbizarre.png',
					stat : {defense:49, attack:49, level:5, xp:0, currentPV:45, pv:45},
					savage : true
				},
			roucool : 
				{
					name : 'roucool',
					type : 'normal',
					capacite : ['jetSable','tornade','grosYeux'],
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
	
	
	/**
	 * method : getRandomAttack(obj name)
	 * @Docs : Permet de selctionner une attaque aléatoire d'un Pokemon
	 * return : obj attack
	 */
	PokemonConstructor.prototype.getRandomAttack = function Pokemon(name) {
		var getRandom = function getRandomInt (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		var pokemon = name;	
		var randomAttack = pokemon.capacite[getRandom(0,pokemon.capacite.length-1)];
		return randomAttack;
	}

	
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	/**
	 * Class : Sound(string sound)
	 * @Docs : Permet de construir un player audio
	 */
	var SoundConstructor = function Sound (sound) {
		
		
		$('body').prepend('<audio class="player '+sound+'" controls="controls" loop="loop"><source src="sound/'+sound+'.mp3" type="audio/mp3"></source></audio>');
		this.sound = document.querySelector('.'+sound+'');
	}

	/**
	 * method : play()
	 * @Docs : Permet de jouer le son
	 */
	SoundConstructor.prototype.soundPlay = function () {
	
		this.sound.play();
	}
	
	/**
	 * method : pause()
	 * @Docs : Permet de mettre le son sur pause
	 */
	SoundConstructor.prototype.soundPause = function () {
		this.sound.pause();
	}
	
	/**
	 * method : stop()
	 * @Docs : Permet d'arrêter le son
	 */
	SoundConstructor.prototype.soundStop = function () {
		this.sound.stop();
	}
	
	/**
	 * method : volume()
	 * @Docs : Permet de régler le volume du son
	 */
	SoundConstructor.prototype.volume = function () {

	}
	
	
	
	


	
	
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	
	/**
	 * method : 
	 * @Docs : 
	 * return : 
	 */
	var InitConstructor = function Init() {
		
		Screen = new ScreenConstructor($('.screen'));
		
		Sprite = new SpriteConstructor();
		
		Control = new ControlConstructor();
		
		Map = new MapConstructor(Screen.width/Screen.cellWidth, Screen.height/Screen.cellHeight);
		
		Dialogue = new DialogueConstructor();	
		
		Fight = new FightConstructor();
		
		Attack = new AttackConstructor();
		
		Pokemon = new PokemonConstructor('bulbizarre', ['charge','tranchHerbe','rugissement'], 'plante', 'bulbizarre.png', {defense:49, attack:49, level:60, xp:0, currentPV:45, pv:45});
		
		Sasha = new SashaConstructor($('.sasha'), 'down', {top : 6, left : 5});
		
		SoundCity = new SoundConstructor('pallet-town');
		SoundFight = new SoundConstructor('fight-sound');

		SoundCity.soundPlay();
		
		$('.pause').click(function(){SoundCity.soundPause()});
		$('.play').click(function(){SoundCity.soundPlay()});
		
		
		this.updateRender();
		var self = this;	
	}
	
	
	/**
	 * method : 
	 * @Docs : 
	 * return : 
	 */
	InitConstructor.prototype.updateRender = function (render) {
		this.map = null;
		var self = this;

		if(render != null) {
			this.map = render;
			Init.initCity();
			return;
		} else {
			$('.loader').fadeIn();
			$('.sasha').hide();
			$.ajax({
				type : 'GET',
				url : 'request/init-render.php',
				dataType :'json',
				success : function (e) {
					Init.initChen();
					$('.sasha').show();
					$('.loader').fadeOut();
				},
				error : function () {
					console.log(arguments);
				}
			});
		}
	}
	
	/**
	 * method : 
	 * @Docs : 
	 * return : 
	 */
	InitConstructor.prototype.initChen = function () {
		
		items = 
		[
			{name : 'floor', value :  new ItemConstructor(0, 0, 9, 11, 'maps/chen/bg-floor.jpg', { action : 'allow'})},
			{name : 'wall', value :  new ItemConstructor(0, 1, 2, 9, 'maps/chen/wall-top.jpg', { action : 'conflict', proba : 1})},
			{name : 'exit', value :  new ItemConstructor(8, 4, 1, 2, 'maps/chen/exit.jpg', { action : 'change', proba : 1, map : 'city'})},
			{name : 'computer', value :  new ItemConstructor(1, 1, 3, 3, 'maps/chen/computer.png', { action : 'conflict', proba : 1})},
			{name : 'machine', value :  new ItemConstructor(2, 6, 1, 1, 'maps/chen/machine-small.jpg', { action : 'conflict', proba : 1})},
			{name : 'bigMachine', value :  new ItemConstructor(1, 7, 2, 1, 'maps/chen/machine-big.jpg', { action : 'conflict', proba : 1})},
			{name : 'bigMachine', value :  new ItemConstructor(1, 8, 2, 1, 'maps/chen/machine-big.jpg', { action : 'conflict', proba : 1})},
			{name : 'wallBorderLeft', value :  new ItemConstructor(0, 0, 9, 1, 'maps/chen/wall-border.jpg', { action : 'conflict', proba : 1})},
			{name : 'wallBorderRight', value :  new ItemConstructor(0, 10, 9, 1, 'maps/chen/wall-border.jpg', { action : 'conflict', proba : 1})},
			{name : 'chen', value :  new ItemConstructor(3, 5, 1, 1, 'maps/chen/chen.png', { action : 'conflict', proba : 1})},
			{name : 'table', value :  new ItemConstructor(4, 6, 2, 3, 'maps/chen/desk.png', { action : 'conflict', proba : 1})},
			{name : 'combat', value :  new ItemConstructor(5, 1, 2, 3, 'maps/chen/leaf.png', { action : 'fight', proba : 2})},
		];
		Map.addItems(items);
	}
	
	/**
	 * method : 
	 * @Docs : 
	 * return : 
	 */
	InitConstructor.prototype.initCity = function () {
		Sasha.x = 6;
		Sasha.y = 3;
		Sasha.updateRender({x:Sasha.x,y:Sasha.y},0);
		items = 
		[
			{name : 'floor', value :  new ItemConstructor(0, 0, 9, 11, 'maps/chen/bg-floor.jpg', { action : 'allow'})},
			{name : 'wall', value :  new ItemConstructor(0, 1, 2, 9, 'maps/chen/wall-top.jpg', { action : 'conflict', proba : 1})},
			{name : 'exit', value :  new ItemConstructor(8, 4, 1, 2, 'maps/chen/exit.jpg', { action : 'allow'})},
			{name : 'machine', value :  new ItemConstructor(2, 6, 1, 1, 'maps/chen/machine-small.jpg', { action : 'conflict', proba : 1})},
			{name : 'bigMachine', value :  new ItemConstructor(1, 7, 2, 1, 'maps/chen/machine-big.jpg', { action : 'conflict', proba : 1})},
			{name : 'bigMachine', value :  new ItemConstructor(1, 8, 2, 1, 'maps/chen/machine-big.jpg', { action : 'conflict', proba : 1})},
			{name : 'wallBorderLeft', value :  new ItemConstructor(0, 0, 9, 1, 'maps/chen/wall-border.jpg', { action : 'conflict', proba : 1})},
			{name : 'wallBorderRight', value :  new ItemConstructor(0, 10, 9, 1, 'maps/chen/wall-border.jpg', { action : 'conflict', proba : 1})},
			{name : 'combat', value :  new ItemConstructor(5, 1, 2, 3, 'maps/chen/leaf.png', { action : 'fight', proba : 2})},
		];
		Map.addItems(items);
	}
	

	
	Init = new InitConstructor();
	
	

	
	
	
};


	


$(function () { setTimeout(initPokemon, 50); });