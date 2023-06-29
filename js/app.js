// CAMERA FUNCTION //

const body = document.querySelector('body'); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector de tipo dentro de las comillas de los paréntesis
const buttonCamara = document.querySelector('.mostrar__camara'); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector de clase dentro de las comillas de los paréntesis
const cameraContainer = document.querySelector('.camera__container'); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector de clase dentro de las comillas de los paréntesis
const camera = document.querySelector('.camara'); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector de clase dentro de las comillas de los paréntesis
const buttons = document.querySelector('.buttons'); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector de clase dentro de las comillas de los paréntesis
const video = document.querySelector('.video__source'); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector de clase dentro de las comillas de los paréntesis
const canvas = document.querySelector('#canvas'); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector identificador dentro de las comillas de los paréntesis
const botonFoto = document.querySelector("#boton__foto"); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector identificador dentro de las comillas de los paréntesis
let context = canvas.getContext('2d'); //Declaración de variable, con valor asignado de, del elemento "canvas" obtenido del HTML, se obtiene el contexto mediante el método de obtener contexto, el cual es el que está dentro de las comillas de los paréntesis, el cual es el contexto de dos dimesiones que se utilizará para dibujar en el lienzo/canvas 
let uploadedImage; //Declaración de variable, sin valor asignado

function canvasRedimension(){ //Declaración de función, con nombre y sin parámetros, que hará que se redimensione el canvas/lienzo, la cual ejecuta el siguiente bloque
    canvas.width = camera.clientWidth*1.4; //Al elemento canvas, se le accesede a su propiedad de ancho, para reasignar su valor a, del elemento camera obtener el ancho interior y multiplicarlo por 1.4, aumentando su tamaño en 40%
    canvas.height = camera.clientHeight; //Al elemento canvas, se le accesede a su propiedad de ancho, para reasignar su valor a, del elemento camera obtener el alto interior
}

async function cameraPermissions() { //Declaración de función asíncrona, con nombre y sin parámetros, para obtener permiso del usuario para acceder a la cámara del dispositivo y luego mostrar la transmisión de video en el elemento video del documento HTML.
    let constraints = {}; //Declaración de variable, con valor asignado de un JSON vacío para definir las restricciones de medios a obtener
    constraints = {video: true}; //Al objeto de restricciones, se la asigna como valor un JSON, el cual contiene la propiedad "video" con valor booleano "true" para que solo se solicite acceso a la cámara del dispositivo
    
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraints); //Declaración de variable, con valor asignado de esperar a que se resuelva la promesa de, al objeto navigator el cual es el navegador al que se accede a su propiedad de dispositivos multimedia, aplicar su método de obtener los medios del usuario, el cual recibe como argumento el JSON de restricciones para solicitar acceso a la cámara del dispositivo, obteniendo como promesa resuelta un objeto "MediaStream" que representa el flujo de medios de entrada

    video.srcObject = mediaStream; //A dicho elemento obtenido desde el HTML, se accede a su propiedad de recursos, al que se le aigna como valor el obejto de flujo de medios de entrada, haciendo que el video que se muestra en el elemento video del HTML debe provenir del objeto "mediaStream"
    video.play(); //A dicho elemento obtenido desde el HTML, se le aplica su método de reproducir para comenzar a reproducir el video, el cual es el flujo de la cámara del dispositivo
}

async function uploadImage() { //Declaración de función asíncrona con nombre, y sin parámetros, para cargar una imagen
    let image = document.createElement('img'); //Declaración de variable, con valor asignado de al documento HTML, aplicar el método de crear elemento, dicho elemento es del tipo dentro de las comillasde los paréntesis, el cual es de tipo imagen
    image.src = "./images/frame.png"; //Al nuevo elemento creado, se le accede a su propiedad de recursos, y se le asigna como valor, la ruta para obtener la imagen
    await image.decode(); //Se espera a que la imagen sea cargada, mediante llamar al elemento creado y aplicar el método de cargar imagen y decodificar

    uploadedImage = image; //A la variable sin valor, se le asigna como valor el elemento creado anterior el cual ya tiene la imagen cargada y decodificada
}

async function draw() { //Declaración de función asíncrona con nombre y sin parámetros, que se encarga de dibujar el video y la imagen en el elemento canvas, ejecutando el siguiente bloque
    context.save(); //Al contexto del canvas, se le aplica el metodo de guardar el estado actual del dibujo dentro del canvas
    context.scale(-1, 1); //Al contexto del canvas, se le aplica el metodo de cambiar la escala del dibujo en el canvas, recibe el valor de -1 en el eje x para invertir el v¡deo horizontalmente, y 1 en el eje "y" para manetenerlo igual
    const x = (canvas.width - video.width) / 7.5; //Declaración de variable, con valor asignado de al ancho del canvas restar el ancho de video, y al resultado dividirlo entre 7.5, esto para dibujar centrado el video dentro del canvas
    context.drawImage(video, -canvas.width + x, 0, canvas.width, canvas.height); //Al contexto del canvas, se le aplica el método de dibujar sobre el mismo, siendo el primer argumento lo que será dibujado sobre el canvas lo cual es el valor del video que es el flujo de la camara del dispositivo, el segundo argumento es la posición inicial el eje "x" en la que se dibujará el video el cual es el ancho del canvas con su valor invertido más el valor de la constante "x" así el video se dibujará desplazado hacia la derecha y fuera del límite del canvas, el tercer parámetro es la posición inicial el eje "y" en la que se dibujará el video el cual es la parte superior del canvas, el cuarto parámetro es el ancho del video dibujado el cual es el ancho del canvas, y el quiento parámetro es el alto del video dibujado el cual es el alto del canvas
    context.restore(); //Al contexto del canvas, se le aplica su método de restaurar el último estado guardado de la transformación y del estilo del contexto de dibujo, esto para volver al estado guardado anteriormente y eliminar el efecto de espejo antes de que se siga dibujando en el lienzo
    
    if (uploadedImage) { //Condicional que valida si dicha variable ya tiene cargado su valor, el cual es la imagen obtenida mediante la función asíncrona uploadImage, si se cumple la condición se ejecuta el siguiente bloque
        context.drawImage(uploadedImage, 0, 0, camera.clientWidth, camera.clientHeight); //Al contexto del canvas, se le aplica el método de dibujar sobre el mismo, siendo el primer argumento lo que será dibujado sobre el canvas lo cual es la imagen cargada, el segundo argumento es la posición inicial el eje "x" en la que se dibujará la imagen el cual es la parte izquierda del canvas, el tercer parámetro es la posición inicial el eje "y" en la que se dibujará la imagen el cual es la parte superior del canvas, el cuarto parámetro es el ancho de la imagen dibujada el cual es al ancho interno de dicho elemento, y el quiento parámetro es el alto de la imagen dibujada el cual es el alto interno de dicho elemento
    }

    requestAnimationFrame(draw); //Se ejecuta el método del objeto "window", que actualiza la animación en el navegador en el mejor momento para volver a dibujar la animación, la cual recibe como argumento dicha función asíncrona que se llama de forma recursiva en un ciclo infinito para actualizar constantemente la imagen en el lienzo del canvas
}

canvasRedimension(); //Se llama a ejecutar la función para redimensionar el canvas
uploadImage(); //Se llama a ejecuta la función para cargar la imagen
draw(); //Se llama a ejecutar la función de dibujar el video y la imagen en el canvas

if (buttonCamara) { //Condicional que valida si, se encuentra dicho elemento, y al cumplirse dicha condición de ejecuta el siguiente bloque
    cameraContainer.style.display = "none"; //A dicho elemento, se accede a su propiedad de estilo, y a su propiedad de comportamiento de visualización, y se le asigna dicho valor para no mostralo
}

buttonCamara.addEventListener('click', function (e) { //A dicho elemento, se le aplica un escuchador de evento, el cual escucha el evento de "click", ejecutando una función flecha que recibe como argumento el evento ejecutado, la cual ejecuta el siguiente bloque
    e.target.style.display = "none"; //Al elemento que ejecutó el evento, se le accde a su porpiedad de estilo, y a su propiedad de comportamiento de visualización, y se le asigna dicho valor para no mostralo
    cameraContainer.style.display = "flex"; //A dicho elemento, se accede a su propiedad de estilo, y a su propiedad de comportamiento de visualización, y se le asigna dicho valor para aplicar los estilos necesarios desde el CSS
    cameraPermissions(); //Se llama a ejecutar la función asíncrona para pedir el permiso del usuario para acceder a la cámara del dispositivo
});

botonFoto.addEventListener('click', function () { //A dicho elemento, se le aplica un escuchador de evento, el cual escucha el evento de "click", ejecutando una declaración de función la cual ejecuta el siguiente bloque
    const tempCanvas = document.createElement('canvas'); //Declaración de constante, con valor asignado, al documento HTML, crear un elemento, el cual un elemento "canvas", para ser un canvas temporal
    tempCanvas.width = camera.clientWidth; //Al elemento canvas temporal, se le accede a su propiedad de ancho, al  que se le asigna como valor, el ancho interior del elemento "camera"
    tempCanvas.height = camera.clientHeight; //Al elemento canvas temporal, se le accede a su propiedad de alto, al  que se le asigna como valor, el alto interior del elemento "camera"
    
    const tempContext = tempCanvas.getContext('2d'); //Declaración de constante, con valor asignado de, al canvas temporal, aplicar el método de obtener su contexto, el cual es el contexto de dos dimesiones que se utilizará para dibujar en el canvas 
    tempContext.drawImage(canvas, 0, 0, canvas.width, canvas.height); //Al canvas temporal, se le aplica el método de dibujar sobre el mismo, recibiendo como primer argumento el elemento a ser dibujado el cual es el contenido del canvas principal, el segundo argumento es la posición inicial el eje "x" en la que se dibujará el canvas principal el cual es la parte izquierda del canvas temporal, el tercer parámetro es la posición inicial el eje "y" en la que se dibujará el canvas principal el cual es la parte superior del canvas tempral, el cuarto parámetro es el ancho del canvas principal dibujado el cual es al ancho del canvas principal, y el quiento parámetro es el alto del canvas principal dibujado el cual es el alto del canvas principal

    let url = tempCanvas.toDataURL('image/jpeg'); //Declaración de variable con valor asignado de, al canvas temporal, aplicar el método de obtener la información en una URL codificada que representa al valor del elemento al que se aplica, el cual recibe como argumento el formato para especificar el tipo de imagen que se va a generar
    let descargar = document.createElement('a'); //Declaración de variable, con valor asignado de, al documento HTML, crear un elemento, el cual es el que se encuentra dentro de las comillas de los paréntesis que es un elemento de anclaje

    descargar.href = url; //A dicho elemento, se le asigna el atributo de referencia para redirecciónar, y se le asigna como valor la url de la imagen codificada del canvas temporal
    descargar.download = "foto.jpg"; //A dicho elemento, se le asigna el atributo de descarga para que no redireccione sino que descargue, y se le asigna como valor el nombre en string del elemento que se descargue
    descargar.click(); //A dicho elemento, se le aplica el método de clickear en automático el elemento, para descargar el archivo

    video.pause(); //A dicho elemento, se le aplica el método de pausa, para pausar la reproducción de reproductor de video
    video.srcObject.getTracks().forEach(track => track.stop()); //A dicho elemento, se accede a su objeto de recursos, al cual se le aplica el método de obtener una lista de los objetos MediaStreamTrack que son los flujos multimedia del elemento "video", a dicha lista se le aplica un ciclo forEach que itera por cada ojeto/track de flujos multimedia, ejecutando por cada uno, aplica el método de detener el flujo multimedia
    cameraContainer.style.display = "none"; //A dicho elemento, se accede a su propiedad de estilo, y a su propiedad de comportamiento de visualización, y se le asigna dicho valor para no mostralo
    buttonCamara.style.display = "inline-block"; //A dicho elemento, se accede a su propiedad de estilo, y a su propiedad de comportamiento de visualización, y se le asigna dicho valor para ser un elemento de línea y bloque
});

// COMENTS FUNCTION //

const footerForm = document.querySelector(".footer__form");
const commentsInput = document.querySelector(".comments__input");
const commentButton = document.querySelector(".submit__button");
const commentsList = document.querySelector(".comments__list");

function deleteComment(e) {
    commentsList.removeChild(e.target.parentNode.parentNode);
}

function editComment(comment, commentLi, buttonEdit, commentsButtons) {
    comment.style.display = "none";
    buttonEdit.style.display = "none";

    let newTextInput = document.createElement('input');
    newTextInput.type = "text";
    newTextInput.className = "comments__input";
    newTextInput.value = comment.textContent;
    
    let buttonFinishEdit = document.createElement("button");
    buttonFinishEdit.className = "comment__buttons";
    buttonFinishEdit.textContent = "Finalizar";

    commentsButtons.insertBefore(buttonFinishEdit, commentsButtons.firstChild);

    commentLi.insertBefore(newTextInput, commentLi.firstChild);

    buttonFinishEdit.addEventListener('click', () => {
        comment.textContent = newTextInput.value;
        comment.style.display = "block";
        newTextInput.style.display = "none";
        buttonEdit.style.display = "block";
        buttonFinishEdit.style.display = "none";
    });
}

function createComment(commentValue) {
    let commentLi = document.createElement('li');
    commentLi.className = "comment__li";

    let commentP = document.createElement('p');
    commentP.className = "comment__p";
    commentP.textContent = commentValue;

    let divButtons = document.createElement('div');
    divButtons.className = "buttonsComments";

    let commentButtonEdit = document.createElement('button');
    commentButtonEdit.className = "comment__buttons";
    commentButtonEdit.textContent = "Editar";

    let commentButtonDelete = document.createElement('button');
    commentButtonDelete.className = "comment__buttons";
    commentButtonDelete.textContent = "Eliminar";

    divButtons.append(commentButtonEdit, commentButtonDelete);

    commentLi.append(commentP, divButtons);

    commentsList.appendChild(commentLi);

    commentButtonDelete.addEventListener('click', deleteComment);
    commentButtonEdit.addEventListener('click', () => {
        editComment(commentP, commentLi, commentButtonEdit, divButtons);
    });
}

footerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let comment = commentsInput.value;
    createComment(comment);

    e.target.reset(); //Al elemento que ejecutó el evento, el cual es el formulario y el evento es 'submit', se le aplica el método de resetear los valores de los campos del formulario después de que se envía el formulario.
});