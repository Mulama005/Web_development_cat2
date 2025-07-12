<?php
header('Content-Type: application/json');

// Database connection config
$host = "localhost";
$user = "root";
$password = "";
$database = "contact_form";

// Connect to MySQL
$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Database connection failed"]);
    exit;
}

// Get and sanitize input
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$email || !$message) {
    echo json_encode(["success" => false, "error" => "Please fill in all fields"]);
    exit;
}

// Prepare and execute insert
$stmt = $conn->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
if (!$stmt) {
    echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Message saved"]);
} else {
    echo json_encode(["success" => false, "error" => "Insert failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
