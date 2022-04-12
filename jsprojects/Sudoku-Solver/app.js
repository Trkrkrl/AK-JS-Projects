
const puzzleBoard=document.querySelector('#puzzle')
const solveButton=document.querySelector('#solve-button')

//9*9 luk bir kare den oluşuyor, 81 tane 
const squares=81
const submissions=[]//apiye submit edilecek sayı arrayi

for(let i=0; i<squares;i++){
//her döngüde bir adet input element oluşturacağız:küçük kareler
    const inputElement=document.createElement('input')
    inputElement.setAttribute('type','number')//bu input elementin tim özelliği: sayı
    inputElement.setAttribute('min','1')//min 1
    inputElement.setAttribute('max','9')//max 9

    puzzleBoard.appendChild(inputElement)//bu elemente puzzle tahtamıza append edelim
    

}

const joinValues=()=>{
    const inputs=document.querySelectorAll('input')
    inputs.forEach(input=>{
        if(input.value){//eğer input içerisinde sayı var ise bunu bir arraya ata

            submissions.push(input.value)
        }else{
            submissions.push('.')//nokta boş kareyi temsil eder
        }
    })
    console.log(submissions)
}


const solve=()=>{
    

const options = {
  method: 'POST',
  url: 'https://solve-sudoku.p.rapidapi.com/',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com',
    'X-RapidAPI-Key': 'rapidapikey'
  },
  data: '{"puzzle":"2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3"}'
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

}

solveButton.addEventListener('click',solve)//  eğer solve a basarsam fonksiyonu çalıştır
