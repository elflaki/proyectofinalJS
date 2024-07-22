// archivo: main.js

// Importamos las funciones y variables de los otros módulos
import { productos, obtenerPrecioDolarBlue } from './productos.js';
import { cargarCarrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, calcularTotal } from './carrito.js';
import { mostrarProductos, renderizarCarrito, mostrarMensaje } from './ui.js';

// Función principal para inicializar la aplicación
function inicializarApp() {
  try {
    cargarCarrito(); // Cargamos el carrito desde el localStorage
    mostrarProductos(); // Mostramos los productos en la UI
    document.getElementById("comprar").addEventListener("click", comprarProductos); // Agregamos el event listener para el botón de comprar
    document.getElementById("formulario-cotizacion").addEventListener("submit", (event) => {
      event.preventDefault(); // Prevenimos el submit default del form
      cotizarProductos(); // Llamamos a la función para cotizar productos
    });
  } catch (error) {
    mostrarMensaje("Error al inicializar la aplicación.", "error"); // Mostramos un mensaje de error genérico
  }
}

// Función para realizar la compra de productos
function comprarProductos() {
  if (carrito.length === 0) {
    mostrarMensaje("El carrito está vacío", "error"); // Mostramos mensaje si el carrito está vacío
    return;
  }

  // Acá iría la lógica para procesar la compra (e.g., enviar datos al servidor)

  vaciarCarrito(); // Vaciamos el carrito después de la compra
  mostrarMensaje("Compra realizada con éxito", "exito"); // Mostramos mensaje de éxito
}

// Función para enviar la cotización
function cotizarProductos() {
  if (carrito.length === 0) {
    mostrarMensaje("El carrito está vacío", "error"); // Mostramos mensaje si el carrito está vacío
    return;
  }

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();

  if (!nombre || !correo) {
    mostrarMensaje("Debe completar ambos campos", "error"); // Validamos que los campos no estén vacíos
    return;
  }

  // Guardamos la cotización en el historial del localStorage
  const historial = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
  const cotizacion = {
    nombre,
    correo,
    productos: carrito,
    total: calcularTotal(),
    fecha: new Date().toLocaleString(),
  };
  historial.push(cotizacion);
  localStorage.setItem("historialCotizaciones", JSON.stringify(historial));

  mostrarMensaje(`Gracias ${nombre}, su cotización ha sido registrada. Pronto recibirá un correo en ${correo}.`, "exito");

  vaciarCarrito(); // Vaciamos el carrito después de enviar la cotización
  document.getElementById("formulario-cotizacion").reset(); // Reseteamos el formulario
}

// Inicializamos la aplicación
inicializarApp();
