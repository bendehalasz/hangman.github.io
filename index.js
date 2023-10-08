const szoElement = document.getElementById('szo');
const betukElement = document.getElementById('betuk');
const eredmenyElement = document.getElementById('eredmeny');
const restartElement = document.getElementById('restart');
const drawingElements = document.querySelectorAll('line, circle');



addEventListener("load", () => {
    init()

    betukElement.addEventListener('click', gombraKattintas)

    restartElement.addEventListener('click', () => init())

});

const words = [
    'apple', 'banana', 'cherry', 'orange', 'grape', 'strawberry',
    'pineapple', 'blueberry', 'kiwi', 'peach', 'pear',
    'plum', 'lemon', 'lime', 'mango', 'raspberry', 'pomegranate',
    'car', 'bicycle', 'book', 'computer', 'chair', 'table', 'phone',
    'lamp', 'clock', 'television', 'keyboard', 'guitar', 'pencil', 'pen'
  ];

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let szo = ""
let tippek = []
const MAXTIPP = 9


function init()
{
    szo = getRandomWord()
    console.log("Nice job, you have found the easiest solution! The word is:", szo)
    tippek = []

    szoElement.innerHTML = genSzo();

    betukElement.innerHTML = genBetuk();

    eredmenyElement.innerHTML = genSzamlalo();

    elemRajzolas()

    szoElement.classList.remove('nyer')

}

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}
function tippel(betu) {
    tippek.push(betu)
}
function nyer() {
    return szo.split('').every(char => tippek.includes(char));
}
function veszit() {
    
    return rosszTippek() >= MAXTIPP
}
function rosszTippek() {

    return tippek.filter(x => !(szo.split('').includes(x))).length
}


function genSzo() 
{

    let s = ''
    if (veszit())
    {
        for(let i = 0; i < szo.length; i++)
        {
            if (tippek.includes(szo[i]))
            {
                s += `<span>${szo[i]}</span>`
            }
            else
            {
                s += `<span class="hianyzo">${szo[i]}</span>`
            }
        }

    }
    else
    {
        for(let i = 0; i < szo.length; i++)
        {
            if (tippek.includes(szo[i]))
            {
                s += `<span>${szo[i]}</span>`
            }
            else
            {
                s += `<span></span>`
            }
        }

    }
    return s

}
function genBetuk() {
let s = '';

for (let i = 0; i < alphabet.length; i++) {
    const betu = alphabet[i];
    s += tippek.includes(betu) ? `<button disabled>${betu}</button>` : `<button>${betu}</button>`;
}

return s;
}


function genSzamlalo() {

return `${rosszTippek()}/${MAXTIPP}`
}


function elemRajzolas()
{
    for (let i = 0;  i < drawingElements.length; i++) {

        if (i < rosszTippek())
        {
            drawingElements[i].classList.add('rajzol');
        }
        else
        {
            drawingElements[i].classList.remove('rajzol');

        }
        
      }
}

function nyerJatek()
{
    return szo.split('').every(betu => tippek.includes(betu))
}



function gombraKattintas(e) {
  if (e.target.matches('button')) {

    

    tippek.push(e.target.textContent)

    if(nyerJatek())
    {
        betukElement.innerHTML = ""
        szoElement.classList.add('nyer')
        
    }
    else
    {
        betukElement.innerHTML = genBetuk()

    }
    szoElement.innerHTML = genSzo(); 
    eredmenyElement.innerHTML = genSzamlalo();
    elemRajzolas()



  }
}
