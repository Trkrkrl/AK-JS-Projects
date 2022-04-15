document.addEventListener('DOMContentLoaded',()=>{
    const gridDisplayed = document.querySelector('.grid')
    const scoreDisplay =document.getElementById('score')
    const resultDisplay = document.getElementById('result')
   
    const width=4
    let squares=[]

    let score=0

    //create  a playing board

    function createBoard(){

        for(let i=0; i<width*width;i++){
            square= document.createElement('div')//kareleri oluştur
            square.innerHTML=0//içeriği sıfır olsun her birinini
            gridDisplayed.appendChild(square)

            squares.push(square)//kare arrayinin içerisine at

        }
        generate()
        generate()

    }

    createBoard()

    //generate a number randomly
     function generate(){

         let randomNumber=Math.floor(Math.random()*squares.length)//bununla squares arrayi içerisindeki rastgele bir insdise ulaşırız
            console.log(randomNumber)
         if(squares[randomNumber].innerHTML==0){

            squares[randomNumber].innerHTML=2

            checkForGameOver()

         }else generate()

     }

     //swipe right-sağa kaydır
     function moveRight(){
         for(let i=0;i<16;i++){
             if(i%4===0){//0,4,8,12-bunlar satırbaşı indexleri
                let totalOne=squares[i].innerHTML
                let totalTwo=squares[i+1].innerHTML
                let totalThree=squares[i+2].innerHTML
                let totalFour=squares[i+3].innerHTML

                let row=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
                //yukardaki satırda parInt kullanmasakk totalOne içerisindekiii sayısı string olarak verecekti

                console.log(row)//consolda 4 satırın verilerini yazıyor

                let filteredRow=row.filter(num=>num)//satırda sayı varsa-0dan farklı yani- o sayıyı filterelyip bize sunar
                //sayi içermeyenleri de seçmemiz lazim
                let missing=4- filteredRow.length//sıfır sayısı
                let zeros=Array(missing).fill(0)//missing deki sayı kadar elemandan oluşan bir array oluştur
                                                //bu arraydeki elemanları fill ile 0 yap
                let newRow=zeros.concat(filteredRow)//sıfır arrayi ile filtered il birleştiriyor
                //bu sayede yeni bir array oluşurr
                //oluşan bu array sağa kaydırma yapınca sayıların yeni halidir

                squares[i].innerHTML=newRow[0]
                squares[i+1].innerHTML=newRow[1]
                squares[i+2].innerHTML=newRow[2]
                squares[i+3].innerHTML=newRow[3]
                

                


             }
         }
     }
     

     //- MoveLeft fonksiyonu- sağı kopyala ve üzerinde düzeltmeler yap 
     function moveLeft(){
        for(let i=0;i<16;i++){
            if(i%4===0){//0,4,8,12-bunlar satırbaşı indexleri
               let totalOne=squares[i].innerHTML
               let totalTwo=squares[i+1].innerHTML
               let totalThree=squares[i+2].innerHTML
               let totalFour=squares[i+3].innerHTML

               let row=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
               

               console.log(row)

               let filteredRow=row.filter(num=>num)

               let missing=4- filteredRow.length
               let zeros=Array(missing).fill(0)

               let newRow=filteredRow.concat(zeros)//burası sağa kaaydırmanın tersi
              
               squares[i].innerHTML=newRow[0]
               squares[i+1].innerHTML=newRow[1]
               squares[i+2].innerHTML=newRow[2]
               squares[i+3].innerHTML=newRow[3]
               

               


            }
        }
    }
    
    //combine row- yanyana 2 sayı var iseyapılan işlem
    function combineRow(){

        for(let i=0;i<15;i++){

            if(squares[i].innerHTML===squares[i+1].innerHTML){//yanyana olan sayılar aynı ise işlem yapabiliyorduk

                let combinedTotal=parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML=combinedTotal//;?? burada sağa veya sola kaydırma durumu farklı olmayacakmı   :çözüm- i ve i+1 i birleştirip i de gösteriyor
                //bunu doğru yapmak için de key right içerisinde bir daha sağa alıyor
                squares[i+1].innerHTML=0

                score+=combinedTotal
                scoreDisplay.innerHTML=score

            }

        }
        checkForWin()
    }

    //tuşu dinlesin
    document.addEventListener('keyup',control)

    //Klavye tuşlarını atayalım-sağa veya sola kaydırmak için-hangi tuşu dinleyecek bilsin
    function control(e){
        if(e.keyCode===39){//bu sağ tuşu - buna basınca içerisindeki fonksiyonu ateşler

            keyRight()

        }else if(e.keyCode===37){
            keyLeft()
        }else if(e.keyCode===38){
            keyUp()
        }else if(e.keyCode===40){
            keyDown()
        }
    }


    //sağ tuş fonksiyonu
    function keyRight(){//sağ tuş bu fonksiyonları ateşler-yukarıda kullanıldı
        moveRight()//neden 2  defa move right yapıyoz-çünkü combine rowdan dolayı
        combineRow()
        moveRight()
        generate()
    }

    //keyleft
    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()//--bu gereksiz değil-çümkü 2 sayı birleşebiliir ama yanında bir tane sayıvarsa diğerleri birleşince onun da kayması gerek
        generate()
    }

    //yukarı ve aşağı kaldı

    //aşağı
    function moveDown(){
        for (let i = 0; i < 4; i++) {

            let totalOne=squares[i].innerHTML
            let totalTwo=squares[i+(width)].innerHTML
            let totalThree=squares[i+(width*2)].innerHTML
            let totalFour=squares[i+(width*3)].innerHTML

            let column=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            let filteredColumn=column.filter(num=>num)
            let missing =4- filteredColumn.length
            let zeros=Array(missing).fill(0)
            let newColumn=zeros.concat(filteredColumn)

            squares[i].innerHTML=newColumn[0]
            squares[i+width].innerHTML=newColumn[1]
            squares[i+(width*2)].innerHTML=newColumn[2]
            squares[i+(width*3)].innerHTML=newColumn[3]



            
        }
    }

    //yukarı
    function moveUp(){
        for (let i = 0; i < 4; i++) {

            let totalOne=squares[i].innerHTML
            let totalTwo=squares[i+(width)].innerHTML
            let totalThree=squares[i+(width*2)].innerHTML
            let totalFour=squares[i+(width*3)].innerHTML

            let column=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            let filteredColumn=column.filter(num=>num)
            let missing =4- filteredColumn.length
            let zeros=Array(missing).fill(0)
            let newColumn=filteredColumn.concat(zeros)

            squares[i].innerHTML=newColumn[0]
            squares[i+width].innerHTML=newColumn[1]
            squares[i+(width*2)].innerHTML=newColumn[2]
            squares[i+(width*3)].innerHTML=newColumn[3]



            
        }
    }
    //combined column- combined row un muadili olacak
    function combineColumn(){

        for(let i=0;i<12;i++){

            if(squares[i].innerHTML===squares[i+width].innerHTML){

                let combinedTotal=parseInt(squares[i].innerHTML)+parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML=combinedTotal
                squares[i+width].innerHTML=0

                
                score+=combinedTotal
                scoreDisplay.innerHTML=score

            }

        }
        checkForWin()
        
    }
    //keyup ve keydown fonksiyonları--bunu yazdıktan sonra control methoduna git

     function keyUp(){
         moveUp()
         combineColumn()
         moveUp()
         generate()

     }
     function keyDown(){
         moveDown()
         combineColumn()
         moveDown()
         generate()
     }

// check for the number 2048-combine icerisinde check yaparız
function checkForWin(){
    for(let i=0;i<squares.length;i++){
        if(squares[i].innerHTML==2048){
            resultDisplay.innerHTML='You Won'
            document.removeEventListener('keyup',control)
        }
    }
}
//game over check-bunu generate içerisinde check edeceğiz
function checkForGameOver() {
    let zeros = 0
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = 'You LOSE'
      document.removeEventListener('keyup', control)
      setTimeout(() => clear(), 3000)
    }
  }
  //zamanlayıcı ile bir süre  sonra sıfırlamış oluruz
  
  //clear timer
  function clear() {
    clearInterval(myTimer)
  }

  //kutucuktaki sayıya göre renklendirme
  function addColours() {
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
      else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da'
      else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#ede0c8' 
      else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#f2b179' 
      else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#ffcea4' 
      else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#e8c064' 
      else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#ffab6e' 
      else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#fd9982' 
      else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#ead79c' 
      else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76daff' 
      else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#beeaa5' 
      else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#d7d4f0' 
    }
}
addColours()

var myTimer = setInterval(addColours, 50)



})