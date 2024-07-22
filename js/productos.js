// archivo: productos.js

// Array de productos (lo sacamos del JSON y lo ponemos directamente acá para simplificar)
export const productos = [
  { nombre: "Camiseta", precio: 20000 },
  { nombre: "Zapatillas", precio: 70000 },
  { nombre: "Medias", precio: 10000 },
  { nombre: "Campera", precio: 60000 }
];

// Función para obtener el precio del dólar blue
export async function obtenerPrecioDolarBlue() {
  try {
    const response = await fetch('https://dolarapi.com/v1/dolares');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const dolarBlue = data.find(d => d.casa === 'blue');
    const precioVenta = dolarBlue.venta;
    return precioVenta;
  } catch (error) {
    // Manejo de errores, puedes optar por mostrar un mensaje al usuario
    return null;
  }
}
