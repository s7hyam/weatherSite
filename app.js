let cardImg = document.querySelectorAll('.card-img')
let cardTime = document.querySelectorAll('.card-time')
let cardTemp = document.querySelectorAll('.card-temp')
let chanches = document.querySelectorAll('.chance-percent')

let searchbar = document.querySelector('.searchbar')
let btn = document.querySelector('.btn')
let date = new Date()
let time = date.getHours()
if (time >= 12) {
    time = time - 12 + ' PM'
} else {
    time = time + ' AM'
}
console.log(time)

btn.addEventListener('click', (e) => {
    e.preventDefault()
    let searchCity = searchbar.value;
    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=b39e054a6eaf87ac5f20368466cfcad2`

    fetch(url).then((res) => {
        let json = res.json()
        return json
    }).then((data) => {
        let lat = data[0].lat
        let lon = data[0].lon
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b39e054a6eaf87ac5f20368466cfcad2`

        fetch(url).then((res) => {
            let json = res.json()
            return json
        }).then((data) => {
            console.log(data)
            let cityName = document.querySelector('.city-name')
            cityName.innerText = data.name

            let temp = document.querySelector('.temp')
            temp.innerText = (data.main.temp - 273).toFixed(2)

            let minTemp = document.querySelector('.min-temp')
            let maxTemp = document.querySelector('.max-temp')
            let weather = document.querySelector('.weather')
            let cardTemp = document.querySelectorAll('.card-temp')
            let cardImg = document.querySelectorAll('.card-img')
            let cardTime = document.querySelectorAll('.card-time')


            for (let i = 0; i < cardTemp.length; i++) {
                cardTemp[i].innerText = (data.main.temp - 273).toFixed(2) + '°'
            }
            for (let i = 0; i < cardImg.length; i++) {
                cardImg[i].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            }

            minTemp.innerText = (data.main.temp_min - 273).toFixed(2)
            maxTemp.innerText = (data.main.temp_max - 273).toFixed(2)
            weather.innerText = data.weather[0].main
            searchbar.value = ''
        })
    })
})

