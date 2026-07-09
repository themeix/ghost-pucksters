# Minimal Code Injection Configuration

## Quick Start

Add this to **Ghost Admin > Settings > Code Injection > Site Footer**:

```html
<script>
window.themeixMenuConfig = {
  "version": 1,
  "menus": [
    {
      "match": { "url": "/courses/" },
      "type": "mega",
      "settings": {
        "columns": 3,
        "width": "800px",
        "alignment": "center"
      },
      "groups": [
        {
          "title": "Categories",
          "links": [
            { "title": "All Courses", "url": "/courses/", "icon": "book" },
            { "title": "Beginner", "url": "/courses/beginner/", "icon": "star" },
            { "title": "Advanced", "url": "/courses/advanced/", "icon": "star" }
          ]
        }
      ]
    }
  ]
};
</script>
```

## Theme Setup

**navigation.hbs:**
```handlebars
<nav class="gh-navigation-menu">
    {{navigation}}
</nav>
```

**main.js:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
    ThemeixMenu.init();
});
```

**Ghost Navigation:**
```
Home
Courses
About
Contact
```

That's it! Your mega menu will appear when hovering over "Courses".

## How It Works

1. **System auto-detects** Ghost navigation
2. **Code Injection config** matches menu items by URL
3. **Mega menu appears** automatically on matched items
4. **No theme modifications** needed beyond basic setup

## Benefits

- ✅ Complete theme independence
- ✅ Configuration from Ghost Admin only
- ✅ Survives theme updates
- ✅ Easy to test and modify
- ✅ Works with multi-level dropdowns via dash notation