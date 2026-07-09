# Complete Code Injection Setup - No Theme Modifications Required

## 🎯 Everything from Ghost Admin Only

### Clean Theme Files

**default.hbs (bottom part):**
```handlebars
{{!-- Scripts - handle responsive videos, infinite scroll, and navigation dropdowns --}}
<script src="{{asset "built/source.js"}}"></script>

{{!-- Ghost outputs required functional scripts with this tag, it should always be the last thing before the closing body tag --}}
{{ghost_foot}}
```

**navigation.hbs:**
```handlebars
<nav class="gh-navigation-menu">
    {{navigation}}
</nav>
```

That's it! No other theme modifications needed.

---

## 🚀 Complete Code Injection Script

Copy this entire block to **Ghost Admin > Settings > Code Injection > Site Footer**:

```html
<script>
(function() {
    'use strict';

    // =====================================================
    // THEMEIX MENU COMPLETE CONFIGURATION
    // Everything controlled from here - no theme modifications
    // =====================================================

    // Configuration object - modify as needed
    const themeixMenuConfig = {
        // Target element selector - change if your navigation uses different class
        targetElement: '.gh-navigation-menu',
        
        // Automatic class/ID injection
        autoInjectClasses: true,
        autoInjectId: true,
        
        // Behavior settings
        mobileBreakpoint: 768,
        animationDuration: 300,
        closeOnClickOutside: true,
        closeOnEscape: true,
        keyboardNavigation: true,
        mouseDelay: 150,
        childPrefix: '-',
        
        // Default menu settings
        defaultMenuSettings: {
            columns: 3,
            width: 'auto',
            alignment: 'center',
            animation: 'slide'
        }
    };

    // Menu structure configuration
    const menuStructure = {
        version: 1,
        globalSettings: {
            animationDuration: 300,
            mouseDelay: 150,
            closeOnClickOutside: true,
            closeOnEscape: true,
            keyboardNavigation: true,
            defaultMenuSettings: {
                columns: 3,
                width: '800px',
                alignment: 'center',
                'animation': 'slide'
            }
        },
        menus: [
            {
                match: { url: '/home/' },
                type: 'mega',
                settings: {
                    columns: 4,
                    width: '900px',
                    alignment: 'center',
                    animation: 'fade'
                },
                groups: [
                    {
                        title: 'Main Sections',
                        links: [
                            { title: 'Home 1', url: '/home-1/', icon: 'book', badge: 'Popular' },
                            { title: 'Home 2', url: '/home-2/', icon: 'megaphone' },
                            { title: 'Home 3', url: '/home-3/', icon: 'star' },
                            { title: 'Home 4', url: '/home-4/', icon: 'palette' }
                        ]
                    },
                    {
                        title: 'Resources',
                        links: [
                            { title: 'Documentation', url: '/docs/', icon: 'book' },
                            { title: 'Tutorials', url: '/tutorials/', icon: 'star' },
                            { title: 'Examples', url: '/examples/', icon: 'palette' }
                        ]
                    },
                    {
                        title: 'Community',
                        links: [
                            { title: 'Forum', url: '/forum/', icon: 'megaphone' },
                            { title: 'Blog', url: '/blog/', icon: 'book' },
                            { title: 'Newsletter', url: '/newsletter/', badge: 'New', icon: 'heart' }
                        ]
                    },
                    {
                        title: 'Support',
                        links: [
                            { title: 'Help Center', url: '/help/', icon: 'search' },
                            { title: 'Contact Us', url: '/contact/', icon: 'megaphone' },
                            { title: 'FAQ', url: '/faq/', icon: 'book' }
                        ]
                    }
                ]
            },
            {
                match: { url: '/services/' },
                type: 'mega',
                settings: {
                    columns: 3,
                    width: '700px',
                    alignment: 'left',
                    animation: 'slide'
                },
                icon: 'palette',
                groups: [
                    {
                        title: 'Design Services',
                        links: [
                            { 
                                title: 'UI/UX Design', 
                                url: '/services/ui-ux/', 
                                description: 'User-centered design solutions',
                                icon: 'palette' 
                            },
                            { 
                                title: 'Web Design', 
                                url: '/services/web-design/', 
                                description: 'Modern, responsive websites',
                                icon: 'palette' 
                            },
                            { 
                                title: 'Brand Identity', 
                                url: '/services/branding/', 
                                description: 'Complete brand packages',
                                icon: 'star' 
                            }
                        ]
                    },
                    {
                        title: 'Development',
                        links: [
                            { 
                                title: 'Frontend Dev', 
                                url: '/services/frontend/', 
                                description: 'React, Vue, Angular experts',
                                icon: 'search' 
                            },
                            { 
                                title: 'Backend Dev', 
                                url: '/services/backend/', 
                                description: 'Node.js, Python, PHP',
                                icon: 'search' 
                            },
                            { 
                                title: 'Full Stack', 
                                url: '/services/fullstack/', 
                                description: 'End-to-end solutions',
                                badge: 'Popular',
                                icon: 'star' 
                            }
                        ]
                    },
                    {
                        title: 'Consulting',
                        links: [
                            { 
                                title: 'Technical Strategy', 
                                url: '/services/strategy/', 
                                description: 'Architecture and planning',
                                icon: 'megaphone' 
                            },
                            { 
                                title: 'Performance Audit', 
                                url: '/services/audit/', 
                                description: 'Optimization and analysis',
                                icon: 'search' 
                            },
                            { 
                                title: 'Team Training', 
                                url: '/services/training/', 
                                description: 'Skill development programs',
                                icon: 'book' 
                            }
                        ]
                    }
                ]
            },
            {
                match: { title: 'Resources' },
                type: 'mega',
                settings: {
                    columns: 2,
                    width: '600px',
                    alignment: 'right',
                    animation: 'scale'
                },
                groups: [
                    {
                        title: 'Learning',
                        links: [
                            { title: 'Documentation', url: '/docs/', icon: 'book' },
                            { title: 'Tutorials', url: '/tutorials/', icon: 'star' },
                            { title: 'Video Courses', url: '/courses/', badge: 'New', icon: 'megaphone' }
                        ]
                    },
                    {
                        title: 'Tools',
                        links: [
                            { title: 'Code Generator', url: '/tools/generator/', icon: 'search' },
                            { title: 'Theme Builder', url: '/tools/builder/', icon: 'palette' },
                            { title: 'API Reference', url: '/api/', icon: 'book' }
                        ]
                    }
                ],
                featured: {
                    title: 'Featured Resource',
                    description: 'Get started with our comprehensive guide to modern web development.',
                    button: {
                        text: 'Start Learning',
                        url: '/getting-started/'
                    }
                }
            }
        ]
    };

    // =====================================================
    // INITIALIZATION - Don't modify below this line
    // =====================================================
    
    function initializeThemeixMenu() {
        // Make config available globally
        window.themeixMenuConfig = menuStructure;
        
        // Wait for ThemeixMenu to be available
        const checkThemeixMenu = setInterval(function() {
            if (typeof ThemeixMenu !== 'undefined' && ThemeixMenu.init) {
                clearInterval(checkThemeixMenu);
                
                try {
                    console.log('ThemeixMenu found, initializing with configuration...');
                    ThemeixMenu.init(themeixMenuConfig);
                    console.log('ThemeixMenu initialized successfully!');
                } catch (error) {
                    console.error('Error initializing ThemeixMenu:', error);
                }
            }
        }, 100);

        // Timeout after 5 seconds
        setTimeout(function() {
            clearInterval(checkThemeixMenu);
            if (typeof ThemeixMenu === 'undefined') {
                console.warn('ThemeixMenu not found after 5 seconds. Please ensure the themeix-menu.js script is loaded.');
            }
        }, 5000);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeThemeixMenu);
    } else {
        initializeThemeixMenu();
    }

})();
</script>
```

---

## 🎨 Ghost Navigation Setup

### Simple Navigation (Ghost Admin > Settings > Navigation):
```
Home
Services
Resources
About
Contact
```

### Multi-Level Dropdowns (using dash notation):
```
Home
- Home 1
-- Home 2
--- Home 3
---- Home 4
Services
- Web Design
-- UI/UX
--- User Research
- Development
Resources
About
Contact
```

---

## ⚙️ Configuration Options

### Target Element
Change if your navigation uses a different class:
```javascript
targetElement: '.gh-navigation-menu', // Change to match your theme
```

### Behavior Settings
```javascript
mobileBreakpoint: 768,              // Mobile breakpoint in pixels
animationDuration: 300,             // Animation speed in milliseconds
mouseDelay: 150,                    // Hover delay before opening
closeOnClickOutside: true,          // Close when clicking outside menu
closeOnEscape: true,                // Close with Escape key
keyboardNavigation: true,           // Enable arrow key navigation
```

### Menu Settings
```javascript
defaultMenuSettings: {
    columns: 3,                      // Number of columns (2-5)
    width: 'auto',                   // Menu width ('auto', '100%', '800px', etc.)
    alignment: 'center',             // 'left', 'center', or 'right'
    animation: 'slide'               // 'fade', 'slide', 'scale', or 'flip'
}
```

---

## 🔧 Customization Examples

### Change Target Element
```javascript
targetElement: '.custom-navigation-class',
```

### Different Layout for Specific Menu
```javascript
{
    match: { url: '/courses/' },
    type: 'mega',
    settings: {
        columns: 2,              // 2 columns instead of default
        width: '600px',          // Custom width
        alignment: 'left',       // Left aligned
        animation: 'fade'        // Fade animation
    },
    // ... rest of configuration
}
```

### Match by Title Instead of URL
```javascript
{
    match: { title: 'Courses' },  // Match by title
    type: 'mega',
    // ... rest of configuration
}
```

### Match Multiple Criteria
```javascript
{
    match: { 
        url: '/courses/',
        title: 'Courses'
    },
    // ... rest of configuration
}
```

---

## 🎯 How It Works

1. **Configuration** - Set up target element and behavior settings
2. **Menu Structure** - Define mega menus and dropdowns
3. **Ghost Navigation** - Use dash notation for multi-level dropdowns
4. **Automatic Matching** - System matches your config to Ghost navigation
5. **Auto-Injection** - Classes and IDs added automatically

---

## ✅ Features

- **Complete theme independence** - No theme file modifications
- **All configuration from Ghost Admin** - Single point of control
- **Automatic class/ID injection** - No manual HTML changes
- **Multi-level dropdowns** - Unlimited nesting depth
- **Mega menus** - Multi-column layouts
- **Responsive design** - Mobile and desktop optimized
- **Accessibility** - Keyboard navigation and ARIA attributes
- **Smooth animations** - Multiple animation types
- **Theme update safe** - Config survives theme updates

---

## 🐛 Troubleshooting

### Menu Not Appearing
- Check browser console for errors
- Verify `targetElement` matches your navigation class
- Ensure JSON syntax is valid
- Check that ThemeixMenu script is loaded

### Configuration Not Loading
- Verify Code Injection script is in **Site Footer**
- Check for JavaScript syntax errors
- Ensure script is within proper `<script>` tags
- Clear browser cache and reload

### Styling Issues
- Verify CSS files are properly linked in theme
- Check for conflicting CSS in other files
- Ensure navigation element exists in DOM

---

## 📝 Quick Start Checklist

- [ ] Clean theme files (remove any existing menu initialization)
- [ ] Add navigation.hbs with basic structure
- [ ] Remove initialization script from default.hbs
- [ ] Copy complete Code Injection script to Site Footer
- [ ] Configure target element if needed
- [ ] Set up Ghost navigation with dash notation
- [ ] Test menu functionality
- [ ] Adjust configuration as needed

Your menu system is now completely controlled from Ghost Code Injection! 🎉