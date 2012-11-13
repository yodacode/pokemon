$(function(){
	
	$(document).ready(initApp);
	
	function initApp(){
		$('#friendList img').click(invitFriend);
		$('#publier').click(publish);
	}
	
	function invitFriend(img){
		FB.ui({
			method:'apprequests',
			message:'Invitation a utiliser mon application',
			to:$(img.currentTarget).attr('friendid')
		},function(){});
	}
	
	function publish(){
		FB.ui({
				method: 'feed',
				link: 'http://apps.facebook.com/testbenjaminmewmew/',
				picture: 'http://fb.apps.matelli.fr/images/html5.png',
				name: 'Html5 QCM',
				caption: 'Résultat du test HTML5',
				description: 'Score de l\'utilisateur'
			}, function (response){
				if (response && response.post_id) {
					alert('Post was published.');
				} else {
					alert('Post was not published.');
				}
			}		
		);
	}
	
});