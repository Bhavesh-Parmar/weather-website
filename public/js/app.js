console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFoure = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevent browser's default behaviour
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''; messageFoure.textContent = '';messageFive.textContent = ''


    fetch('/weather?address="'+ location+'"').then( (res)=>{
        res.json().then( (data) => {
            if (data.error)
                messageOne.textContent = data.error  // console.log(data.error)
            else{
                messageOne.textContent = "Input location: "+location
                messageTwo.textContent = "Address: " + data.Address;
                messageThree.textContent = "Weather: " + data.Weather;
                messageFoure.textContent = "Temperature: " + data.temperature;
                messageFive.textContent = "Feelslike: " + data.feelslike;
                // data.Weather + ' '+ data.Address + ' Temperature = '+ data.temperature + ' feelslike = '+data.feelslike
                // console.log(location)
                // console.log(data.Address)
                // console.log(data.Weather)
                // console.log(data.temperature)
                // console.log(data.feelslike)
            }
        })  
    })

    // console.log('tseting')
})

// fetch('http://puzzle.mead.io/puzzle').then( (res)=>{
//     res.json().then( (data) => {
//         console.log(data)
//     })  
// })