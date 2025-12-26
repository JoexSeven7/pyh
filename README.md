# Medplus Pharmacy Website

A modern, responsive, and accessible website for Medplus Pharmacy - 24-hour pharmacy in Magodo/Ketu, Lagos.

## 📋 Project Overview

This is a complete website redesign for Medplus Pharmacy that addresses the following key requirements:

- **24/7 Availability**: Prominently features the pharmacy's 24-hour service
- **Fast Delivery**: Highlights same-day delivery and pickup options
- **Professional Design**: Clean, medical-appropriate aesthetic
- **Mobile-First**: Fully responsive design for all devices
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO Optimized**: Proper meta tags, schema markup, and semantic HTML

## 🏗️ Project Structure

```
medplus-pharmacy/
├── index.html              # Main landing page
├── services.html           # Services page
├── faq.html               # FAQ page
├── assets/
│   ├── css/
│   │   ├── styles.css     # Main stylesheet
│   │   ├── responsive.css # Responsive design
│   │   ├── accessibility.css # Accessibility styles
│   │   └── faq.css        # FAQ-specific styles
│   ├── js/
│   │   ├── main.js        # Core functionality
│   │   ├── form-validation.js # Form handling
│   │   ├── testimonials.js # Testimonial carousel
│   │   ├── navigation.js  # Navigation system
│   │   ├── accessibility.js # Accessibility features
│   │   ├── faq.js         # FAQ functionality
│   │   └── services.js    # Services page features
│   ├── images/            # Image assets
│   │   └── README.md      # Image requirements
│   └── fonts/             # Web fonts
├── 00_INDEX_AND_GETTING_STARTED.md
├── 01_SITE_STRUCTURE.md
├── 02_DESIGN_BRIEF.md
├── 03_LANDING_PAGE_COPY.md
├── 04_LANDING_PAGE.html   # Original file (for reference)
├── 05_FAQ_PAGE.md
├── 06_IMPLEMENTATION_CHECKLIST_SUMMARY.md
├── 07_BRAND_STYLE_GUIDE.md
└── 08_QUICK_REFERENCE_GUIDE.md
```

## 🎨 Design Features

### Color Palette

- **Primary Blue**: `#0066CC` (Trust, Professionalism)
- **Wellness Green**: `#2DBE60` (Health, Growth)
- **Alert Red**: `#E74C3C` (Urgency, Emergency)
- **Clinical White**: `#F8FAFB` (Clean, Medical)

### Typography

- **Primary Font**: Poppins (Modern, Clean)
- **Secondary Font**: Open Sans (Readable)
- **Font Sizes**: Scalable with user preferences

### Key Design Elements

- Clean, minimal layout
- High-quality imagery
- Clear visual hierarchy
- Professional iconography
- Consistent spacing and alignment

## 📱 Responsive Design

### Breakpoints

- **Mobile**: `< 768px` - Single column layout
- **Tablet**: `768px - 1023px` - Adapted layouts
- **Desktop**: `1024px+` - Full multi-column layout

### Mobile Features

- Hamburger menu
- Touch-friendly buttons (48px minimum)
- Optimized form layouts
- Swipeable testimonials
- Floating action buttons

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance

- **Color Contrast**: Minimum 4.5:1 ratio
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper heading hierarchy

### Accessibility Enhancements

- Skip links for screen readers
- High contrast mode support
- Reduced motion preferences
- Touch target optimization
- Live regions for dynamic content

## 🔧 Technical Features

### JavaScript Functionality

- **Form Validation**: Real-time validation with clear error messages
- **Testimonial Carousel**: Auto-rotating with manual controls
- **Smooth Scrolling**: Anchor link navigation
- **Mobile Menu**: Toggle navigation for mobile devices
- **Search Functionality**: FAQ search with results
- **Service Filtering**: Category-based service filtering

### Performance Optimizations

- **Lazy Loading**: Images and content
- **Code Splitting**: Modular JavaScript files
- **CSS Optimization**: Organized, efficient stylesheets
- **Image Optimization**: WebP format with fallbacks
- **Minification Ready**: Clean, optimized code

### SEO Features

- **Schema Markup**: LocalBusiness and FAQPage schemas
- **Meta Tags**: Comprehensive meta descriptions and keywords
- **Semantic HTML**: Proper use of semantic elements
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Rich snippets for search engines

## 🚀 Quick Start

### Prerequisites

- Modern web browser
- Local server (optional for testing)

### Installation

1. Clone or download the project files
2. Open `index.html` in a web browser
3. For local development, use a local server:

   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx serve

   # PHP
   php -S localhost:8000
   ```

### Customization

#### Colors

Edit CSS custom properties in `assets/css/styles.css`:

```css
:root {
	--pharmacy-blue: #0066cc;
	--wellness-green: #2dbe60;
	--alert-red: #e74c3c;
}
```

#### Content

Update text content in HTML files:

- `index.html` - Main landing page
- `services.html` - Services page
- `faq.html` - FAQ page

#### Images

Replace placeholder images in `assets/images/`:

- Hero background images
- Service icons
- Favicon assets
- Testimonial photos

## 📞 Contact Information

**Medplus Pharmacy - Emmanuel Keshi Branch**

- **Address**: 32 Emmanuel Keshi Street, Ikosi Ketu, Magodo, Lagos 105102
- **Phone**: 0905 549 2610
- **Hours**: Open 24 Hours, 7 Days a Week
- **WhatsApp**: 0905 549 2610

## 🛠️ Development Notes

### Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Android)

### Testing Checklist

- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Accessibility compliance
- [ ] Form validation
- [ ] JavaScript functionality
- [ ] Performance optimization
- [ ] SEO validation

### Performance Targets

- **Page Load Time**: < 3 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 📊 Analytics & Tracking

### Recommended Tracking

- Google Analytics 4
- Google Search Console
- Hotjar for user behavior
- PageSpeed Insights monitoring

### Key Metrics to Monitor

- Website traffic and engagement
- Form submission rates
- Phone call conversions
- WhatsApp message conversions
- Page load performance
- Mobile vs desktop usage

## 🔗 External Integrations

### Google Maps

- Embedded map in contact section
- Business listing optimization
- Directions and location sharing

### WhatsApp Business

- Click-to-chat links
- Quick response templates
- Business profile integration

### Social Media

- Facebook page integration
- Instagram business account
- Twitter/X for customer service

## 📈 Future Enhancements

### Phase 2 Features

- Online prescription upload
- Medication reminder system
- Loyalty rewards program
- Product catalog with search
- Appointment scheduling

### Phase 3 Features

- E-commerce functionality
- Mobile app development
- Telemedicine integration
- Inventory management system
- Customer portal

## 📄 License

This project is for educational and demonstration purposes. All content should be reviewed and updated for actual business use.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Bug Reports

Please report any issues through:

- Email: [developer@example.com]
- GitHub Issues (if applicable)
- Include browser, device, and steps to reproduce

---

**Built with ❤️ for Medplus Pharmacy**
