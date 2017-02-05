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
    $('#playlist-name').attr('disabled','true');
    var name = $('#playlist-name').val()
    var request = gapi.client.youtube.playlists.insert({
        part: 'snippet,status',
        resource: {
            snippet: {
                title: name,
                description: ''
            },
            status: {
                privacyStatus: 'private'
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

    for(var i = 0 ; i < lines.length ; i++){
        var video_id = lines[i].split('=');
        if (video_id.length == 2){
            console.log("Adding ("+i+"/"+lines.length+"):"+video_id[1]);
            addToPlaylist(video_id[1]);
        } else {
            console.log("there is more than one =")
        }

    }
}

// Add a video to a playlist. The "startPos" and "endPos" values let you
// start and stop the video at specific times when the video is played as
// part of the playlist. However, these values are not set in this example.
function addToPlaylist(id, startPos, endPos) {
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
        console.log(JSON.stringify(response.result));
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
            $('#playlist-name').attr('disabled','false');
            alert('Playlist eliminada con exito');

        } else {
            console.log(result)
            alert('No se pudo eliminar la playlist');
        }
    });

}
