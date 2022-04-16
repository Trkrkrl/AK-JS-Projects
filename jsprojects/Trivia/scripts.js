const game=document.getElementById('game')
const scoreDisplay=document.getElementById('score')
let score=0
const genres=[
    {
        name: 'Books',
        id: 10
    },
    {
        name: 'Film',
        id: 11
    },
    {
        name: 'Music',
        id: 12
    },
    {
        name: 'Video Games',
        id: 15
    }
]
const levels=['easy','medium','hard']

function addGenre(genre){
    const column=document.createElement('div')
    column.classList.add('genre-column')
    column.innerHTML=genre.name
    game.append(column)//game id li divin içerisine attık

    levels.forEach(level=>{
        const card=document.createElement('div')
        card.classList.add('card')//bir card class div oluşturduk buna da css verdik
        column.append(card)

        if(level==='easy'){
            card.innerHTML=100
        }else if(level==='medium'){
            card.innerHTML=200


        }else if(level==='hard'){
            card.innerHTML=300

        }
            
        


        fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
        .then(response=>response.json())
        .then(data=>{ 
            console.log(data)
            card.setAttribute('data-question',data.results[0].question )
            //cardımızda dataquestion adında bir eleman oluşturduk ve içeriği apiden gelen resulttaki 0. eleman ın  question  adlı alt elemanı
            card.setAttribute('data-answer',data.results[0].correct_answer)
            card.setAttribute('data-value',card.getInnerHTML())

        }).then(done=>card.addEventListener('click',flipCard))//tıklayınca flipcard fonksiyonunu çalıştır
        //ve data yükleyene kadar bekler
        

    })


}
genres.forEach(genre => addGenre(genre))





function flipCard(){
    console.log("clicked")
    const textDisplay=document.createElement('div')

    const trueButton=document.createElement('button')
    const falseButton=document.createElement('button')
    trueButton.innerHTML='True'
    falseButton.innerHTML='False'
    trueButton.addEventListener('click',getResult)
    falseButton.addEventListener('click',getResult)




    textDisplay.innerHTML=this.getAttribute('data-question')//dataquestion olarak tanımladığımız attribure u seç
    this.append(textDisplay,trueButton,falseButton)//cardların herhangibirine basarsak bu üç elemanı gösterecek


   const allCards= Array.from(document.querySelectorAll('.card'))//card classındaki tüm elemanları seç
   allCards.forEach(card=>card.removeEventListener('click', flipCard))//bir carda tıklandığında başka kartların tıklanabilmseini kapat

    
}

function getResult(){

    const allCards =Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card=>card.addEventListener('click', flipCard))//en başta tüm kartlar tıklanabilri



    const cardOfButton=this.parentElement//basılan butonun  parenti elementi yani onu çevreleyen card
    //eğer bu kardın data anseeweri- tıkladığımız butonunn inner i ne eşitse
    if(cardOfButton.getAttribute('data-answer')===this.innerHTML){
        console.log("it is a match")
        score=score+parseInt(cardOfButton.getAttribute('data-value'))//cardımızın ğuanını int halinde score a ekliyoruz
        scoreDisplay.innerHTML=score
        cardOfButton.classList.add('correct-answer')
        setTimeout(()=>{
            //bu while döngüsü o carddaki tüm childları siler
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)

            }
            cardOfButton.innerHTML=cardOfButton.getAttribute('data-value')



        },100)


    }else{
        cardOfButton.classList.add('wrong-answer')
        setTimeout(()=>{
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)

            }
        },100)
        cardOfButton.innerHTML=0
    }

    cardOfButton.removeEventListener('click',flipCard)//bir butona tıklayıp cevapladıktan sonra başka bir butona tıklayabilmen için mevcut event listeneri siler
 

}