document.addEventListener('DOMContentLoaded',()=>{
    const gridDisplayed = document.querySelector('.grid')
    const scoreDisplay =document.getElementById('score')
    const resultDisplay = document.getElementById('result')
   
    const width=4
    let squares=[]

    //create  a playing board

    function createBoard(){

        for(let i=0; i<width*width;i++){
            square= document.createElement('div')//kareleri oluştur
            square.innerHTML=0//içeriği sıfır olsun her birinini
            gridDisplayed.appendChild(square)

            squares.push(square)//kare arrayinin içerisine at

        }
    }

    createBoard()


})