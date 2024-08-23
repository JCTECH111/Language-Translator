// Global variable to keep track of the current speech synthesis utterance
let currentUtterance = null;

document.getElementById('translateBtn').addEventListener('click', function () {
    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;
    const textInput = document.getElementById('textInput').value;

    // Display the 'Translating...' message
    document.getElementById('translatedText').innerHTML = "Translating...";

    // Step 1: Send the request to the Flask API to get the translated text
    fetch('https://990b-102-89-23-43.ngrok-free.app/backend/display.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            source: sourceLang,
            target: targetLang,
            text: textInput
        })
    })
    .then(response => response.text())
    .then(html => {
        console.log(html);
        
        // Step 3: Display the translated text with the typing effect
        const element = document.getElementById("translatedText");
        element.innerHTML= ""
        typeWriter( html, 50); // Typing effect function

        // Enable the speak button after translation is done
        document.getElementById('speakBtn').addEventListener('click', function () {
            speakText(html, targetLang); // Use the translated text for TTS
        });
    })
    
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('translatedText').innerHTML = "An error occurred. Please try again.";
    });
});
function typeWriter(text, speed) {
    let i = 0;
    const element = document.getElementById("translatedText");

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
function speakText(text, lang) {
    // Cancel any ongoing speech
    if (currentUtterance) {
        window.speechSynthesis.cancel();
    }

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; // Set the language for the speech

    // Set the current utterance to the new one
    currentUtterance = utterance;

    // Speak the new utterance
    window.speechSynthesis.speak(utterance);

    // Reset current utterance once speaking is finished
    utterance.onend = function () {
        currentUtterance = null;
    };
}


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (window.SpeechRecognition) {
    const recognition = new webkitSpeechRecognition();
    
    const recordBtn = document.getElementById('recordBtn');
    const stopBtn = document.getElementById('stopBtn');
    const textInput = document.getElementById('textInput');
    const speechLang = document.getElementById('sourceLang'); // Language selector
    
    let isRecording = false;
    let finalTranscript = '';

    recognition.lang = window.navigator.language;
	recognition.interimResults = true;

    // Start recording
    recordBtn.addEventListener('click', () => {
        if (!isRecording) {
            recognition.start();
            isRecording = true;
            recordBtn.style.display = 'none';
            stopBtn.style.display = 'inline-block';
            console.log('Recording started');
            textInput.value = "Recording....."
        }
    });

    // Stop recording
    stopBtn.addEventListener('click', () => {
        if (isRecording) {
            recognition.stop();
            isRecording = false;
            recordBtn.style.display = 'inline-block';
            stopBtn.style.display = 'none';
            console.log('Recording stopped');
        }
    });

    recognition.addEventListener('result', (event) => {
        console.log('Result event fired');
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }
        
        console.log('Interim recognized text:', interimTranscript);
    });
    
    recognition.addEventListener('end', () => {
        console.log('Speech recognition ended');
        textInput.value = finalTranscript;
        console.log('Final recognized text:', finalTranscript);
    });


    // Handle errors
    recognition.addEventListener('error', (event) => {
        console.error('Speech Recognition Error:', event.error);
        if (event.error === 'no-speech' || event.error === 'audio-capture') {
            isRecording = false;
            recordBtn.style.display = 'inline-block';
            stopBtn.style.display = 'none';
        }
    });

    // Handle end of recording
    recognition.addEventListener('end', () => {
        console.log('Speech recognition ended');
        if (isRecording) {
            recognition.start(); // Continue recording if stop button was not pressed
        } else {
            isRecording = false;
            recordBtn.style.display = 'inline-block';
            stopBtn.style.display = 'none';
        }
    });
} else {
    alert('Your browser does not support speech recognition.');
}



