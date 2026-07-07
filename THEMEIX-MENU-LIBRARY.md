# Themeix Ghost Dynamic Menu Library

A reusable, dependency-free JavaScript library that transforms Ghost CMS's native navigation into a modern, fully customizable navigation system while remaining 100% compatible with Ghost's built-in Navigation editor.

## Features

- **Zero Dependencies**: Pure vanilla JavaScript, no external libraries required
- **Ghost Compatible**: Works seamlessly with Ghost's built-in Navigation editor
- **Mobile First**: Fully responsive with mobile accordion menu
- **Accessible**: Complete keyboard navigation and ARIA support
- **Lightweight**: Small bundle size for fast loading
- **JSON Configuration**: Advanced UI features through optional JSON config
- **Multiple Menu Types**: Links, dropdowns, and mega menus
- **Customizable**: CSS variables for easy theming
- **Event System**: Built-in event hooks for customization

## Installation

1. Copy the library files to your Ghost theme:
   - `assets/js/lib/themeix-menu.js` (main library)
   - `assets/css/themeix-menu.css` (styles)
   - `assets/js/lib/themeix-menu/` (modules directory)

2. Add the CSS to your theme's `<head>`:
```html
<link rel="stylesheet" type="text/css" href="{{asset "css/themeix-menu.css"}}">
```

3. Add the JavaScript before the closing `</body>` tag:
```html
<script src="{{asset "js/lib/themeix-menu.js"}}"></script>
```

4. Initialize the library:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    ThemeixMenu.init({
        selector: '#themeix-main-menu'
    });
});
```

## Basic Usage

### HTML Structure

Add the initialization class to your Ghost navigation element:

```handlebars
<nav class="gh-navigation-menu themeix-menu-initialized" id="themeix-main-menu">
    {{navigation}}
</nav>
```

### JavaScript Initialization

```javascript
ThemeixMenu.init({
    selector: '#themeix-main-menu',
    mobileBreakpoint: 768,
    animationDuration: 300,
    closeOnClickOutside: true,
    closeOnEscape: true,
    keyboardNavigation: true,
    mouseDelay: 150
});
```

## Menu Types

### 1. Simple Link
Standard navigation link without children.

Ghost Navigation:
```
Home
```

Automatically renders as a simple link.

### 2. Dropdown Menu
Built automatically from Ghost's "-" child items.

Ghost Navigation:
```
Courses
- All Courses
- Business
- Marketing
```

Automatically renders as a dropdown.

### 3. Mega Menu
JSON-enhanced multi-column layout.

Ghost Navigation provides:
- Parent label
- Parent URL
- Child URLs

JSON provides:
- Icons
- Columns
- Badges
- Featured cards
- Layout
- Styling

## JSON Configuration

### Example Configuration

```json
{
  "version": 1,
  "globalSettings": {
    "animationDuration": 300,
    "mouseDelay": 150,
    "closeOnClickOutside": true,
    "closeOnEscape": true,
    "keyboardNavigation": true
  },
  "menus": [
    {
      "match": {
        "url": "/courses/"
      },
      "type": "mega",
      "settings": {
        "columns": 3,
        "width": "1200px",
        "alignment": "center",
        "animation": "fade"
      },
      "groups": [
        {
          "title": "Learning Paths",
          "links": [
            {
              "title": "All Courses",
              "icon": "book"
            },
            {
              "title": "Business",
              "badge": "Popular"
            }
          ]
        }
      ],
      "featured": {
        "title": "Start Learning Today",
        "description": "Browse our latest premium courses.",
        "image": "/content/images/featured-course.webp",
        "button": {
          "text": "Explore Courses",
          "url": "/courses/"
        }
      }
    }
  ]
}
```

### JSON Schema

#### Menu Object Properties

- `match`: Object to identify which menu to enhance
  - `url`: Match by URL
  - `title`: Match by title text
  - `pattern`: Regex pattern for URL matching

- `type`: Menu type (`"mega"`, `"dropdown"`, `"link"`)
- `settings`: Menu configuration
  - `columns`: Number of columns (1-5)
  - `width`: Menu width (e.g., `"1200px"`)
  - `alignment`: Text alignment (`"left"`, `"center"`, `"right"`)
  - `animation`: Animation type (`"fade"`, `"slide"`, `"scale"`, `"flip"`)

- `groups`: Array of menu groups
  - `title`: Group title
  - `links`: Array of links in this group
    - `title`: Link text
    - `url`: Link URL (optional, uses Ghost navigation if not provided)
    - `icon`: Icon class name
    - `badge`: Badge text

- `featured`: Featured content card
  - `title`: Card title
  - `description`: Card description
  - `image`: Image URL
  - `button`: CTA button
    - `text`: Button text
    - `url`: Button URL

## JavaScript API

### Initialization

```javascript
ThemeixMenu.init(config)
```

Initialize the menu library with configuration options.

### Refresh

```javascript
ThemeixMenu.refresh()
```

Re-parse the navigation and update the menu. Useful after dynamic content changes.

### Destroy

```javascript
ThemeixMenu.destroy()
```

Remove all event listeners and clean up the menu.

### Open Menu

```javascript
ThemeixMenu.open(menuId)
```

Open a specific menu by ID.

### Close Menu

```javascript
ThemeixMenu.close(menuId)
```

Close a specific menu by ID. If no ID is provided, closes all menus.

### Event Listeners

```javascript
ThemeixMenu.on(eventName, callback)
ThemeixMenu.off(eventName, callback)
```

Subscribe to menu events.

Available events:
- `menu:init`: Fired when the menu is initialized
- `menu:open`: Fired when a menu is opened
- `menu:close`: Fired when a menu is closed
- `menu:change`: Fired when the menu structure changes

Example:
```javascript
ThemeixMenu.on('menu:open', function(data) {
    console.log('Menu opened:', data.menuId);
});
```

### Get Configuration

```javascript
const config = ThemeixMenu.getConfig()
```

Get the current configuration.

### Get Menus

```javascript
const menus = ThemeixMenu.getMenus()
```

Get all menu items.

### Get Single Menu

```javascript
const menu = ThemeixMenu.getMenu(menuId)
```

Get a specific menu item by ID.

## CSS Customization

The library uses CSS variables for easy customization:

```css
:root {
    --menu-width: 100%;
    --mega-width: 1200px;
    --dropdown-width: 250px;
    --menu-gap: 2rem;
    --menu-radius: 8px;
    --menu-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    --menu-background: #ffffff;
    --menu-color: #333333;
    --menu-hover-color: #666666;
    --menu-active-color: #000000;
    --badge-background: #ff6b6b;
    --badge-color: #ffffff;
    --submenu-background: #ffffff;
    --submenu-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}
```

## Accessibility

The library includes comprehensive accessibility features:

- **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, and Escape
- **ARIA Attributes**: Proper ARIA labels and roles
- **Focus Management**: Logical focus flow through menus
- **Screen Reader Support**: Semantic HTML and ARIA descriptions
- **Reduced Motion**: Respects prefers-reduced-motion preference

### Keyboard Shortcuts

- `Tab` / `Shift+Tab`: Navigate through menu items
- `Enter` / `Space`: Open menu or follow link
- `Arrow Keys`: Navigate within menus
- `Escape`: Close open menus

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Event delegation for efficient event handling
- Lazy initialization
- Single resize listener
- Single scroll listener
- Optimized animations with CSS transforms

## Examples

### Create a Simple Dropdown

Ghost Navigation:
```
Products
- Software
- Hardware
- Services
```

No JSON configuration needed - automatically renders as dropdown.

### Create a Mega Menu

Ghost Navigation:
```
Solutions
- Enterprise
- Small Business
- Education
```

JSON Configuration:
```json
{
  "menus": [
    {
      "match": { "url": "/solutions/" },
      "type": "mega",
      "settings": {
        "columns": 3,
        "width": "1000px"
      },
      "groups": [
        {
          "title": "By Company Size",
          "links": [
            { "title": "Enterprise", "badge": "Popular" },
            { "title": "Small Business" },
            { "title": "Startup" }
          ]
        },
        {
          "title": "By Industry",
          "links": [
            { "title": "Healthcare" },
            { "title": "Finance" },
            { "title": "Education" }
          ]
        },
        {
          "title": "Resources",
          "links": [
            { "title": "Documentation" },
            { "title": "Support" },
            { "title": "Community" }
          ]
        }
      ],
      "featured": {
        "title": "Need Help?",
        "description": "Contact our sales team for a custom solution.",
        "button": {
          "text": "Contact Sales",
          "url": "/contact/"
        }
      }
    }
  ]
}
```

## Troubleshooting

### Menu not appearing

1. Check that the navigation element has the correct ID
2. Ensure the CSS is properly loaded
3. Verify the library is initialized after DOM content is loaded

### Mobile menu not working

1. Check that the mobile toggle button has the `.gh-burger` class
2. Verify the mobile breakpoint is configured correctly
3. Check for CSS conflicts with other styles

### Mega menu not rendering

1. Verify the JSON configuration is valid
2. Check that the `match.url` matches the Ghost navigation URL
3. Ensure the JSON file is being loaded correctly

## Roadmap

### Phase 1 - Foundation ✅
- Navigation parser
- Native dropdown support
- Mobile accordion
- Menu detection engine
- Core API

### Phase 2 - JSON Enhancements
- JSON loader
- Merge engine
- Icons
- Badges
- Descriptions
- Dropdown enhancements

### Phase 3 - Mega Menu
- Multi-column layouts
- Grouped links
- Featured cards
- CTA blocks
- Custom widths
- Alignment options
- Animations

### Phase 4 - Advanced Features
- Plugin system
- Search integration
- Language switcher
- Dark mode toggle
- Theme presets
- Visual examples
- Documentation generator

## License

MIT License - feel free to use in your Ghost themes.

## Support

For issues and feature requests, please visit the GitHub repository.