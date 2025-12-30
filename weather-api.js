/**declaración de variables**/
let bad_response=false;
let block_error=document.getElementById('block-error');
let block_information= document.getElementById("block-information");
let search_input=document.getElementById("search-input");
let search_button=document.getElementById("search-button");
let name_location = document.getElementById("name-location")

document.addEventListener('DOMContentLoaded', () => {
  search_input.value = '';
});

const callApi =async () => {
  try{
    const response=await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m')  
    if (response){
      const{status,statusText}=response
      const data = await response.json()
      return {data,status,statusText}
    }
  }
  catch(error){
    console.log(error)
  }
}

const RenderPage = async() => {
  try{
   const information = await callApi();
   console.log(information);
   
     const {data,status,statusText} =  information
     if(status== 200 && data){
       block_information.style.display='block';
      }
      else block_error.style.display="block";
      console.log(data);
    }
   catch(error){
    console.log(error)
  }
  
}
 RenderPage()
// /*api para determinar latitud y longit segun texto*/
// const GetLocation = async (name) =>{
//   const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}`);
//   const{status,statusText}=response;
//   const data =await response.json()
//   console.log('respuesta ubicacion',data);
  
// } 

// GetLocation()
// const HandleGetName= () =>{ console.log('aqui esta el input',GetLocation(search_input.value));
// }
// search_button.addEventListener('click',HandleGetName)