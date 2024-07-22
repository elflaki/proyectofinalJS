// archivo: carrito.js

// Inicializamos el carrito vacío
export let carrito = [];

// Importamos renderizarCarrito de ui.js
import { renderizarCarrito } from './ui.js';

export function agregarAlCarrito(producto) {
  carrito.push(producto); // Agregamos el producto al array del carrito
  guardarCarrito(); // Guardamos el carrito en el localStorage
  renderizarCarrito(); // Actualizamos la UI del carrito
}

export function eliminarDelCarrito(index) {
  carrito.splice(index, 1); // Sacamos el producto del array del carrito
  guardarCarrito(); // Actualizamos el localStorage
  renderizarCarrito(); // Actualizamos la UI del carrito
}

export function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito)); // Convertimos el carrito a JSON y lo guardamos
}

export function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado); // Parseamos el JSON y lo asignamos al array del carrito
    renderizarCarrito(); // Actualizamos la UI del carrito
  }
}

export function vaciarCarrito() {
  carrito = []; // Reseteamos el array del carrito
  guardarCarrito(); // Actualizamos el localStorage
  renderizarCarrito(); // Actualizamos la UI del carrito
}

export function calcularTotal() {
  return carrito.reduce((acc, producto) => acc + producto.precio, 0); // Sumamos los precios de todos los productos en el carrito
}

