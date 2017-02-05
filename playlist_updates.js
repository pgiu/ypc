// Define some variables used to remember state.
var playlistId, channelId;

// After the API loads, call a function to enable the playlist creation form.
function handleAPILoaded() {
    enableForm();
}

// Enable the form for creating a playlist.
function enableForm() {
    $('#playlist-button').attr('disabled', false);
}

// Create a private playlist.
function createPlaylist() {
    var name = $('#playlist-name').val()
    var request = gapi.client.youtube.playlists.insert({
        part: 'snippet,status',
        resource: {
            snippet: {
                title: name,
                description: ''
            },
            status: {
                privacyStatus: 'public'
            }
        }
    });
    request.execute(function(response) {
        var result = response.result;
        if (result) {
            playlistId = result.id;
            $('#playlist-id').val(playlistId);
            $('#playlist-title').html(result.snippet.title);
            $('#playlist-description').html(result.snippet.description);
        } else {
            $('#status').html('Could not create playlist');
            alert('No se pudo crear la playlist');
        }
    });
}

// Add a video ID specified in the form to the playlist.
function addVideoToPlaylist() {
    var lines = $('#video-id').val().split('\n');
    var videosIdArr = [];
    var k = 0;

    for(var i = 0 ; i < lines.length ; i++){
        var video_id = lines[i].split('=');
        if (video_id.length == 2){
            console.log("Adding ("+i+"/"+lines.length+"):"+video_id[1]);
            videosIdArr[k++]=video_id[1];
        } else {
            console.log("there is more than one =")
        }
    }

    // Call the method that does the job!
    addToPlaylist(videosIdArr,0);
}

// Add a video to a playlist. The "startPos" and "endPos" values let you
// start and stop the video at specific times when the video is played as
// part of the playlist. However, these values are not set in this example.
function addToPlaylist(videosIdArray, index) {
    var id = videosIdArray[index];
    var details = {
        videoId: id,
        kind: 'youtube#video'
    }

    var request = gapi.client.youtube.playlistItems.insert({
        part: 'snippet',
        resource: {
            snippet: {
                playlistId: playlistId,
                resourceId: details
            }
        }
    });
    request.execute(function(response) {

        var title = response.result.snippet.title;
        var img = "<img src=\"" + response.result.snippet.thumbnails.default.url + "\"/>";
        $('#addedVideos').append('<li>' + img + title + '</li>');

        // if we have more to do, we keep calling this function recursively
        if(videosIdArray.length == index+1){
            console.log("finished all uploads");
        } else {

            // Recursive call
            addToPlaylist(videosIdArray, index+1);
        }
    });
}

function deletePlaylist(){

    console.log('id'+$('#playlist-id').val());
    var request = gapi.client.youtube.playlists.delete({

        id: $('#playlist-id').val(),
    });
    request.execute(function(response) {
        var result = response.result;
        if (result) {
            console.log("Playlist borrada");
            $('#playlist-id').val('');
            $('#addedVideos').val('');
            alert('Playlist eliminada con exito');

        } else {
            console.log(result)
            alert('No se pudo eliminar la playlist');
        }
    });

}
