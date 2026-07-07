# Themeix Ghost Dynamic Menu Library

## Product Planning Document (PPD)

**Version:** 1.0\
**Status:** Planning

------------------------------------------------------------------------

# 1. Vision

The **Themeix Ghost Dynamic Menu Library** is a reusable,
dependency-free JavaScript library that transforms Ghost CMS's native
navigation into a modern, fully customizable navigation system while
remaining 100% compatible with Ghost's built-in Navigation editor.

The library follows a **hybrid architecture**:

-   Ghost Navigation is the **source of truth** for links and hierarchy.
-   JSON configuration enhances the navigation with advanced UI
    features.
-   The rendering engine automatically chooses between normal links,
    dropdowns, and mega menus.

The goal is to provide a navigation system that is simple for beginners
yet powerful enough for advanced users without requiring Handlebars
modifications.

------------------------------------------------------------------------

# 2. Goals

## Primary Goals

-   Reusable across all Themeix Ghost themes
-   Zero dependencies
-   Mobile-first
-   Accessible
-   Lightweight
-   Automatic rendering
-   Backward compatible with Ghost Navigation
-   Beginner-friendly
-   Advanced customization through JSON
-   No HTML editing required

------------------------------------------------------------------------

# 3. Core Philosophy

Ghost Navigation remains the **single source of truth**.

Users should continue managing:

-   Menu labels
-   URLs
-   Menu order
-   Parent/child relationships

The JSON configuration should **enhance**, not replace, the navigation.

------------------------------------------------------------------------

# 4. Hybrid Menu System

## Option 1 --- Native Ghost Dropdown

Ghost Navigation:

``` text
Courses
- All Courses
- Business
- Marketing
```

Automatically renders as a dropdown.

No JSON required.

------------------------------------------------------------------------

## Option 2 --- JSON Mega Menu

If a JSON configuration exists for the same menu, the library upgrades
it into a Mega Menu.

Ghost Navigation provides:

-   Parent label
-   Parent URL
-   Child URLs

JSON provides:

-   Icons
-   Columns
-   Badges
-   Featured cards
-   Layout
-   Styling

------------------------------------------------------------------------

# 5. Rendering Priority

``` text
JSON Exists?
        │
   Yes ─────► Render JSON Menu
        │
        No
        │
Has "-" Children?
        │
   Yes ─────► Dropdown
        │
        No
        │
      Normal Link
```

------------------------------------------------------------------------

# 6. Architecture

``` text
Ghost Navigation
        │
        ▼
Navigation Parser
        │
        ▼
JSON Loader
        │
        ▼
Configuration Merger
        │
        ▼
Menu Detection Engine
        │
        ▼
Renderer
     ┌───────┴────────┐
     ▼                ▼
Desktop           Mobile
```

------------------------------------------------------------------------

# 7. Project Structure

``` text
themeix-menu/

    themeix-menu.js

    modules/

        parser.js
        config.js
        merger.js
        detector.js
        renderer.js
        dropdown.js
        mega.js
        mobile.js
        animation.js
        utils.js

    themeix-menu.css
```

------------------------------------------------------------------------

# 8. Internal Menu Object

``` js
{
  id,
  title,
  url,
  type,
  children,
  icon,
  badge,
  groups,
  featured,
  settings
}
```

------------------------------------------------------------------------

# 9. Supported Menu Types

## Link

Standard navigation link.

## Dropdown

Built automatically from Ghost's "-" child items.

## Mega Menu

JSON-enhanced multi-column layout.

## Custom

Reserved for future layouts such as tabs, cards, search, or app menus.

------------------------------------------------------------------------

# 10. JSON Philosophy

JSON should only define what Ghost Navigation cannot.

Examples:

-   Icons
-   Badges
-   Descriptions
-   Featured content
-   Layout
-   Width
-   Alignment
-   Animation

Avoid duplicating navigation links whenever possible.

------------------------------------------------------------------------

# 11. Recommended JSON Schema

``` json
{
  "version": 1,
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
          "title": "Learning",
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

------------------------------------------------------------------------

# 12. JavaScript API

``` js
ThemeixMenu.init()
ThemeixMenu.refresh()
ThemeixMenu.destroy()
ThemeixMenu.open()
ThemeixMenu.close()
```

------------------------------------------------------------------------

# 13. Events

-   menu:init
-   menu:open
-   menu:close
-   menu:change

------------------------------------------------------------------------

# 14. CSS Variables

``` css
--tdgm-menu-width
--tdgm-mega-width
--tdgm-dropdown-width
--tdgm-menu-gap
--tdgm-menu-radius
--tdgm-menu-shadow
--tdgm-menu-background
--tdgm-menu-color
--menu-animation
```

------------------------------------------------------------------------

# 15. Accessibility

-   Keyboard navigation
-   Escape closes menus
-   Arrow key navigation
-   Focus management
-   Screen reader support
-   ARIA attributes

------------------------------------------------------------------------

# 16. Performance

-   Event delegation
-   Lazy initialization
-   No jQuery
-   Dependency-free
-   Small bundle
-   Single resize listener
-   Single scroll listener

------------------------------------------------------------------------

# 17. Roadmap

## Phase 1 --- Foundation

-   Navigation parser
-   Native dropdown support
-   Mobile accordion
-   Menu detection engine
-   Core API

## Phase 2 --- JSON Enhancements

-   JSON loader
-   Merge engine
-   Icons
-   Badges
-   Descriptions
-   Dropdown enhancements

## Phase 3 --- Mega Menu

-   Multi-column layouts
-   Grouped links
-   Featured cards
-   CTA blocks
-   Custom widths
-   Alignment options
-   Animations

## Phase 4 --- Advanced Features

-   Plugin system
-   Search integration
-   Language switcher
-   Dark mode toggle
-   Theme presets
-   Visual examples
-   Documentation generator

------------------------------------------------------------------------

# 18. Future Vision

The Themeix Ghost Dynamic Menu Library should become a shared navigation
engine used across all Themeix Ghost themes, providing a consistent
developer experience, a beginner-friendly workflow, and a scalable
architecture for future features without breaking backward
compatibility.
