const board = document.getElementById('board');
const options = document.querySelector('.options');
let numbers = 0;
const colors=['#1d1d1d','#32a852','#2fdbeb','#e5eb2f','#f24718','#187af2','#bf18f2','#f21868','#42eff5','#ff9d0a','#2df20f','#f20ab0','#fc030f']
let colorChosen = '#1d1d1d';
const funBtn = document.getElementById('fun');

const mediaQuery = window.matchMedia('(max-width: 1200px)');

function handleTabletChange (obj) {
    if (obj.matches) {
        console.log('Media Query Matched!')
        numbers = 160;
    } else {
        numbers = 289;
    }
}
mediaQuery.addEventListener('change',handleTabletChange)

handleTabletChange(mediaQuery);

for (let i = 0; i < colors.length; i++) {
    const colorOption = document.createElement('div');
    colorOption.classList.add('colorOption');
    colorOption.style.background = colors[i];
    options.append(colorOption);
}

getDrawing();

let funIsClicked = false;

funBtn.addEventListener('click', () => {
    funIsClicked === false ? funIsClicked = true : funIsClicked = false;
    if (funIsClicked === true) {
        funBtn.classList.add('isClicked');
        getFun();
    } else if (funIsClicked === false) {
        funBtn.classList.remove('isClicked');
        getDrawing();
    }
});


function getDrawing() {
    board.innerHTML = '';
for (let i = 0; i < numbers; i++){
    const round = document.createElement('div');
    round.classList.add('round');
    board.append(round);
}

board.addEventListener('click', chooseColor);
  
function chooseColor(event) {
    if (event.target.className === 'round') {
        const el = event.target;
        const color = colorChosen;
        setCustomColor(el, color);
    }
}

options.addEventListener('click', getColor);

document.getElementById('clean').addEventListener('click', cleanTheBoard);

function getColor(event) {
    if (event.target.className === 'colorOption') {
        colorChosen = event.target.style.background;
    }
}

function cleanTheBoard() {
    document.querySelectorAll('.round').forEach(el => {
        setPrimaryColor(el);
    })
}}

function getFun() {
        board.innerHTML = '';
        for (let i = 0; i < numbers; i++) {
            const circle = document.createElement('div');
            circle.classList.add('round');

            circle.addEventListener('mouseover', () => {
                setColor(circle);
            })
    
            circle.addEventListener('mouseleave', () => {
                removeColor(circle);
            })
            board.append(circle);

            function setColor(el) {
                const color = takeColor();
                return setCustomColor(el, color);
            }

            function removeColor(el) {
                return setPrimaryColor(el);
            }
        }

        function takeColor() {
            const index = Math.floor(Math.random() * colors.length);
            return colors[index];
        }
}

function setPrimaryColor(el) {
    el.style.background = '#1d1d1d'
    el.style.boxShadow = '0 0 2px #000'
}

function setCustomColor(el, color) {
    el.style.background = color;
    el.style.boxShadow = `0 0 3px ${color}, 0 0 3px ${color}`
}
