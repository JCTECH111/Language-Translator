<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>Language Translator</title>
</head>
<style>
    .height {
        height: auto;
    }
</style>

<body class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96 height">
        <h1 class="text-2xl font-bold mb-4 flex w-full items-center justify-center"><span class="text-blue-500"
                style="margin-right: 1rem;">JoJo</span> Translator</h1>
        <div id="Author" class="mt-4 p-4 bg-gray-50 border rounded flex items-center">Developer : <span
                style="margin-left: 1rem;"><b> JoeCode</b></span></div>
        <div class="mb-4">
            <label for="sourceLang" class="block text-gray-700">From:</label>
            <select id="sourceLang" class="w-full mt-1 p-2 border rounded">
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="ja">Japanese</option>
                <option value="zh-cn">Chinese</option>
                <option value="ko">Korean</option>
                <option value="ur">Pakistan</option>
                <option value="zu">South Africa</option>
                <option value="ru">Russian</option>
                <option value="ig">Igbo</option>
                <option value="yo">Yoruba</option>
                <!-- Add more languages as needed -->
            </select>
        </div>
        <div class="mb-4">
            <label for="targetLang" class="block text-gray-700">To:</label>
            <select id="targetLang" class="w-full mt-1 p-2 border rounded">
                <option value="es">Spanish</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="ja">Japanese</option>
                <option value="zh-cn">Chinese</option>
                <option value="ko">Korean</option>
                <option value="ur">Pakistan</option>
                <option value="zu">South Africa</option>
                <option value="ru">Russian</option>
                <option value="ig">Igbo</option>
                <option value="yo">Yoruba</option>
                <!-- Add more languages as needed -->
            </select>
        </div>
        <div class="mb-4">
            <div class="flex justify-end w-full p-2">
                <button id="recordBtn" class="text-blue-500">
                    <i class="fas fa-microphone"></i>
                </button>
                <button id="stopBtn" class="text-red-500 ml-2" style="display: none;">
                    <i class="fas fa-stop"></i>
                </button>
            </div>
            <textarea id="textInput" class="w-full p-2 border rounded" rows="5"
                placeholder="Enter text here..."></textarea>
                
        </div>
        <button id="translateBtn" class="w-full bg-blue-500 text-white py-2 rounded">Translate</button>
        <div id="translatedTextContainer" class="mt-4 p-4 bg-gray-50 border rounded flex items-center max-h-32 overflow-y-auto">
            <span id="translatedText" class="flex-grow"></span>
            <button id="speakBtn" class="ml-2 text-blue-500">
                <i class="fas fa-volume-up"></i>
            </button>
        </div>
        
    </div>

    <script src="./main.js"></script>
</body>


</html>