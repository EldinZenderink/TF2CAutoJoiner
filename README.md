# TF2Center Auto Joiner

TF2Center Auto Joiner is a materializecss / javascript based Auto Joiner is now finally a web application the works fully clientsided! *

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

### Web Page

[www.autojoiner.acoxi.com] (www.autojoiner.acoxi.com)

### Installation

The autojoiner.html file works locally as well, so just put it in a folder and click on it :D.

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

### * Why is it not a desktop application anymore?

The big change came from the use of websockets, I knew for a long time that tf2center uses websockets to push the lobby changes to their client sided website. I have figured out wich ws(websocket) url they used to do that. Its not working exactly like I want, because normally a websocket server would send data while its staying connected to the client without reconnecting. But somehow this websocket server sends the full html data from their main page once when you connect to the websocket (why, for heavens sake?). Now i need to reconnect to that websocket server every second to get the desired results. But fortunately that removed the need to parse the html web page through http. Therefor I can now do everything through javascript and a webserver is not needed anymore to do the html retreiving, and because of that, it can run on any cheap webhost that just sends the html to the client.

### * Will you create a desktop application in the future for this?

No, there is no need for it as long the webhost stays active. If you want to get a desktop application feeling, I suggest that you use Chrome and [follow this tutorial](http://www.howtogeek.com/141431/how-to-turn-web-apps-into-first-class-desktop-citizens/) to create a shortcut on your desktop, which opens the webpage in APP mode, just like my desktop application did. 

License
----

MIT

**Free Software, Hell Yeah!**


