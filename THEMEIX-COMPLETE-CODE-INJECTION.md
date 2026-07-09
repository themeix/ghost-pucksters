# Complete Code Injection Example

## Copy & Paste to Ghost Admin

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
      "match": { "url": "/home/" },
      "type": "mega",
      "settings": {
        "columns": 4,
        "width": "900px",
        "alignment": "center",
        "animation": "fade"
      },
      "groups": [
        {
          "title": "Main Sections",
          "links": [
            {
              "title": "Home 1",
              "url": "/home-1/",
              "icon": "book",
              "badge": "Popular"
            },
            {
              "title": "Home 2", 
              "url": "/home-2/",
              "icon": "megaphone"
            },
            {
              "title": "Home 3",
              "url": "/home-3/",
              "icon": "star"
            },
            {
              "title": "Home 4",
              "url": "/home-4/",
              "icon": "palette"
            }
          ]
        },
        {
          "title": "Resources",
          "links": [
            {
              "title": "Documentation",
              "url": "/docs/",
              "icon": "book"
            },
            {
              "title": "Tutorials",
              "url": "/tutorials/",
              "icon": "star"
            },
            {
              "title": "Examples",
              "url": "/examples/",
              "icon": "palette"
            }
          ]
        },
        {
          "title": "Community",
          "links": [
            {
              "title": "Forum",
              "url": "/forum/",
              "icon": "megaphone"
            },
            {
              "title": "Blog",
              "url": "/blog/",
              "icon": "book"
            },
            {
              "title": "Newsletter",
              "url": "/newsletter/",
              "badge": "New",
              "icon": "heart"
            }
          ]
        },
        {
          "title": "Support",
          "links": [
            {
              "title": "Help Center",
              "url": "/help/",
              "icon": "search"
            },
            {
              "title": "Contact Us",
              "url": "/contact/",
              "icon": "megaphone"
            },
            {
              "title": "FAQ",
              "url": "/faq/",
              "icon": "book"
            }
          ]
        }
      ]
    },
    {
      "match": { "url": "/services/" },
      "type": "mega",
      "settings": {
        "columns": 3,
        "width": "700px",
        "alignment": "left",
        "animation": "slide"
      },
      "icon": "palette",
      "groups": [
        {
          "title": "Design Services",
          "links": [
            {
              "title": "UI/UX Design",
              "url": "/services/ui-ux/",
              "description": "User-centered design solutions",
              "icon": "palette"
            },
            {
              "title": "Web Design",
              "url": "/services/web-design/",
              "description": "Modern, responsive websites",
              "icon": "palette"
            },
            {
              "title": "Brand Identity",
              "url": "/services/branding/",
              "description": "Complete brand packages",
              "icon": "star"
            }
          ]
        },
        {
          "title": "Development",
          "links": [
            {
              "title": "Frontend Dev",
              "url": "/services/frontend/",
              "description": "React, Vue, Angular experts",
              "icon": "search"
            },
            {
              "title": "Backend Dev",
              "url": "/services/backend/",
              "description": "Node.js, Python, PHP",
              "icon": "search"
            },
            {
              "title": "Full Stack",
              "url": "/services/fullstack/",
              "description": "End-to-end solutions",
              "badge": "Popular",
              "icon": "star"
            }
          ]
        },
        {
          "title": "Consulting",
          "links": [
            {
              "title": "Technical Strategy",
              "url": "/services/strategy/",
              "description": "Architecture and planning",
              "icon": "megaphone"
            },
            {
              "title": "Performance Audit",
              "url": "/services/audit/",
              "description": "Optimization and analysis",
              "icon": "search"
            },
            {
              "title": "Team Training",
              "url": "/services/training/",
              "description": "Skill development programs",
              "icon": "book"
            }
          ]
        }
      ]
    },
    {
      "match": { "title": "Resources" },
      "type": "mega",
      "settings": {
        "columns": 2,
        "width": "600px",
        "alignment": "right",
        "animation": "scale"
      },
      "groups": [
        {
          "title": "Learning",
          "links": [
            {
              "title": "Documentation",
              "url": "/docs/",
              "icon": "book"
            },
            {
              "title": "Tutorials",
              "url": "/tutorials/",
              "icon": "star"
            },
            {
              "title": "Video Courses",
              "url": "/courses/",
              "badge": "New",
              "icon": "megaphone"
            }
          ]
        },
        {
          "title": "Tools",
          "links": [
            {
              "title": "Code Generator",
              "url": "/tools/generator/",
              "icon": "search"
            },
            {
              "title": "Theme Builder",
              "url": "/tools/builder/",
              "icon": "palette"
            },
            {
              "title": "API Reference",
              "url": "/api/",
              "icon": "book"
            }
          ]
        }
      ],
      "featured": {
        "title": "Featured Resource",
        "description": "Get started with our comprehensive guide to modern web development.",
        "button": {
          "text": "Start Learning",
          "url": "/getting-started/"
        }
      }
    }
  ]
};
</script>
```

## Ghost Navigation Setup

In **Ghost Admin > Settings > Navigation**:

```
Home
Services
Resources
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
Services
- Web Design
-- UI/UX
--- User Research
- Development
Resources
About
Contact
```

## Theme Files (Minimal Setup)

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

## Features Included

✅ **4-column mega menu** for Home  
✅ **3-column mega menu** for Services  
✅ **2-column mega menu** for Resources with featured content  
✅ **Multi-level dropdowns** via dash notation  
✅ **Icons** (book, megaphone, palette, star, heart, search)  
✅ **Badges** (Popular, New)  
✅ **Descriptions** for menu items  
✅ **Custom animations** (fade, slide, scale)  
✅ **Responsive design** for mobile  
✅ **Keyboard navigation**  
✅ **Accessibility features**  

## Customization

### Change Columns
```json
"settings": {
  "columns": 2  // Change to 2, 3, 4, or 5
}
```

### Change Width
```json
"settings": {
  "width": "700px"  // Any valid CSS width value
}
```

### Change Alignment
```json
"settings": {
  "alignment": "center"  // "left", "center", or "right"
}
```

### Change Animation
```json
"settings": {
  "animation": "fade"  // "fade", "slide", "scale", or "flip"
}
```

## Testing

1. Add the Code Injection script
2. Set up your Ghost navigation
3. Save changes
4. Refresh your site
5. Hover over menu items to see mega menus
6. Test multi-level dropdowns with dash notation

## Theme Independence

This configuration works with any theme that:
- Includes the Themeix Menu JavaScript
- Uses standard Ghost navigation structure
- Has a navigation element with class `gh-navigation-menu`

Your menu configuration will survive theme updates and can be modified entirely from the Ghost Admin panel!