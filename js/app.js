// CAMERA FUNCTION //

const body = document.querySelector('body'); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector de tipo dentro de las comillas de los paréntesis
const buttonCamara = document.querySelector('.mostrar__camara'); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector de clase dentro de las comillas de los paréntesis
const cameraContainer = document.querySelector('.camera__container'); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector de clase dentro de las comillas de los paréntesis
const camera = document.querySelector('.camara'); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector de clase dentro de las comillas de los paréntesis
const buttons = document.querySelector('.buttons'); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector de clase dentro de las comillas de los paréntesis
const video = document.querySelector('.video__source'); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector de clase dentro de las comillas de los paréntesis
const canvas = document.querySelector('#canvas'); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector identificador dentro de las comillas de los paréntesis
const botonFoto = document.querySelector("#boton__foto"); //Declaración de constante, con valor asignado de obtener desde el docuemnto HTML, el elemento mediante su selector, el cual es el selector identificador dentro de las comillas de los paréntesis
const botonCerrarCamara = document.querySelector('#close__camera')
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

botonCerrarCamara.addEventListener('click', function () {
    video.pause();
    video.srcObject.getTracks().forEach(track => track.stop());
    cameraContainer.style.display = "none";
    buttonCamara.style.display = "inline-block";
});

// COMENTS FUNCTION //

const footerForm = document.querySelector(".footer__form"); //Declaración de constante con valor asignado de, en el documento HTML, obtener el primer elemento mediante su selector, el cual es el de clase dentro de las comillas de los paréntesis
const commentsInput = document.querySelector(".comments__input"); //Declaración de constante con valor asignado de, en el documento HTML, obtener el primer elemento mediante su selector, el cual es el de clase dentro de las comillas de los paréntesis
const commentButton = document.querySelector(".submit__button"); //Declaración de constante con valor asignado de, en el documento HTML, obtener el primer elemento mediante su selector, el cual es el de clase dentro de las comillas de los paréntesis
const commentsList = document.querySelector(".comments__list"); //Declaración de constante con valor asignado de, en el documento HTML, obtener el primer elemento mediante su selector, el cual es el de clase dentro de las comillas de los paréntesis

function deleteComment(e) { //Declaración de función para eliminar comentarios, posee un parámetro para recibir como argumento el evento que ejecutará dicha función, la cual ejecuta el siguiente bloque
    commentsList.removeChild(e.target.parentNode.parentNode.parentNode); //A dicho elemento obtenido mediante su selector, se le aplica el método para remover elementos hijos, el cual recibe como argumento, del evento que ejecutó la función para eliminar comentarios, obtener el elemento que ejecutó dicho evento, y se accede a tres niveles superiores del nodo/elemento padre para acceder al contendor del comentario y removerlo
    localStorage.removeItem((e.target.parentNode.parentNode.parentNode).firstChild.textContent)
}

function editComment(commentP, commentLi, buttonEdit, divButtons, buttonInteract) { //Declaración de función para editar comentarios, dicha función posee los parámetros para recibir los argumentos necesarios, siendo en este orden, el elemento "p" del comentario, el elemento "li" que contiene el comentario, el botón para editar el comentario, el contenedor de los botones para interactuar con el comentario, y el botón para interactuar con el comentario, la cual ejecuta el siguiente bloque
    commentP.style.display = "none"; //A dicho elemento "p", se accede a sus estilos, a su propiedad de comportamiento de visualzación, y se le asigna el valor "none" para no ser visible
    buttonEdit.style.display = "none"; //A dicho botón para editar, se accede a sus estilos, a su propiedad de comportamiento de visualzación, y se le asigna el valor "none" para no ser visible

    let newTextInput = document.createElement('input'); //Declaración de varible con valor asignado de, en el documento HTML, crear un elemento de tipo "entrada de datos"
    newTextInput.type = "text"; //A dicho elemento "input" creado, se accede a su propiedad de "tipo", y se le asigna el valor para que sea de tipo "texto"
    newTextInput.className = "comments__input"; //A dicho elemento "input" creado, se accede a su selector de clase, y se le asigan dicha clase dentro de las comillas
    newTextInput.value = commentP.textContent; //A dicho elemento "input" creado, se accede a su valor, y se le asigna como valor, de dicho elemento "p" del comentario, acceder a su "texto contenido" y dicho texto será el valor asignado
    
    let buttonFinishEdit = document.createElement("button"); //Declaración de varible con valor asignado de, en el documento HTML, crear un elemento de tipo "botón"
    buttonFinishEdit.className = "comment__buttons"; //A dicho elemento "botón" creado, se accede a su selector de clase, y se le asigan dicha clase dentro de las comillas
    buttonFinishEdit.textContent = "Finalizar"; //A dicho elemento "botón" creado, se accede a su "texto contenido", y se le asigan como valor, dicha cadena de texto

    divButtons.insertBefore(buttonFinishEdit, divButtons.firstChild); //A dicho elemento "contenedor de los botones para interactuar con el comentario", se aplica el método para insertar un elemento al inicio del elemento hijo de otro elemento, siendo el "botón para finalizar la edición" el elemento a insetar dentro de, el elemento "contenedor de los botones para interactuar con el comentario", en su primer hijo

    commentLi.insertBefore(newTextInput, commentLi.firstChild); //A dicho elemento "lista" que contiene el comentario, se aplica el método para insertar un elemento al inicio del elemento hijo de otro elemento, siendo el "input para la edición" el elemento a insetar dentro de, el elemento "lista" que contiene el comentario, en su primer hijo

    buttonFinishEdit.addEventListener('click', () => { //A dicho elemento "botón" para finalizar la edición, se le agrega un escuchador de eventos, el cual detecta el evento de "click" sobre dicho elemento, ejecutando una función flecha que ejecuta el siguiente bloque
        commentP.textContent = newTextInput.value; //A dicho elemento "p", se accede a su texto contenido, y se le reasiga el valor a, del "input para la edición", obtener su valor, siendo dicho valor el que será asignado 
        commentP.style.display = "block"; //A dicho elemento "p", se accede a sus estilos, a su propiedad de comportamiento de visualización, y se le asigna "block" para ser visible como un elemento de bloque
        buttonEdit.style.display = "block"; //A dicho elemento "botón" para editar el comentario, se accede a sus estilos, a su propiedad de comportamiento de visualización, y se le asigna "block" para ser visible como un elemento de bloque
        commentLi.removeChild(newTextInput); //A dicho elemento "lista" que contiene el comentario, se le aplica el método para remover elementos hijos, siendo removido dicho elemento "input para la edición" el que será eliminado
        divButtons.removeChild(buttonFinishEdit); //A dicho elemento "contenedor de los botones para interactuar con el comentario", se le aplica el método para remover elementos hijos, siendo removido dicho elemento "botón" para finalizar la edición el que será eliminado
        divButtons.classList.remove('show'); //A dicho elemento "contenedor de los botones para interactuar con el comentario", se accede a su lista de claes, y se le aplica el método para remover dicha clase dentro de las comillas de los paréntesis
        buttonInteract.classList.remove('ocult'); //A dicho elemento "botón para interactuar con el comentario", se accede a su lista de claes, y se le aplica el método para remover dicha clase dentro de las comillas de los paréntesis
    });
}

function createComment(commentValue) { //Declaración de función para crear un comentario, el cual posee un parámetro para recibir como argumento, el valor del comentario, y que ejecuta el siguiente bloque
    let commentLi = document.createElement('li'); //Declaración de variable con valor asignado de, en el documento HTML, crear un elemento de tipo "listado"
    commentLi.className = "comment__li"; //A dicho elemento "listado" creado, se accede a su selector de clase, y se le asigna dicha clase dentro de las comillas

    let commentP = document.createElement('p'); //Declaración de variable con valor asignado de, en el documento HTML, crear un elemento de tipo "parrafo"
    commentP.className = "comment__p"; //A dicho elemento "parrafo" creado, se accede a su selector de clase, y se le asigna dicha clase dentro de las comillas 
    commentP.textContent = commentValue; //A dicho elemento "parrafo" creado, se accede a su texto contenido, y se le asigan, el valor del comentario ontenido en el argumento de la función

    let buttonInteract = document.createElement('img'); //Declaración de variable con valor asignado de, en el documento HTML, crear un elemento de tipo "imagen"
    buttonInteract.classList.add('commentInteract'); //A dicho elemento "imagen" creado, se accede a su lista de clases, y se le aplica el método para añadir, dicha clase dentro de las comillas de los paréntesis
    buttonInteract.src = './images/edit-com.svg'; //A dicho elemento "imagen" creado, se accede a su propiedad de "fuente", y se le asigna como valor de cadena de texto, la ruta obtener dicha imagen

    let divButtons = document.createElement('div'); //Declaración de variable con valor asignado de, en el documento HTML, crear un elemento de tipo "contenedor de bloque"
    divButtons.className = "buttonsComments"; //A dicho elemento "contenedor de bloque" creado, se accede a su selector de clase, y se le asigna dicha clase dentro de las comillas

    let buttonsContainer = document.createElement('div'); //Declaración de variable con valor asignado de, en el documento HTML, crear un elemento de tipo "contenedor de bloque"
    buttonsContainer.classList.add('buttonsContainer'); //A dicho elemento "contenedor de bloque" creado, se accede a su lista de clases, y se le aplica el método para añadir, dicha clase dentro de las comillas de los paréntesis

    let commentButtonEdit = document.createElement('button'); //Declaración de variable con valor asignado de, en el documento HTML, crear un elemento de tipo "botón"
    commentButtonEdit.className = "comment__buttons"; //A dicho elemento "botón" creado, se accede a su selector de clase, y se le asigna dicha clase dentro de las comillas
    commentButtonEdit.textContent = "Editar"; //A dicho elemento "botón" creado, se accede a su texto contenido, y se le asigna como valor, dicha cadena de texto

    let commentButtonDelete = document.createElement('button'); //Declaración de variable con valor asignado de, en el documento HTML, crear un elemento de tipo "botón"
    commentButtonDelete.className = "comment__buttons"; //A dicho elemento "botón" creado, se accede a su selector de clase, y se le asigna dicha clase dentro de las comillas
    commentButtonDelete.textContent = "Eliminar"; //A dicho elemento "botón" creado, se accede a su texto contenido, y se le asigna como valor, dicha cadena de texto

    divButtons.append(commentButtonEdit, commentButtonDelete); //A dicho elemento "contenedor de bloque" creado, se le aplica el método de añadir dentro del mismo, dichos ambos elementos botón creados
    buttonsContainer.append(buttonInteract, divButtons); //A dicho elemento "contenedor de bloque" creado, se le aplica el método de añadir dentro del mismo, dichos ambos elementos, el botón de interación con el comentario, y el contenedor de los botones
    commentLi.append(commentP, buttonsContainer); //A dicho elemento "listado" creado, se le aplica el método de añadir dentro del mismo, dicho elemento "parrafo" creado, y dicho elemento "contenedor de bloque" creado el cual ya contiene su respetivos elementos contenidos

    commentsList.insertBefore(commentLi, commentsList.firstChild)//A dicho elemento obtenido mediante su selector de clase, se le aplica el método para añadir como elemento hijo, dicho elemento "listado" creado el cual ya contiene su respetivos elementos contenidos

    commentButtonDelete.addEventListener('click', deleteComment); //A dicho elemento "botón" creado para eliminar el comentario, se le agrega un escuchador de eventos, el cual detecta el evento de "click" sobre el mismo, ejecutando dicho método para eliminar comentarios
    commentButtonEdit.addEventListener('click', () => {  //A dicho elemento "botón" creado para editar el comentario, se le agrega un escuchador de eventos, el cual detecta el evento de "click" sobre el mismo, ejecutando una función flecha que ejecuta el siguiente bloque
        editComment(commentP, commentLi, commentButtonEdit, divButtons, buttonInteract); //Se llama a ejecutar dicha función para editar el comentario, la cual recibe como arguentos, el elemento "p" del comentario, el elemento "li" que contiene el comentario, el elemento "botón" para editar, el elemento "div" que contiene los botones para interactuar con el comentario, y el botón creado para interactuar con el comentario
        buttonInteract.classList.toggle('ocult'); //A dicho botón creado para interactuar con el comentario, se accede a su lista de clases, y se le aplica el método de alternar, dicho selector de clase
    });

    buttonInteract.addEventListener('click', () => { //A dicho botón creado para interactuar con el comentario, se le agrega un escuchador de eventos, el cual detecta el evento de 'click' sobre el mismo, ejecutando una función flecha que ejecuta el siguiente bloque
        divButtons.classList.toggle('show'); //A dicho elemento "contenedor de bloque" creado, se accede a su lista de clases, y se le aplica el método de alternar, dicho selector de clase
    });
}

footerForm.addEventListener('submit', (e) => { //A dicho elemento obtenido mediante su selector de clase el cual es el fomulario para comentar, se le agrega un escuchador de eventos, el cual detecta el evento de "entregar", ejecutando una función flecha que reicbe como argumento ele evento detectado, y que ejecuta el siguiente bloque
    e.preventDefault(); //A dicho evento ejecutado, se el aplica el método para evitar su comportamiento por defecto
    let comment = commentsInput.value; //Declaración de variable con valor asignado de, de dicho elemento obtenido mediante su selector de clase el cual es el elemento "input" donde se escribe el comentario, y obtener su valor
    createComment(comment); //Se llama a ejecutar dicha función para crear el comentario, la cual recibe como argumento, dicho valor del "input" para escribir el comentario
    localStorage.setItem(comment, comment)
    e.target.reset(); //Al elemento que ejecutó el evento, el cual es el formulario y el evento es 'submit', se le aplica el método de resetear los valores de los campos del formulario después de que se envía el formulario.
});

// SCROLL FUNCTION //

let links = document.querySelectorAll(".nav__link"); /*Declaración de variable con valor asignado de, del documento HTML, obtener todos los elementos mediante su selector el cual es el que está dentro de las comillas de los paréntesis*/

function scrollToElement(element) { /*Declaración de función para desplazarse hacia un elemento, la cual posee el parámetro para recibir como argumento el elemento hacia el cual desplazarse, y que ejecuta el siguiente bloque*/
    window.scrollTo({ /*A la ventana del navegador, se le aplica su método para desplazar suevamente, el cual recibe un JSON(objeto) con las siguientes propiedades*/
        'behavior': 'smooth', /*Propiedad del objeto para el comportamiento del desplazamiento, con valor para ser "suave"*/
        'top': element.offsetTop - document.querySelector(".nav__container").offsetHeight /*Propiedad del objeto que especifica la posición vertical del elemento hacia el cual se desplazará en relación con el borde superior de la ventana, con valor de obtener del elemento obtenido como argumento en el parámetro de la función, y su desplazamiento superior, al que se le resta, del documento HTML, obtener un elementos mediante su selector, el cual es el de clase enviado como argumento, así la barra de navegación no se colocará sobre la sección a la que se redirecciona*/
    });
}

links.forEach(link => { /*Al al lista/arreglo de los elementos obtenidos mediante su selector, se les aplica un ciclo para iterar cada elemento, lo cual hace que por cada elemento(link/a) se ejeucta el siguiente bloque*/
    link.addEventListener('click', (ev) => { /*Al elemento, se le agrega un escuchador de eventos, que detecta el evento de 'click' sobre el elemento, ejeuctanto una función flecha que recibe como argumento el evento detectado, ejecutando el siguiente bloque*/
        if (!!window.scrollTo) { /*Condicional que valida si, la ventana del navegador, posee y puede hacer uso de su método de desplazamiento, utilizando una doble negación para convertir el valor en un valor booleano*/
            ev.preventDefault(); /*Si se cumple la condición anterior, al evento detectado se le aplica el método para prevenir su acción por defecto el cual es redireccionar "a saltos"*/
        }

        let paths = ev.currentTarget.href.split("#"); /*Declaración de variable con valor asignado de, del evento detectado se obtiene el elemento actual del que se detectó dicho evento, se accede a su propiedad de referencia(url de la página), y se le aplica el método para dividir la URL en partes separadas por el carácter "#" (obteniendo un arreglo), que indica un identificador de elemento dentro de la misma página el cual es una sección de la misma*/
        let selector = paths[paths.length - 1]; /*Declaración de variable con valor asignado de, del valor del arreglo obtenido, se obtiene el elemento mediante su índice, siendo la longitud de dicho arreglo menos uno, para obtener el último elemento, lo cual es el valor del indentificador de la sección*/
       
        scrollToElement(document.querySelector("#" + selector)); /*Se llama a ejecutar la función para desplazarse hacia un elemento, el cual recibe como argumento, del documento HTML, obtener un elemento mediante su selector, el cual es el identificador del elemento, siendo la concatenación del carácter "#" con el valor obtenido de dicha variable*/
    });
});

// COMENTS LOCAL STORAGE //

window.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        createComment(value);
    }
});

// DARKMODE //

const botonLogo = document.querySelector('#nav--logo');
const buttonSwitchDark = document.querySelector('.dark-mode-controls');

botonLogo.addEventListener('click', () => {
    buttonSwitchDark.classList.toggle('show')
});

botonLogo.addEventListener('blur', () => {
    buttonSwitchDark.classList.remove('show');
});

const colorSchemeLSKey = "page--color--scheme" //Declaración de constante con valor asignado de, una cadena de texto, para el nombre clave del alamcenamiento local
let checkBoxElement = document.querySelector('.dark-toggle'); //Declaración de variable con valor asignado de, del documento HTML, obtener el primer elemento mediante su selector, el cual es el de clase dentro de las comillas de los paréntesis

function isUsingDarkMode() { //Declaración de función, para detectar si se está usando el mode oscuro, la cual ejecuta el siguiente bloque
    let bodyElement = document.querySelector('body'); //Declaración de variable con valor asignado de, del documento HTML, obtener el primer elemento mediante su selector, el cual es el de tipo dentro de las comillas de los paréntesis
    let bodyStyle = getComputedStyle(bodyElement); //Declaración de variable con valor asignado de, obtener los estilos computados/aplicados, del elemento anterior obtenido mediante su selector
    let bodyBackgroundColor = bodyStyle.backgroundColor //Declaración de variable con valor asignado de, de dichos estilos computados obtenidos, obtener la propiedad de color de fondo
    let darkModeBgColor = 'rgb(13, 27, 30)'; //Declaración de variable con valor asignado de, una cadena que representa un color en rgb

    return darkModeBgColor === bodyBackgroundColor; //Se retorna la comparación de, el valor de dicha variable que es el color de fondo del modo oscuro, con el valor de dicha variable que es el color de fondo computado del elemento obtenido mediante su selector de clase
}

function changeToLightMode() { //Declaración de función, para cambiar a modo claro, la cual ejecuta el siguiente bloque
    let bodyElement = document.querySelector('body'); //Declaración de variable con valor asignado de, del documento HTML, obtener el primer elemento mediante su selector, el cual es el de tipo dentro de las comillas de los paréntesis
    bodyElement.classList.remove('force-dark'); //A elemento anterior obtenido mediante su selector, se accede a su lista de clases, y se le remueve la clase, que está dentro de las comillas de los paréntesis
    bodyElement.classList.add('force-light'); //A elemento anterior obtenido mediante su selector, se accede a su lista de clases, y se le añade la clase, que está dentro de las comillas de los paréntesis
    setColorSchemeToLS("light"); //Se llama a ejecutar dicha función, para establecer en el almacenamiento local el color del tema escogido, la cual recibe como argumento la cadena que representa el modo claro
}

function changeToDarkMode() { //Declaración de función, para cambiar a modo oscuro, la cual ejecuta el siguiente bloque
    let bodyElement = document.querySelector('body'); //Declaración de variable con valor asignado de, del documento HTML, obtener el primer elemento mediante su selector, el cual es el de tipo dentro de las comillas de los paréntesis
    bodyElement.classList.remove('force-light');  //A elemento anterior obtenido mediante su selector, se accede a su lista de clases, y se le remueve la clase, que está dentro de las comillas de los paréntesis
    bodyElement.classList.add('force-dark'); //A elemento anterior obtenido mediante su selector, se accede a su lista de clases, y se le añade la clase, que está dentro de las comillas de los paréntesis
    setColorSchemeToLS("dark"); //Se llama a ejecutar dicha función, para establecer en el almacenamiento local el color del tema escogido, la cual recibe como argumento la cadena que representa el modo oscuro
}

function setColorSchemeToLS(value) { //Declaración de función, para establecer en el almacenamiento local el color del tema escogido, que posee el parámetro para recibir el valor del tema escogido, la cual ejecuta el siguiente bloque
    try{ //Se intenta
        window.localStorage.setItem(colorSchemeLSKey, value); //En el navegador, acceder a su almacenamiento local, y aplicar el método para establecer un nuevo elemento/archivo, con el nombre del valor de dicha constante, y el valor contenido es el que se recibe en el parámetro de la función
    } catch { //Si hay un error, es capturado
        console.log("Err en LS"); //Se llama a la consola del navegador, y se aplica el método de imprimir sobre la misma, la cadena
    }
}

function getColorSchemeFromLS() { //Declaración de función, para obtener del almacenamiento local el color del tema escogido, la cual ejecuta el siguiente bloque
    try{ //Se intenta
        return window.localStorage.getItem(colorSchemeLSKey); //Retornar, del navegador, acceder a su almacenamiento local, y aplicar el método para obtener el elemento/archivo, con el nombre del valor de dicha constante
    } catch { //Si hay un error, es capturado
        console.log("Err en LS"); //Se llama a la consola del navegador, y se aplica el método de imprimir sobre la misma, la cadena
    }
}

function readColorSchemeFromLS() { //Declaración de función, para leer del almacenamiento local el color del tema escogido, la cual ejecuta el siguiente bloque
    let colorScheme = getColorSchemeFromLS(); //Declaración de variable con valor asignado de, ejecutar dicha función para obtener del almacenamiento local el color del tema escogido, la cual ejecuta el siguiente bloque

    if (!colorScheme) { //Condicional que valida si, no hay algún elemento/archivo, con el nombre del valor de dicha constante
        return //Si se cumple la condición anterior, se retorna si hacer nada
    }

    if (colorScheme === "light") { //Condicional que valida si, el valor retornado de dicha variable, es estrictamente igual, a dicha cadena
        changeToLightMode(); //Si se cumple la condición anterior, se llama a ejecutar dicha función para cambiar a modo claro
    } else if (colorScheme === "dark") { //Si no se cumple la condición anterior, se valida si, el valor retornado de dicha variable, es estrictamente igual, a dicha cadena
        changeToDarkMode(); //Si se cumple la condición anterior, se llama a ejecutar dicha función para cambiar a modo oscuro
    }
}

checkBoxElement.addEventListener('change', function () { //A dicho elemento obtenido mediante su selector de clase, se le agregra un escuchador de eventos, que detecta el evento de cambio en el elemento, ejecutando una expresión de función que ejecuta el siguiente bloque
    if (this.checked) { //Condicional que valida si, el elemento que ejecutó el evento, tiene su propiedad de comprobado en verdadero/aplicado
        changeToDarkMode(); //Si se cumple la condición anterios, se llama a ejecutar dicha función para cambiar a modo oscuro
    } else { //Si no se cumple la condición anterior, se ejecuta el siguiente bloque
        changeToLightMode(); //Se llama a ejecutar dicha función para cambiar a modo claro
    }
});

readColorSchemeFromLS(); //Se llama a ejecutar dicha función para leer del almacenamiento local el color del tema escogido

checkBoxElement.checked = isUsingDarkMode(); //A dicho elemento obtenido mediante su selector de clase, se accede a su propiedad de comprobado, y se le asigna como valor, el llamado a dicha función para detectar si se está usando el mode oscuro, para obtener un valor booleano