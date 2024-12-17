// script.js

// Datos iniciales de productos
const productos = [
    { nombre: "Cerveza", precio: 2500, descripcion: "Bebida refrescante para compartir" },
    { nombre: "Sandwich", precio: 2000, descripcion: "Un delicioso sandwich de jamón y queso" },
    { nombre: "Alfajor", precio: 750, descripcion: "Dulce argentino relleno de dulce de leche" },
    { nombre: "Café", precio: 1200, descripcion: "Café recién preparado con granos seleccionados" },
    { nombre: "Torta", precio: 1500, descripcion: "Porción de torta casera de chocolate" },
    { nombre: "Fernet", precio: 3000, descripcion: "Bebida alcohólica para disfrutar en grupo" },
    { nombre: "Coca-Cola", precio: 1000, descripcion: "Gaseosa refrescante para acompañar tus comidas" },
];

let carrito = [];

function productoDinamico() {
    const seccionGastos = document.getElementById("gastos");
    

    // Agregamos una card que permita agregar nombre de producto y valor con un input
    const card = document.createElement("div");
    card.className = "gasto-card border p-3 m-2";
    card.style = "width: 18rem;";
    seccionGastos.appendChild(card);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = "Agregar producto";
    cardBody.appendChild(cardTitle);

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = "Ingrese el nombre y el valor del producto";
    cardBody.appendChild(cardText);

    const inputNombre = document.createElement("input");
    inputNombre.className = "form-control";
    inputNombre.type = "text";
    inputNombre.placeholder = "Nombre del producto";
    cardBody.appendChild(inputNombre);

    const inputValor = document.createElement("input");
    inputValor.className = "form-control";
    inputValor.type = "number";
    inputValor.placeholder = "Valor del producto";
    cardBody.appendChild(inputValor);

    const botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-primary";
    botonAgregar.textContent = "Agregar";
    botonAgregar.addEventListener("click", () => agregarProducto(inputNombre.value, inputValor.value));
    cardBody.appendChild(botonAgregar);
}

function agregarProducto(nombre, precio) {
    if (!nombre || !precio) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const producto = { nombre, precio: parseInt(precio), descripcion: "Producto agregado dinámicamente" };
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`Producto ${producto.nombre} agregado al carrito.`);
    actualizarVistaCarrito();
}

// Generar productos dinámicamente
function generarProductos() {
    const seccionGastos = document.getElementById("gastos");
    seccionGastos.innerHTML = ""; // Limpia el contenido inicial

    productos.forEach((producto, index) => {
        const card = document.createElement("div");
        card.className = "gasto-card border p-3 m-2";
        card.dataset.index = index;

        const nombre = document.createElement("p");
        nombre.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;

        const botonDetalles = document.createElement("button");
        botonDetalles.textContent = "Ver más";
        botonDetalles.className = "btn btn-info mt-2 me-2";
        botonDetalles.addEventListener("click", () => mostrarDescripcion(index));

        const botonCarrito = document.createElement("button");
        botonCarrito.textContent = "Agregar al carrito";
        botonCarrito.className = "btn btn-success mt-2";
        botonCarrito.addEventListener("click", () => agregarAlCarrito(index));

        card.appendChild(nombre);
        card.appendChild(precio);
        card.appendChild(botonDetalles);
        card.appendChild(botonCarrito);
        seccionGastos.appendChild(card);
    });

    productoDinamico();
}

// Mostrar descripción del producto
function mostrarDescripcion(index) {
    const producto = productos[index];
    alert(`Producto: ${producto.nombre}\nPrecio: $${producto.precio}\nDescripción: ${producto.descripcion}`);
}

// Agregar producto al carrito
function agregarAlCarrito(index) {
    const producto = productos[index];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`Producto ${producto.nombre} agregado al carrito.`);
    actualizarVistaCarrito();
}

// Actualizar vista del carrito
function actualizarVistaCarrito() {
    const seccionCarrito = document.getElementById("carrito");
    seccionCarrito.innerHTML = "";

    carrito.forEach((producto, index) => {
        const item = document.createElement("div");
        item.className = "carrito-item border p-3 m-2 d-flex justify-content-between align-items-center";

        const descripcion = document.createElement("span");
        descripcion.textContent = `${producto.nombre} - $${producto.precio}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "btn btn-danger btn-sm";
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(index));

        item.appendChild(descripcion);
        item.appendChild(botonEliminar);
        seccionCarrito.appendChild(item);
    });

    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    const totalElemento = document.createElement("p");
    totalElemento.textContent = `Total: $${total}`;
    totalElemento.className = "mt-3 fw-bold";
    seccionCarrito.appendChild(totalElemento);
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarVistaCarrito();
}

// Validar formulario de contacto
function validarFormulario(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !mensaje) {
        alert("Por favor, complete todos los campos del formulario.");
        return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return;
    }

    alert("Formulario enviado correctamente. Gracias por contactarnos.");
    document.querySelector("form").reset();
}

// Obtener datos de una API REST y mostrarlos en la página
async function cargarDatosAPI() {
    try {
        const respuesta = await fetch("https://fakeapi.net/reviews?limit=5");
        if (!respuesta.ok) throw new Error("Error al obtener los datos de la API");

        const datos = await respuesta.json();
        const seccionAPI = document.getElementById("reseñas");

        datos['data'].forEach(review => {
            const reseñaItem = document.createElement("div");
            reseñaItem.className = "reseña-item border p-3";
            reseñaItem.textContent = `${review.title}: ${review.content} - ${review.date}`;

            seccionAPI.appendChild(reseñaItem);
        });
    } catch (error) {
        console.error("Error al cargar los datos de la API:", error);
    }
}

// Cargar gastos desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    actualizarVistaCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();
    generarProductos();
    cargarDatosAPI();

    const formulario = document.querySelector("form");
    formulario.addEventListener("submit", validarFormulario);
});
