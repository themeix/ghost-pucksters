# Themeix Menu CSS Variables Reference

Complete guide to customizing your Themeix menu system using CSS variables.

## 🎨 Core Menu Styling

### Main Menu Container
```css
:root {
    --tdgm-menu-width: 100%;              /* Main menu container width */
    --tdgm-menu-gap: 2rem;                /* Gap between menu items */
    --tdgm-menu-radius: 8px;              /* Border radius for menu items */
    --menu-padding: 0.75rem 1rem;    /* Padding for menu links */
}
```

### Menu Links
```css
:root {
    --tdgm-menu-color: #333333;           /* Default text color */
    --tdgm-menu-hover-color: #666666;     /* Hover text color */
    --tdgm-menu-active-color: #000000;    /* Active/focus text color */
    --tdgm-menu-background: #ffffff;      /* Background color */
    --menu-border: 1px solid #e5e5e5; /* Border styling */
    --menu-transition: all 0.3s ease; /* Animation transitions */
}
```

### Typography
```css
:root {
    --menu-font-size: 1rem;          /* Menu link font size */
    --menu-font-weight: 500;         /* Menu link font weight */
}
```

## 🎯 Dropdown Arrow Styling

### Arrow Appearance
```css
:root {
    --tdgm-arrow-size: 0.3em;             /* Arrow height (border-top) */
    --tdgm-arrow-width: 0.3em;            /* Arrow width (border-left/right) */
    --tdgm-arrow-color: currentColor;     /* Arrow color */
    --tdgm-arrow-hover-color: inherit;    /* Arrow hover color */
}
```

### Arrow Animation
```css
:root {
    --tdgm-arrow-transform: rotate(180deg); /* Arrow rotation on hover */
    --tdgm-arrow-transition: transform 0.3s ease; /* Arrow animation speed */
}
```

**Customization Examples:**

**Larger Arrow:**
```css
:root {
    --tdgm-arrow-size: 0.4em;
    --tdgm-arrow-width: 0.4em;
}
```

**No Arrow Rotation:**
```css
:root {
    --tdgm-arrow-transform: rotate(0deg);
}
```

**Custom Arrow Color:**
```css
:root {
    --tdgm-arrow-color: #ff6b6b;
}
```

## 🏆 Submenu & Dropdown Styling

### Dropdown Submenus
```css
:root {
    --tdgm-dropdown-width: 250px;         /* Width of dropdown menus */
    --tdgm-submenu-background: #ffffff;   /* Background color */
    --tdgm-submenu-shadow: 0 10px 40px rgba(0, 0, 0, 0.2); /* Shadow effect */
    --tdgm-submenu-border-radius: 8px;    /* Corner radius */
    --tdgm-submenu-padding: 1rem;         /* Internal padding */
    --tdgm-submenu-border: 1px solid #e5e5e5; /* Border styling */
}
```

### Submenu Links
```css
:root {
    --tdgm-submenu-hover-background: #f8f9fa; /* Hover background */
    --tdgm-submenu-link-padding: 0.5rem 0.75rem; /* Link padding */
    --tdgm-submenu-link-gap: 0.25rem;          /* Gap between link elements */
}
```

## 📱 Mega Menu Styling

### Mega Menu Container
```css
:root {
    --tdgm-mega-width: 1200px;            /* Maximum width of mega menu */
}
```

### Mega Menu Gaps
```css
:root {
    --tdgm-menu-gap-items: 0.5rem;        /* Gap between items in submenu */
    --tdgm-menu-gap-header: 1.5rem;       /* Gap above headers */
    --tdgm-menu-gap-group: 2rem;          /* Gap between groups/columns */
}
```

## 🎯 Badge Styling

```css
:root {
    --tdgm-badge-background: #ff6b6b;     /* Badge background color */
    --tdgm-badge-color: #ffffff;          /* Badge text color */
    --tdgm-badge-padding: 0.25rem 0.5rem; /* Badge padding */
    --tdgm-badge-radius: 4px;             /* Badge corner radius */
    --tdgm-badge-font-size: 0.75rem;      /* Badge font size */
}
```

**Custom Badge Example:**
```css
:root {
    --tdgm-badge-background: #10b981;     /* Green badge */
    --tdgm-badge-color: #ffffff;
}
```

## 🎨 Icon Styling

```css
:root {
    --tdgm-icon-size: 1.25rem;            /* Icon size */
    --tdgm-icon-gap: 0.5rem;              /* Gap between icon and text */
    --tdgm-icon-color: inherit;           /* Default icon color */
    --tdgm-icon-hover-color: inherit;     /* Icon hover color */
}
```

**Custom Icon Example:**
```css
:root {
    --tdgm-icon-size: 1.5rem;
    --tdgm-icon-color: #3b82f6;
    --tdgm-icon-gap: 0.75rem;
}
```

## 📱 Mobile Menu Styling

```css
:root {
    --tdgm-mobile-menu-background: #ffffff;      /* Mobile menu background */
    --tdgm-mobile-menu-width: 300px;             /* Mobile menu width */
    --tdgm-mobile-menu-padding: 1rem;            /* Mobile menu padding */
    --tdgm-mobile-transition: all 0.3s ease;      /* Mobile animation speed */
}
```

## 🌈 Complete Customization Examples

### Example 1: Dark Theme
```css
:root {
    --tdgm-menu-background: #1a1a1a;
    --tdgm-menu-color: #ffffff;
    --tdgm-menu-hover-color: #f8f9fa;
    --tdgm-menu-active-color: #ffffff;
    --menu-border: 1px solid #333;
    --tdgm-submenu-background: #1a1a1a;
    --tdgm-submenu-hover-background: #333;
    --tdgm-submenu-border: 1px solid #333;
    --tdgm-badge-background: #3b82f6;
    --tdgm-arrow-color: #ffffff;
}
```

### Example 2: Brand Colors
```css
:root {
    --tdgm-menu-color: #1e40af;           /* Blue brand color */
    --tdgm-menu-hover-color: #3b82f6;     /* Lighter blue on hover */
    --tdgm-menu-active-color: #1e3a8a;    /* Darker blue when active */
    --tdgm-badge-background: #f59e0b;     /* Orange badges */
    --tdgm-arrow-color: #1e40af;
    --tdgm-menu-gap: 3rem;                /* More spacing */
}
```

### Example 3: Minimalist
```css
:root {
    --menu-padding: 0.5rem 0.75rem;
    --tdgm-menu-gap: 1.5rem;
    --tdgm-menu-radius: 0px;
    --menu-border: none;
    --tdgm-submenu-border-radius: 0px;
    --tdgm-submenu-border: none;
    --tdgm-submenu-shadow: none;
    --tdgm-arrow-size: 0.25em;
    --tdgm-arrow-transform: rotate(0deg);  /* No rotation */
}
```

### Example 4: Large & Bold
```css
:root {
    --menu-padding: 1rem 1.5rem;
    --menu-font-size: 1.125rem;
    --menu-font-weight: 600;
    --tdgm-menu-radius: 12px;
    --tdgm-dropdown-width: 300px;
    --tdgm-submenu-padding: 1.5rem;
    --tdgm-icon-size: 1.5rem;
    --tdgm-badge-font-size: 0.875rem;
    --tdgm-arrow-size: 0.35em;
}
```

## 🎯 Component-Specific Customization

### Target Specific Menu Items
```css
/* Only first level items */
.themeix-menu-container > .themeix-menu-item > .themeix-menu-link {
    font-weight: 600;
}

/* Only dropdown links */
.themeix-submenu .themeix-menu-link {
    padding: var(--tdgm-submenu-link-padding);
}

/* Only mega menu links */
.themeix-mega-menu .themeix-menu-link {
    font-size: 0.9375rem;
}
```

### Mobile-Specific Styling
```css
@media (max-width: 768px) {
    :root {
        --menu-padding: 1rem;
        --menu-font-size: 1.125rem;
    }
}
```

### Hover State Customization
```css
/* Smooth color transitions */
.themeix-menu-link {
    transition: color 0.3s ease, background-color 0.3s ease;
}

/* Dropdown arrow animation */
.themeix-menu-item.has-submenu:hover > .themeix-menu-link::after {
    transform: rotate(180deg);
}
```

## 🔧 Advanced Customization

### Custom CSS Shadows
```css
:root {
    --tdgm-submenu-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Gradient Backgrounds
```css
:root {
    --tdgm-menu-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --tdgm-menu-color: #ffffff;
    --tdgm-arrow-color: #ffffff;
}
```

### RTL Support
```css
[dir="rtl"] .themeix-menu-item.has-submenu > .themeix-menu-link {
    padding-right: var(--menu-padding);
    padding-left: calc(var(--menu-padding-right, 1rem) + 0.5rem);
}

[dir="rtl"] .themeix-menu-item.has-submenu > .themeix-menu-link::after {
    margin-left: 0;
    margin-right: var(--tdgm-menu-gap-items);
    transform: rotate(-90deg);
}
```

## 📝 Best Practices

1. **Start with variables:** Always use CSS variables instead of hardcoding values
2. **Test responsiveness:** Check mobile and desktop views
3. **Maintain contrast:** Ensure text remains readable against backgrounds
4. **Consistent spacing:** Use gap variables for consistent spacing
5. **Performance:** Keep animations smooth with reasonable transition times

## 🚀 Quick Start

Add this to your theme's custom CSS or Ghost Code Injection:

```css
/* Custom Theme */
:root {
    --tdgm-menu-color: #1e40af;
    --tdgm-menu-hover-color: #3b82f6;
    --tdgm-badge-background: #f59e0b;
    --tdgm-arrow-size: 0.35em;
    --tdgm-arrow-transform: rotate(180deg);
    --tdgm-dropdown-width: 280px;
}
```

## 📚 Related Files

- `assets/css/themeix-menu.css` - Main stylesheet
- `assets/css/screen.css` - Theme integration
- `THEMEIX-CODE-INJECTION.md` - Ghost Admin setup guide