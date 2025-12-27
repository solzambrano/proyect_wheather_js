/**declaración de variables**/
let information= {};
let bad_response=false;
let block_error=document.getElementById('block-error');
let block_information= document.getElementById("block-information");
let search_input=document.getElementById("search-input")
console.log('el serch',search_input);

document.addEventListener('DOMContentLoaded', () => {
  search_input.value = '';
});

const callApi =async () => {
  const response=await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m')  
  const{status,statusText}=response
  const data = await response.json()
  return {data,status,statusText}
}

const RenderPage = async() => {
  information = await callApi();
  const {data,status,statusText} =  information
  if(status== 200){
    block_information.style.display='block';
  }
  else block_error.style.display="block";
  console.log(data);
  
}
RenderPage()
/*api para determinar latitud y longit segun texto*/
const GetLocation = async (name) =>{
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}`);
  const{status,statusText}=response;
  const data =await response.json()
  console.log('respuesta ubicacion',data);
  
} 

GetLocation()
const GetName= (e) =>{ console.log('aqui esta el input',GetLocation(e.target.value));
}
search_input.addEventListener('change',GetName)