# fightingGameMultiplayer
 
Idea was taken from https://github.com/chriscourses/fighting-game (https://www.youtube.com/watch?v=vyqbNFMDRGQ), but the implementation differs quite. 
There is also no going off the map anymore, the the jumping is limited to double jump at most, attack box positions are fixed so that it's fair for both players and the game itself is not time based, but first to win. 

The main idea of this project is the implementation of the multiplayer version of the game through socket.io.

When you first download the project, open cmd, navigate to the server folder and run npm install (make sure that you have Node.js installed).

To run the multiplayer version of the game locally, navigate to the server folder and run the run-server.bat file. Open two instances of your browser of choice and go to localhost:8080 and you're ready to go.

To run the online multiplayer version of the game, just run the start.bat file from the root project folder. Two cmd instances will be minimized, open the second one and from there copy the link of the http forwarding tunnel (like in the screenshot below), send it to your friend and you're ready to play.

![image](https://user-images.githubusercontent.com/52751615/180606667-a7aac5eb-c194-42f4-b80c-a0a5c21c2cba.png)
