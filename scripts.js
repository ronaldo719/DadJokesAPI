const API_ENDPOINT = 'https://icanhazdadjoke.com/';
const buttonSelector = document.getElementById('button');
const loaderSelector = document.getElementById('loader');
const errorContainerSelector = document.getElementById('error-message');
const jokeSelctor = document.getElementById('joke');
const buttonCtaSelector = document.getElementById('cta');
const XHR = new XMLHttpRequest();


function setUIState(isDisabled) {
    setLoaderState(isDisabled);
    setButtonState(isDisabled);
}

function showJoke(joke) {
    setUIState(false);
    jokeSelctor.innerHTML = joke;
}

function showError(joke) {
    setUIState(false);
    errorContainerSelector.innerHTML = error;
    errorContainerSelector.style.display = 'block';
}

function setLoaderState(isVisiable) {
    const setDisplayState = isVisiable ? 'block' : 'none';
    loaderSelector.style.display = setDisplayState;
}
function setButtonState(isDisabled) {
    if (isDisabled) {
        buttonSelector.setAttribute('disabled', 'disabled');
    } else {
        buttonSelector.removeAttribute('disabled');
    }
    const buttonCtaState = isDisabled ? 'none' : 'block';
    buttonCtaSelector.style.display = buttonCtaState;
}

function ctaButton(isError) {
    const buttoncta = isError ? 'Try again' : 'Get another one';
    buttonCtaSelector.innerHTML = buttoncta;
}


function getJokes() {
    XHR.open('GET', API_ENDPOINT);

    XHR.setRequestHeader('Accept', 'application/json');
    XHR.responseType = 'json';

    XHR.onload = function () {
        showJoke(XHR.response.joke);
        ctaButton(false);
    }

    XHR.onerror = function () {
        showJoke('An error occured, please try again.');
        ctaButton(true);
    }

    XHR.send();
}

buttonSelector.addEventListener('click', function () {
    setUIState(true);
    getJokes();
});
