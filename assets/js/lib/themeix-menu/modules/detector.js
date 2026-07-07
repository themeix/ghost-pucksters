function detectMenuType(menuItem, jsonConfig) {
    if (jsonConfig && jsonConfig.type) {
        return jsonConfig.type;
    }

    if (menuItem.children && menuItem.children.length > 0) {
        return 'dropdown';
    }

    if (menuItem.type && menuItem.type !== 'link') {
        return menuItem.type;
    }

    return 'link';
}

function hasSubmenu(menuItem) {
    return menuItem.children && menuItem.children.length > 0;
}

function isMegaMenu(menuItem) {
    return menuItem.type === 'mega' || 
           (menuItem.settings && menuItem.settings.columns > 2);
}

function isDropdown(menuItem) {
    return menuItem.type === 'dropdown' || 
           (hasSubmenu(menuItem) && !isMegaMenu(menuItem));
}

function isLink(menuItem) {
    return menuItem.type === 'link' || !hasSubmenu(menuItem);
}

function detectMenuDepth(menuItem) {
    if (!menuItem.children || menuItem.children.length === 0) {
        return 0;
    }

    let maxDepth = 0;
    menuItem.children.forEach(child => {
        const childDepth = detectMenuDepth(child);
        maxDepth = Math.max(maxDepth, childDepth);
    });

    return maxDepth + 1;
}

function detectMobileMenuState() {
    return window.innerWidth < 768;
}

function detectHoverDevice() {
    return window.matchMedia('(hover: hover)').matches;
}

function detectTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function detectMenuPosition(menuElement) {
    if (!menuElement) return 'unknown';

    const rect = menuElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    if (rect.left < 0) {
        return 'overflow-left';
    }

    if (rect.right > viewportWidth) {
        return 'overflow-right';
    }

    return 'visible';
}

function detectDropdownDirection(menuItem, menuElement) {
    if (!menuElement) return 'down';

    const rect = menuElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;

    if (spaceBelow < 200) {
        return 'up';
    }

    return 'down';
}

function detectMenuAlignment(menuItem, jsonConfig) {
    if (jsonConfig && jsonConfig.settings && jsonConfig.settings.alignment) {
        return jsonConfig.settings.alignment;
    }

    if (menuItem.settings && menuItem.settings.alignment) {
        return menuItem.settings.alignment;
    }

    return 'left';
}

function detectMenuWidth(menuItem, jsonConfig, defaultWidth = 'auto') {
    if (jsonConfig && jsonConfig.settings && jsonConfig.settings.width) {
        return jsonConfig.settings.width;
    }

    if (menuItem.settings && menuItem.settings.width) {
        return menuItem.settings.width;
    }

    if (isMegaMenu(menuItem)) {
        return '1200px';
    }

    return defaultWidth;
}

function shouldRenderAsMega(menuItem, jsonConfig) {
    return detectMenuType(menuItem, jsonConfig) === 'mega' ||
           (jsonConfig && jsonConfig.groups && jsonConfig.groups.length > 1);
}

function shouldRenderAsDropdown(menuItem, jsonConfig) {
    return hasSubmenu(menuItem) && !shouldRenderAsMega(menuItem, jsonConfig);
}

function shouldRenderAsLink(menuItem, jsonConfig) {
    return !hasSubmenu(menuItem) && detectMenuType(menuItem, jsonConfig) === 'link';
}

function getMenuIcon(menuItem) {
    if (menuItem.icon) {
        return menuItem.icon;
    }

    if (menuItem.settings && menuItem.settings.icon) {
        return menuItem.settings.icon;
    }

    return null;
}

function getMenuBadge(menuItem) {
    if (menuItem.badge) {
        return menuItem.badge;
    }

    if (menuItem.settings && menuItem.settings.badge) {
        return menuItem.settings.badge;
    }

    return null;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        detectMenuType,
        hasSubmenu,
        isMegaMenu,
        isDropdown,
        isLink,
        detectMenuDepth,
        detectMobileMenuState,
        detectHoverDevice,
        detectTouchDevice,
        detectMenuPosition,
        detectDropdownDirection,
        detectMenuAlignment,
        detectMenuWidth,
        shouldRenderAsMega,
        shouldRenderAsDropdown,
        shouldRenderAsLink,
        getMenuIcon,
        getMenuBadge
    };
}