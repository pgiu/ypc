
//
var lang = "en_US";

// detect language
if (navigator.language.includes("en_US")){
    lang = "en_US";
    console.log("English detected");
} else if (navigator.language.includes("es")){
    lang = "es_AR";
    console.log("Spanish detected");
}

// JSON-formatted, potentially read from a database
var article = {
    description: {
        en_US: "This tools helps you create a new YouTube playlist based on a list of links.",
        es_AR: "Esta es una herramienta que permite crear en forma automatizada una playlist en YouTube en base a una lista de links."
    },
    playlist_name: {
        en_US: "Name of the new playlist",
        es_AR: "Nombre de la nueva lista"
    },
    btn_create: {
        en_US: "Create new Playlist",
        es_AR: "Crear nueva playlist"
    },
    video_urls: {
        en_US: "Video URLs (one per line)",
        es_AR: "URL de los videos (uno por linea)"
    },
    btn_add: {
        en_US: "Add all videos to playlist",
        es_AR: "Agregar todos los videos a la lista"
    },
    videos_added_to: {
        en_US: "Videos added to",
        es_AR: "Videos agregados a"
    },
    btn_delete: {
        en_US: "Delete Playlist",
        es_AR: "Borrar playlist"
    },
    auth_problem: {
        en_US: "To create the playlist its necessary to grant permission to this application.",
        es_AR: "Para poder crear la playlist es necesario darle permisos a esta aplicación."
    },
    auth_click_here: {
        en_US: "Click here to authorize.",
        es_AR: "Hacé click aquí para autorizar."
    },
    placeholder_create: {
        en_US: "Name of the new playlist (e.g. Week 10)",
        es_AR: "Nombre la nueva lista (ej: Semana 10)"
    },
    playlist_id : {
        en_US: "ID of the new playlist",
        es_AR: "ID de la nueva playlist"
    },
    created_by: {
        en_US: "Created by Pablo Giudice - 2017",
        es_AR: "Creado por Pablo Giudice - 2017"
    },
    view_sourcecode :{
        en_US: "View source code on GitHub",
        es_AR: "Ver código fuente en GitHub"
    }
}

// simple function to write the info to the page
function get_i18n(item, lang) {
    document.write(article[item][lang]);
}
