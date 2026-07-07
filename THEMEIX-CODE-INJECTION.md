# Themeix Ghost Dynamic Menu Library - Code Injection Setup

## How to Add Mega Menus Using Ghost Admin

### Step 1: Navigate to Code Injection
1. Go to **Ghost Admin** → **Settings** → **Code Injection**
2. Scroll down to **Site Footer** section
3. Paste the configuration code below

### Step 2: Add Mega Menu Configuration

```javascript
<script>
window.themeixMenuConfig = {
  "version": 1,
  "menus": [
    {
      "match": {
        "url": "/courses/"  // Matches your Ghost navigation item URL
      },
      "type": "mega",       // Change to "mega" for mega menu, "dropdown" for enhanced dropdown
      "settings": {
        "columns": 3,       // Number of columns in mega menu
        "width": "900px",   // Menu width
        "alignment": "center", // "left", "center", or "right"
        "animation": "fade"   // "fade", "slide", "scale"
      },
      "groups": [
        {
          "title": "Learning Paths",
          "links": [
            {
              "title": "All Courses",
              "icon": "book"  // Available icons: book, megaphone, palette, star, heart, search, user, settings
            },
            {
              "title": "Business",
              "badge": "Popular"  // Adds a badge
            },
            {
              "title": "Marketing",
              "icon": "megaphone"
            },
            {
              "title": "Design",
              "icon": "palette"
            }
          ]
        },
        {
          "title": "Skill Levels",
          "links": [
            {
              "title": "Beginner"
            },
            {
              "title": "Intermediate"
            },
            {
              "title": "Advanced"
            }
          ]
        }
      ],
      "featured": {  // Optional featured content card
        "title": "Start Learning Today",
        "description": "Browse our latest premium courses and improve your skills.",
        "image": "/content/images/featured-course.webp",  // Your image path
        "button": {
          "text": "Explore Courses",
          "url": "/courses/"
        }
      }
    }
  ]
};
</script>
```

### Step 3: Configure Your Ghost Navigation

In **Ghost Admin → Navigation**, add your menu items:

```
Courses
- All Courses
- Business
- Marketing
- Design
```

The URL for "Courses" should match the `match.url` in your configuration.

## Configuration Options

### Menu Types
- **"mega"**: Full mega menu with columns and groups
- **"dropdown"**: Enhanced dropdown with icons and badges
- **"link"**: Simple link (default)

### Settings
- **columns**: 1-5 (number of columns for mega menu)
- **width**: Any valid CSS width (e.g., "900px", "100%", "80vw")
- **alignment**: "left", "center", or "right"
- **animation**: "fade", "slide", "scale"

### Available Icons
- `book` - 📚 Book icon
- `megaphone` - 📢 Megaphone icon
- `palette` - 🎨 Palette icon
- `star` - ⭐ Star icon
- `heart` - ❤️ Heart icon
- `search` - 🔍 Search icon
- `user` - 👤 User icon
- `settings` - ⚙️ Settings icon

### Matching Options
Match menu items by:
- **url**: Exact URL match
- **title**: Exact title match
- **pattern**: Regex pattern for URL matching

### Group Structure
```json
{
  "title": "Group Title",  // Optional group header
  "links": [
    {
      "title": "Link Title",  // Must match Ghost navigation item title
      "icon": "icon-name",    // Optional icon
      "badge": "Badge Text",  // Optional badge
      "url": "/custom-url"    // Optional custom URL
    }
  ]
}
```

## Featured Content (Optional)
Add a promotional card at the bottom of mega menus:
```json
{
  "title": "Card Title",
  "description": "Card description text",
  "image": "/path/to/image.jpg",
  "button": {
    "text": "Button Text",
    "url": "/destination"
  }
}
```

## Tips

1. **Multiple Menus**: Add multiple menu objects to the `menus` array
2. **Mix Types**: Use different menu types for different items
3. **No JSON Required**: Simple dropdowns work without configuration
4. **Live Preview**: Changes appear immediately after saving
5. **Debug Mode**: Check browser console for "Applied JSON config to:" messages

## Example: Multiple Menu Types

```javascript
window.themeixMenuConfig = {
  "menus": [
    {
      "match": { "url": "/courses/" },
      "type": "mega",
      "settings": { "columns": 3, "width": "900px" },
      "groups": [
        {
          "title": "Categories",
          "links": [
            { "title": "Business", "icon": "briefcase", "badge": "Popular" },
            { "title": "Marketing", "icon": "megaphone" }
          ]
        }
      ]
    },
    {
      "match": { "url": "/about/" },
      "type": "dropdown",
      "icon": "info-circle",
      "badge": "New"
    },
    {
      "match": { "title": "Resources" },
      "type": "mega",
      "settings": { "columns": 2 },
      "groups": [
        { "title": "Documentation", "links": [{ "title": "Getting Started" }] },
        { "title": "Support", "links": [{ "title": "Help Center" }] }
      ],
      "featured": {
        "title": "Need Help?",
        "description": "Contact our support team",
        "button": { "text": "Contact Us", "url": "/contact" }
      }
    }
  ]
};
```

## Troubleshooting

**Menu not appearing as mega menu?**
- Check that the URL in `match.url` exactly matches your Ghost navigation item
- Look for "Applied JSON config to:" in browser console
- Ensure "Courses" item exists in Ghost navigation

**Icons not showing?**
- Use exact icon names from the available icons list
- Check browser console for errors

**Featured image not loading?**
- Use absolute path or correct relative path
- Ensure image file exists in your Ghost content directory

**Columns not aligning properly?**
- Check that `columns` setting matches your group count
- Adjust `width` setting if needed