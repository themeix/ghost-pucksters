# Themeix Menu Configuration Examples

## Example 1: Minimal Setup (Auto-Detection)
```javascript
// Simple auto-detection with default settings
ThemeixMenu.init();
```

## Example 2: Custom Target with Auto-Injection
```javascript
// Target specific Ghost navigation element with auto-injection
ThemeixMenu.init({
    targetElement: '.gh-navigation-menu',
    autoInjectClasses: true,
    autoInjectId: true
});
```

## Example 3: Custom Target with Manual Classes
```javascript
// Disable auto-injection if you prefer manual class management
ThemeixMenu.init({
    targetElement: '.gh-navigation-menu',
    autoInjectClasses: false,
    autoInjectId: false
});
```

## Example 4: Full Configuration
```javascript
// Complete configuration with all options
ThemeixMenu.init({
    targetElement: '.gh-navigation-menu',
    autoInjectClasses: true,
    autoInjectId: true,
    mobileBreakpoint: 768,
    animationDuration: 300,
    closeOnClickOutside: true,
    closeOnEscape: true,
    keyboardNavigation: true,
    mouseDelay: 150,
    childPrefix: '-',
    jsonConfigPath: '/assets/js/lib/themeix-menu-config.json',
    defaultMenuSettings: {
        columns: 3,
        width: 'auto',
        alignment: 'left',
        animation: 'slide'
    }
});
```

## Example 5: Multi-Site Configuration
```javascript
// Different configurations for different sites/environments
const isProduction = window.location.hostname === 'yourdomain.com';

ThemeixMenu.init({
    targetElement: '.gh-navigation-menu',
    autoInjectClasses: true,
    autoInjectId: true,
    mouseDelay: isProduction ? 150 : 0, // Faster hover in development
    closeOnClickOutside: true,
    defaultMenuSettings: {
        columns: isProduction ? 4 : 2,
        animation: isProduction ? 'fade' : 'slide'
    }
});
```

## Example 6: Conditional Initialization
```javascript
// Only initialize if navigation element exists
const navElement = document.querySelector('.gh-navigation-menu');
if (navElement) {
    ThemeixMenu.init({
        targetElement: '.gh-navigation-menu',
        autoInjectClasses: true,
        autoInjectId: true
    });
}
```

## Example 7: Dynamic Target Selection
```javascript
// Use different navigation based on page type
const isHomePage = document.body.classList.contains('home-template');
const targetSelector = isHomePage ? '.main-nav' : '.secondary-nav';

ThemeixMenu.init({
    targetElement: targetSelector,
    autoInjectClasses: true,
    autoInjectId: true
});
```

## Example 8: With JSON Configuration Override
```javascript
// Load external JSON configuration
ThemeixMenu.init({
    targetElement: '.gh-navigation-menu',
    autoInjectClasses: true,
    autoInjectId: true,
    jsonConfigPath: '/assets/js/lib/themeix-menu-config.json',
    defaultMenuSettings: {
        columns: 3,
        width: '800px',
        alignment: 'center',
        animation: 'fade'
    }
});
```

## Example 9: Mobile-Optimized Configuration
```javascript
// Optimize for mobile devices
const isMobile = window.innerWidth <= 768;

ThemeixMenu.init({
    targetElement: '.gh-navigation-menu',
    autoInjectClasses: true,
    autoInjectId: true,
    mouseDelay: isMobile ? 0 : 150, // No hover delay on mobile
    keyboardNavigation: !isMobile, // Disable keyboard nav on mobile
    closeOnClickOutside: !isMobile, // Don't close on outside click on mobile
    defaultMenuSettings: {
        columns: isMobile ? 1 : 3, // Single column on mobile
        width: isMobile ? '100%' : 'auto',
        animation: isMobile ? 'fade' : 'slide'
    }
});
```

## Example 10: Event-Driven Initialization
```javascript
// Initialize when specific event occurs
document.addEventListener('DOMContentLoaded', function() {
    // Wait for other dependencies to load
    setTimeout(function() {
        ThemeixMenu.init({
            targetElement: '.gh-navigation-menu',
            autoInjectClasses: true,
            autoInjectId: true
        });
    }, 100);
});
```

## Example 11: With Custom CSS Variables
```javascript
// Initialize and set custom CSS variables
ThemeixMenu.init({
    targetElement: '.gh-navigation-menu',
    autoInjectClasses: true,
    autoInjectId: true,
    defaultMenuSettings: {
        columns: 4,
        width: '900px',
        alignment: 'center',
        animation: 'scale'
    }
});

// Set custom CSS variables after initialization
document.documentElement.style.setProperty('--tdgm-menu-width', '100%');
document.documentElement.style.setProperty('--tdgm-dropdown-width', '280px');
document.documentElement.style.setProperty('--tdgm-badge-background', '#ff6b6b');
```

## Example 12: Debug Configuration
```javascript
// Enable debug mode for troubleshooting
ThemeixMenu.init({
    targetElement: '.gh-navigation-menu',
    autoInjectClasses: true,
    autoInjectId: true,
    debug: true // Enable console logging
});
```

## Example 13: Backward Compatible Setup
```javascript
// Old selector style still works
ThemeixMenu.init({
    selector: '#my-custom-nav',
    autoInjectClasses: true,
    autoInjectId: true
});
```

## Example 14: Ghost Code Injection Integration
```javascript
// Can be used with Ghost's Code Injection feature
// In Site Footer (Code Injection):
<script>
document.addEventListener('DOMContentLoaded', function() {
    ThemeixMenu.init({
        targetElement: '.gh-navigation-menu',
        autoInjectClasses: true,
        autoInjectId: true
    });
});
</script>
```

## Example 15: Programmatic Control
```javascript
// Initialize and then use API methods
ThemeixMenu.init({
    targetElement: '.gh-navigation-menu',
    autoInjectClasses: true,
    autoInjectId: true
});

// Open specific menu
ThemeixMenu.open('menu-0');

// Close all menus
ThemeixMenu.close();

// Listen to events
ThemeixMenu.on('menu:init', function(data) {
    console.log('Menu initialized:', data);
});
```