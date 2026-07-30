# ITURA — The Future of African Luxury

Premium Concept Store & Cultural Hub connecting Africa's design vanguard with global luxury consumers.

## Design System & Brand Color Palette

The ITURA digital experience is built upon a curated, high-contrast luxury aesthetic derived from the exact brand guidelines and client presentation materials:

- **Primary Brand Color (Royal Blue)**: `#18047b`
  - Used for primary CTA buttons, interactive lookbook node highlights, active accordion badges, and editorial highlights.
- **Luxury Accent (Editorial Gold)**: `#D4AF37`
  - Used for section numbering (`01`, `02`, etc.), subtle borders, micro-interactions, and confidential investor tags.
- **Primary Light Background (Alice White)**: `#F0F8FF`
  - Used across the light sections (About, Concept Accordion, Roadmap, Business Model, and Footer) to provide a soft, high-end editorial luminosity while contrasting cleanly with our dark sections.
- **Secondary Light Border / Tint**: `#D8E5F2` & `#E6F0FA`
  - Used for card containers, divider lines, and staggered interactive panels.
- **Primary Dark Background**: `#0A0A0A` & `#141414`
  - Used for the Hero Showcase, Cocktail Events, Interactive Lookbook Archive, and confidential VIP RSVP sections.

## Content Integrity & Verbatim Source Files

All textual content across the ITURA web platform is strictly and verbatim sourced from the official client files inside the project repository:
1. `ITURA Landing Page.txt`
2. `ITURA Deck-2.pdf`

No external or hallucinated marketing copy is introduced, ensuring 100% fidelity to client investment materials.

## Key Features & Interactive Architecture

1. **Fashionable Editorial Hero Showcase**:
   - Features layered opacity cross-fade transitions and smooth **Ken Burns zoom effects** using authentic client images from `/public/Hero_Images`.
   - Optimized image luminosity and clean, distraction-free UI with scaled header logos (`iturawhite.png`).
2. **Interactive Concept Accordion**:
   - Dynamic expanding pillar cards detailing the Parisian destination, curated selections, and global e-commerce reach.
3. **Interactive Concept Lookbook Archive**:
   - Precision inspection nodes (`[+]`) allowing investors and visitors to explore core market opportunities, validation metrics, and storytelling zones.
4. **Paris Campaign & Cocktail Galleries**:
   - Smooth horizontal tilt-cards and drag-scroll carousels featuring client photography (`/Paris_campaign` and `/Paris_cocktail`).
5. **Confidential VIP Investor RSVP & Contact**:
   - Direct inquiry flows and verbatim contact details (`ituraafrica@gmail.com`).

## Running Locally & Preview

To start the local development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.
To verify the production build:

```bash
npm run build && npm run preview
```
