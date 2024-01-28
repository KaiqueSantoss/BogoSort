let INPUT_ERROR = false;
let ARRY_Fill = false;
let BOGO = false;
let Arry = [];
let timerBogo = null;
const input = document.querySelector('#number');
const button = document.querySelector('#addButton');
const btnBogo = document.querySelector('#orderBtn');
const resetBtn = document.querySelector('#resetBtn');

const info = document.querySelector('#info');
const numbers = document.querySelector('#numbers');
const result = document.querySelector('#result')
const errorBogo = document.querySelector('#bogo-error')
const error = document.querySelector('#error');
const Contcrono = document.querySelector('.contador')

button.addEventListener('click', isNumber);
resetBtn.addEventListener('click', reset);
btnBogo.addEventListener('click', BogoSorting);


function isNumber(e){
    
    let number = input.value
  
    const isNum = /^\d+(?:\.\d+)?$/

    if(number == '' && isNum.test(number) == '' && !BOGO){
        INPUT_ERROR = true
        isError()
        error.innerHTML = 'Esse campo não pode ser enviado  vazio!!!'
        return
    }
    else if(number.length > 6 && number !== '' && isNum.test(number) && !BOGO){
        INPUT_ERROR = true
        isError()
        error.innerHTML = 'O número não pode ter mais de 6 dígitos!!!'
        return
    }
    else if( isNum.test(number) && !BOGO && Arry.length == 28){
        INPUT_ERROR = true
        isError()
        error.innerHTML = 'Você não pode adicionar mais de 28 números!!!'
        return
    }
    else if(number.length < 6 && number !=='' && isNum.test(number) && !BOGO && Arry.length < 28){
        INPUT_ERROR = false
        isError()
        Arry.push(Number(number))
        addNumbers(number)
        input.value = ''
    }
    else if(number !== '' && isNum.test(number) === false){
        INPUT_ERROR = true;
        isError()
        error.innerHTML = 'Esse campo deve ser enviado com números,\<br>\ qualquer tipo de outro caracteres não são permitidos.'
    }
    else{
        INPUT_ERROR = true;
        isError()
        error.innerHTML = 'Para preencher o campo você deve esperar  o BogoSort ser finalizado.'
    }
    arryMinAmount()
    console.log()
}

function isError(){
  error.style.visibility = INPUT_ERROR ? 'visible' : 'hidden';
}


function arryMinAmount(){
    if(Arry.length >= 6 === false){
        info.innerHTML = `A quantidade minima de números são  6, faltam ${ 6 - Arry.length } números para o BogoSort.`
    }else{
        ARRY_Fill = true;
        errorBogo.style.visibility = 'hidden'
        info.innerHTML = 'Clique em Bongo para Organizar, se quiser você pode adicionar mais números.'
    }
}

function addNumbers(num){
    let numberSpan = document.createElement('span')
    numberSpan.innerHTML = num
    numberSpan.classList.add('ball')
    numbers.appendChild(numberSpan)
}




function BogoSorting(){
    

   if(ARRY_Fill && !BOGO){
    btnBogo.style.visibility = 'visible'
    clearNumbers()
    BOGO = true;
    info.innerHTML = '' 
    let copied = [...Arry]
    copied.sort((a,b)=>{
        if(a > b) return 1;
        if(a < b) return -1;
        return 0
    })
    
    errorBogo.style.visibility = 'hidden'
    clearNumbers()
    BogoProccess(copied)
    clearNumbers()
    showNumbers(Arry)
    
   }else if(ARRY_Fill && BOGO){
        errorBogo.style.visibility = 'visible'
        errorBogo.innerHTML = 'Para rodar outro BogoSort de reset.'
   }
   
   else{
        errorBogo.style.visibility = 'visible'
        errorBogo.innerHTML = 'Para rolar o BogoSort você deve ter pelo menos 6  números.'
   }
}

function clearNumbers(){
    document.querySelectorAll('.ball').forEach(num=>{
        numbers.removeChild(num)
    })
}



async function BogoProccess(copied){

    let clone = null 
    cronometro()
        while(JSON.stringify(clone) !== JSON.stringify(copied)){
            await new Promise(() => {
                timerBogo =  setInterval(()=>{
                    clone = shuffle([...Arry])
                    AttNumbers(clone)
                    if(JSON.stringify(clone) === JSON.stringify(copied)){
                        result.style.display = 'flex'
                        Contcrono.style.visibility = 'visible'
                        clearInterval(timer)
                        clearInterval(timerBogo)
                        return Arry = clone
                    }
                },1000)
            })
        }

        
}

function shuffle(array){
    let count = array.length,temp ,index;   
    while( count > 0){
        index = Math.floor(Math.random() * count)
        count--;
        temp = array[count];
        array[count] = array[index];
        array[index] = temp;
    }
    return array
}

function showNumbers(arry){
    arry.forEach(num=>{
        let numberSpan = document.createElement('span')
        numberSpan.innerHTML = num
        numberSpan.classList.add('ball')
        numbers.appendChild(numberSpan)
    })
}


 function AttNumbers(arr){
  setTimeout(()=>{
    clearNumbers()
    showNumbers(arr)
    },500)
}

function reset(){
    Arry = []
    ARRY_Fill = false;
    BOGO = false;
    INPUT_ERROR = false 
    Contcrono.style.visibility = 'hidden'
    btnBogo.style.visibility = 'visible'
    errorBogo.style.visibility = 'hidden'
    result.style.display = 'none'
    clearInterval(timerBogo) 
    
    clearTimer()
    arryMinAmount()
    clearNumbers()
    isError()
   
}

 
  



