// Clave de la API de Unsplash (reemplázala con tu propia clave)
const accessKey = 'TOShguRGC-RrWZtWjgoXjumS1Wy4toV5c7UGOYQPc6U';

// URL base de la API de Unsplash
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&query=real+estate&count=10`;

// Elemento donde se mostrarán las imágenes
const gallery = document.getElementById('gallery');

// Función para obtener y mostrar imágenes desde la API de Unsplash
async function fetchImages() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Iterar sobre las imágenes y agregarlas al DOM
        data.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.urls.regular;
            img.alt = photo.alt_description;
            img.classList.add('gallery-item');
            gallery.appendChild(img);
        });
    } catch (error) {
        console.error('Error al obtener las imágenes:', error);
    }
}

// Llamar a la función para cargar las imágenes al cargar la página
window.addEventListener('load', fetchImages);