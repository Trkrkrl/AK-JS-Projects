const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

let wordle
 

const getWordle=()=>{
    fetch('http://localhost:8000/word')
    .then(response=>response.json())
    .then(json=>{
        console.log(json)
        wordle=json.toUpperCase()
    }).catch(err=>console.log(err))
}
getWordle()

const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I',
    'O', 'P', 'Ğ', 'Ü', 'A', 'S', 'D', 'F',
    'G', 'H', 'J', 'K', 'L', 'Ş', 'İ', 'ENTER',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Ö', 'Ç', '<<'

]
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],

]
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')

        rowElement.append(tileElement)
    })

    tileDisplay.append(rowElement)
})


keys.forEach(key => {//klavyeyi oluştur ur
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)//her elemana  id atar
    buttonElement.addEventListener('click', () => handleClick(key))//event listener - basınca ne olsun
    keyboard.append(buttonElement)
})


const handleClick = (letter) => {

    if(!isGameOver){
        console.log('clicked button : ', letter)
        if (letter === '<<') {
            deleteLetter()
            console.log('guessRows', guessRows)
            return
        }
        if (letter === 'ENTER') {
            checkRow()
            console.log('guessRows', guessRows)
    
            return
        }
        addLetter(letter)
        console.log('guessRows', guessRows)//bunu yuakrda 2 satırda dah kullandık ne durumda olduğumuzu görmek için

    }
   
}

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {

        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter

        guessRows[currentRow][currentTile] = letter

        tile.setAttribute('data', letter)

        currentTile++

        console.log('guesRows', guessRows)

    }


}

const deleteLetter = () => {//current tile ı azalt, son elemanı '' boş stringe eşitle
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
    }


}
const checkRow = () => {//current tile full ise çalışsın
    
    const guess = guessRows[currentRow].join('')
    console.log('guess: ', guess)
   
    if (currentTile > 4) {

        // Burayı şu an kullanamıyoruz çüncü check işlemi dicitoarny api ye bağlı ve dict api kart bilgisi istiyor: eğer girmek isterseniz
        //https://rapidapi.com/twinword/api/word-dictionary/ 
        
        fetch('http://localhost:8000/check/?word=${guess}')
        .then((response) =>response.json())
        .then(json => {
            console.log(json)
            if(json=='Entry word not found') {//jsonda böyle bir mesaj görünce alttakini göster
                showMessage('Sözlükte böyle bir kelime yok')
                return
            }else{

                console.log('guess is ' + guess + ' wordle is ' + wordle)
                flipTile()

                if (wordle === guess) {
                    showMessage('Mükemmel')
                    isGameOver = true
                    return
        
                } else {
                    if (currentRow >= 5) {//son satıra gelirsek ve tıkalrsakentera gameover der
        
                        isGameOver = true
                        showMessage('Game Over')
                        return
                    }
                    if (currentRow < 5) {
                        currentRow++
                        currentTile = 0
                    }
                }
                 
            }

        }).catch(err=>console.log(err))


        

        
    }


}

const showMessage = (message) => {
    const messageElement = document.createElement('p')//p tag ile bir mesaj elementi oluştur
    messageElement.textContent = message//bunun içeriği message olsun
    messageDisplay.append(messageElement)//bu message elementi de --> en üstteki message displaye ver
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)//2sn sonra mesajı sil-appendi geri al yani
}

//renk
const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}//bunu aşğıdaki her bir satıra koyalım ki onun rengini alsın

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes//o satırı komple alacak
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' })
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })
    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')

        }
    })





    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}



