let textarea = document.querySelector('#textarea')
let voices = document.querySelector('#voices')
let button = document.querySelector('#button')
let selectedVoice = 0;

window.speechSynthesis.addEventListener('voiceschanged', () => {
    let voicesList = window.speechSynthesis.getVoices();
    for(let i in voicesList){
        let optionEl = document.createElement('option');
        optionEl.setAttribute('value', i);
        optionEl.innerText = voicesList[i].name;
        voices.appendChild(optionEl);
    }
})

button.addEventListener('click', () => {
    if(textarea.value !== ''){
        let ut = new SpeechSynthesisUtterance(textarea.value);
        let voicesList = window.speechSynthesis.getVoices();
        ut.voice = voicesList[selectedVoice];
        window.speechSynthesis.speak(ut);
    }
});

voices.addEventListener('change', () => {
    selectedVoice = parseInt(voices.value);
});

function updateStatus(){
    if(window.speechSynthesis.speaking){
        voices.setAttribute('disable', 'disable');
    } else {
        voices.removeAttribute('disable');
        button.removeAttribute('disable');
    }
}
setInterval(updateStatus, 100);