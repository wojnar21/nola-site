# NOLA Restaurant App - Project Context & Rules

## Color Palette
- Primary Dark (Burgundy): `#571723`
- Primary Light (Beige): `#e9e0da`

## Typography
- Display Font: `Brygada 1918`
- Text: Standard body text fonts inherited from Tailwind.
- The animations rely on the `nav-link-animated` class in standard CSS.

## Desktop Layout
- Persistent header on desktop (`<header className="hidden md:block...">`).
- Smooth scrolling navigation.
- Desktop navigation links use a custom CSS animated underline (`nav-link-animated`), where a beige underline appears from the center on hover.

## Mobile Layout Preferences
- **Hamburger Menu**: In the top right corner (`fixed top-5 right-5`). Colors dynamically change based on the background color when scrolling.
- **Back to Top Arrow**: A floating upwards arrow (`keyboard_arrow_up`) on the top left corner (`fixed top-5 left-5`), which appears only when scrolling down.
- **Mobile Menu Dropdown**: 
  - Overlays slightly on the right side.
  - Background: `#571723` (Burgundy).
  - Width: `max(20vw, 100px)`.
  - Content: Vertical list of nav sections.
  - Links: White/Beige text (`#e9e0da`). On hover/touch, they have the exact same animated bottom border as the desktop nav (`nav-link-animated`).
- Touch elements: High emphasis on usability, avoiding huge full-screen overlays when not needed, preferring clean right-aligned dropdowns for the mobile menu.

**CRITICAL GUIDELINE**:
When modifying the application, this layout, color scheme, responsive setup, and class configurations must be preserved EXACTLY as they are. This represents the finalized UI paradigm for NOLA Toruń.

## Specific Component Rules
- **Interactive Plates (Menu Section)**: The hummus plate image (`#hummus-plate-1`) has a deliberate, mathematically calculated visual offset to center it perfectly on the underlying white circle mask. This offset must ALWAYS be exactly `-translate-x-[0.45%] -translate-y-[1.45%]`. Do not change or remove these classes under any circumstances.