document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width=28//28*28=784 tane kare

    let score=0

    //layout of grid and what is in the squares
    //bu arrayde 784 sayı olacak
    const layout =  [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1


    ]
    //lejant:
    /*
    0: pac -dot
    1- duvar
    2- hayalet
    3- power-pellet
    4-empty boş




    */
    const squares= []
    //draw the grid and render it
    
    
    function createBoard(){
        
        for(let i=0;i<layout.length;i++){
            const square=document.createElement('div')
            grid.appendChild(square)
            squares.push(square)
            //buraya kadar kareleri  gride ekledik
    
    
            //şimdi layout styling yapalım
    
            if(layout[i]===0){
                squares[i].classList.add('pac-dot')
    
            }else if(layout[i]===1){
                squares[i].classList.add('wall')
    
            }else if(layout[i]===2){
                squares[i].classList.add('ghost-lair')//yasak bölge-merkez
    
            }else if(layout[i]===3){
                squares[i].classList.add('power-pellet')
    
            }
    
    
    
        }
    }
    createBoard()//fonksiyonu cagir ve tahta oolsusun


    //pac man in başlangıç noktası
    let pacmanCurrentIndex=490

    squares[pacmanCurrentIndex].classList.add('pac-man')



    //move pacman
    function movePacman(e){
        squares[pacmanCurrentIndex].classList.remove('pac-man')


        switch(e.keyCode){
            case 37://sol yön tuşu kodu-sola gitmesi için sol tarafı nda index olmalı ve bu index duvara ait olmamalı
                if(pacmanCurrentIndex%width!==0 && !squares[pacmanCurrentIndex-1].classList.contains('wall')&&
                !squares[pacmanCurrentIndex-1].classList.contains('ghost-lair')){
                    pacmanCurrentIndex-=1

                    //eğer sol çıkışta ise
                    if((pacmanCurrentIndex-1)===363){
                        pacmanCurrentIndex=391
                    }


                }break
                case 38://üst
                if(pacmanCurrentIndex-width>=0 && !squares[pacmanCurrentIndex-width].classList.contains('wall')&&
                !squares[pacmanCurrentIndex-width].classList.contains('ghost-lair')){
                    pacmanCurrentIndex-=width
                }
                break 
                case 39://sağ
                if(pacmanCurrentIndex%width<width-1 && !squares[pacmanCurrentIndex+1].classList.contains('wall')&&
                !squares[pacmanCurrentIndex+1].classList.contains('ghost-lair')){
                    pacmanCurrentIndex+=1

                    if((pacmanCurrentIndex+1)===392){
                        pacmanCurrentIndex=364
                    }
                }break
                case 40://alt
                if(pacmanCurrentIndex+width<width*width && !squares[pacmanCurrentIndex+width].classList.contains('wall')&&
                !squares[pacmanCurrentIndex+width].classList.contains('ghost-lair')){
                    pacmanCurrentIndex+=width
                }break
        }
        squares[pacmanCurrentIndex].classList.add('pac-man')


        //her harekette game over mi diye kontrole etmeliyiz

        pacDotEaten()
        powerPelletEaten()
        checkForGameOver()
        checkForWin()


    }

    document.addEventListener('keyup',movePacman)
    
    //pacman pac-dot yerse nolur?
    function pacDotEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
            score++
            scoreDisplay.innerHTML=score
            squares[pacmanCurrentIndex].classList.remove('pac-dot')

        }
    }
    //-
    //power pellet yerse-  hayaletler maviye döner -hayalet zarar veremez-hayaletleri yiyebiliriz
    function powerPelletEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
            score+=10
            ghosts.forEach(ghost=>ghost.isScared=true)
            setTimeout(unScareGhosts,10000)//10 sn sonra hayaletleri düzelt
            squares[pacmanCurrentIndex].classList.remove('power-pellet')//power pelleti yedikten sonra sil

        }
    }

    //hayaletleri-aquamarine renginden- yani scared moddan çıkar
    function unScareGhosts(){
        ghosts.forEach(ghost=>ghost.isScared=false)
    }


    //ghost ları yaratalım- constructor kulllancakmışız

    class Ghost{
        constructor(className,startIndex,speed){
            this.className =className
            this.startIndex=startIndex
            this.speed=speed

            this.currentIndex=startIndex
            this.timerId=NaN
            this.isScared=false
        }
    }
    //yukardaki constructor a göre hayaletelri oluşturalım

    ghosts=[
        new Ghost('blinky',348,250),
        new Ghost('pinky',376,400),
        new Ghost('inky',351,300),
        new Ghost('clyde',379,500),



    ]

    // hayaletleri grid üzerine çizelim
    ghosts.forEach(ghost=>{
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')//bu hayaltein hangisi olduğundan bağımsız olacak şekilde orada hayalatin olduğunu göstermek için


    })

    // tüm hayaletleri rastgele hareket ettirelim
    ghosts.forEach(ghost=>moveGhost(ghost))

    //hayaleti hareket ettirefcek fonksiyon
    function moveGhost(ghost){
        const directions=[-1,+1,width,-width]//hareket edebileceği yönler


        let direction=directions[Math.floor(Math.random()*directions.length)]

        ghost.timerId=setInterval(function(){
            //hayaletin gideceği bir sonraki karede duvar veya hayalet yoksa gidebilsin
            if(!squares[ghost.currentIndex+direction].classList.contains('wall')&& 
            !squares[ghost.currentIndex+direction].classList.contains('ghost')){
                //gidebilir
                //eğer gidebiliyorsa şu anki yerinden sil birdahaki yerine koy
                squares[ghost.currentIndex].classList.remove(ghost.className,'ghost','scared-ghost')
                //currentIndex i yeni yöne göre değiş
                ghost.currentIndex+=direction
                //hayaleti yeni yerinde çiz
                squares[ghost.currentIndex].classList.add(ghost.className,'ghost')



            //else yeni bir direction bul

            }else direction=directions[Math.floor(Math.random()*directions.length)]

            //if the ghost is currently scared 
            if(ghost.isScared){
                squares[ghost.currentIndex].classList.add('scared-ghost')
            }
            //eğer hayalet scared ise ve pacman yerse onu
            if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
                squares[ghost.currentIndex].classList.remove(ghost.className,'ghost','scared-ghost')
                ghost.currentIndex=ghost.startIndex//başlangıça dönsün
                score+=100
                squares[ghost.currentIndex].classList.add(ghost.className,'ghost')

            }//burası neden çalışmıyor- hayalet gitmiyor- ppuan gelmiyor-şu an onlar beni yerse puan geliyor
            checkForGameOver()
            //


        },ghost.speed)
    }

    //check game over
    function checkForGameOver(){
       if(squares[pacmanCurrentIndex].classList.contains('ghost')&&
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup',movePacman)
        setTimeout(function(){alert('Game Over!')},500)
    } 
    }

    function checkForWin(){
if(score>=274){
    ghosts.forEach(ghost=>clearInterval(ghost.timerId))
    document.removeEventListener('keyup',movePacman)
    scoreDisplay.innerHTML='You Won!'
}

    }
    






















})//DOMContentLoaded listenerin bitişi

