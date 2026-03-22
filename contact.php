<?php 
$page_title = "Contact Us";
$meta_description = "Get in touch with CleanPro for professional cleaning services. Contact us for free quotes and consultations.";

// Handle form submission
$message = '';
$message_type = '';

if ($_POST) {
    $first_name = sanitize_input($_POST['first_name'] ?? '');
    $last_name = sanitize_input($_POST['last_name'] ?? '');
    $email = sanitize_input($_POST['email'] ?? '');
    $phone = sanitize_input($_POST['phone'] ?? '');
    $user_message = sanitize_input($_POST['message'] ?? '');
    $errors = [];
    
    // Validation
    if (empty($first_name)) $errors[] = "First name is required";
    if (empty($last_name)) $errors[] = "Last name is required";
    if (empty($email)) $errors[] = "Email is required";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email format";
    if (empty($phone)) $errors[] = "Phone number is required";
    if (empty($user_message)) $errors[] = "Message is required";
    
    if (empty($errors)) {
        // Here you would typically save to database or send email
        // For now, we'll just show success message
        
        $to = EMAIL;
        $subject = "New Contact Form Submission from " . SITE_NAME;
        $email_body = "
        Name: $first_name $last_name
        Email: $email
        Phone: $phone
        Message: $user_message
        
        Submitted from: " . SITE_URL . "/contact.php
        Date: " . date('Y-m-d H:i:s');
        
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=utf-8\r\n";
        
        if (mail($to, $subject, $email_body, $headers)) {
            $message = "Thank you for your message! We will get back to you soon.";
            $message_type = "success";
            // Clear form data
            $_POST = [];
        } else {
            $message = "Sorry, there was an error sending your message. Please try again.";
            $message_type = "error";
        }
    } else {
        $message = implode('<br>', $errors);
        $message_type = "error";
    }
}

include 'includes/header.php'; 
?>

    <!-- Page Header -->
    <section class="page-header">
        <div class="container">
            <h1>Contact Us</h1>
            <p>Feel free to contact us for any kind of query or professional cleaning service.</p>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact">
        <div class="container">
            <div class="section-title">Get In Touch</div>
            <p style="text-align: center; color: #64748b; margin-bottom: 3rem;">
                We're here to help you with all your cleaning needs. Reach out to us through any of the following methods.
            </p>
            
            <?php if ($message): ?>
            <div class="alert alert-<?php echo $message_type; ?>">
                <?php echo $message; ?>
            </div>
            <?php endif; ?>
            
            <div class="contact-grid">
                <div class="contact-info">
                    <div class="contact-info-item">
                        <div class="contact-icon">📍</div>
                        <div>
                            <h4>Office Address</h4>
                            <p><?php echo ADDRESS; ?></p>
                        </div>
                    </div>

                    <div class="contact-info-item">
                        <div class="contact-icon">📧</div>
                        <div>
                            <h4>Email Address</h4>
                            <p><?php echo EMAIL; ?></p>
                            <p>info@cleanpro.com</p>
                        </div>
                    </div>

                    <div class="contact-info-item">
                        <div class="contact-icon">📞</div>
                        <div>
                            <h4>Phone Number</h4>
                            <p><?php echo PHONE_NUMBER; ?></p>
                            <p>Emergency: +92 321 1234567</p>
                        </div>
                    </div>

                    <div class="contact-info-item">
                        <div class="contact-icon">⏰</div>
                        <div>
                            <h4>Working Hours</h4>
                            <p><?php echo OFFICE_HOURS; ?></p>
                            <p>Emergency services: 24/7</p>
                        </div>
                    </div>
                    
                    <!-- Map placeholder -->
                    <div style="margin-top: 2rem;">
                        <h4 style="margin-bottom: 1rem;">Find Us On Map</h4>
                        <div style="width: 100%; height: 200px; background: #f1f5f9; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #64748b;">
                            <p>Interactive Map Would Go Here</p>
                        </div>
                    </div>
                </div>

                <form class="contact-form" method="POST" id="contact-form">
                    <h3 style="margin-bottom: 1.5rem; color: #1e293b;">Send Us A Message</h3>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" name="first_name" placeholder="First Name *" required 
                                   value="<?php echo htmlspecialchars($_POST['first_name'] ?? ''); ?>">
                        </div>
                        <div class="form-group">
                            <input type="text" name="last_name" placeholder="Last Name *" required
                                   value="<?php echo htmlspecialchars($_POST['last_name'] ?? ''); ?>">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <input type="email" name="email" placeholder="Email Address *" required
                                   value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>">
                        </div>
                        <div class="form-group">
                            <input type="tel" name="phone" placeholder="Phone Number *" required
                                   value="<?php echo htmlspecialchars($_POST['phone'] ?? ''); ?>">
                        </div>
                    </div>

                    <div class="form-group">
                        <textarea name="message" placeholder="Your Message *" required><?php echo htmlspecialchars($_POST['message'] ?? ''); ?></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label style="display: flex; align-items: center; gap: 0.5rem; color: #64748b; font-size: 0.9rem;">
                            <input type="checkbox" required style="width: auto;">
                            I agree to the privacy policy and terms of service
                        </label>
                    </div>

                    <button type="submit" class="cta-button">Send Message</button>
                    
                    <p style="margin-top: 1rem; color: #64748b; font-size: 0.9rem; text-align: center;">
                        We typically respond within 24 hours during business days.
                    </p>
                </form>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="content-section" style="background: #f8fafc;">
        <div class="container">
            <h2 style="text-align: center; margin-bottom: 3rem;">Frequently Asked Questions</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div class="faq-item" style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h4 style="color: #1e293b; margin-bottom: 0.5rem;">What areas do you serve?</h4>
                    <p style="color: #64748b;">We provide cleaning services throughout major cities in Pakistan including Karachi, Lahore, Islamabad, and surrounding areas.</p>
                </div>
                
                <div class="faq-item" style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h4 style="color: #1e293b; margin-bottom: 0.5rem;">Do you offer emergency cleaning services?</h4>
                    <p style="color: #64748b;">Yes, we provide 24/7 emergency cleaning services for urgent situations like water damage, accidents, or special events.</p>
                </div>
                
                <div class="faq-item" style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h4 style="color: #1e293b; margin-bottom: 0.5rem;">Are your cleaning products safe?</h4>
                    <p style="color: #64748b;">We use eco-friendly and non-toxic cleaning products that are safe for your family, pets, and the environment.</p>
                </div>
                
                <div class="faq-item" style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h4 style="color: #1e293b; margin-bottom: 0.5rem;">How do I get a quote?</h4>
                    <p style="color: #64748b;">Simply fill out the contact form above or call us directly. We'll provide a free, no-obligation quote within 24 hours.</p>
                </div>
            </div>
        </div>
    </section>

<?php include 'includes/footer.php'; ?>