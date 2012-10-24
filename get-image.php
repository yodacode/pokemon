<?php
	if(preg_match('/\\.(jpg|png|gif)$/', $_GET['img'])){
		$contentType = array('jpg' => 'image/jpeg', 'png' => 'image/png', 'gif' => 'image/gif');
		header('Content-Type: '.$contentType[substr($_GET['img'], strlen($_GET['img']) - 3)]);
		header('Expires: '.gmdate('D, d M Y H:i:s \G\M\T', time() + 360000));
		header('Cache-Control: public');
	  echo file_get_contents('./'.$_GET['img']);
	}
	//test dorian
?>