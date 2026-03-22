<?php include_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? $page_title . ' - ' . SITE_NAME : SITE_NAME; ?></title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- CSS Files -->
    <link rel="stylesheet" href="css/style.css">

    <!-- Favicon -->
    <link rel="icon" href="/images/favicon.ico" type="image/x-icon">
    
    <!-- Page specific meta tags -->
    <?php if (isset($meta_description)): ?>
    <meta name="description" content="<?php echo $meta_description; ?>">
    <?php endif; ?>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <a href="index.php"><?php echo SITE_NAME; ?></a>
                </div>
                
                <!-- Desktop Navigation -->
                <nav class="nav-wrapper">
                    <ul class="nav">
                        <li><a href="index.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'index.php') ? 'class="active"' : ''; ?>>Home</a></li>
                        <li><a href="about.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'about.php') ? 'class="active"' : ''; ?>>About</a></li>
                        <li><a href="index.php#services">Services</a></li>
                        <li><a href="index.php#projects">Projects</a></li>
                        <li><a href="contact.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'contact.php') ? 'class="active"' : ''; ?>>Contact</a></li>
                    </ul>
                </nav>

                <div class="contact-info">
                    <span>Call for help:</span>
                    <span class="phone-number"><?php echo PHONE_NUMBER; ?></span>
                </div>

                <!-- Mobile Menu Button dengan ID yang diperlukan -->
                <button class="mobile-menu-btn" id="mobile-menu-btn" aria-expanded="false" aria-label="Toggle mobile menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>

        <!-- Mobile Navigation Menu - INI YANG HILANG! -->
        <nav class="mobile-nav" id="mobile-nav">
            <ul>
                <li><a href="index.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'index.php') ? 'class="active"' : ''; ?>>Home</a></li>
                <li><a href="about.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'about.php') ? 'class="active"' : ''; ?>>About</a></li>
                <li><a href="index.php#services">Services</a></li>
                <li><a href="index.php#projects">Projects</a></li>
                <li><a href="contact.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'contact.php') ? 'class="active"' : ''; ?>>Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- JavaScript harus di bagian bawah sebelum closing body tag -->
    <!-- Pindahkan ke footer.php atau sebelum </body> -->
</body>
</html>