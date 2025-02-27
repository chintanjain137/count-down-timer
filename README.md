## Recent Updates

We have made the following additions to the Shopify store:

1. **Countdown Timer Section**  
   - File: `sections/count-down-timer.liquid`  
   - Purpose: Adds a customizable countdown timer to the store.

2. **Countdown Timer JavaScript**  
   - File: `assets/countdown-timer.js`  
   - Purpose: Handles the countdown logic to display a real-time countdown.

3. **Countdown Timer Styles**  
   - You can either:
     - Add the styles directly to your main CSS file.
     - Or create a separate file: `assets/countdown.css`
   - If using a separate file, include it in your theme with:
     ```liquid
     {{ 'countdown.css' | asset_url | stylesheet_tag }}
     ```
