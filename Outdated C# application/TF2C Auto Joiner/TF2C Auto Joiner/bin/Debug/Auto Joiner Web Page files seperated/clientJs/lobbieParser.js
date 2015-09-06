var lobbies = "";
var run = false;

var lobId = "";
var team = "";
var classopen = "";

var idsFound = [];

var ws = new WebSocket("ws://localhost:3696/websocket");

ws.onopen = function(){
  console.log("CONNECTED!!!");
  Materialize.toast('Server is running :D', 1500);
}


ws.onmessage = function(event){
    console.log('retreived lobbies:');
    if(event.data != "503/404"){

      if(run){
          lobbies = event.data;
          var json = convertToJson(lobbies);
          var found = jQuery.each(json.lobbies, function(i, val){
             console.log(val.no); 
             lobId = val.no;
           
              
             console.log(val.region);
             
             if(val.region == region && val.gameType == gametype && val.map.indexOf(maptype) != -1 && idsFound.indexOf(lobId) == -1){
                nextPhase(val); 
             } else if(region == "all" && val.gameType == gametype && val.map.indexOf(maptype) != -1 && idsFound.indexOf(lobId) == -1){
                nextPhase(val);
             } else if(val.region == region && gametype == "all" && val.map.indexOf(maptype) != -1 && idsFound.indexOf(lobId) == -1){
                nextPhase(val);
             } else if(val.region == region && val.gameType == gametype && maptype == "all" && idsFound.indexOf(lobId) == -1){
                nextPhase(val);
             } else if(val.region == region && gametype == "all" && maptype == "all" && idsFound.indexOf(lobId) == -1){
                nextPhase(val);
             } else if(region == "all" && gametype == "all" && maptype == "all" && idsFound.indexOf(lobId) == -1){
                nextPhase(val);
             } else if(region == "all" && val.gameType == gametype && maptype == "all" && idsFound.indexOf(lobId) == -1){
                nextPhase(val); 
             } else if(region == "all" && gametype == "all" && val.map.indexOf(maptype) != -1 && idsFound.indexOf(lobId) == -1){
                nextPhase(val);
             }
              
            
             
          });
      }


    } else {
        Materialize.toast('tf2center seems to be offline!', 1500);
    }

};
        

function nextPhase(val){
           
   jQuery.each(val.slots, function(a, valb){
       console.log(a + ":" + valb.tf2Class);
       if(classAr.indexOf(valb.tf2Class) != -1){
           
           classopen = valb.tf2Class;
           
           if(valb.availableSlots.length != 0){
               console.log("av slots: " + valb.availableSlots.length);
               console.log("team: " + valb.availableSlots[0].team);
               team = valb.availableSlots[0].team;
               
               showLobby(lobId, team, classopen);
                idsFound.push(lobId);
               return true;
           }
       }
   })
}


function runAutoJoiner(){
    
    if(!run){
        if(region != "" && maptype != "" && gametype != "" && classAr.length != 0){
            run = true;
            $('#runbutton').html('<span class="left">STOP</span> <span class="right"><div class="preloader-wrapper small active"> <div class="spinner-layer spinner-blue-only"> <div class="circle-clipper left"> <div class="circle"></div> </div><div class="gap-patch"> <div class="circle"></div> </div><div class="circle-clipper right"> <div class="circle"></div> </div> </div> </div></span> ');
            Materialize.toast('You will join a lobby when one is available!', 1500); 
        } else {
            run = false;
            Materialize.toast('You did not set one of the filters!', 1500); 
        }
    } else {
        Materialize.toast('Stopped!', 1500); 
        $('#runbutton').html('START');
        run = false;
    }
    
  
}


  
function convertToJson(input){
    
    var cleanString = input.replace("replaceAllLobbies(", "{ lobbies: ");
    
    var cleanString2 = cleanString.replace(");", "}");
    
    var json = JSON.parse(JSON.stringify(eval("(" + cleanString2 + ")")));
    
    return json;
}

function showLobby(id, team, classop){
    
    
    
    var audio = new Audio('not.mp3');
    audio.play();
    var url = "http://tf2center.com/join/lobby/" + id + "/" + team + "/" + classop;
    console.log('LOBBY URL: ' + url);
    $('#tf2center').attr('src', url);
    $('#runbutton').html('START');
    run = false;
    
};