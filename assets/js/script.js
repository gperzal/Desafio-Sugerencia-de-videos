// Implementación del Patrón Módulo con IIFE
const Reproductor = (function () {
    // Clase padre Multimedia
    class Multimedia {
        constructor(url) {
            let _url = url;
            this.getUrl = () => _url;
            this.setUrl = (newUrl) => _url = newUrl;
        }
        // Método para obtener el URL protegido
        get url() {
            return this.getUrl();
        }
        // Método para setear el inicio del video
        setInicio() {
            console.log("Este método es para realizar un cambio en la URL del video");
        }
    }

    // Clase hija Reproductor
    class Reproductor extends Multimedia {
        constructor(url, id) {
            super(url);
            this.id = id;
        }
        // Método para reproducir el multimedia
        playMultimedia() {
            const iframe = document.getElementById(this.id);
            iframe.setAttribute("src", this.url);
        }
        // Sobrescritura del método setInicio para agregar el tiempo de inicio al video
        setInicio(tiempo) {


            const iframe = document.getElementById(this.id);

            // let urlTime = `${this.url}?start=${tiempo}`
            const urlTime = `${this.url}&amp;start=${tiempo}`
            iframe.setAttribute("src", urlTime);

        }

    }

    // Retornar la clase Reproductor para poder crear instancias fuera del IIFE
    return Reproductor;
})();

// Creando instancias para música, película y serie
const musica = new Reproductor("https://www.youtube.com/embed/gGdGFtwCNBE", "musica");
const pelicula = new Reproductor("https://www.youtube.com/embed/qTlkjfAmCBI", "peliculas");
const serie = new Reproductor("https://www.youtube.com/embed/mXd1zTwcQ18", "series");

// Ejecutando el método playMultimedia para cada instancia
musica.playMultimedia();
pelicula.playMultimedia();
serie.playMultimedia();



document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('videoForm');
    const slider = document.getElementById('videoStart');
    const tiempoInicioLabel = document.getElementById('tiempoInicio');


    // Actualizar el label al mover el deslizador
    slider.oninput = function () {
        tiempoInicioLabel.textContent = this.value;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const enlaceEmbed = document.getElementById('videoUrl').value;
        //Embebimos el Enlace de YouTube
        const url = convertirEnlaceYouTubeAEmbed(enlaceEmbed);


        const category = document.getElementById('videoCategory').value;
        const startTime = document.getElementById('videoStart').value;
        console.log(startTime);
        switch (category) {
            case 'Música':
                musica.setUrl(url);
                musica.setInicio(startTime);
                musica.playMultimedia();
                break;
            case 'Película':
                pelicula.setUrl(url);
                pelicula.setInicio(startTime);
                pelicula.playMultimedia();
                break;
            case 'Serie':
                serie.setUrl(url);
                serie.setInicio(startTime);
                serie.playMultimedia();
                break;
        }
    });
});



function convertirEnlaceYouTubeAEmbed(enlace) {
    // Expresión regular para identificar enlaces de YouTube.
    const regexYT = /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

    // Expresión regular para identificar enlaces de incrustación de YouTube.
    const regexEmbed = /^https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;

    // Verifica si el enlace es un enlace de YouTube y no un enlace de incrustación.
    if (regexYT.test(enlace) && !regexEmbed.test(enlace)) {
        // Extrae el ID del video de YouTube del enlace.
        const idVideo = enlace.match(regexYT)[1];

        // Devuelve el enlace de incrustación con el ID del video.
        return `https://www.youtube.com/embed/${idVideo}`;
    }

    return enlace;
}

