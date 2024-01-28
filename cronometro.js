let crono = [0,0,0]
const hours = document.querySelector('#hours')
const hundredths = document.querySelector('#hundredths')

var timer = null
let segundo = 0
let minuto = 0;
let cents = 0;

const cronometro = async ()=>{
    
   await new Promise(() => {
        
        segundo = 0;
        minuto = 0;
        cents = 0;
        
        
        timer = setInterval(()=>{
            crono[2] = cents++
            if(cents == 100){
                crono[1] = ++segundo
                cents = 0
            }
            else if(segundo ==  60){
                crono[0] = ++minuto
                crono[1] = 0
                segundo = 0
            }
            
            let hour = crono[0] < 10 ? '0'+ crono[0]  : crono[0] 
            let min =  crono[1] < 10 ? '0'+ crono[1]  : crono[1] 
            
            hours.innerHTML = `${hour}:${min}`
            hundredths.innerHTML = crono[2] < 10 ? '.0' + crono[2] : '.'+ crono[2]
        },10)
    })

}

function clearTimer(){
    clearInterval(timer)
    timer = 0;
    segundo = 0;
     minuto = 0;
     cents = 0;
    hours.innerHTML = '00:00';
    hundredths.innerHTML ='.0' 
}