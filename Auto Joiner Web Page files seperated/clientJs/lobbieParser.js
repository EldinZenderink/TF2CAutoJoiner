var lobbies = "";
var run = false;

var lobId = "";
var team = "";
var classopen = "";

var idsFound = [];

setInterval(function(){

    if(run){
        console.log('retreived lobbies:');
        var ws = new WebSocket("ws://tf2center.com/lobbies?5-IResourceListener.0-&X-Atmosphere-tracking-id=0&X-Atmosphere-Framework=1.0.13&X-Atmosphere-Transport=websocket&X-Atmosphere-TrackMessageSize=true&X-Cache-Date=0");

      ws.onmessage = function(event){
             var body = event.data;
         var lobbiesInitiator = body.substr(body.indexOf("replaceAllLobbies"));
             var lobbies = lobbiesInitiator.substr(0, lobbiesInitiator.indexOf('script>') - 2);
             if(lobbies.length != lobbiesLength){
               lobbiesLength = lobbies.length;
               var json = convertToJson(lobbies);

               var amountOfLobbies = json.lobbies.length;

           $( document ).ready(function() {
                  $('#num').html(amountOfLobbies);
               });

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
               
               
                })
           }

    }
     }
     

  }, 1000);
        

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
              $('#runbutton').html('<span class="left">STOP</span>');
              Materialize.toast('You will join a lobby when one is available!', 1500); 
              $( document ).ready(function() {
                $('#iframehere').html(' <center><h4>A total of <span id="num"> </span> lobbies are waiting for players! </h4> </center> <div class="progress"> <div class="indeterminate"></div> </div>');
            });
          } else {
              run = false;
              Materialize.toast('You did not set one of the filters!', 1500); 
          }
      } else {
          Materialize.toast('Stopped!', 1500); 
          $('#runbutton').html('START');
          $( document ).ready(function() {
                $('#iframehere').html('<h4> Please select your type of lobby!</h4>');
            });
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
      $( document ).ready(function() {
            $('#iframehere').html(' <iframe id="tf2center" src="' + url + '" onLoad="onIframeChange(this.contentWindow.location);" style="min-width: 100%;" height="800" align="center"></iframe>');
        });
      $('#runbutton').html('START');
      run = false;
      
  };

  function onIframeChange(){
    var url = document.getElementById("tf2center").src;
    console.log("iframe loaded :S, " + url.toString());
    if(url.indexOf("logs")){
      console.log("Lobbie ended, removing iframe!");
      $( document ).ready(function() {
              $('#iframehere').html('<div id="showlogs" class="modal"> <div class="modal-content"> <h4>Do you want to see your logs?</h4> <p>When clicking on yes, a new tab will open with your logs!</p> </div> <div class="modal-footer"> <center> <a href="' + url + '" target="_blank" class="modal-action modal-close waves-effect waves-green btn">Yes</a> <span style="width: 10%; visibility: hidden;">| </span><a href="#!" class=" modal-action modal-close waves-effect waves-green btn">No</a> </center> </div> </div>');
              $('#showlogs').openModal();
          });
    }
  }
  