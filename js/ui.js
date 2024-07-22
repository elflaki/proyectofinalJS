// archivo: ui.js

// Importamos las funciones y variables del carrito
import { agregarAlCarrito, eliminarDelCarrito, carrito, calcularTotal } from './carrito.js';
import { obtenerPrecioDolarBlue, productos } from './productos.js';

// Seleccionamos los elementos del DOM que vamos a manipular
const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalGastado = document.getElementById("total-gastado");
const contadorCarrito = document.getElementById("contador-carrito");
const mensaje = document.getElementById("mensaje");

// Variable para almacenar el precio del dólar blue
let precioDolarBlue = null;

// Elemento para mostrar el total en dólares
const totalDolares = document.createElement("p");
totalDolares.id = "total-dolares";

// Función para mostrar los productos en la UI
export async function mostrarProductos() {
  precioDolarBlue = await obtenerPrecioDolarBlue(); // Obtenemos el precio del dólar blue
  listaProductos.innerHTML = ""; // Limpiamos la lista de productos
  productos.forEach((producto) => {
    const card = crearCard(producto); // Creamos una tarjeta para cada producto
    listaProductos.appendChild(card); // Agregamos la tarjeta a la lista de productos

    const botonAgregar = card.querySelector(".agregar");
    botonAgregar.addEventListener("click", () => agregarAlCarrito(producto)); // Agregamos el event listener para agregar al carrito
  });
}

// Función para crear una tarjeta de producto
function crearCard(producto) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
        <img src="./img/${producto.nombre.toLowerCase()}.webp" alt="${producto.nombre}">
        <p>${producto.nombre} - $${producto.precio}</p>
        ${precioDolarBlue ? `<p>Precio en dólares: ${(producto.precio / precioDolarBlue).toFixed(2)} USD</p>` : ''}
        <button class="agregar">Agregar al Carrito</button>
    `;
  return card; // Devolvemos la tarjeta creada
}

// Función para renderizar el carrito en la UI
export function renderizarCarrito() {
  listaCarrito.innerHTML = ""; // Limpiamos la lista del carrito
  carrito.forEach((producto, index) => {
    const itemEnCarrito = document.createElement("li");
    itemEnCarrito.innerHTML = `
            <img src="./img/${producto.nombre.toLowerCase()}.webp" alt="${producto.nombre}" width="50">
            ${producto.nombre} - $${producto.precio}
            <button class="eliminar" data-index="${index}">Eliminar</button>
        `;
    listaCarrito.appendChild(itemEnCarrito); // Agregamos el item al carrito

    const botonEliminar = itemEnCarrito.querySelector(".eliminar");
    botonEliminar.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      eliminarDelCarrito(index); // Agregamos el event listener para eliminar del carrito
    });
  });

  actualizarTotal(); // Actualizamos el total gastado
  actualizarContador(); // Actualizamos el contador de items en el carrito
}

// Función para actualizar el total gastado
export function actualizarTotal() {
  const total = calcularTotal(); // Calculamos el total
  totalGastado.innerHTML = `Total gastado: AR$${total.toFixed(2)}`; // Mostramos el total en pesos argentinos

  // Mostramos el total en dólares blue si el precio está disponible
  if (precioDolarBlue) {
    const totalEnDolares = (total / precioDolarBlue).toFixed(2);
    totalDolares.textContent = `Total gastado en dólares: U$D ${totalEnDolares}`;
    totalGastado.appendChild(totalDolares);
  } else {
    totalDolares.textContent = ""; // Limpiamos el texto si no hay precio del dólar blue
  }
}

// Función para actualizar el contador de items en el carrito
function actualizarContador() {
  contadorCarrito.textContent = carrito.length; // Mostramos el contador en la UI
}

// Función para mostrar mensajes al usuario
export function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto; // Mostramos el mensaje
  mensaje.className = tipo; // Aplicamos la clase correspondiente (exito o error)
  setTimeout(() => {
    mensaje.textContent = ""; // Limpiamos el mensaje después de un tiempo
    mensaje.className = "";
  }, 3000);
}

