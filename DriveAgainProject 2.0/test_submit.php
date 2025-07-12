<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "contact_form";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$testData = [
    'name' => 'TEST NAME',
    'email' => 'test@example.com',
    'message' => 'This is a test message'
];

$stmt = $conn->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $testData['name'], $testData['email'], $testData['message']);

if ($stmt->execute()) {
    echo "TEST MESSAGE INSERTED SUCCESSFULLY";
} else {
    echo "ERROR: " . $stmt->error;
}
?>