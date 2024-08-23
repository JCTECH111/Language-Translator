<?php
// $allowed_referer = 'https://990b-102-89-23-43.ngrok-free.app/index.html';
// if (!isset($_SERVER['HTTP_REFERER']) || $_SERVER['HTTP_REFERER'] !== $allowed_referer) {
//     die('Access denied');
// }
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the JSON data sent from the frontend
    $postData = file_get_contents("php://input");
    
    // Decode the JSON to extract the translation request
    $data = json_decode($postData, true);
    
    $sourceLang = escapeshellarg($data['source']);
    $targetLang = escapeshellarg($data['target']);
    $textInput = escapeshellarg($data['text']);
    
    // Prepare the command to run the Python script with the input data
    $command = escapeshellcmd("python ./translate.py $sourceLang $targetLang $textInput");
    
    // Execute the Python script using shell_exec and capture the output
    $output = shell_exec($command . ' 2>&1');  // Capture stderr as well
    
    // Set content type to UTF-8
    header('Content-Type: text/plain; charset=utf-8');
    
    // Output the response from the Python script as the final result
    echo $output;
}

