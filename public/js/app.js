import * as fromStore from "./store/index.mjs";

const weatherForm = document.querySelector(".form");
const searchInput = document.querySelector(".form-search");


const loadingImageLink = 'https://img.icons8.com/ios-filled/50/null/iphone-spinner--v1.png';

const errorImageLink = 'https://img.icons8.com/pastel-glyph/64/null/error-handling.png';


const reducers = {
    weatherData: fromStore.reducer
}

const store = new fromStore.Store(reducers);




weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchTerm = searchInput.value;

  store.dispatch(new fromStore.GetWeatherData({ searchTerm , icon: loadingImageLink, location: 'Getting Weather info...', forecast: 'Please wait...'  }))

  fetch("http://localhost:3000/weather?address="+searchTerm)
    .then((response) => {
      response.json().then((data) => {
        parseResult(data, searchTerm);
        searchInput.value = '';
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

const parseResult = (data, searchTerm) => {
    if(data.error) {
        store.dispatch(new fromStore.GetWeatherDataFail({ searchTerm, icon: errorImageLink, location: 'Oops! Looks like some issue', forecast: data.error }))
        // resultImg.setAttribute('src', errorImageLink);
        // resultData.textContent = data.error;
    } else {
        store.dispatch(new fromStore.GetWeatherDataSuccess({ searchTerm, icon: data.icon, location: data.location, forecast: data.forecast }))
        // resultImg.setAttribute('src', data.icon);
        // resultLocation.textContent = data.location;
        // resultData.textContent = data.forecast;
    }
}


const weatherDataSubscription = store.subscribe(({ state }) => {
    fromStore.updateUI(state['weatherData'])
});


const dataSubscription = store.subscribe(({ state, actionType }) => console.log("STATE ::: ", state, "ACTION ::: ", actionType));