// Variables
const btn = document.querySelector("#btn-convertir")
let myChart = null;

// Funciones
async function convertirMoneda() {
    let tituloMoneda = ""
    const cifra = Number(document.querySelector("#input-cifra").value.trim())
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
    resultadoTxt.innerHTML = `Resultado: $ ${resultadoDosDecimales} ${moneda}`
    dataOrdenada = await ordenarFecha(valoresMoneda)
    renderGrafica(dataOrdenada, tituloMoneda)
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
    for (const objeto of data) {
        objeto.fecha = objeto.fecha.slice(0, 10)
    }
    return data
}

function configurarGrafica(dataMoneda, tituloMoneda){
    const config = {
        type: "line",
        data: {
            labels: dataMoneda.map(objeto => objeto.fecha),
            datasets: [{
                label: tituloMoneda,
                borderColor: "red",
                backgroundColor: "white",
                data: dataMoneda.map(objeto => objeto.valor),
            }]
        }
    }
    return config
}

function renderGrafica (data, tituloMoneda){
    const chartDOM = document.querySelector("#myChart").getContext("2d")
    const config = configurarGrafica(data, tituloMoneda)
    if (myChart) {
        myChart.destroy()
    }
    myChart = new Chart(chartDOM, config)
}

btn.addEventListener("click", () =>{
    const input = document.querySelector("#input-cifra").value.trim()
    const select = document.querySelector("#select-moneda").value
    let resultadoTxt = document.querySelector("#resultado-conversion")
    if (input !== "" && select !== ""){
        convertirMoneda()
    } else if (input == ""){
        resultadoTxt.innerHTML = "Ingrese una cifra a calcular"
    } else{
        resultadoTxt.innerHTML = "Seleccione la moneda a convertir"
    }
})