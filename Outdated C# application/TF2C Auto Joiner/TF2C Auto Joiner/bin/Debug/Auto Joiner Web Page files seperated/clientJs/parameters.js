var classAr = [];
var region = "";
var gametype = "";
var maptype = "";
var mumble = false;

function setRegion(regioninput, fullname){
    console.log(regioninput);
    region = regioninput;
    $("#regiodrop").html(fullname);
}

function setGameType(gameTypeInput){
    console.log(gameTypeInput);
    gametype = gameTypeInput;
    $("#gametypedrop").html(gameTypeInput);
    
    if(gameTypeInput == '6v6'){
        $("#solly_hl").hide();
        $("#solly_6v6").show();
    } else {
        $("#solly_6v6").hide();
        $("#solly_hl").show();
    }
    
}

function setMapType(mapTypeInput, fullname){
    console.log(mapTypeInput);
    maptype = mapTypeInput;
    $("#maptypedrop").html(fullname);
}

function setClass(classname){
    if(classAr.indexOf(classname) == -1){
        classAr.push(classname);
    } else {
        classAr.splice(classAr.indexOf(classname), 1);
    }
    console.log(classAr.join());
}

function setMumble(){
    if ($('[name="setmumble"]').is(':checked')){ 
        mumble = true;
        console.log('mumble is on');
    } 
    else { 
        mumble = false;
        console.log('mumble is off');
    }
}