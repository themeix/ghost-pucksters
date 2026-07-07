function parseNavigation(navElement) {
    if (!navElement) {
        console.error('Navigation element not found');
        return [];
    }

    const menuItems = [];
    const elements = navElement.querySelectorAll(':scope > .nav-item');

    elements.forEach((element, index) => {
        const link = element.querySelector('a');
        if (!link) return;

        const menuItem = {
            id: `menu-${index}`,
            title: link.textContent.trim(),
            url: link.getAttribute('href'),
            type: 'link',
            children: [],
            icon: null,
            badge: null,
            groups: [],
            featured: null,
            settings: {}
        };

        const subnav = element.querySelector(':scope > .nav');
        if (subnav) {
            menuItem.children = parseSubmenu(subnav, menuItem.id);
            menuItem.type = 'dropdown';
        }

        menuItems.push(menuItem);
    });

    return menuItems;
}

function parseSubmenu(submenuElement, parentId) {
    const items = [];
    const elements = submenuElement.querySelectorAll(':scope > .nav-item');

    elements.forEach((element, index) => {
        const link = element.querySelector('a');
        if (!link) return;

        const menuItem = {
            id: `${parentId}-${index}`,
            title: link.textContent.trim(),
            url: link.getAttribute('href'),
            type: 'link',
            children: [],
            icon: null,
            badge: null,
            groups: [],
            featured: null,
            settings: {}
        };

        const nestedSubnav = element.querySelector(':scope > .nav');
        if (nestedSubnav) {
            menuItem.children = parseSubmenu(nestedSubnav, menuItem.id);
            menuItem.type = 'dropdown';
        }

        items.push(menuItem);
    });

    return items;
}

function parseGhostNavigationData(navElement) {
    const navData = {
        items: [],
        timestamp: Date.now()
    };

    const elements = navElement.querySelectorAll(':scope > .nav-item');
    elements.forEach((element, index) => {
        const link = element.querySelector('a');
        if (!link) return;

        navData.items.push({
            id: `menu-${index}`,
            title: link.textContent.trim(),
            url: link.getAttribute('href'),
            hasChildren: element.querySelector(':scope > .nav') !== null
        });
    });

    return navData;
}

function parseNavItemAttributes(element) {
    const attributes = {
        dataAttributes: {},
        ariaAttributes: {},
        customClasses: []
    };

    Array.from(element.attributes).forEach(attr => {
        if (attr.name.startsWith('data-')) {
            attributes.dataAttributes[attr.name] = attr.value;
        } else if (attr.name.startsWith('aria-')) {
            attributes.ariaAttributes[attr.name] = attr.value;
        } else if (attr.name === 'class') {
            const classes = attr.value.split(' ').filter(cls => 
                cls !== 'nav-item' && 
                cls !== 'has-submenu' && 
                !cls.startsWith('themeix-')
            );
            attributes.customClasses = classes;
        }
    });

    return attributes;
}

function normalizeMenuItem(item) {
    return {
        id: item.id || generateUniqueId(),
        title: item.title || '',
        url: item.url || '#',
        type: item.type || 'link',
        children: Array.isArray(item.children) ? item.children : [],
        icon: item.icon || null,
        badge: item.badge || null,
        groups: Array.isArray(item.groups) ? item.groups : [],
        featured: item.featured || null,
        settings: typeof item.settings === 'object' ? item.settings : {}
    };
}

function generateUniqueId() {
    return `menu-${Math.random().toString(36).substr(2, 9)}`;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        parseNavigation,
        parseSubmenu,
        parseGhostNavigationData,
        parseNavItemAttributes,
        normalizeMenuItem,
        generateUniqueId
    };
}