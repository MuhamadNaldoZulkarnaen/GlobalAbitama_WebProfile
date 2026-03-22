<?php
// Site Configuration
define('SITE_NAME', 'Global Abitama');
define('SITE_URL', 'http://localhost/abitama');
define('SITE_DESCRIPTION', 'Best Cleaning Service in Pakistan');

// Contact Information
define('PHONE_NUMBER', '+62 81328428226');
define('EMAIL', 'globalabitama@gmail.com');
define('ADDRESS', 'Jl. Martorejo 245, Junrejo, Kota Batu');

// Office Hours
define('OFFICE_HOURS', '10.00 am - 06.00 pm (Saturday-Thursday)');

// Database Configuration
define('DB_HOST', 'localhost');   // Server database
define('DB_NAME', 'abitama');     // Nama database
define('DB_USER', 'root');        // User database
define('DB_PASS', 'Mangga_15&');            // Password database (isi sesuai DB-mu)

// Error Reporting (set to false in production)
define('DEBUG_MODE', true);

if (DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Set timezone
date_default_timezone_set('Asia/Jakarta');

// Common functions
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function redirect($url) {
    header("Location: " . $url);
    exit();
}

// Session start if needed
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// =======================
// Database Connection
// =======================
$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Cek koneksi
if ($mysqli->connect_error) {
    die("Database connection failed: " . $mysqli->connect_error);
} else {
    if (DEBUG_MODE) {
        echo "Database connected successfully!";
    }
}

// Optional: set charset
$mysqli->set_charset("utf8");

?>
