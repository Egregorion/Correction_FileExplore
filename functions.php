<?php

if(isset($_POST)&& !empty($_POST['path'])){
    $path = $_POST['path'];
    getFiles($path);
}

function getFiles($dir){
    // Ouvre un dossier bien connu, et liste tous les fichiers
    if (is_dir($dir)) {
        if ($dh = opendir($dir)) {
            while (($file = readdir($dh)) !== false) {
                if(filetype($dir . $file)!== "dir"){
                    echo "<div>$file</div>";
                }else{
                    echo "<div class='blue' id='$file'>$file</div>";
                }
            }
            closedir($dh);
        }
    }
}


