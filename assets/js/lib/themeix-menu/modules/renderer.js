function renderNavigation(menuItems, container, config = {}) {
    container.innerHTML = '';
    container.classList.add('themeix-menu-container');

    menuItems.forEach(item => {
        const menuItem = renderMenuItem(item, config);
        container.appendChild(menuItem);
    });

    return container;
}

function renderMenuItem(item, config = {}) {
    const li = document.createElement('li');
    li.className = `themeix-menu-item themeix-menu-item-${item.type}`;
    li.dataset.menuId = item.id;
    li.dataset.menuType = item.type;

    if (item.children && item.children.length > 0) {
        li.classList.add('has-submenu');
    }

    const link = renderMenuLink(item, config);
    li.appendChild(link);

    if (item.children && item.children.length > 0) {
        const submenu = renderSubmenu(item, config);
        li.appendChild(submenu);
    }

    return li;
}

function renderMenuLink(item, config = {}) {
    const link = document.createElement('a');
    link.href = item.url;
    link.className = 'themeix-menu-link';
    link.textContent = item.title;
    link.setAttribute('aria-label', item.title);

    if (item.children && item.children.length > 0) {
        link.setAttribute('aria-haspopup', 'true');
        link.setAttribute('aria-expanded', 'false');
    }

    if (item.icon) {
        const icon = renderIcon(item.icon);
        link.insertBefore(icon, link.firstChild);
    }

    if (item.badge) {
        const badge = renderBadge(item.badge);
        link.appendChild(badge);
    }

    if (item.description) {
        const description = document.createElement('span');
        description.className = 'themeix-menu-description';
        description.textContent = item.description;
        link.appendChild(description);
    }

    return link;
}

function renderIcon(iconName) {
    const icon = document.createElement('span');
    icon.className = `themeix-menu-icon ${iconName}`;
    icon.setAttribute('aria-hidden', 'true');
    return icon;
}

function renderBadge(badgeText) {
    const badge = document.createElement('span');
    badge.className = 'themeix-menu-badge';
    badge.textContent = badgeText;
    badge.setAttribute('aria-label', `Featured: ${badgeText}`);
    return badge;
}

function renderSubmenu(item, config = {}) {
    const isMega = item.type === 'mega' || (item.settings && item.settings.columns > 2);
    const className = isMega ? 'themeix-submenu-mega' : 'themeix-submenu-dropdown';

    const submenu = document.createElement('ul');
    submenu.className = `themeix-submenu ${className}`;
    submenu.dataset.menuId = item.id;
    submenu.setAttribute('aria-label', `${item.title} submenu`);

    if (item.settings) {
        if (item.settings.width) {
            submenu.style.width = item.settings.width;
        }

        if (item.settings.alignment) {
            submenu.classList.add(`align-${item.settings.alignment}`);
        }

        if (item.settings.columns) {
            submenu.style.setProperty('--menu-columns', item.settings.columns);
        }
    }

    if (isMega && item.groups && item.groups.length > 0) {
        renderMegaMenuGroups(item.groups, submenu);
    } else {
        renderSimpleSubmenu(item.children, submenu);
    }

    return submenu;
}

function renderSimpleSubmenu(children, container) {
    children.forEach(child => {
        const childItem = renderMenuItem(child);
        container.appendChild(childItem);
    });
}

function renderMegaMenuGroups(groups, container) {
    const groupsContainer = document.createElement('div');
    groupsContainer.className = 'themeix-mega-groups';

    groups.forEach(group => {
        const groupElement = renderMegaGroup(group);
        groupsContainer.appendChild(groupElement);
    });

    container.appendChild(groupsContainer);
}

function renderMegaGroup(group) {
    const groupElement = document.createElement('div');
    groupElement.className = 'themeix-mega-group';

    if (group.title) {
        const groupTitle = document.createElement('h3');
        groupTitle.className = 'themeix-mega-group-title';
        groupTitle.textContent = group.title;
        groupElement.appendChild(groupTitle);
    }

    const groupLinks = document.createElement('ul');
    groupLinks.className = 'themeix-mega-group-links';

    if (group.links) {
        group.links.forEach(link => {
            const linkItem = renderMenuItem(link);
            groupLinks.appendChild(linkItem);
        });
    }

    groupElement.appendChild(groupLinks);
    return groupElement;
}

function renderMobileMenu(menuItems, container, config = {}) {
    container.innerHTML = '';
    container.classList.add('themeix-mobile-menu');

    menuItems.forEach(item => {
        const mobileItem = renderMobileMenuItem(item, config);
        container.appendChild(mobileItem);
    });

    return container;
}

function renderMobileMenuItem(item, config = {}) {
    const li = document.createElement('li');
    li.className = 'themeix-mobile-menu-item';
    li.dataset.menuId = item.id;

    const link = renderMobileMenuLink(item, config);
    li.appendChild(link);

    if (item.children && item.children.length > 0) {
        const submenu = renderMobileSubmenu(item, config);
        li.appendChild(submenu);
    }

    return li;
}

function renderMobileMenuLink(item, config = {}) {
    const link = document.createElement('a');
    link.href = item.url;
    link.className = 'themeix-mobile-menu-link';
    link.textContent = item.title;

    if (item.icon) {
        const icon = renderIcon(item.icon);
        link.insertBefore(icon, link.firstChild);
    }

    if (item.children && item.children.length > 0) {
        const toggle = document.createElement('button');
        toggle.className = 'themeix-mobile-toggle';
        toggle.setAttribute('aria-label', 'Toggle submenu');
        toggle.innerHTML = '<span class="toggle-icon"></span>';
        link.appendChild(toggle);
    }

    if (item.badge) {
        const badge = renderBadge(item.badge);
        link.appendChild(badge);
    }

    return link;
}

function renderMobileSubmenu(item, config = {}) {
    const submenu = document.createElement('ul');
    submenu.className = 'themeix-mobile-submenu';
    submenu.dataset.menuId = item.id;

    item.children.forEach(child => {
        const childItem = renderMobileMenuItem(child, config);
        submenu.appendChild(childItem);
    });

    return submenu;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderNavigation,
        renderMenuItem,
        renderMenuLink,
        renderSubmenu,
        renderSimpleSubmenu,
        renderMegaMenuGroups,
        renderMegaGroup,
        renderFeaturedContent,
        renderMobileMenu,
        renderMobileMenuItem,
        renderMobileMenuLink,
        renderMobileSubmenu
    };
}