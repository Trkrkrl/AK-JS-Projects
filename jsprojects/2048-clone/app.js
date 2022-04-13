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

            }

        }
    }

    //tuşu dinlesin
    document.addEventListener('keyup',control)

    //Klavye tuşlarını atayalım-sağa veya sola kaydırmak için-hangi tuşu dinleyecek bilsin
    function control(e){
        if(e.keyCode===39){//bu sağ tuşu - buna basınca içerisindeki fonksiyonu ateşler

            keyRight()

        }else if(e.keyCode==37){
            keyLeft()
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
       // moveLeft()--buna gerek yok çünkü move left mümkün olduğunca sola kaydırırn geri kalan kısımda satırda sıfır koyar
        generate()
    }

    //yukarı ve aşağı kaldı




})