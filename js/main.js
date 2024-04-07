let  gameName = "Guess  The  Word" ; 
document.querySelector("h1").innerHTML = gameName ; 
document.querySelector("footer").innerHTML = `${gameName} ,  Game Created By Ahmed Hamed`;  


// manage game 
let numbersOfTries = 6 ;  
let numbersOfLetters = 5 ; 
let  current  =1  ;  
let  numberOfHint  =  2  ; 
let  C_element = 1 ; 


// guess word  
let wordToGuess ="" ;  
let words = ["Ahmed"  ,  "Ramzy" ,  "Gamal" , "hanan" ,  "fares" , "marwa" , "nadia" , "Eslam" , "zayan" , "ammer" , "manal" , "merna"]; 
wordToGuess = words[Math.floor(Math.random()* words.length)].toLowerCase() ; 

let  messageArea =  document.querySelector(".message") ; 

let  Hint  = document.querySelector(".hint") ;  
document.querySelector(".hint span").innerHTML = numberOfHint ;  






// create input feild .    
function generateInputs(){

let Inputscontianer = document.querySelector(".inputs") ;  

for(let i=1 ;  i<= numbersOfTries ; i++)
{
    const tryDiv = document.createElement("div") ; 
    tryDiv.classList.add(`try-${i}`) ; 
    tryDiv.innerHTML = `<span>try${i}</span>`

    if(i!=1) tryDiv.classList.add("disabled_inputs");  

    for(let j =1 ; j<= numbersOfLetters  ; j++ )
    {
        const input  =  document.createElement("input") ;  
        input.type = "text" ;  
        input.classList.add(`guess${i}_letter${j}`) ;
        input.setAttribute("maxlength" , "1") ; 
        tryDiv.appendChild(input) ;
    }

    Inputscontianer.appendChild(tryDiv) ; 
}

// focus on first input  
    Inputscontianer.children[0].children[1].focus() ; 
    
// disabled  all  inputs except frist  input  
const inputsIndisabled  = document.querySelectorAll(".disabled_inputs input") ;  
inputsIndisabled.forEach((input) => input.disabled = true ); 

const inputs =  document.querySelectorAll("input")  ;  
inputs.forEach((input , index) => {

input.addEventListener("input" , function(){
this.value = this.value.toUpperCase() ; 
let nextIndex = inputs[index+1] ;
if(nextIndex) nextIndex.focus() ;    
}) ; 

input.addEventListener("keydown" ,  function(event){
let currentIndex =  Array.from(inputs).indexOf(event.target) ;  

    if(event.key === "ArrowRight")
    {
        let nextIndex =  currentIndex+1  ;  
        if(nextIndex < inputs.length) inputs[nextIndex].focus() ;    
    }
    if(event.key ===  "ArrowLeft")
    {
        let prevIndex =  currentIndex-1 ;  
        if(prevIndex >= 0) inputs[prevIndex].focus() ; 
    }
});  
});
}

console.log(wordToGuess) ;
window.onload = function(){
generateInputs() ;    
} ;



// check  word  true  or  false 
const guessButton  = document.querySelector('.check') ;  
guessButton.addEventListener("click" ,checkWord) ;  
function checkWord(){
    C_element++  ;  
    let  success  =  true  ;   
    for(let i = 1 ; i<= numbersOfLetters ; i++)
    { 
        const inputfield =  document.querySelector(`.guess${current}_letter${i}`) ; 
        const letter =  inputfield.value.toLowerCase() ; 
        const realLetter =  wordToGuess[i-1];  
        if(realLetter === letter)
        {
            inputfield.classList.add("in_place") ;  
        }
        else if(wordToGuess.includes(letter) &&  letter!="")
        {
            inputfield.classList.add("not_in_place") ; 
            success = false ;  
        }
        else
        {
            inputfield.classList.add("no") ;
            success= false ;    
        }
    } 
    
    if(success)
    {
        messageArea.innerHTML = `You  Win  The  Word Is <span> ${wordToGuess}</span> ` ; 
        let  all  =  document.querySelectorAll(".inputs  >  div") ;  
        all.forEach((i) => i.classList.add("disabled_inputs")) ;
        guessButton.classList.add("done") ; 
        Hint.classList.add("done") ; 
    }
    else
    {
        document.querySelector(`.try-${current}`).classList.add("disabled_inputs") ;  
        const currentTry =  document.querySelectorAll(`.try-${current} input`) ;  
        currentTry.forEach((j)=>j.disabled = true) ; 

        current++  ; 

        let el  =   document.querySelector(`.try-${current}`) ; 

        if(el)
        {
            el.children[1].focus(); 
            el.classList.remove("disabled_inputs") ;  
            const nextTry =  document.querySelectorAll(`.try-${current} input`) ;  
            nextTry.forEach((j)=>j.disabled = false) ; 
        }
        else 
        {
            Hint.classList.add("done") ; 
            guessButton.classList.add("done") ;
            messageArea.innerHTML = `You  Lose The  Word Is <span> ${wordToGuess}</span>` ;  
        }
    } 
}



//  get hint  
Hint.addEventListener("click" , gethint) ;  

function  gethint()
{
    if(numberOfHint>0)
    {
        numberOfHint--  ; 
        document.querySelector(".hint span").innerHTML = numberOfHint ;  
        
        for(let  i  =1  ;  i<=numbersOfLetters ; i++)
        {
            const elements=  document.querySelector(`.guess${C_element}_letter${i}`) ; 
            if( elements.value.toLowerCase() != wordToGuess[i-1].toLowerCase())  
            {
                elements.value = wordToGuess[i-1].toUpperCase() ; 
                for(let  j  =1  ;  j<=numbersOfTries  ; j++)
                {
                    document.querySelector(`.guess${j}_letter${i}`).value =  wordToGuess[i-1].toUpperCase() ; 
                } 
                break ;  
            }
        }
    }
    if(numberOfHint === 0 ) 
    {
        Hint.classList.add("done") ; 
        return 0  ;  
    }      
}



document.addEventListener("keydown" ,  function(event){
    if(event.key == "Backspace")
    {
        const  inputs =  document.querySelectorAll("input:not([disabled])") ; 
        const  currentIndex = Array.from(inputs).indexOf(document.activeElement) ; 
        if(currentIndex > 0)
        {
            const currentInput =  inputs[currentIndex]; 
            const prevInput =  inputs[currentIndex-1];
            currentInput.value =""  ; 
            prevInput.value = "" ; 
            prevInput.focus() ;   
        }
    }
});  










