// Obtener el monto a convertir
// Seleccionar la moneda
// Presionar botón de convertir
    // Obtener valor de la moneda
const obtenerValorMoneda = async (moneda) => {
    url = "https://mindicador.cl/api/"+moneda.toString()
    try {
        const res = await fetch(url)
        const valor = await res.json()
        return valor
    } catch (error) {
        alert("No se puede obtener el valor de la moneda seleccionada en este momento.")
    }
}
// Realizar cálculo de conversión
// Obtener la conversión
// Mostrar el monto convertido
// Obtener el valor de la moneda seleccionada de los últimos diez días
// Configurar grafico Chart.js
// Mostrar gráfico

