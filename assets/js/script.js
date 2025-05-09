// Variables
const btn = document.querySelector("#btn-convertir")

// Funciones
async function convertirMoneda() {
    const cifra = Number(document.querySelector("#input-cifra").value)
    const moneda = document.querySelector("#select-moneda").value.toString()
    console.log(moneda)
    let resultadoTxt = document.querySelector("#resultado-conversion")
    const valorMoneda = await obtenerValorMoneda(moneda)
    console.log(valorMoneda)
    resultado = await cifra/valorMoneda
    console.log(resultado)
    resultadoTxt.innerHTML = `$ ${resultado}`    
}

const obtenerValorMoneda = async (moneda) => {
    url = "https://mindicador.cl/api/"+moneda.toString()
    console.log(url)
    try {
        const res = await fetch(url)
        const data = await res.json()
        const valorMoneda = data.serie[0].valor
        return valorMoneda
    } catch (error) {
        alert("No se puede obtener el valor de la moneda seleccionada en este momento.")
    }
}

// Obtener el valor de la moneda seleccionada de los últimos diez días
// Configurar grafico Chart.js
// Mostrar gráfico

// Eventos

btn.addEventListener("click", convertirMoneda)