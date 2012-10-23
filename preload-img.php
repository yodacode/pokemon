<?php
	//Preload des images
	$dir = "img";
	if(is_dir($dir)){
		if ($dh = opendir($dir)) {
			while (($file = readdir($dh)) !== false) {
				echo '<img src="get-image.php?img=img/'.$file.'"/>';
			}
			closedir($dh);
		}
	}
?>