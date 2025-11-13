class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: #1F2937;
                    color: white;
                }
                
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 3rem 1.5rem 2rem;
                }
                
                .footer-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                
                .footer-section h3 {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.25rem;
                    margin-bottom: 1rem;
                    color: #F7E9A6;
                }
                
                .footer-section p,
                .footer-section li {
                    font-family: 'Nunito', sans-serif;
                    line-height: 1.6;
                    color: #E5E7EB;
                }
                
                .footer-section ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .footer-section ul li {
                    margin-bottom: 0.5rem;
                }
                
                .footer-section a {
                    color: #10B981;
                    text-decoration: none;
                    transition: color 0.3s;
                }
                
                .footer-section a:hover {
                    color: #F7E9A6;
                }
                
                .contact-info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.75rem;
                }
                
                .contact-info svg {
                    width: 18px;
                    height: 18px;
                }
                
                .emergency-banner {
                    background: linear-gradient(135deg, #EF4444, #DC2626);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-bottom: 2rem;
                    text-align: center;
                }
                
                .emergency-banner h4 {
                    font-size: 1.125rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }
                
                .emergency-banner p {
                    font-size: 1.25rem;
                    font-weight: 600;
                }
                
                .footer-bottom {
                    border-top: 1px solid #374151;
                    padding-top: 2rem;
                    text-align: center;
                    font-size: 0.875rem;
                    color: #9CA3AF;
                }
                
                .footer-bottom a {
                    color: #10B981;
                }
                
                .footer-bottom a:hover {
                    color: #F7E9A6;
                }
                
                .social-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .social-links a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background: #374151;
                    border-radius: 50%;
                    transition: all 0.3s;
                }
                
                .social-links a:hover {
                    background: #10B981;
                    transform: translateY(-2px);
                }
                
                .social-links svg {
                    width: 20px;
                    height: 20px;
                }
                
                .popia-notice {
                    background: #F7E9A6;
                    color: #1F2937;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                    font-size: 0.875rem;
                }
                
                @media (max-width: 768px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }
                    
                    .contact-info {
                        justify-content: center;
                    }
                    
                    .social-links {
                        justify-content: center;
                    }
                }
            </style>
            
            <footer>
                <div class="footer-content">
                    <!-- Emergency Banner -->
                    <div class="emergency-banner">
                        <h4>🚨 24/7 Paediatric Emergency</h4>
                        <p>Call +27 33 395 4703 for urgent medical assistance</p>
                    </div>
                    
                    <div class="footer-grid">
                        <!-- About Section -->
                        <div class="footer-section">
                            <h3>About Harry Gwala</h3>
                            <p>Formerly known as Edendale Hospital, we are a Regional/Teaching Hospital serving the community of Pietermaritzburg and surrounding areas.</p>
                            <div class="social-links">
                                <a href="#" aria-label="Facebook">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" aria-label="Twitter">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                                <a href="#" aria-label="LinkedIn">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        <!-- Quick Links -->
                        <div class="footer-section">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="about.html">About Us</a></li>
                                <li><a href="services.html">Our Services</a></li>
                                <li><a href="clinics.html">Clinic Schedule</a></li>
                                <li><a href="admissions.html">Admissions Info</a></li>
                                <li><a href="ward-info.html">Visiting Hours</a></li>
                                <li><a href="faq.html">FAQs</a></li>
                                <li><a href="contact.html">Contact & Directions</a></li>
                                <li><a href="feedback.html">Send Feedback</a></li>
                            </ul>
                        </div>
                        
                        <!-- Contact Info -->
                        <div class="footer-section">
                            <h3>Contact Information</h3>
                            <div class="contact-info">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span>Selby Msimang Road, Edendale<br>Pietermaritzburg, 3201</span>
                            </div>
                            <div class="contact-info">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                                <span>+27 33 395 4703</span>
                            </div>
                            <div class="contact-info">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                </svg>
                                <a href="https://www2.kznhealth.gov.za/harrygwalahospital.htm" target="_blank" rel="noopener">Hospital Website</a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- POPIA Notice -->
                    <div class="popia-notice">
                        <strong>POPIA Notice:</strong> This website complies with the Protection of Personal Information Act. We only collect necessary information and use it solely for the purpose of providing healthcare services. For more information, see our <a href="#" class="underline">Privacy Policy</a>.
                    </div>
                    
                    <!-- Footer Bottom -->
                    <div class="footer-bottom">
                        <p>&copy; 2024 Harry Gwala Regional Hospital - Paediatrics Department. All rights reserved.</p>
                        <p>Teaching affiliate of <a href="#" target="_blank" rel="noopener">Nelson R. Mandela School of Medicine</a></p>
                        <p class="mt-2">
                            <a href="#">Privacy Policy</a> | 
                            <a href="#">Terms of Use</a> | 
                            <a href="#">Accessibility</a> | 
                            <a href="#">POPIA Compliance</a>
                        </p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-footer', SiteFooter);
