# Themeix Menu Auto-Initialization Guide

## Overview
The Themeix Menu system now supports automatic class and ID injection, eliminating the need to manually add classes to your Ghost navigation templates.

## Basic Usage

### Option 1: Default Configuration (Recommended)
Simply include the menu script in your theme and let it auto-detect the Ghost navigation:

```javascript
// In your main.js or theme script
document.addEventListener('DOMContentLoaded', function() {
    ThemeixMenu.init({
        targetElement: '.gh-navigation-menu'
    });
});
```

### Option 2: Custom Target Element
Specify a different navigation element:

```javascript
ThemeixMenu.init({
    targetElement: '.custom-navigation-class',
    autoInjectClasses: true,
    autoInjectId: true
});
```

### Option 3: Disable Auto-Injection
If you prefer to manually add classes to your template:

```javascript
ThemeixMenu.init({
    targetElement: '.gh-navigation-menu',
    autoInjectClasses: false,
    autoInjectId: false
});
```

Then in your navigation.hbs:
```handlebars
<nav class="gh-navigation-menu themeix-menu-initialized" id="themeix-main-menu">
    {{navigation}}
</nav>
```

## Configuration Options

### targetElement
- **Type**: String (CSS selector)
- **Default**: `.gh-navigation-menu`
- **Description**: The CSS selector for your navigation element

### autoInjectClasses
- **Type**: Boolean
- **Default**: `true`
- **Description**: Automatically inject `themeix-menu-initialized` class

### autoInjectId
- **Type**: Boolean
- **Default**: `true`
- **Description**: Automatically inject `themeix-main-menu` ID if none exists

## Template Integration

### Minimal Navigation.hbs (Recommended)
```handlebars
<nav class="gh-navigation-menu">
    {{navigation}}
</nav>
```

### With JSON Configuration
```javascript
ThemeixMenu.init({
    targetElement: '.gh-navigation-menu',
    jsonConfigPath: '/assets/js/lib/themeix-menu-config.json'
});
```

## Backward Compatibility

The system maintains backward compatibility with the old `selector` option:

```javascript
// Old way (still works)
ThemeixMenu.init({
    selector: '#themeix-main-menu'
});

// New way (recommended)
ThemeixMenu.init({
    targetElement: '.gh-navigation-menu'
});
```

## Automatic Detection Fallback

The system includes intelligent fallback detection:
1. Uses configured `targetElement`
2. Falls back to `selector` for backward compatibility
3. Final fallback to `.gh-navigation-menu` (Ghost default)

## Class Injection Details

When `autoInjectClasses: true`, the system automatically adds:
- `themeix-menu-initialized` - Marks element as menu system target
- `is-dropdown-loaded` - Removed during initialization, added when complete

## ID Injection Details

When `autoInjectId: true` and no ID exists:
- Adds `themeix-main-menu` ID for internal referencing
- Preserves existing IDs if already present

## Complete Example

### navigation.hbs
```handlebars
<nav class="gh-navigation-menu">
    {{navigation}}
</nav>
```

### main.js
```javascript
document.addEventListener('DOMContentLoaded', function() {
    ThemeixMenu.init({
        targetElement: '.gh-navigation-menu',
        autoInjectClasses: true,
        autoInjectId: true,
        mouseDelay: 150,
        closeOnClickOutside: true
    });
});
```

## Benefits

1. **Cleaner Templates**: No manual class/ID management in Handlebars
2. **Easier Maintenance**: Configuration in JavaScript only
3. **Better Portability**: Works across different Ghost themes
4. **Backward Compatible**: Existing setups continue to work
5. **Flexible**: Can enable/disable auto-injection per project

## Troubleshooting

### Menu not initializing
- Check browser console for JavaScript errors
- Verify `targetElement` selector matches your template
- Ensure ThemeixMenu script is loaded before initialization

### Classes not being injected
- Check if element exists in DOM when script runs
- Verify `autoInjectClasses` is not set to `false`
- Check for conflicting JavaScript that might remove classes

### Multiple navigation elements
- Use more specific selectors: `'.gh-navigation-inner > .gh-navigation-menu'`
- Or target by parent: `'.gh-navigation .gh-navigation-menu'`