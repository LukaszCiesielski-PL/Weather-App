document.querySelector('#addNewCityButton').addEventListener('click', onNewNote);
const Container = document.getElementById('main');
const Key = 'city';
let Notes = [];

function getWeather() {
    Notes = JSON.parse(localStorage.getItem(Key));
    Container.innerHTML = '';
    Notes.forEach(city => {
        const fetchPromise = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3152a791a97ab872b7ae2e4df7118856&units=metric&lang=pl`);
        fetchPromise.then(function (response) {
                return response.json();
            }).then(current => {
            const noteID = Notes.indexOf(city);

            const Note = document.createElement('div');
            Note.classList.add('note');
            
            const Title = document.createElement('h1');
            Title.innerHTML = current.name;
            
            const Temp = document.createElement('p');
            Temp.classList.add('temp');
            Temp.innerHTML = Math.round(current.main.temp, 1) + '°C<br>';

            const Content = document.createElement('p');
            Content.innerHTML = current.weather[0].main + '<br> Zachmurzenie: ' + current.clouds.all + '%<br> Wilgotność: ' + current.main.humidity + '%<br> Wiatr: ' + Math.round(current.wind.speed, 1) + 'm/s <br>';

            const Contents = document.createElement('HR');

            const Forecast = document.createElement('div');
            Forecast.classList.add('foreCast');

            const Button = document.createElement('button');
            Button.innerHTML = 'X';
            Button.classList.add('buttonDelete');

            let iconUrl = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
            let Icon = new Image();
            Icon.src = iconUrl;
            Icon.classList.add('icon');

            Note.appendChild(Button);
            Note.appendChild(Title);
            Title.appendChild(Icon);
            Note.appendChild(Temp);
            Note.appendChild(Content);
            Note.appendChild(Contents);
            Note.appendChild(Forecast);
            

            Container.appendChild(Note);
            const fetchPromise = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3152a791a97ab872b7ae2e4df7118856&units=metric&lang=pl`);

            fetchPromise.then(function (response) {
                    return response.json();
                }).then(newCurrent => {
                for (let i = 0; i < 5; i++) {

                    let iconUrl = `http://openweathermap.org/img/wn/${newCurrent.list[i].weather[0].icon}@2x.png`;
                    let Icon2 = new Image();
                    Icon2.src = iconUrl;
                    Icon2.classList.add('icon2');

                    let RowOfForecast = document.createElement('div');
                    RowOfForecast.classList.add('rowForeCast');

                    let TimeOfForecast = document.createElement('div');
                    let FutureWeather = document.createElement('div');
                    FutureWeather.classList.add('temp2');

                    FutureWeather.innerHTML = newCurrent.list[i].weather[0].main;
                    TimeOfForecast.innerHTML = newCurrent.list[i].dt_txt.split(" ")[1].slice(0, 5)
                    FutureWeather.innerHTML = Math.round(newCurrent.list[i].main.temp, 1) + '°C<br>';

                    RowOfForecast.appendChild(TimeOfForecast);
                    RowOfForecast.appendChild(Icon2);
                    RowOfForecast.appendChild(FutureWeather);
                    Forecast.appendChild(RowOfForecast);
                    console.log(Icon2);
                }


            });

            Button.addEventListener('click', () => { removeNote(noteID); });

        });

    }
    );
}

function onNewNote() {
    const newCity = document.querySelector('#addNewCity').value;
    Notes.push(newCity);
    UpdateNotes();
}

function UpdateNotes() {
    localStorage.setItem(Key, JSON.stringify(Notes));
    getWeather();
}


function removeNote(ID) {
    Notes.splice(ID, 1);
    localStorage.setItem(Key, JSON.stringify(Notes));
    getWeather();
}

setInterval(function () {
    getWeather();
}, 120000); 