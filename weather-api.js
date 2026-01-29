/**declaración de variables**/
let bad_response=false;
let date_formatted=new Date().toLocaleDateString('en',{
weekday:'long',
year:'numeric',
month:'long',
day:'numeric'
})
const ICONS= {
  drizzle:"./assets/images/icon-drizzle.webp",
  fog:"./assets/images/icon-fog.webp",
  overcast:"./assets/images/icon-overcast.webp",
  rain:"./assets/images/icon-rain.webp",
  snow:"./assets/images/icon-snow.webp",
  storm:"./assets/images/icon-storm.webp",
  cloudy:"./assets/images/icon-partly-cloudy.webp",
  sunny:"./assets/images/icon-sunny.webp",
  clear:"./assets/images/icon-clear.svg"
}

let location_name='';
let block_error=document.getElementById('block-error');
let block_information= document.getElementById("block-information");
let search_input=document.getElementById("search-input");
let search_button=document.getElementById("search-button");
let retry=document.getElementById('retry');
/**section data weather today */
let name_location = document.getElementById("name-location");
let temperature = document.getElementById('today-temp');
let today = document.getElementById('today');
let weather_img = document.getElementById('weather-img');
let wind_number = document.getElementById('wind-number');
document.addEventListener('DOMContentLoaded', () => {
  search_input.value = '';
  RenderPage()
});
/**llamada inicial de la api  */
const callApi =async () => {
  try{
    const response=await fetch('https://goweather.xyz/weather/Argentina')   
    if (response){
      const data = await response.json();
      return {
        data,
        status:response.status,
        statusText:response.statusText
      }
    }
  }
  catch(error){
    console.log(error)
  }
}
/**render inicial segun api, pantalla de error o principal */
const RenderPage = async() => {
  try{
    const { data, status } = await callApi();
console.log(data,'dat');
      if(status == 200 && data){
        block_information.style.display='block';
        name_location.innerText='Argentina'       
       SetData(data)
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
const HandleGetName= () =>{ console.log('aqui esta el input',GetLocation(search_input.value));}
search_button.addEventListener('click',HandleGetName);
retry.addEventListener('click',RenderPage)


const SetIconWeather = (description) => {
  if(description.toLowerCase().includes('thunder'))return ICONS.storm;
  if(description.toLowerCase().includes('cloudy'))return ICONS.overcast;
  if(description.toLowerCase().includes('light rain'))return ICONS.drizzle;
  if(description.toLowerCase().includes('sunny'))return ICONS.sunny;
  if(description.toLowerCase().includes('snow'))return ICONS.snow;
  if(description.toLowerCase().includes('rain'))return ICONS.rain;
  if(description.toLowerCase().includes('clear'))return ICONS.clear;


}
const SetData = (data) => {
    console.log(data); 
  name_location.innerText=location_name ||'Argentina'
  temperature.innerText=data.temperature;
  today.innerText=date_formatted;
  weather_img.src = SetIconWeather(data.description)
  wind_number.innerText=data.wind
}