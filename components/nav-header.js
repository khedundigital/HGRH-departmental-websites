class NavHeader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                header {
                    background: white;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }
                
                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo-section {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .logo {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #0E7490;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .logo:hover {
                    color: #10B981;
                }
                
                .nav-menu {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                
                .nav-link {
                    color: #374151;
                    text-decoration: none;
                    font-weight: 500;
                    font-family: 'Nunito', sans-serif;
                    padding: 0.5rem 0;
                    position: relative;
                    transition: color 0.3s;
                }
                
                .nav-link:hover {
                    color: #0E7490;
                }
                
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #10B981;
                    transition: width 0.3s;
                }
                
                .nav-link:hover::after {
                    width: 100%;
                }
                
                .nav-cta {
                    background: #0E7490;
                    color: white;
                    padding: 0.5rem 1.5rem;
                    border-radius: 2rem;
                    text-decoration: none;
                    font-weight: 600;
                    font-family: 'Nunito', sans-serif;
                    transition: all 0.3s;
                }
                
                .nav-cta:hover {
                    background: #10B981;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                }
                
                .lang-toggle {
                    background: #F7E9A6;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 1.5rem;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.875rem;
                    transition: all 0.3s;
                }
                
                .lang-toggle:hover {
                    background: #F7B3A6;
                }
                
                .mobile-menu-toggle {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                
                .mobile-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    padding: 1rem;
                }
                
                .mobile-menu.active {
                    display: block;
                }
                
                .mobile-nav-menu {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .mobile-nav-menu li {
                    padding: 0.75rem 0;
                    border-bottom: 1px solid #E5E7EB;
                }
                
                .mobile-nav-menu li:last-child {
                    border-bottom: none;
                }
                
                @media (max-width: 768px) {
                    .nav-menu {
                        display: none;
                    }
                    
                    .mobile-menu-toggle {
                        display: block;
                    }
                    
                    .mobile-menu {
                        display: none;
                    }
                }
                
                @media (min-width: 769px) {
                    .mobile-menu {
                        display: none !important;
                    }
                }
            </style>
            
            <header>
                <nav class="nav-container" role="navigation" aria-label="Main navigation">
                    <div class="logo-section">
                        <a href="index.html" class="logo">
                            <span style="font-size: 2rem;">🏥</span>
                            <span>Harry Gwala Paediatrics</span>
                        </a>
                    </div>
                    
                    <ul class="nav-menu">
                        <li><a href="index.html" class="nav-link">Home</a></li>
                        <li><a href="about.html" class="nav-link">About</a></li>
                        <li><a href="services.html" class="nav-link">Services</a></li>
                        <li><a href="clinics.html" class="nav-link">Clinics</a></li>
                        <li><a href="admissions.html" class="nav-link">Admissions</a></li>
                        <li><a href="faq.html" class="nav-link">FAQ</a></li>
                        <li><a href="contact.html" class="nav-cta" data-emergency>Emergency: +27 33 395 4703</a></li>
                        <li><button class="lang-toggle" id="lang-toggle" aria-label="Toggle language">EN | ZU</button></li>
                    </ul>
                    
                    <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle mobile menu" aria-expanded="false">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </nav>
                
                <div class="mobile-menu" id="mobile-menu">
                    <ul class="mobile-nav-menu">
                        <li><a href="index.html" class="nav-link">Home</a></li>
                        <li><a href="about.html" class="nav-link">About</a></li>
                        <li><a href="services.html" class="nav-link">Services</a></li>
                        <li><a href="clinics.html" class="nav-link">Clinics</a></li>
                        <li><a href="admissions.html" class="nav-link">Admissions</a></li>
                        <li><a href="faq.html" class="nav-link">FAQ</a></li>
                        <li><a href="contact.html" class="nav-link" data-emergency>Emergency: +27 33 395 4703</a></li>
                        <li><a href="contact.html" class="nav-link">Contact & Directions</a></li>
                    </ul>
                </div>
            </header>
        `;
        
        // Initialize mobile menu functionality
        const mobileMenuToggle = this.shadowRoot.getElementById('mobile-menu-toggle');
        const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                const isExpanded = mobileMenu.classList.contains('active');
                mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            });
        }
        
        // Language toggle
        const langToggle = this.shadowRoot.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                // Emit custom event for language toggle
                this.dispatchEvent(new CustomEvent('languageToggle', { bubbles: true }));
            });
        }
    }
}

customElements.define('nav-header', NavHeader);
