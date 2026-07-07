const ThemeixMenu = (function() {
    'use strict';

    let menus = [];
    let config = {};
    let events = {};
    let isInitialized = false;

    const defaultConfig = {
        selector: '#themeix-main-menu',
        mobileBreakpoint: 768,
        animationDuration: 300,
        closeOnClickOutside: true,
        closeOnEscape: true,
        keyboardNavigation: true,
        mouseDelay: 150,
        childPrefix: '-',
        jsonConfigPath: null
    };

    function init(userConfig = {}) {
        if (isInitialized) {
            console.warn('ThemeixMenu already initialized');
            return;
        }

        config = { ...defaultConfig, ...userConfig };
        
        // Check for injected config via Ghost Code Injection
        if (window.themeixMenuConfig) {
            console.log('Found injected themeixMenuConfig:', window.themeixMenuConfig);
            config.jsonConfig = window.themeixMenuConfig;
        } else {
            console.log('No injected themeixMenuConfig found - will check again during parsing');
        }
        
        console.log('DEBUG: useGhostChildren setting:', config.jsonConfig ? config.jsonConfig.useGhostChildren : 'not set');
        console.log('DEBUG: Has JSON config:', !!config.jsonConfig);
        
        try {
            parseNavigation();
            setupEventListeners();
            isInitialized = true;
            emit('menu:init', { menus, config });
            
            // Check for JSON config again after parsing (in case it was set after init)
            if (!config.jsonConfig && window.themeixMenuConfig) {
                console.log('JSON config found after initial check, re-parsing...');
                config.jsonConfig = window.themeixMenuConfig;
                menus = []; // Reset menus
                parseNavigation();
            }
            
            console.log('ThemeixMenu initialized successfully with', menus.length, 'menu items');
        } catch (error) {
            console.error('ThemeixMenu initialization error:', error);
        }
    }

    async function parseNavigation() {
        // Check for injected config if not already set
        if (!config.jsonConfig && window.themeixMenuConfig) {
            console.log('Found injected themeixMenuConfig during parsing:', window.themeixMenuConfig);
            config.jsonConfig = window.themeixMenuConfig;
        }
        
        const navElement = document.querySelector(config.selector);
        if (!navElement) {
            console.error('Navigation element not found:', config.selector);
            return;
        }

        const navList = navElement.querySelector('.nav');
        if (!navList) {
            console.error('Navigation list not found');
            return;
        }

        navElement.classList.add('themeix-menu-initialized');
        navElement.classList.remove('is-dropdown-loaded');
        
        let menuItems = [];
        
        // Check if we should use JSON menu completely
        if (config.jsonConfig && config.jsonConfig.useGhostChildren === false) {
            console.log('Creating complete menu from JSON, ignoring Ghost navigation');
            menuItems = createMenuFromJSON(config.jsonConfig);
        } else {
            // Parse Ghost navigation normally
            const items = Array.from(navList.children);
            let currentParent = null;

            items.forEach((item, index) => {
                const link = item.querySelector('a');
                if (!link) return;

                const linkText = link.textContent.trim();
                const isChild = linkText.startsWith(config.childPrefix);

                if (isChild && currentParent) {
                    const cleanTitle = linkText.replace(new RegExp(`^${config.childPrefix}+\\s*`), '');
                    
                    const childItem = {
                        id: `menu-${currentParent.id}-${index}`,
                        title: cleanTitle,
                        url: link.getAttribute('href'),
                        type: 'link',
                        element: item
                    };
                    currentParent.children.push(childItem);
                    
                    item.style.display = 'none';
                    
                    currentParent.element.classList.add('-has-child');
                } else {
                    const menuItem = {
                        id: `menu-${index}`,
                        title: linkText,
                        url: link.getAttribute('href'),
                        type: 'link',
                        children: [],
                        element: item,
                        hasChildren: false
                    };

                    currentParent = menuItem;
                    menuItems.push(menuItem);
                }
            });
        }

        // Apply JSON configuration if available
        if (config.jsonConfig) {
            console.log('Applying JSON configuration...');
            
            // Check if we should replace the entire menu structure
            if (config.jsonConfig.useGhostChildren === false) {
                console.log('Replacing entire menu structure from JSON');
                menuItems = createMenuFromJSON(config.jsonConfig);
            } else {
                menuItems.forEach(item => {
                    console.log('Checking item:', item.title, 'URL:', item.url);
                    const matchingConfig = findMatchingMenuConfig(item, config.jsonConfig);
                    if (matchingConfig) {
                        console.log('Found matching config for:', item.title);
                        applyJSONToMenuItem(item, matchingConfig);
                    } else {
                        console.log('No matching config for:', item.title);
                    }
                });
            }
        } else {
            console.log('No JSON config to apply');
        }

        menuItems.forEach(item => {
            console.log('DEBUG: Processing menu item:', item.title, 'Has children:', item.hasChildren, 'Has element:', !!item.element, 'Type:', item.type);
            
            if (item.children.length > 0) {
                item.hasChildren = true;
                item.type = 'dropdown';
                console.log('DEBUG: Setting as dropdown due to children');
            }
            
            if (item.element) {
                console.log('Enhancing existing Ghost element:', item.title);
                enhanceMenuItem(item);
            } else {
                console.log('Creating new DOM element for JSON menu item:', item.title);
                // Create new DOM element for JSON menu items
                const newItemElement = createNewMenuItemElement(item);
                console.log('DEBUG: Created new menu element:', newItemElement);
                const navList = navElement.querySelector('.nav');
                console.log('DEBUG: Nav element:', navElement);
                console.log('DEBUG: Nav list found:', !!navList);
                if (navList) {
                    console.log('DEBUG: Nav list children before add:', navList.children.length);
                    navList.appendChild(newItemElement);
                    item.element = newItemElement;
                    console.log('DEBUG: Nav list children after add:', navList.children.length);
                    console.log('DEBUG: Added new element to navigation for:', item.title);
                } else {
                    console.error('DEBUG: Could not find .nav list in navigation element');
                }
            }
        });
        
        console.log('DEBUG: Finished processing menu items');
        console.log('DEBUG: Nav element children count:', navElement.querySelector('.nav').children.length);

        menus = menuItems;
        
        if (menus.length > 0) {
            console.log('DEBUG: Final menu items:', menus.map(m => ({
                title: m.title,
                hasChildren: m.hasChildren,
                childrenCount: m.children.length,
                type: m.type
            })));
        }
        
        console.log('DEBUG: Adding is-dropdown-loaded class to prevent menu flicker');
        navElement.classList.add('is-dropdown-loaded');
        navElement.parentElement.classList.add('is-dropdown-loaded');
    }

    function enhanceMenuItem(item) {
        const element = item.element;
        const link = element.querySelector('a');
        const isMobile = window.innerWidth <= config.mobileBreakpoint || 'ontouchstart' in window;

        element.classList.add('themeix-menu-item', `themeix-menu-item-${item.type}`);
        
        // Only add has-submenu class and attributes if the item actually has children
        if (item.hasChildren || item.children.length > 0) {
            element.classList.add('has-submenu');
        }
        
        element.dataset.menuId = item.id;
        element.style.position = 'relative';

        if (link) {
            link.classList.add('themeix-menu-link');
            
            // Only add aria-haspopup and dropdown arrow if item has children
            if (item.hasChildren || item.children.length > 0) {
                link.setAttribute('aria-haspopup', 'true');
                link.setAttribute('aria-expanded', 'false');
            }
            
            link.style.position = 'relative';
            link.style.display = 'inline-flex';
            link.style.alignItems = 'center';
            link.style.gap = '0.5rem';
            link.style.cursor = isMobile ? 'pointer' : 'default';

            // Add icon if available
            if (item.icon) {
                const iconElement = createIconElement(item.icon);
                if (iconElement) {
                    link.insertBefore(iconElement, link.firstChild);
                }
            }

            // Add badge if available
            if (item.badge) {
                const badge = document.createElement('span');
                badge.className = 'themeix-menu-badge';
                badge.textContent = item.badge;
                link.appendChild(badge);
            }

            // On mobile, use click events instead of hover
            if (isMobile) {
                link.addEventListener('click', (e) => {
                    if (item.hasChildren || item.children.length > 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleDropdown(item);
                    }
                });
                
                // Prevent mobile tap delay and double-tap issues
                link.addEventListener('touchend', (e) => {
                    if (item.hasChildren || item.children.length > 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleDropdown(item);
                    }
                });
            } else {
                // Desktop hover events
                link.addEventListener('mouseenter', () => {
                    if (config.mouseDelay) {
                        element.hoverTimeout = setTimeout(() => {
                            openDropdown(item);
                        }, config.mouseDelay);
                    } else {
                        openDropdown(item);
                    }
                });

                link.addEventListener('mouseleave', () => {
                    if (element.hoverTimeout) {
                        clearTimeout(element.hoverTimeout);
                    }
                    delayedCloseDropdown(item);
                });
            }

            link.addEventListener('click', (e) => {
                if (!isMobile && (item.hasChildren || item.children.length > 0)) {
                    e.preventDefault();
                    toggleDropdown(item);
                }
            });
        }

        // Only create submenu if item has children
        if (item.hasChildren || item.children.length > 0) {
            const submenu = createSubmenu(item);
            element.appendChild(submenu);
        }
    }

    function getIconSVG(iconName) {
        const icons = {
            'book': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
            'megaphone': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>',
            'palette': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>',
            'star': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
            'heart': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
            'search': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
            'user': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
            'settings': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>'
        };
        
        return icons[iconName] || '';
    }

    function createIconElement(iconConfig) {
        if (!iconConfig) return null;

        const iconElement = document.createElement('span');
        
        if (typeof iconConfig === 'string') {
            // Simple icon name (SVG icon)
            iconElement.className = `themeix-menu-icon ${iconConfig}`;
            iconElement.innerHTML = getIconSVG(iconConfig);
        } else if (iconConfig.sprite) {
            // Sprite image icon
            iconElement.className = 'themeix-menu-icon themeix-sprite-icon';
            iconElement.style.width = iconConfig.width || '20px';
            iconElement.style.height = iconConfig.height || '20px';
            iconElement.style.backgroundImage = `url('${iconConfig.sprite}')`;
            iconElement.style.backgroundPosition = `${iconConfig.x || '0px'} ${iconConfig.y || '0px'}`;
            iconElement.style.backgroundSize = iconConfig.spriteSize || 'auto';
        } else if (iconConfig.image) {
            // Regular image icon
            iconElement.className = 'themeix-menu-icon themeix-image-icon';
            const iconWidth = iconConfig.width || '16px';
            const iconHeight = iconConfig.height || '16px';
            iconElement.style.width = iconWidth;
            iconElement.style.height = iconHeight;
            iconElement.innerHTML = `<img src="${iconConfig.image}" alt="${iconConfig.alt || ''}">`;
        }
        
        return iconElement;
    }

    function createSubmenu(item) {
        const isMega = item.type === 'mega' || (item.settings && item.settings.columns > 2);
        const className = isMega ? 'themeix-submenu-mega' : 'themeix-submenu-dropdown';

        const ul = document.createElement('ul');
        ul.className = `themeix-submenu ${className}`;
        ul.dataset.menuId = item.id;
        ul.setAttribute('aria-label', `${item.title} submenu`);

        // Check if full width or custom width mega menu
        const isFullWidth = item.settings && (item.settings.width === '100vw' || item.settings.width === '100%');
        const hasCustomWidth = item.settings && item.settings.width;

        // Build base styles
        let styles = `
            position: absolute;
            top: 100%;
            left: 0;
            min-width: ${isMega ? '700px' : 'auto'};
            background: var(--tdgm-submenu-background);
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            padding: ${isMega ? 'var(--tdgm-mega-padding)' : 'var(--tdgm-submenu-padding)'} ;
            list-style: none;
            margin:  ${isMega ? '-8px 0px 0px' : '12px 0px 0px'} ;
            opacity: 0;
            visibility: hidden; 
            z-index: 1000;
        `;

        // Apply settings
        if (item.settings) {
            if (item.settings.width) {
                styles += `width: ${item.settings.width};`;
                if (isFullWidth) {
                    styles += `max-width: ${item.settings.width};`;
                }
            }

            if (item.settings.alignment) {
                ul.classList.add(`align-${item.settings.alignment}`);
                
                if (item.settings.alignment === 'center') {
                    styles += `position: fixed;`;
                    styles += `left: 50%;`;
                    styles += `transform: translateX(-50%);`;
                } else if (item.settings.alignment === 'right') {
                    styles += `left: auto; right: 0;`;
                } else if (isFullWidth) {
                    styles += `left: 0; right: 0;`;
                }
            }

            if (item.settings.columns) {
                ul.style.setProperty('--menu-columns', item.settings.columns);
            }

            if (item.settings.animation) {
                ul.dataset.animation = item.settings.animation;
            }
        }

        ul.style.cssText = styles;

        ul.addEventListener('mouseenter', () => {
            if (ul.hoverTimeout) {
                clearTimeout(ul.hoverTimeout);
            }
        });

        ul.addEventListener('mouseleave', () => {
            delayedCloseDropdown(item);
        });

        // Render content based on type
        if (isMega && item.groups && item.groups.length > 0) {
            createMegaMenuGroups(item.groups, null, item.settings, ul);
        } else {
            item.children.forEach(child => {
                const li = createSubmenuItem(child);
                ul.appendChild(li);
            });
        }

        return ul;
    }

    function createSubmenuItem(child) {
        const li = document.createElement('li');
        li.className = 'themeix-submenu-item';

        const a = document.createElement('a');
        a.href = child.url;
        a.className = 'themeix-submenu-link';
        
        // Add icon if available
        if (child.icon) {
            const iconElement = createIconElement(child.icon);
            if (iconElement) {
                a.appendChild(iconElement);
            }
        }
        
        // Add title
        const titleSpan = document.createElement('span');
        titleSpan.textContent = child.title;
        a.appendChild(titleSpan);
        
        // Add badge if available
        if (child.badge) {
            const badge = document.createElement('span');
            badge.className = 'themeix-submenu-badge';
            badge.textContent = child.badge;
            a.appendChild(badge);
        }

        li.appendChild(a);
        return li;
    }

    function createMegaMenuGroups(groups, featuredContent, settings, container) {
        const groupsContainer = document.createElement('div');
        groupsContainer.className = 'themeix-mega-groups';

        let columnCount = parseInt(settings.columns) || 3;
        const totalColumns = columnCount;
        const actualColumnCount = Math.min(totalColumns, groups.length);
        
        const columnWidth = 100 / actualColumnCount;
        
        console.log('Column settings:', { columnCount, totalColumns, actualColumnCount, columnWidth, groupsCount: groups.length });

        groups.forEach((group, index) => {
            const groupElement = createMegaGroup(group, columnWidth);
            groupsContainer.appendChild(groupElement);
        });

        container.appendChild(groupsContainer);
    }

    function createMegaGroup(group, columnWidth) {
        const groupElement = document.createElement('div');
        groupElement.className = 'themeix-mega-group';
        groupElement.style.flex = `0 0 calc(${columnWidth}% - 1.5rem)`;
        groupElement.style.minWidth = '150px';
        groupElement.style.maxWidth = `calc(${columnWidth}% - 1.5rem)`;

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
                const li = createSubmenuItem(link);
                groupLinks.appendChild(li);
            });
        }

        groupElement.appendChild(groupLinks);
        return groupElement;
    }

    function createNewMenuItemElement(item) {
        console.log('DEBUG: Creating new menu element for:', item.title);
        console.log('DEBUG: Item properties:', {
            title: item.title,
            url: item.url,
            type: item.type,
            hasChildren: item.hasChildren,
            childrenCount: item.children.length,
            icon: item.icon,
            badge: item.badge,
            groupsCount: item.groups.length
        });
        
        const li = document.createElement('li');
        li.className = `themeix-menu-item themeix-menu-item-${item.type}`;
        
        // Only add has-submenu class if item has children
        if (item.hasChildren || item.children.length > 0) {
            li.classList.add('has-submenu');
        }
        
        li.dataset.menuId = item.id;
        li.style.position = 'relative';

        const link = document.createElement('a');
        link.href = item.url;
        link.className = 'themeix-menu-link';
        link.textContent = item.title;
        link.setAttribute('aria-label', item.title);

        // Only add aria attributes if item has children
        if (item.hasChildren || item.children.length > 0) {
            link.setAttribute('aria-haspopup', 'true');
            link.setAttribute('aria-expanded', 'false');
        }

        console.log('DEBUG: Adding icon:', item.icon);
        if (item.icon) {
            const iconElement = createIconElement(item.icon);
            if (iconElement) {
                link.insertBefore(iconElement, link.firstChild);
                console.log('DEBUG: Icon added successfully');
            }
        }

        if (item.badge) {
            console.log('DEBUG: Adding badge:', item.badge);
            const badge = document.createElement('span');
            badge.className = 'themeix-menu-badge';
            badge.textContent = item.badge;
            link.appendChild(badge);
        }

        if (item.description) {
            const description = document.createElement('span');
            description.className = 'themeix-menu-description';
            description.textContent = item.description;
            link.appendChild(description);
        }

        li.appendChild(link);

        if (item.hasChildren || item.children.length > 0) {
            console.log('DEBUG: Creating submenu for:', item.title, 'Children count:', item.children.length);
            const submenu = createSubmenu(item);
            li.appendChild(submenu);
            console.log('DEBUG: Submenu created');
        }

        console.log('DEBUG: Menu element created for:', item.title, 'Type:', item.type);
        return li;
    }

    function openDropdown(item) {
        const element = item.element;
        const submenu = element.querySelector('.themeix-submenu');
        const link = element.querySelector('.themeix-menu-link');
        const arrow = link?.querySelector('.menu-arrow');
        const isMobile = window.innerWidth <= config.mobileBreakpoint || 'ontouchstart' in window;

        if (!submenu || !link) return;

        closeAllDropdowns();

        element.classList.add('is-open');
        link.setAttribute('aria-expanded', 'true');
        
        if (arrow) {
            arrow.style.transform = 'rotate(180deg)';
        }
        
        // Apply animation class based on settings
        if (item.settings && item.settings.animation && !isMobile) {
            const animationClass = `submenu-${item.settings.animation}`;
            submenu.classList.add(animationClass);
        }
        
        // Set visibility and opacity
        submenu.style.visibility = 'visible';
        submenu.style.opacity = '1';
        submenu.style.display = 'block';
        
        // Check if this is a centered mega menu
        const isCentered = submenu.classList.contains('align-center') && 
                          submenu.classList.contains('themeix-submenu-mega');
        
        if (isCentered && !isMobile) {
            // Calculate the correct top position for fixed positioning
            const linkRect = link.getBoundingClientRect();
            const topPosition = linkRect.bottom + 8; // Add 8px margin
            submenu.style.top = `${topPosition}px`;
            
            // Reset transform to only handle horizontal centering
            submenu.style.transform = 'translateX(-50%)';
        }
    }

    function closeDropdown(item) {
        const element = item.element;
        const submenu = element.querySelector('.themeix-submenu');
        const link = element.querySelector('.themeix-menu-link');
        const arrow = link?.querySelector('.menu-arrow');
        const isMobile = window.innerWidth <= config.mobileBreakpoint || 'ontouchstart' in window;

        if (!submenu || !link) return;

        element.classList.remove('is-open');
        link.setAttribute('aria-expanded', 'false');
        
        if (arrow) {
            arrow.style.transform = 'rotate(0deg)';
        }
        
        // Remove animation classes when closing
        const animationClasses = ['submenu-fade', 'submenu-slide', 'submenu-scale', 'submenu-flip'];
        animationClasses.forEach(cls => {
            submenu.classList.remove(cls);
        });
        
        // Reset visibility and opacity
        submenu.style.opacity = '0';
        submenu.style.visibility = 'hidden';
        submenu.style.display = 'none';
        
        // Check if this is a centered mega menu
        const isCentered = submenu.classList.contains('align-center') && 
                          submenu.classList.contains('themeix-submenu-mega');
        
        if (isCentered && !isMobile) {
            // Reset top position for next open
            submenu.style.top = '100%';
            
            // Reset transform to only handle horizontal centering
            submenu.style.transform = 'translateX(-50%)';
        }
    }

    function toggleDropdown(item) {
        const element = item.element;
        if (element.classList.contains('is-open')) {
            closeDropdown(item);
        } else {
            openDropdown(item);
        }
    }

    function delayedCloseDropdown(item) {
        setTimeout(() => {
            const element = item.element;
            if (!element.matches(':hover')) {
                closeDropdown(item);
            }
        }, 150);
    }

    function closeAllDropdowns() {
        const openMenus = document.querySelectorAll('.themeix-menu-item.is-open');
        openMenus.forEach(menu => {
            const itemId = menu.dataset.menuId;
            const item = menus.find(m => m.id === itemId);
            if (item) {
                closeDropdown(item);
            }
        });
    }

    function adjustDropdownPosition(element) {
        const submenu = element.querySelector('.themeix-submenu');
        if (!submenu) return;

        const rect = submenu.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        if (rect.right > viewportWidth) {
            submenu.style.left = 'auto';
            submenu.style.right = '0';
        }

        if (rect.left < 0) {
            submenu.style.left = '0';
            submenu.style.right = 'auto';
        }
    }

    function setupEventListeners() {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyboard);

        if (config.closeOnEscape) {
            document.addEventListener('keydown', handleEscape);
        }
        
        // Handle window resize to switch between mobile/desktop behavior
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const isMobile = window.innerWidth <= config.mobileBreakpoint || 'ontouchstart' in window;
                const menuItems = document.querySelectorAll('.themeix-menu-item.has-submenu');
                
                menuItems.forEach(item => {
                    const itemId = item.dataset.menuId;
                    const menuItem = menus.find(m => m.id === itemId);
                    if (menuItem) {
                        // Re-enhance menu items to update event listeners
                        const link = item.querySelector('.themeix-menu-link');
                        
                        // Remove existing event listeners
                        const newLink = link.cloneNode(true);
                        link.parentNode.replaceChild(newLink, link);
                        
                        // Re-attach events based on current device type
                        if (isMobile) {
                            newLink.addEventListener('click', (e) => {
                                if (menuItem.hasChildren || menuItem.children.length > 0) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleDropdown(menuItem);
                                }
                            });
                            
                            newLink.addEventListener('touchend', (e) => {
                                if (menuItem.hasChildren || menuItem.children.length > 0) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleDropdown(menuItem);
                                }
                            });
                        } else {
                            newLink.addEventListener('mouseenter', () => {
                                if (config.mouseDelay) {
                                    item.hoverTimeout = setTimeout(() => {
                                        openDropdown(menuItem);
                                    }, config.mouseDelay);
                                } else {
                                    openDropdown(menuItem);
                                }
                            });
                            
                            newLink.addEventListener('mouseleave', () => {
                                if (item.hoverTimeout) {
                                    clearTimeout(item.hoverTimeout);
                                }
                                delayedCloseDropdown(menuItem);
                            });
                        }
                    }
                });
            }, 250);
        });
    }

    function handleClickOutside(e) {
        if (!config.closeOnClickOutside) return;

        const navElement = document.querySelector(config.selector);
        if (!navElement) return;

        if (!navElement.contains(e.target)) {
            closeAllDropdowns();
        }
    }

    function handleKeyboard(e) {
        if (!config.keyboardNavigation) return;

        const navElement = document.querySelector(config.selector);
        if (!navElement) return;

        const focusableElements = navElement.querySelectorAll('a, button');
        const focusableArray = Array.from(focusableElements);
        const currentIndex = focusableArray.indexOf(document.activeElement);

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (currentIndex < focusableArray.length - 1) {
                    focusableArray[currentIndex + 1].focus();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (currentIndex > 0) {
                    focusableArray[currentIndex - 1].focus();
                }
                break;
            case 'ArrowRight':
                if (currentIndex !== -1) {
                    const currentItem = focusableArray[currentIndex].parentElement;
                    if (currentItem.classList.contains('has-submenu')) {
                        e.preventDefault();
                        openDropdown(getMenuItemFromElement(currentItem));
                    }
                }
                break;
            case 'ArrowLeft':
                if (currentIndex !== -1) {
                    const currentItem = focusableArray[currentIndex].parentElement;
                    if (currentItem.classList.contains('is-open')) {
                        e.preventDefault();
                        closeDropdown(getMenuItemFromElement(currentItem));
                    }
                }
                break;
        }
    }

    function handleEscape(e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    }

    function getMenuItemFromElement(element) {
        const menuId = element.dataset.menuId;
        return menus.find(m => m.id === menuId);
    }

    function normalizeURL(url) {
        if (!url) return '';
        
        try {
            const urlObj = new URL(url, window.location.origin);
            return urlObj.pathname;
        } catch (error) {
            return url;
        }
    }

    function findMatchingMenuConfig(menuItem, jsonConfig) {
        if (!jsonConfig || !jsonConfig.menus) {
            console.log('Invalid jsonConfig structure');
            return null;
        }

        const normalizedItemURL = normalizeURL(menuItem.url);
        console.log('Searching for match:', menuItem.title, 'URL:', menuItem.url, 'Normalized:', normalizedItemURL);
        
        return jsonConfig.menus.find(menuConfig => {
            const match = menuConfig.match;
            
            if (match.url) {
                const normalizedMatchURL = normalizeURL(match.url);
                if (normalizedItemURL === normalizedMatchURL) {
                    console.log('URL match found:', normalizedMatchURL);
                    return true;
                }
            }
            
            if (match.title && menuItem.title === match.title) {
                console.log('Title match found:', match.title);
                return true;
            }
            
            if (match.label && menuItem.title === match.label) {
                console.log('Label match found:', match.label);
                return true;
            }
            
            if (match.pattern && new RegExp(match.pattern).test(menuItem.url)) {
                console.log('Pattern match found:', match.pattern);
                return true;
            }
            
            return false;
        });
    }

    function applyJSONToMenuItem(menuItem, jsonConfig) {
        // Update menu type
        if (jsonConfig.type) {
            menuItem.type = jsonConfig.type;
        }

        // Merge settings
        if (jsonConfig.settings) {
            menuItem.settings = {
                ...menuItem.settings,
                ...jsonConfig.settings
            };
        }

        // Add icon
        if (jsonConfig.icon) {
            menuItem.icon = jsonConfig.icon;
        }

        // Add badge
        if (jsonConfig.badge) {
            menuItem.badge = jsonConfig.badge;
        }

        // Add description
        if (jsonConfig.description) {
            menuItem.description = jsonConfig.description;
        }

        // Process groups for mega menus
        if (jsonConfig.groups && Array.isArray(jsonConfig.groups)) {
            menuItem.groups = processGroups(menuItem.children, jsonConfig.groups, jsonConfig.useGhostChildren !== false);
        }

        console.log('Applied JSON config to:', menuItem.title, 'Type:', menuItem.type);
    }

    function processGroups(ghostChildren, jsonGroups, useGhostChildren = true) {
        const processedGroups = [];
        
        jsonGroups.forEach(jsonGroup => {
            const group = {
                title: jsonGroup.title || '',
                links: []
            };

            if (jsonGroup.links) {
                jsonGroup.links.forEach(jsonLink => {
                    if (useGhostChildren) {
                        // Try to match with Ghost navigation first
                        const ghostLink = findChildByTitle(ghostChildren, jsonLink.title);
                        
                        if (ghostLink) {
                            // Match found in Ghost navigation - use its URL
                            group.links.push({
                                ...ghostLink,
                                icon: jsonLink.icon || null,
                                badge: jsonLink.badge || null,
                                description: jsonLink.description || null
                            });
                        } else {
                            // No match - create custom link from JSON
                            group.links.push({
                                id: generateUniqueId(),
                                title: jsonLink.title,
                                url: jsonLink.url || '#',
                                type: 'link',
                                icon: jsonLink.icon || null,
                                badge: jsonLink.badge || null,
                                description: jsonLink.description || null
                            });
                        }
                    } else {
                        // Ignore Ghost navigation completely - use only JSON
                        group.links.push({
                            id: generateUniqueId(),
                            title: jsonLink.title,
                            url: jsonLink.url || '#',
                            type: 'link',
                            icon: jsonLink.icon || null,
                            badge: jsonLink.badge || null,
                            description: jsonLink.description || null
                        });
                    }
                });
            }

            processedGroups.push(group);
        });

        return processedGroups;
    }

    function findChildByTitle(children, title) {
        return children.find(child => 
            child.title.toLowerCase() === title.toLowerCase()
        );
    }

    function createMenuFromJSON(jsonConfig) {
        console.log('DEBUG: Creating menu from JSON config:', jsonConfig);
        console.log('DEBUG: JSON config has menus:', jsonConfig.menus && Array.isArray(jsonConfig.menus));
        
        if (!jsonConfig.menus || !Array.isArray(jsonConfig.menus)) {
            console.error('Invalid JSON menu structure');
            return [];
        }

        const menuItems = [];
        console.log('DEBUG: Processing', jsonConfig.menus.length, 'menu items from JSON');
        
        jsonConfig.menus.forEach((menuConfig, index) => {
            console.log('DEBUG: Creating menu item:', menuConfig);
            
            const menuItem = {
                id: `menu-${index}`,
                title: menuConfig.title || 'Menu Item',
                url: menuConfig.url || '#',
                type: menuConfig.type || 'link',
                children: [],
                element: null,
                hasChildren: false,
                settings: menuConfig.settings || {},
                icon: menuConfig.icon || null,
                badge: menuConfig.badge || null,
                description: menuConfig.description || null,
                groups: []
            };

            // Process groups if available
            if (menuConfig.groups && Array.isArray(menuConfig.groups)) {
                console.log('DEBUG: Processing groups for:', menuItem.title, 'Groups:', menuConfig.groups.length);
                menuItem.groups = processGroups([], menuConfig.groups, false);
                menuItem.hasChildren = menuItem.groups.some(group => group.links.length > 0);
                menuItem.type = menuItem.hasChildren ? 'mega' : 'link';
                console.log('DEBUG: Has children:', menuItem.hasChildren, 'Type:', menuItem.type);
                
                // Flatten groups into children for compatibility
                menuItem.groups.forEach(group => {
                    console.log('DEBUG: Flattening group:', group.title, 'Links:', group.links.length);
                    group.links.forEach(link => {
                        menuItem.children.push(link);
                    });
                });
            }

            menuItems.push(menuItem);
            console.log('DEBUG: Created menu item:', menuItem.title, 'Type:', menuItem.type, 'Children:', menuItem.children.length, 'HasChildren:', menuItem.hasChildren);
        });

        console.log('DEBUG: Final menu items from JSON:', menuItems);
        return menuItems;
    }

    function generateUniqueId() {
        return `menu-${Math.random().toString(36).substr(2, 9)}`;
    }

    function destroy() {
        if (!isInitialized) return;

        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleKeyboard);
        document.removeEventListener('keydown', handleEscape);

        menus.forEach(item => {
            if (item.element) {
                const link = item.element.querySelector('a');
                const arrow = link?.querySelector('.menu-arrow');
                const submenu = item.element.querySelector('.themeix-submenu');

                if (arrow) arrow.remove();
                if (submenu) submenu.remove();

                item.element.classList.remove('themeix-menu-item', 'themeix-menu-item-dropdown', 'has-submenu', 'is-open');
                if (link) {
                    link.classList.remove('themeix-menu-link');
                    link.removeAttribute('aria-haspopup');
                    link.removeAttribute('aria-expanded');
                }
            }
        });

        menus = [];
        config = {};
        events = {};
        isInitialized = false;
    }

    function refresh() {
        if (!isInitialized) {
            console.warn('ThemeixMenu not initialized');
            return;
        }

        destroy();
        init(config);
    }

    function open(menuId) {
        if (!isInitialized) return;

        const item = menus.find(m => m.id === menuId);
        if (item && item.hasChildren) {
            openDropdown(item);
        }
    }

    function close(menuId) {
        if (!isInitialized) return;

        if (menuId) {
            const item = menus.find(m => m.id === menuId);
            if (item) {
                closeDropdown(item);
            }
        } else {
            closeAllDropdowns();
        }
    }

    function on(eventName, callback) {
        if (!events[eventName]) {
            events[eventName] = [];
        }
        events[eventName].push(callback);
    }

    function off(eventName, callback) {
        if (!events[eventName]) return;

        if (callback) {
            events[eventName] = events[eventName].filter(cb => cb !== callback);
        } else {
            delete events[eventName];
        }
    }

    function emit(eventName, data) {
        if (!events[eventName]) return;

        events[eventName].forEach(callback => {
            callback(data);
        });
    }

    function getConfig() {
        return { ...config };
    }

    function getMenus() {
        return [...menus];
    }

    function getMenu(menuId) {
        return menus.find(m => m.id === menuId);
    }

    return {
        init,
        destroy,
        refresh,
        open,
        close,
        on,
        off,
        getConfig,
        getMenus,
        getMenu
    };

})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeixMenu;
}