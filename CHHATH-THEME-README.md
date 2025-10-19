# 🌅 Chhata Puja (Chhath) Seasonal Theme

## Overview
Your portfolio now features an **automatic seasonal theme** that celebrates **Chhata Puja** (Chhath Festival) - Bihar and Jharkhand's most sacred harvest festival dedicated to Surya Dev (Sun God).

## Theme Activation
- **Active Period**: September & October (Months 8-9)
- **Automatic**: No manual toggle needed
- **Default Theme**: Restored automatically for rest of the year

## What Changes During Chhath Season?

### 🎨 Visual Theme
**Color Palette:**
- Primary: Golden Yellow (#FFD700) - Sun God
- Accent: Saffron (#FF6B35) - Spiritual purity
- Background: Warm cream tones (#FFFAF0)
- Text: Earthy browns (#5D4E37)

**Background:**
- Subtle golden dot pattern (3% opacity)
- Warm gradient overlays

### ☀️ Decorative Elements
- **Sun icons (☀️)** before all section titles
- **Animated sun symbols** in festival banner
- **Golden glow effects** on navigation bar
- **Harvest-themed borders** and accents

### 🎆 Opening Animation
**Sun Offering Animation:**
- Golden sun rises from bottom center
- Rotates gently representing daily prayers
- Explodes into 80 flower petals at peak
- Petals float down gracefully
- Represents traditional offerings: flowers, fruits, sugarcane

**Petal Effects:**
- Elliptical petal shapes (not circles)
- Rotation and gentle falling motion
- Golden glow and inner highlights
- Fade gracefully over time

### 🎊 Festival Banner
- **Top banner** with greeting message
- Animated sun icons on both sides
- Message: "Happy Chhata Puja! Celebrating Bihar's harvest festival & gratitude to Surya Dev 🙏"

## Cultural Significance

### What is Chhata Puja?
- **Ancient Hindu festival** dedicated to Sun God (Surya Dev)
- **4-day celebration** of gratitude for harvest and prosperity
- **Primarily celebrated in**: Bihar, Jharkhand, Uttar Pradesh
- **Core ritual**: Offering prayers to setting & rising sun at river banks

### Festival Phases:
1. **Nahai Khay** (Day 1): Purification & preparation
2. **Kharna** (Day 2): Day-long fasting
3. **Sandhya Arghya** (Day 3 evening): Prayers to setting sun
4. **Surya Arghya** (Day 4 morning): Final prayers to rising sun

### Symbols in Our Theme:
- **Sun**: Surya Dev, central deity
- **Golden colors**: Harvest, prosperity, sunlight
- **Saffron**: Spiritual purity
- **Flower petals**: Traditional offerings in bamboo baskets
- **Rising motion**: Morning sun prayers (Surya Arghya)

## Technical Implementation

### CSS Variables
Theme uses CSS custom properties that switch automatically:
```css
body.chhath-theme {
  --primary: #FFD700;      /* Golden yellow */
  --accent: #FF6B35;       /* Saffron */
  --bg: #FFFAF0;          /* Warm cream */
  --text: #5D4E37;        /* Earth brown */
}
```

### JavaScript Logic
```javascript
const currentMonth = new Date().getMonth();
if (currentMonth === 8 || currentMonth === 9) {
  document.body.classList.add('chhath-theme');
}
```

### Files Modified:
1. `assets/css/styles.css` - Theme variables & styles
2. `assets/js/main.js` - Theme activation logic & animation
3. `index.html` - Festival banner element

## How to Test

### Test Chhath Theme (Force Activation):
1. Open browser DevTools (F12)
2. Console: `document.body.classList.add('chhath-theme')`
3. Reload page to see animation

### Test Default Theme:
1. Console: `document.body.classList.remove('chhath-theme')`
2. Or simply wait for November-August

## Customization

### Change Active Months:
Edit in `main.js`:
```javascript
// Current: September (8) and October (9)
if (currentMonth === 8 || currentMonth === 9)

// Example: Add November
if (currentMonth === 8 || currentMonth === 9 || currentMonth === 10)
```

### Disable Theme:
Comment out in `main.js`:
```javascript
// if (currentMonth === 8 || currentMonth === 9) {
//   document.body.classList.add('chhath-theme');
// }
```

### Customize Colors:
Edit CSS variables in `styles.css`:
```css
body.chhath-theme {
  --primary: #YOUR_COLOR;
  --accent: #YOUR_COLOR;
}
```

## Benefits

### Cultural Pride
- Celebrates Bihar/Jharkhand heritage
- Educational for visitors
- Authentic cultural representation

### Professional Design
- Non-intrusive theme changes
- Maintains readability
- Subtle, tasteful implementation

### User Experience
- Automatic seasonal adaptation
- No manual management needed
- Smooth transitions

## Browser Compatibility
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile responsive
- ✅ CSS custom properties supported
- ✅ Canvas animation supported

## Performance
- **No external dependencies**
- **Lightweight**: <5KB additional code
- **60fps animation**: Optimized canvas rendering
- **Auto-cleanup**: Animation removes itself after completion

## Troubleshooting

### Theme not showing in October?
- Check browser date/time settings
- Clear cache and reload
- Open DevTools console for activation message

### Animation not playing?
- Ensure JavaScript is enabled
- Check if element exists: `document.getElementById('rocket-launch')`
- Animation only runs during Chhath season

### Colors look wrong?
- Check if `chhath-theme` class is on `<body>`
- Verify CSS custom properties are supported
- Try hard refresh (Ctrl+Shift+R)

## Credits
**Cultural Consultant**: Based on authentic Chhath Puja traditions
**Design**: Inspired by traditional Bihar/Jharkhand festival aesthetics
**Implementation**: Automatic seasonal theme system

---

## 🙏 Happy Chhata Puja!
*Celebrating Bihar's rich cultural heritage and gratitude to Surya Dev*
