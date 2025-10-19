# Theme Testing Guide

## Quick Test Dates

Copy and paste these lines into `assets/js/main.js` (line ~187) to test each theme:

### Test Vasant Panchami (February)
```javascript
const now = new Date(2025, 1, 5); // February 5, 2025
```
Expected:
- Yellow and white color scheme
- 📚 📖 symbols on section titles
- "Happy Vasant Panchami! Celebrating Goddess Saraswati" banner

### Test Holi (March)
```javascript
const now = new Date(2025, 2, 15); // March 15, 2025
```
Expected:
- Multi-color rainbow theme
- 🎨 🌈 symbols on section titles
- "Happy Holi! Festival of Colors" banner

### Test Exam Season (April-May)
```javascript
const now = new Date(2025, 3, 20); // April 20, 2025
```
Expected:
- Blue and green professional theme
- 📝 🎯 symbols on section titles
- "Exam Season! Stay focused" banner

### Test Independence Day (August 15)
```javascript
const now = new Date(2025, 7, 15); // August 15, 2025
```
Expected:
- Tricolor (saffron/white/green) theme
- 🇮🇳 🪔 symbols on section titles
- "Happy Independence Day!" banner

### Test Engineer's Day (September 15)
```javascript
const now = new Date(2025, 8, 15); // September 15, 2025
```
Expected:
- Grey and orange industrial theme
- ⚙️ 🔧 symbols on section titles
- "Happy Engineer's Day!" banner

### Test Chhath Puja (September-October)
```javascript
const now = new Date(2025, 9, 5); // October 5, 2025
```
Expected:
- Golden and saffron warm theme
- ☀️ symbols on section titles
- Sun offering animation on load
- "Happy Chhata Puja!" banner

### Test Default Theme (Rest of Year)
```javascript
const now = new Date(2025, 11, 25); // December 25, 2025
```
Expected:
- Blue and purple tech theme
- No special decorations
- No banner
- No animation container

## Testing Process

1. Open `assets/js/main.js`
2. Find line ~187: `const now = new Date();`
3. Replace with one of the test dates above
4. Save the file
5. Reload your browser (Ctrl+F5 or Cmd+Shift+R)
6. Observe:
   - Background color changes
   - Banner message
   - Section title decorations
   - Animation (for Chhath)
7. Wait 6 seconds to see banner fade out
8. Test another theme by changing the date again

## Browser Console Verification

Open browser console (F12) and look for:
```
✅ Seasonal theme activated: vasant-panchami
✅ Seasonal theme activated: holi
✅ Seasonal theme activated: exam-season
✅ Seasonal theme activated: independence-day
✅ Seasonal theme activated: engineers-day
✅ Seasonal theme activated: chhath
🌟 Default theme active (no seasonal celebration)
```

## Visual Checklist

For each theme, verify:
- [ ] Background color matches theme palette
- [ ] Banner shows correct message
- [ ] Banner has theme-appropriate colors
- [ ] Section titles have decorative emojis
- [ ] Banner fades out after 6 seconds
- [ ] Banner element removed after fade
- [ ] All text remains readable
- [ ] Navigation menu styled correctly
- [ ] Project cards styled correctly
- [ ] Links have appropriate hover effects

## Common Issues

**Theme not activating:**
- Check browser console for errors
- Verify date format (month is 0-indexed)
- Clear browser cache (Ctrl+Shift+Delete)

**Banner not showing:**
- Check HTML has `<div class="theme-banner">`
- Verify CSS `.theme-banner` styles loaded
- Check z-index not covered by other elements

**Colors not changing:**
- Verify CSS custom properties defined
- Check body class applied in DevTools
- Ensure no CSS conflicts

**Animation not working (Chhath only):**
- Check canvas element exists in HTML
- Verify JavaScript console for errors
- Check canvas dimensions set correctly

## Restore Production Date

After testing, restore the original line:
```javascript
const now = new Date(); // Restore for production
```

This ensures themes activate automatically based on the actual calendar date.

## Mobile Testing

Test on mobile devices:
1. Use Chrome DevTools mobile emulator
2. Check banner text doesn't overflow
3. Verify decorative emojis display correctly
4. Test touch interactions
5. Check animation performance (Chhath)

## Performance Testing

Monitor performance:
1. Open Performance tab in DevTools
2. Record during theme activation
3. Check for:
   - Smooth 60fps animations
   - No memory leaks
   - Quick theme transitions
   - Efficient CSS repaints

---

**Remember:** Always restore `const now = new Date();` before deploying to production!
