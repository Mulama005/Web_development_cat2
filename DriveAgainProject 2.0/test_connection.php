<?php
$conn = new mysqli("localhost", "root", "", "contact_form");
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

// INSERT TEST
$conn->query("INSERT INTO messages (name, email, message) VALUES ('TEST', 'test@test.com', 'Direct PHP test')");

// SHOW ALL RECORDS
$result = $conn->query("SELECT * FROM messages");
echo "<h2>Database Contents:</h2>";
while($row = $result->fetch_assoc()) {
    echo "ID: {$row['id']} | Name: {$row['name']}<br>";
}

$conn->close();
?>