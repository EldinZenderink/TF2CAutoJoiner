# TF2Center Auto Joiner

TF2Center Auto Joiner is a materializecss / javascript based Auto Joiner is now finally a web application the works fully clientsided! *

# THE WEBPAGE VERSION IS NO LONGER WORKING, TF2CENTER FIXED THEIR WEBSOCKET LEAK(whatever you want to call it), THE C# STAND ALONE APP IS STILL WORKING THOUGH!

# Abilitys

  - Auto Join, no more manually clicking on lobbies.
  - Filter: Region, Game Type, Map Type, Class(es) & Mumble.
  - Moddable: create your own GUI by editing the css/html page(see changelog).

# Screen Shot, Click for video:

[![Alt text](http://s15.postimg.org/ernahbpgr/5018a8f46d51bbf898332b429ab657512.png)](http://youtu.be/CBINnDFR6JU)


### How it works

This application parses the html source of http://tf2center.com/lobbies every second. It cuts out the javascript part where the information about the avialable lobbies are stored and parses it. It compares your specified filters to the avialable lobbies and when a lobby equals your needs it will automaticly join that lobby. The only thing you have to do is ready up when it starts!

### Version
0.1.0

### Known Issues and Not working things

- Mumble option is not functional as of yet.

### Web Page (NO LONGER WORKS)

[www.autojoiner.acoxi.com] (www.autojoiner.acoxi.com)

### Web Page (NO LONGER WORKS)

[Stand Alone Executable] (https://github.com/EldinZenderink/TF2CAutoJoiner/blob/master/Outdated%20C%23%20application/Executable/TF2C%20Auto%20Joiner.exe?raw=true)


### Installation

Due to tf2center fixing their websocket leak, a webpage alone is not sufficient anymore. Therefor you need to download the stand alone executable as showen above. 
YOU NEED TO HAVE CHROME INSTALLED! OTHER BROWSERS WILL NOT WORK AS OF YET. 

### Todos

 - Make stuff work (See Known Issues and Not working things)
 - Interface makeover (its not really resizable :S)

### Change Log

#0.1.0
- no more local installation needed, runs now on a webhost!*
- removed iframe containing tf2center page, tf2center is a very rescource heavy webpage (10% single core usage (chrome)), this hole thing is designed to be very cpu friendly.
- pop up modal for logs.


#0.0.3
- Now gives error when autojoiner.html does not exists.
- Now moddable, if you put the executable together with a webroot folder containing atleast the autojoiner.html, it will pick that one instead of the one included in the executable :D. For modding the files in a more easier way, use these [files](https://github.com/EldinZenderink/TF2CAutoJoiner/tree/master/TF2C%20Auto%20Joiner/TF2C%20Auto%20Joiner/bin/Debug/Auto%20Joiner%20Web%20Page%20files%20seperated).
- Gives warning if it could not retreive lobby data!

### Disclaimer
I (Eldin Zenderink) am not responsible for whatever happens when you use this (web)application. I am not affiliated with the developers of TF2CENTER. This application will be free forever. If the devlopers of TF2CENTER have a something to say about this application, send a mail to rareamvproductions@gmail.com. 

### * Why change back to a desktop application instead of a web app?

The webapp used a websocket glitch/bug that enabled it to request the full http html source page from tf2center through websockets, without interference with cross domain issues. Unfortunately they fixed the glitch, so we have to go back to a more primitive way of getting the lobby information, which can only be done on a desktop clientside. 
My sincere aplogies for anyone who got hyped up about the website, this is for now the only way to get this working.


License
----

MIT

**Free Software, Hell Yeah!**


