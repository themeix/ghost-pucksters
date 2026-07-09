# Minimal Code Injection - Everything from Ghost Admin

## 🚀 Copy & Paste to Ghost Admin

Go to **Ghost Admin > Settings > Code Injection > Site Footer** and add this:

```html
<script>
(function() {
    'use strict';

    // =====================================================
    // THEMEIX MENU - CONFIGURATION
    // Everything controlled from Ghost Admin
    // =====================================================

    // Make configuration available globally
    window.themeixMenuConfig = {
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
                animation: 'slide'
            }
        },
        menus: [
            {
                match: { url: '/courses/' },
                type: 'mega',
                settings: {
                    columns: 4,
                    width: '900px',
                    alignment: 'center',
                    animation: 'fade'
                },
                groups: [
                    {
                        title: 'Learning Paths',
                        links: [
                            { title: 'All Courses', url: '/courses/', icon: 'book' },
                            { title: 'Beginner', url: '/courses/beginner/', icon: 'star', badge: 'Popular' },
                            { title: 'Intermediate', url: '/courses/intermediate/', icon: 'star' },
                            { title: 'Advanced', url: '/courses/advanced/', icon: 'star' }
                        ]
                    },
                    {
                        title: 'Topics',
                        links: [
                            { title: 'Web Development', url: '/courses/web-dev/', icon: 'palette' },
                            { title: 'Data Science', url: '/courses/data-science/', icon: 'search' },
                            { title: 'Design', url: '/courses/design/', icon: 'palette' },
                            { title: 'Business', url: '/courses/business/', icon: 'megaphone' }
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
                    }
                ]
            }
        ]
    };

    // Initialize with custom target element
    function initializeThemeixMenu() {
        const checkThemeixMenu = setInterval(function() {
            if (typeof ThemeixMenu !== 'undefined' && ThemeixMenu.init) {
                clearInterval(checkThemeixMenu);
                
                try {
                    console.log('ThemeixMenu found, initializing...');
                    
                    ThemeixMenu.init({
                        targetElement: '.gh-navigation-menu',
                        autoInjectClasses: true,
                        autoInjectId: true,
                        mouseDelay: 150,
                        closeOnClickOutside: true
                    });
                    
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
                console.warn('ThemeixMenu not found after 5 seconds.');
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

## 📋 Clean Theme Files

**default.hbs (bottom):**
```handlebars
<script src="{{asset "built/source.js"}}"></script>
{{ghost_foot}}
```

**navigation.hbs:**
```handlebars
<nav class="gh-navigation-menu">
    {{navigation}}
</nav>
```

---

## 🎯 Ghost Navigation Setup

**Ghost Admin > Settings > Navigation:**
```
Home
Courses
About
Contact
```

For **multi-level dropdowns**, use dash notation:
```
Home
- Home 1
-- Home 2
--- Home 3
---- Home 4
Courses
About
Contact
```

---

## ⚙️ Quick Configuration

### Change Target Element
```javascript
ThemeixMenu.init({
    targetElement: '.custom-nav-class',  // Your navigation class
});
```

### Different Menu Settings
```javascript
menus: [
    {
        match: { url: '/your-page/' },
        type: 'mega',
        settings: {
            columns: 2,              // 2 columns
            width: '600px',          // Custom width
            alignment: 'left',       // Left aligned
            animation: 'fade'        // Fade animation
        },
        groups: [
            {
                title: 'Your Group',
                links: [
                    { title: 'Link 1', url: '/link-1/', icon: 'book' },
                    { title: 'Link 2', url: '/link-2/', icon: 'star' }
                ]
            }
        ]
    }
]
```

### Match by Title
```javascript
match: { title: 'Courses' },  // Instead of URL
```

---

## 🎨 Available Icons

- `book` - Documentation/learning
- `megaphone` - Announcements/community  
- `palette` - Design/creative
- `star` - Favorites/popular
- `heart` - Liked/featured
- `search` - Search/find
- `user` - Account/profile
- `settings` - Settings/options

---

## ✅ Benefits

- **No theme modifications** - Everything from Ghost Admin
- **Single point of control** - All configuration in one place
- **Theme update safe** - Survives theme updates
- **Easy testing** - Quick config changes
- **Multi-site support** - Different configs per site

---

## 🚀 That's It!

1. Clean theme files
2. Add script to Ghost Code Injection
3. Set up Ghost navigation with dash notation
4. Save and test

Your menu system is now completely controlled from Ghost Admin! 🎉