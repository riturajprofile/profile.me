# Seasonal Themes System

## Overview
This portfolio features an automatic seasonal theming system that celebrates Indian festivals, national holidays, and significant occasions throughout the year. The theme activates automatically based on the calendar date and reverts to the default theme when the period ends.

## Theme Calendar

### 📚 Vasant Panchami (February)
**Activation:** Entire month of February
**Celebration:** Goddess Saraswati - Knowledge, Wisdom & Learning

**Color Palette:**
- Primary: Golden Yellow (#FFD700)
- Accent: Pure White (#FFFFFF)
- Secondary: Deep Blue (#1565C0)
- Text: Navy (#1A237E)

**Visual Elements:**
- 📚 📖 Book and learning symbols
- Soft yellow background with subtle patterns
- Clean, scholarly aesthetic
- Banner: "Happy Vasant Panchami! Celebrating Goddess Saraswati - Knowledge, Wisdom & Learning 📚"

---

### 🎨 Holi (March)
**Activation:** Entire month of March
**Celebration:** Festival of Colors - Unity, Joy & Spring

**Color Palette:**
- Multi-color vibrant theme
- Pink (#FF1744), Blue (#304FFE), Yellow (#FFD600), Green (#00E676), Orange (#FF6F00)
- Rainbow gradients throughout

**Visual Elements:**
- 🎨 🌈 Art and rainbow symbols
- Colorful background patterns
- Vibrant, energetic aesthetic
- Banner: "Happy Holi! Festival of Colors - Celebrating Unity, Joy & New Beginnings 🌈"

---

### 📝 Exam Season (April - May)
**Activation:** April and May
**Celebration:** Academic Focus Period

**Color Palette:**
- Primary: Professional Blue (#1976D2)
- Accent: Success Green (#4CAF50)
- Background: Clean Light (#F5F7FA)
- Text: Dark Grey (#263238)

**Visual Elements:**
- 📝 🎯 Study and target symbols
- Minimal, distraction-free design
- Calm, focused atmosphere
- Banner: "Exam Season! Stay focused, stay determined. You've got this! 📝🎯"

---

### 🇮🇳 Independence Day (August 15)
**Activation:** August 15 only
**Celebration:** India's Independence Day

**Color Palette:**
- Tricolor Theme
- Saffron (#FF9933)
- White (#FFFFFF)
- Green (#138808)
- Accent: Navy Blue (#000080) - Ashoka Chakra

**Visual Elements:**
- 🇮🇳 🪔 National symbols
- Vertical tricolor gradient
- Patriotic, ceremonial design
- Banner: "Happy Independence Day! Celebrating 78 years of freedom & democracy 🇮🇳"

---

### ⚙️ Engineer's Day (September 15)
**Activation:** September 15 only
**Celebration:** M. Visvesvaraya's Birthday - Engineering Excellence

**Color Palette:**
- Primary: Industrial Grey (#424242)
- Accent: Innovation Orange (#FF9800)
- Background: Clean White (#FAFAFA)
- Text: Deep Grey (#263238)

**Visual Elements:**
- ⚙️ 🔧 Gear and tool symbols
- Technical, modern aesthetic
- Precision-focused design
- Banner: "Happy Engineer's Day! Celebrating innovation, problem-solving & building the future ⚙️"

---

### ☀️ Chhata Puja (September - October)
**Activation:** September and October (excluding Sept 15)
**Celebration:** Bihar's Harvest Festival - Gratitude to Surya Dev

**Color Palette:**
- Golden Yellow (#FFD700)
- Saffron (#FF6B35)
- Warm Cream backgrounds
- Earthy Brown text (#5D4E37)

**Visual Elements:**
- ☀️ Sun symbols
- Harvest theme patterns
- Warm, spiritual atmosphere
- Animated sun offering with 80 golden petals
- Banner: "Happy Chhata Puja! Celebrating Bihar's harvest festival & gratitude to Surya Dev 🙏"

**Special Animation:**
A beautiful sun offering animation plays on page load, featuring:
- Radial sun symbol with 8 golden rays
- 80 petal-shaped particles rising upward
- Golden color palette with 15 traditional Chhath colors
- Gentle gravity and slow fade for spiritual feel

---

## Technical Implementation

### Date Detection Logic
```javascript
const currentMonth = now.getMonth(); // 0-11 (January = 0)
const currentDate = now.getDate();   // 1-31

// February
if (currentMonth === 1) {
  activeTheme = 'vasant-panchami';
}
// March
else if (currentMonth === 2) {
  activeTheme = 'holi';
}
// April-May
else if (currentMonth >= 3 && currentMonth <= 4) {
  activeTheme = 'exam-season';
}
// August 15
else if (currentMonth === 7 && currentDate === 15) {
  activeTheme = 'independence-day';
}
// September 15
else if (currentMonth === 8 && currentDate === 15) {
  activeTheme = 'engineers-day';
}
// Sept-Oct (excluding Sept 15)
else if (currentMonth >= 8 && currentMonth <= 9 && !(currentMonth === 8 && currentDate === 15)) {
  activeTheme = 'chhath';
}
// Default theme (rest of year)
else {
  activeTheme = 'default';
}
```

### CSS Theme Structure
Each theme defines custom CSS properties:
```css
body.theme-name {
  --primary: #color;
  --accent: #color;
  --bg: #color;
  --text: #color;
  /* ... more variables */
}
```

### Auto-Hide Banner
The theme banner appears on first load and automatically fades out after 6 seconds:
1. Banner visible for 6 seconds
2. 1.2-second smooth fade animation
3. Element removed from DOM
4. User can interact with portfolio without distraction

### Theme Decorations
Each theme adds decorative emojis to section titles:
- Vasant Panchami: 📚 ... 📖
- Holi: 🎨 ... 🌈
- Exam Season: 📝 ... 🎯
- Independence Day: 🇮🇳 ... 🪔
- Engineer's Day: ⚙️ ... 🔧
- Chhath: ☀️

## Customization

### Changing Theme Dates
Edit `assets/js/main.js` in the theme detection section to modify activation dates.

### Adjusting Colors
Modify the CSS custom properties in `assets/css/styles.css` under each theme class.

### Banner Message
Update the `themeBannerMessage` variable in `main.js` for each theme.

### Banner Duration
Change the `setTimeout` values in `main.js`:
- First number (6000): Display duration in milliseconds
- Second number (1200): Fade animation duration

### Adding New Themes
1. Add date detection logic in `main.js`
2. Create CSS theme variables in `styles.css`
3. Add decorative elements in CSS
4. Update banner message
5. (Optional) Create custom animation

## Testing Themes

To test a specific theme without waiting for the calendar date:

1. Open `assets/js/main.js`
2. Find the line: `const now = new Date();`
3. Replace with: `const now = new Date(2025, 1, 5);` (Feb 5, 2025 for Vasant Panchami)
4. Reload the page

Month values (second parameter):
- 0 = January, 1 = February, 2 = March, etc.

Example dates:
```javascript
new Date(2025, 1, 5);    // Vasant Panchami (Feb)
new Date(2025, 2, 10);   // Holi (March)
new Date(2025, 3, 20);   // Exam Season (April)
new Date(2025, 7, 15);   // Independence Day (Aug 15)
new Date(2025, 8, 15);   // Engineer's Day (Sept 15)
new Date(2025, 9, 5);    // Chhath (October)
```

## Performance Considerations

- Themes activate instantly (no page reload)
- CSS custom properties enable efficient theme switching
- Background patterns use minimal opacity (3%) for subtle effect
- Animations use `requestAnimationFrame` for smooth 60fps
- Banner auto-removal prevents memory leaks

## Cultural Significance

### Why These Themes?

**Vasant Panchami:** Celebrates knowledge and learning, honoring Goddess Saraswati. A perfect theme for students and knowledge workers.

**Holi:** India's most colorful festival celebrating the victory of good over evil, unity, and the arrival of spring.

**Exam Season:** Practical support for students during critical academic months with a calm, focused design.

**Independence Day:** National pride celebrating India's freedom struggle and democratic values.

**Engineer's Day:** Honors M. Visvesvaraya's contributions to engineering and celebrates technical innovation.

**Chhath Puja:** Ancient Hindu Vedic festival from Bihar/Jharkhand, expressing gratitude to Surya Dev (Sun God) for sustaining life. A deeply spiritual harvest festival.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Custom Properties required
- Canvas API for Chhath animation
- ES6+ JavaScript features

## Maintenance

### Annual Updates
- Update year references in banner messages
- Verify calendar dates (some festivals change based on lunar calendar)
- Test all themes before their activation period
- Update documentation if themes change

### Adding Animations
To add theme-specific animations:
1. Create animation class in `main.js`
2. Add conditional initialization based on `activeTheme`
3. Use canvas for complex particle effects
4. Match color palette to theme

## Credits

**Cultural Research:** Bihar's Chhath Puja traditions, Indian festivals
**Design:** Traditional festival color palettes and modern web aesthetics
**Implementation:** Pure vanilla JavaScript, CSS3, HTML5 Canvas

## Future Enhancements

Potential additions:
- Diwali theme (October-November)
- Republic Day (January 26)
- Gandhi Jayanti (October 2)
- Custom animations for each theme
- Sound effects toggle
- Theme preference saving
- Regional festival options

---

**Note:** This is a living document. Theme dates and content may be updated to reflect cultural calendars and user feedback.

Last Updated: January 2025
