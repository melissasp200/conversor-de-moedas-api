const apiKey = '6e15ede0aa45b78d0d50d643';
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;
 
// FUNÇÃO PARA BUSCAR A CHAVE DE CÂMBIO DA API
 
async function getExchangeRate(daMoeda, paraMoeda){
 
    try{

       const response = await fetch(`${apiURL}${daMoeda}`); // TRAZENDO O LINK DE API
       const data = await response.json();

       if(data.result === 'sucess'){
            return data.conversion_rates[paraMoeda]; //RETORNO O VALOR DA MOEDA

       }else{

        throw new Error('Erro ao buscar a taxa de câmbio');

       }

    }catch(error){
        console.error("Erro: ", error);
        return null;


    }
   
}
 
document.getElementById('currency-form').addEventListener('submit', async function(event){

    const valor = parseFloat(document.getElementById('amount').value);
    const daMoeda = document.getElementById('daMoeda').value;
    const paraMoeda = document.getElementById('paraMoeda').value;

    const getExchangeRate = await getExchangeRate(daMoeda, paraMoeda);

    if(exchangeRate){

       const convertedValue = valor * getExchangeRate;

       // EXIBIR RESULTADO
       const conversao = document.getElementById('conversao');
       conversao.textContent = `Resultado: ${convertedValue.toFixed(2)} ${paraMoeda}`;
   
    }else{

      alert('Erro ao buscar a cotação. Tente novamente.')

    }
    

});


