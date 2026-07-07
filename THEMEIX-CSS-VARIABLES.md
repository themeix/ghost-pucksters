# Themeix Menu CSS Variables Reference

Complete guide to customizing your Themeix menu system using CSS variables.

## 🎨 Core Menu Styling

### Main Menu Container
```css
:root {
    --menu-width: 100%;              /* Main menu container width */
    --menu-gap: 2rem;                /* Gap between menu items */
    --menu-radius: 8px;              /* Border radius for menu items */
    --menu-padding: 0.75rem 1rem;    /* Padding for menu links */
}
```

### Menu Links
```css
:root {
    --menu-color: #333333;           /* Default text color */
    --menu-hover-color: #666666;     /* Hover text color */
    --menu-active-color: #000000;    /* Active/focus text color */
    --menu-background: #ffffff;      /* Background color */
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
    --arrow-size: 0.3em;             /* Arrow height (border-top) */
    --arrow-width: 0.3em;            /* Arrow width (border-left/right) */
    --arrow-color: currentColor;     /* Arrow color */
    --arrow-hover-color: inherit;    /* Arrow hover color */
}
```

### Arrow Animation
```css
:root {
    --arrow-transform: rotate(180deg); /* Arrow rotation on hover */
    --arrow-transition: transform 0.3s ease; /* Arrow animation speed */
}
```

**Customization Examples:**

**Larger Arrow:**
```css
:root {
    --arrow-size: 0.4em;
    --arrow-width: 0.4em;
}
```

**No Arrow Rotation:**
```css
:root {
    --arrow-transform: rotate(0deg);
}
```

**Custom Arrow Color:**
```css
:root {
    --arrow-color: #ff6b6b;
}
```

## 🏆 Submenu & Dropdown Styling

### Dropdown Submenus
```css
:root {
    --dropdown-width: 250px;         /* Width of dropdown menus */
    --submenu-background: #ffffff;   /* Background color */
    --submenu-shadow: 0 10px 40px rgba(0, 0, 0, 0.2); /* Shadow effect */
    --submenu-border-radius: 8px;    /* Corner radius */
    --submenu-padding: 1rem;         /* Internal padding */
    --submenu-border: 1px solid #e5e5e5; /* Border styling */
}
```

### Submenu Links
```css
:root {
    --submenu-hover-background: #f8f9fa; /* Hover background */
    --submenu-link-padding: 0.5rem 0.75rem; /* Link padding */
    --submenu-link-gap: 0.25rem;          /* Gap between link elements */
}
```

## 📱 Mega Menu Styling

### Mega Menu Container
```css
:root {
    --mega-width: 1200px;            /* Maximum width of mega menu */
}
```

### Mega Menu Gaps
```css
:root {
    --menu-gap-items: 0.5rem;        /* Gap between items in submenu */
    --menu-gap-header: 1.5rem;       /* Gap above headers */
    --menu-gap-group: 2rem;          /* Gap between groups/columns */
}
```

## 🎯 Badge Styling

```css
:root {
    --badge-background: #ff6b6b;     /* Badge background color */
    --badge-color: #ffffff;          /* Badge text color */
    --badge-padding: 0.25rem 0.5rem; /* Badge padding */
    --badge-radius: 4px;             /* Badge corner radius */
    --badge-font-size: 0.75rem;      /* Badge font size */
}
```

**Custom Badge Example:**
```css
:root {
    --badge-background: #10b981;     /* Green badge */
    --badge-color: #ffffff;
}
```

## 🎨 Icon Styling

```css
:root {
    --icon-size: 1.25rem;            /* Icon size */
    --icon-gap: 0.5rem;              /* Gap between icon and text */
    --icon-color: inherit;           /* Default icon color */
    --icon-hover-color: inherit;     /* Icon hover color */
}
```

**Custom Icon Example:**
```css
:root {
    --icon-size: 1.5rem;
    --icon-color: #3b82f6;
    --icon-gap: 0.75rem;
}
```

## 📱 Mobile Menu Styling

```css
:root {
    --mobile-menu-background: #ffffff;      /* Mobile menu background */
    --mobile-menu-width: 300px;             /* Mobile menu width */
    --mobile-menu-padding: 1rem;            /* Mobile menu padding */
    --mobile-transition: all 0.3s ease;      /* Mobile animation speed */
}
```

## 🌈 Complete Customization Examples

### Example 1: Dark Theme
```css
:root {
    --menu-background: #1a1a1a;
    --menu-color: #ffffff;
    --menu-hover-color: #f8f9fa;
    --menu-active-color: #ffffff;
    --menu-border: 1px solid #333;
    --submenu-background: #1a1a1a;
    --submenu-hover-background: #333;
    --submenu-border: 1px solid #333;
    --badge-background: #3b82f6;
    --arrow-color: #ffffff;
}
```

### Example 2: Brand Colors
```css
:root {
    --menu-color: #1e40af;           /* Blue brand color */
    --menu-hover-color: #3b82f6;     /* Lighter blue on hover */
    --menu-active-color: #1e3a8a;    /* Darker blue when active */
    --badge-background: #f59e0b;     /* Orange badges */
    --arrow-color: #1e40af;
    --menu-gap: 3rem;                /* More spacing */
}
```

### Example 3: Minimalist
```css
:root {
    --menu-padding: 0.5rem 0.75rem;
    --menu-gap: 1.5rem;
    --menu-radius: 0px;
    --menu-border: none;
    --submenu-border-radius: 0px;
    --submenu-border: none;
    --submenu-shadow: none;
    --arrow-size: 0.25em;
    --arrow-transform: rotate(0deg);  /* No rotation */
}
```

### Example 4: Large & Bold
```css
:root {
    --menu-padding: 1rem 1.5rem;
    --menu-font-size: 1.125rem;
    --menu-font-weight: 600;
    --menu-radius: 12px;
    --dropdown-width: 300px;
    --submenu-padding: 1.5rem;
    --icon-size: 1.5rem;
    --badge-font-size: 0.875rem;
    --arrow-size: 0.35em;
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
    padding: var(--submenu-link-padding);
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
    --submenu-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Gradient Backgrounds
```css
:root {
    --menu-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --menu-color: #ffffff;
    --arrow-color: #ffffff;
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
    margin-right: var(--menu-gap-items);
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
    --menu-color: #1e40af;
    --menu-hover-color: #3b82f6;
    --badge-background: #f59e0b;
    --arrow-size: 0.35em;
    --arrow-transform: rotate(180deg);
    --dropdown-width: 280px;
}
```

## 📚 Related Files

- `assets/css/themeix-menu.css` - Main stylesheet
- `assets/css/screen.css` - Theme integration
- `THEMEIX-CODE-INJECTION.md` - Ghost Admin setup guide