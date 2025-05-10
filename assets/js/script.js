// Variables
const btn = document.querySelector("#btn-convertir")

// Funciones
async function convertirMoneda() {
    let tituloMoneda = ""
    const cifra = Number(document.querySelector("#input-cifra").value)
    let moneda = document.querySelector("#select-moneda").value.toString()
    let resultadoTxt = document.querySelector("#resultado-conversion")
    const valoresMoneda = await obtenerValoresMoneda(moneda)
    const valorMoneda = valoresMoneda[0].valor
    resultado = await cifra / valorMoneda
    resultadoDosDecimales = resultado.toFixed(2)
    if (moneda == "dolar") {
        moneda = "dólares"
        tituloMoneda = "Dólar"
    } else {
        moneda = "euros"
        tituloMoneda = "Euro"
    }
    resultadoTxt.innerHTML = `$ ${resultadoDosDecimales} ${moneda}`
}

const obtenerValoresMoneda = async (moneda) => {
    let resultadoTxt = document.querySelector("#resultado-conversion")
    const url = "https://mindicador.cl/api/" + moneda.toString()
    console.log(url)
    try {
        const res = await fetch(url)
        const data = await res.json()
        const valoresMoneda = data.serie.slice(0, 10)
        return valoresMoneda
    } catch (error) {
        resultadoTxt.innerHTML = "No se puede obtener el valor de la moneda seleccionada en este momento."
    }
}

const ordenarFecha = async (data) => {
    data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    for (objeto of data) {
        objeto.fecha = objeto.fecha.slice(0, 10)
    }
    return data
}

function configurarGrafica(data, moneda, tituloMoneda){
    const config = {
        type: "line",
        data: {
            labels: moneda,
            datasets: [{
                label: tituloMoneda,
                backgroundColor: "white",
                data: data,
            }]
        }
    }
    return config
}


// Configurar el objeto de datos para Chart.js
// Prepara un objeto con los arrays de etiquetas y valores, y los estilos que quieras aplicar (colores, tipo de línea, etc.).

// Configurar el objeto de opciones del gráfico
// Define el tipo de gráfico, el título, los ejes, la leyenda, etc.

// Renderizar el gráfico en un <canvas> de HTML
// Asegúrate de tener un <canvas id="myChart"> en tu HTML donde se dibujará el gráfico.

// Instanciar el gráfico con new Chart()
// Usa la clase Chart de Chart.js pasando el contexto del canvas, los datos y las opciones.

btn.addEventListener("click", convertirMoneda)