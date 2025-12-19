/**llamado de la api**/
let information= {};
let bad_response=false;
let block_error=document.getElementById('block-error');
let block_information= document.getElementById("block-information")
console.log(block_error);
console.log(block_information);


const callApi =async () => {
        const response=await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m')
        console.log(response);
        
        const{status,statusText}=response
        const data = await response.json()
        return {data,status,statusText}
}

const RenderPage = async() => {
   information = await callApi();
    const {data,status,statusText} =  information
    if(status== 200){
    block_information.style.display='block'

    }
    else block_error.style.display="block"
   
}
RenderPage()