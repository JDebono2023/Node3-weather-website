
const weatherForm = document.querySelector('form')
const userSearch = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = userSearch.value
    messageOne.textContent = 'Loading...'
    messageOne.textContent = ''


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }

        })
    })

})