/**declaración de variables**/
let bad_response=false;
let date_formatted=new Date().toLocaleDateString('en',{
weekday:'long',
year:'numeric',
month:'long',
day:'numeric'
})
let location_name='';
let block_error=document.getElementById('block-error');
let block_information= document.getElementById("block-information");
let search_input=document.getElementById("search-input");
let search_button=document.getElementById("search-button");
let retry=document.getElementById('retry');
/**section data weather today */
let name_location = document.getElementById("name-location");
let temperature= document.getElementById('today-temp');
let today= document.getElementById('today');
let weather_img =document.getElementById('weather-img');

  console.log('clima',weather_img,today);

document.addEventListener('DOMContentLoaded', () => {
  search_input.value = '';
  RenderPage()
});
/**llamada inicial de la api  */
const callApi =async () => {
  try{
    const response=await fetch('https://goweather.xyz/weather/Argentina')   
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
/**render inicial segun api, pantalla de error o principal */
const RenderPage = async() => {
  try{
   const information = await callApi();  
     const {data,status,statusText} =  information
     if(status== 200 && data){
       block_information.style.display='block';
       name_location.innerText='Argentina'
      SetData(information.data)
      }
      else block_error.style.display="block";
    }
   catch(error){
    console.log(error)
  }
  
}
 

const GetLocation = async (name) =>{
  location_name=name;
  const response = await fetch(`https://goweather.xyz/weather/${name}`);
  const{status,statusText}=response;
  SetData(await response.json())
  
} 
const HandleGetName= () =>{ console.log('aqui esta el input',GetLocation(search_input.value));
}
search_button.addEventListener('click',HandleGetName);
retry.addEventListener('click',callApi)


const SetIconWeather = (description) => {
let cloudy= ["../images/icon-drizzle.webp","../images/icon-fog.webp","../images/icon-overcast.webp","../images/icon-rain.webp","../images/icon-snow.webp","../images/icon-storm.webp","../images/icon-suny.webp"]

}
const SetData = (data) => {
  console.log('respuesta ubicacion',data);
  name_location.innerText=location_name ||'Argentina'
  temperature.innerText=data.temperature;
  today.innerText=date_formatted;
  console.log('clima',weather_img);
  
  // weather_img = SetIconWeather(data.description)

}