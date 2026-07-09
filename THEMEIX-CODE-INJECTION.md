# Themeix Menu Code Injection Guide

## Complete Theme-Independent Menu Configuration

Configure your entire menu system through Ghost Code Injection without touching any theme files!

## Setup Process

### Step 1: Clean Theme Files

Your theme files should be minimal:

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

That's it! No theme modifications needed.

### Step 2: Add Menu Configuration via Ghost Code Injection

Go to **Ghost Admin > Settings > Code Injection > Site Footer** and add:

```html
<script>
window.themeixMenuConfig = {
  "version": 1,
  "globalSettings": {
    "animationDuration": 300,
    "mouseDelay": 150,
    "closeOnClickOutside": true,
    "closeOnEscape": true,
    "keyboardNavigation": true,
    "defaultMenuSettings": {
      "columns": 3,
      "width": "800px",
      "alignment": "center",
      "animation": "slide"
    }
  },
  "menus": [
    {
      "match": {
        "url": "/courses/"
      },
      "type": "mega",
      "settings": {
        "columns": 4,
        "width": "900px",
        "alignment": "center",
        "animation": "fade"
      },
      "groups": [
        {
          "title": "Learning Paths",
          "links": [
            {
              "title": "All Courses",
              "url": "/courses/",
              "icon": "book"
            },
            {
              "title": "Beginner",
              "url": "/courses/beginner/",
              "badge": "Popular",
              "icon": "star"
            },
            {
              "title": "Intermediate",
              "url": "/courses/intermediate/",
              "icon": "star"
            },
            {
              "title": "Advanced",
              "url": "/courses/advanced/",
              "icon": "star"
            }
          ]
        },
        {
          "title": "Topics",
          "links": [
            {
              "title": "Web Development",
              "url": "/courses/web-dev/",
              "icon": "palette"
            },
            {
              "title": "Data Science",
              "url": "/courses/data-science/",
              "icon": "search"
            },
            {
              "title": "Design",
              "url": "/courses/design/",
              "icon": "palette"
            },
            {
              "title": "Business",
              "url": "/courses/business/",
              "icon": "megaphone"
            }
          ]
        }
      ]
    }
  ]
};
</script>
```

### Step 3: Configure Ghost Navigation with Dash Notation

In **Ghost Admin > Settings > Navigation**, use dash notation for multi-level menus:

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
About
Contact
```

## Configuration Options

### Global Settings
- `animationDuration`: Animation speed in milliseconds
- `mouseDelay`: Hover delay before opening dropdowns
- `closeOnClickOutside`: Close menus when clicking outside
- `closeOnEscape`: Close menus with Escape key
- `keyboardNavigation`: Enable arrow key navigation
- `defaultMenuSettings`: Default settings for all menus

### Menu Configuration
- `match`: Criteria to match Ghost navigation items
  - `url`: Match by URL
  - `title`: Match by menu title
  - `label`: Match by label (alternative to title)
  - `pattern`: Match by regex pattern
- `type`: Menu type (`mega`, `dropdown`, `link`)
- `settings`: Specific menu settings
- `groups`: Group structure for mega menus
- `featured`: Featured content section

## Complete JSON Schema

```json
{
  "version": 1,
  "globalSettings": {
    "animationDuration": 300,
    "mouseDelay": 150,
    "closeOnClickOutside": true,
    "closeOnEscape": true,
    "keyboardNavigation": true,
    "defaultMenuSettings": {
      "columns": 3,
      "width": "auto",
      "alignment": "left",
      "animation": "slide"
    }
  },
  "menus": [
    {
      "match": {
        "url": "/your-page/"
      },
      "type": "mega",
      "settings": {
        "columns": 4,
        "width": "900px",
        "alignment": "center",
        "animation": "fade"
      },
      "icon": "book",
      "badge": "New",
      "description": "Optional description",
      "groups": [
        {
          "title": "Group Title",
          "links": [
            {
              "title": "Link Title",
              "url": "/link-url/",
              "icon": "star",
              "badge": "Popular",
              "description": "Link description"
            }
          ]
        }
      ],
      "featured": {
        "title": "Featured Title",
        "description": "Featured description",
        "image": "/content/images/featured.jpg",
        "button": {
          "text": "Call to Action",
          "url": "/cta-url/"
        }
      }
    }
  ]
}
```

## Icon Options

Available built-in icons:
- `book`
- `megaphone` 
- `palette`
- `star`
- `heart`
- `search`
- `user`
- `settings`

## Advanced Matching Options

### Match by URL
```json
"match": {
  "url": "/courses/"
}
```

### Match by Title
```json
"match": {
  "title": "Courses"
}
```

### Match by Pattern (Regex)
```json
"match": {
  "pattern": "/courses/.*"
}
```

### Match Multiple Conditions
```json
"match": {
  "url": "/courses/",
  "title": "Courses"
}
```

## Complete Working Example

Copy this to Ghost Code Injection (Site Footer):

```html
<script>
window.themeixMenuConfig = {
  "version": 1,
  "globalSettings": {
    "animationDuration": 300,
    "mouseDelay": 150,
    "closeOnClickOutside": true,
    "closeOnEscape": true,
    "keyboardNavigation": true,
    "defaultMenuSettings": {
      "columns": 3,
      "width": "800px",
      "alignment": "center",
      "animation": "slide"
    }
  },
  "menus": [
    {
      "match": { "url": "/courses/" },
      "type": "mega",
      "settings": {
        "columns": 4,
        "width": "900px",
        "alignment": "center",
        "animation": "fade"
      },
      "groups": [
        {
          "title": "Learning",
          "links": [
            { "title": "All Courses", "url": "/courses/", "icon": "book" },
            { "title": "Beginner", "url": "/courses/beginner/", "icon": "star" },
            { "title": "Intermediate", "url": "/courses/intermediate/", "icon": "star" },
            { "title": "Advanced", "url": "/courses/advanced/", "icon": "star" }
          ]
        },
        {
          "title": "Topics", 
          "links": [
            { "title": "Web Dev", "url": "/courses/web-dev/", "icon": "palette" },
            { "title": "Data Science", "url": "/courses/data-science/", "icon": "search" }
          ]
        }
      ]
    },
    {
      "match": { "url": "/services/" },
      "type": "mega",
      "settings": { "columns": 3, "width": "700px", "alignment": "left" },
      "groups": [
        {
          "title": "Design",
          "links": [
            { "title": "UI/UX Design", "url": "/services/ui-ux/", "icon": "palette" },
            { "title": "Web Design", "url": "/services/web-design/", "icon": "palette" }
          ]
        },
        {
          "title": "Development",
          "links": [
            { "title": "Frontend", "url": "/services/frontend/", "icon": "search" },
            { "title": "Backend", "url": "/services/backend/", "icon": "search" }
          ]
        }
      ]
    }
  ]
};
</script>
```

## Priority System

1. **Code Injection** (`window.themeixMenuConfig`) - Highest priority
2. **JSON File** (`jsonConfigPath`) - Falls back if Code Injection not found
3. **Ghost Navigation** - Uses dash notation if no JSON config

## Benefits

✅ **No theme modifications** - Configure everything from Ghost Admin  
✅ **Theme updates safe** - Your config survives theme updates  
✅ **Multi-site support** - Different configs per Ghost site  
✅ **Easy testing** - Quickly test different menu configurations  
✅ **Non-developer friendly** - JSON configuration in admin panel  
✅ **Version control** - Copy/paste configurations between sites  

## Troubleshooting

### Configuration Not Loading
- Check browser console for errors
- Verify JSON syntax is valid
- Ensure script is in Site Footer, not Site Header
- Check that `window.themeixMenuConfig` is set

### Menu Not Appearing
- Verify `match.url` matches your Ghost navigation exactly
- Check that Ghost navigation items exist
- Ensure CSS files are loaded
- Check for JavaScript errors in console

### Styling Issues
- Verify CSS files are properly linked
- Check for conflicting CSS in other files
- Ensure theme CSS variables are set correctly

## Migration from File-Based Config

If you're currently using `jsonConfigPath`, simply:

1. Copy your JSON file content
2. Paste into Ghost Code Injection with `window.themeixMenuConfig =`
3. Remove `jsonConfigPath` from your initialization

Your menu will work exactly the same, but now configured entirely from Ghost Admin!