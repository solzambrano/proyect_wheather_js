/**llamado de la api**/
console.log('me estoy ejecutando bien ');
let INFORMATION= {};
const callApi =async () => {
        const response=await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m')
        const data = await response.json()
        return data
}

const RenderPage = async() => {
   INFORMATION = await callApi();
  await  console.log('aqui traje la informacion', INFORMATION)
}
RenderPage()