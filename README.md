# YouTube Playlist Creator (YPC)

YPC is a simple webapp that lets you create a Youtube playlist based on a list of URLs. 

## How to run it 

There's currently one instance working on this server: 

	http://www-scf.usc.edu/~giudice/ypc/
	

## How to create your own instance

Prerequisite: 

- A server with a public IP. 


1. Clone this repository on your server
2. Go to `https://console.developers.google.com/projectselector/apis/credentials` and request a YouTube client ID. Remember to add your server to the `Authorized JavaScript origins` list.
3. Create a file named `oauth2_client_id.js` and place a line like this: 
	var OAUTH2_CLIENT_ID = 'your_API_Client_ID';
4. That's all! Go to your server URL and test it.

## How to use it

1. Authorize the application to access your YouTube account (this is safe! No info is collected whatsoever)
2. Set the name of the new list
3. Paste one URL per line: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
4. Click on "Add all videos to the list"
5. That's all! Remember that your playlist is set as "private" by default.

## To-Do

- Translate the UI to english 
- fix bug old videos not being erased when playlist is deleted
