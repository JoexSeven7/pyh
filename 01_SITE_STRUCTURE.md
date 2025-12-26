# Medplus Pharmacy - Website Structure

## Emmanuel Keshi Branch, Magodo/Ketu, Lagos

---

## I. SITE ARCHITECTURE & HIERARCHY

```
Homepage (/)
├── Navigation Bar
│   ├── Logo
│   ├── Home
│   ├── Services
│   ├── About Us
│   ├── Contact
│   └── Emergency Button (Call Now)
│
├── Hero Section
│   ├── Background Image (Pharmacy Interior)
│   ├── Main Headline
│   ├── Subheadline
│   └── CTA Buttons (Order Delivery | Call Now)
│
├── Service Highlights Section
│   ├── 24/7 Open Icon + Copy
│   ├── Prescription Refills Icon + Copy
│   ├── Beauty & Skincare Icon + Copy
│   └── Home Medical Equipment Icon + Copy
│
├── Trust Signals Section
│   ├── 4.2-Star Rating Display
│   ├── Testimonial Slider (Rotating Reviews)
│   └── Review Count
│
├── Quick Inquiry Section
│   ├── WhatsApp Floating Button (Sticky)
│   ├── Quick Contact Form
│   └── Response Time Promise ("Reply within 1 hour")
│
├── Interactive Map Section
│   ├── Embedded Google Map
│   ├── Address Display
│   └── Directions Button
│
├── About Us Section
│   ├── Story/Mission Blurb
│   ├── Core Values
│   └── Community Focus
│
├── Services Deep-Dive
│   ├── Prescription Medications
│   ├── Home Medical Equipment
│   ├── Beauty & Wellness Products
│   └── Delivery & In-Store Pickup
│
├── FAQ Section
│   ├── Hours & Availability
│   ├── Ordering & Delivery
│   ├── Prescriptions & Medications
│   ├── Payments & Pricing
│   └── General Questions
│
└── Footer
    ├── Quick Links
    ├── Contact Info
    ├── Hours
    ├── Social Media Links
    ├── Newsletter Signup
    └── Copyright

---

## II. KEY PAGES

### Page 1: Homepage (index.html)
- **Purpose:** First impression, drive conversions (orders/calls)
- **Focus:** Hero, services, trust, quick contact
- **Primary CTAs:** Order Delivery, Call Now, WhatsApp Chat

### Page 2: Services (services.html)
- **Purpose:** Detailed service information
- **Sections:** Medications | Equipment | Beauty | Delivery Options
- **CTA:** Contact us for specific needs

### Page 3: About Us (about.html)
- **Purpose:** Build trust through company story
- **Sections:** Our Story | Mission & Vision | Team | Community Impact
- **CTA:** Join our loyalty program

### Page 4: Contact (contact.html)
- **Purpose:** Multiple contact channels
- **Elements:** Contact form, Map, Phone, Email, Hours, Live Chat
- **CTA:** Get in touch

### Page 5: FAQ (faq.html)
- **Purpose:** Address common questions, reduce support burden
- **Organized by:** Hours | Orders | Prescriptions | Payments | General

---

## III. FOOTER STRUCTURE

```

Footer
├── Column 1: Quick Links
│ ├── Home
│ ├── Services
│ ├── About
│ ├── FAQs
│ └── Contact
│
├── Column 2: Contact Info
│ ├── Phone: 0905 549 2610
│ ├── Address: 32 Emmanuel Keshi St, Ikosi Ketu, Lagos 105102
│ └── Email: info@medpluspharmacy.com
│
├── Column 3: Hours
│ ├── "Open 24/7"
│ ├── "Every Day"
│ └── "Emergency Line Always Available"
│
├── Column 4: Follow Us
│ ├── Facebook
│ ├── Instagram
│ ├── WhatsApp
│ └── Twitter
│
└── Column 5: Newsletter
└── Email Signup (CTA: "Get Health Tips & Offers")

---

## IV. RESPONSIVE BREAKPOINTS

- **Desktop:** 1200px and above
- **Tablet:** 768px - 1199px
- **Mobile:** Below 768px

**Mobile-First Considerations:**

- Stack all sections vertically
- CTA buttons full-width on mobile
- Hamburger menu for navigation
- Touch-friendly button sizes (48px minimum)
- Simplified testimonial slider on mobile

---

## V. PERFORMANCE PRIORITIES

1. **Speed:** Optimize hero image, lazy-load below-fold content
2. **Accessibility:** WCAG 2.1 AA compliance, alt text for all images
3. **SEO:** Schema markup for local business, meta descriptions
4. **Mobile:** Fully responsive, fast load times (< 3 seconds)
5. **Conversions:** Clear CTAs above and below fold

---

## VI. FLOATING ELEMENTS (Always Visible)

1. **WhatsApp Button** (Bottom Right)

   - Icon + "Chat with us"
   - Links to: https://wa.me/2349055492610

2. **Call Button** (Mobile Only)

   - Click-to-call: tel:+2349055492610
   - Fixed to top or bottom

3. **Emergency Banner** (If needed)
   - Seasonal or promotional
