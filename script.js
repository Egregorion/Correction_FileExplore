$(document).ready(function() {
    //1)blaalez
    let pathRef = "";
    let getFiles = function(pathValue) {
        $.post(
            "functions.php",
            { path: pathValue },
            function(data){
                $('#main').html(data)
                $('.blue').click(function() {
                    //currentPath = $('input').val()
                    currentPath = pathRef;
                    if(currentPath !== "/"){
                        newPath = currentPath + "/" + this.id
                    }else{
                        newPath = currentPath + this.id
                    }
                    //$('input').val(newPath);
                    pathRef = newPath;
                    generateNav();
                    getFiles(newPath + "/");
                })
            }
        )
    }

    getFiles("/");

    let generateNav = function() {
        let currentPath = pathRef;
        let pathToArray = currentPath.split("/");
        $('#nav').html('');
        for(i=1; i<pathToArray.length; i++){
            $('#nav').append('<button id="'+ i +'" class="btn-nav">' + pathToArray[i] + '</button>');
        }
        $('.btn-nav').click(function() {
            let index = parseInt(this.id);
            let cutArray = pathToArray.slice(0,(index+1));
            let newPath = cutArray.join("/");
            console.log(newPath);
            pathRef=newPath;
            getFiles(newPath + "/");
            generateNav(); 
        })
    }

    $('#back').click(function() {
        //let currentPath = $('input').val();
        let currentPath = pathRef;
        /*
        let pathToArray = currentPath.split('/');
        //pathToArray.splice(-1, 1);
        pathToArray.pop();
        let newPath = pathToArray.join('/');
        $('input').val(newPath);
        getFiles(newPath + "/");
        //$('input').val(pathToArray);
        */
        let lastSlash = currentPath.lastIndexOf("/");
        let cutPath = currentPath.substring(0,lastSlash);
        getFiles(cutPath + '/');
        //$('input').val(cutPath);
        pathRef = cutPath;
        generateNav();
    })
})