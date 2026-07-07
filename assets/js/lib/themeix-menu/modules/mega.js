function initMegaMenus(container, config = {}) {
    const megaMenuTriggers = container.querySelectorAll('.themeix-menu-item-mega > .themeix-menu-link');
    
    megaMenuTriggers.forEach(trigger => {
        const menuItem = trigger.parentElement;
        const submenu = menuItem.querySelector('.themeix-submenu-mega');
        
        if (!submenu) return;

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMegaMenu(menuItem);
        });

        trigger.addEventListener('mouseenter', () => {
            if (config.mouseDelay) {
                menuItem.hoverTimeout = setTimeout(() => {
                    openMegaMenu(menuItem);
                }, config.mouseDelay);
            } else {
                openMegaMenu(menuItem);
            }
        });

        trigger.addEventListener('mouseleave', () => {
            if (menuItem.hoverTimeout) {
                clearTimeout(menuItem.hoverTimeout);
            }
            delayedCloseMegaMenu(menuItem);
        });

        submenu.addEventListener('mouseenter', () => {
            if (menuItem.hoverTimeout) {
                clearTimeout(menuItem.hoverTimeout);
            }
        });

        submenu.addEventListener('mouseleave', () => {
            delayedCloseMegaMenu(menuItem);
        });

        setupMegaMenuKeyboard(trigger, menuItem);
    });

    setupMegaMenuLayout(container);
}

function openMegaMenu(menuItem) {
    const submenu = menuItem.querySelector('.themeix-submenu-mega');
    const trigger = menuItem.querySelector('.themeix-menu-link');
    
    if (!submenu || !trigger) return;

    closeAllMegaMenus(menuItem.parentElement);

    menuItem.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    submenu.classList.add('is-open');

    adjustMegaMenuPosition(menuItem);
    animateMegaMenuOpen(submenu);
}

function closeMegaMenu(menuItem) {
    const submenu = menuItem.querySelector('.themeix-submenu-mega');
    const trigger = menuItem.querySelector('.themeix-menu-link');
    
    if (!submenu || !trigger) return;

    menuItem.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    submenu.classList.remove('is-open');
}

function toggleMegaMenu(menuItem) {
    if (menuItem.classList.contains('is-open')) {
        closeMegaMenu(menuItem);
    } else {
        openMegaMenu(menuItem);
    }
}

function delayedCloseMegaMenu(menuItem) {
    setTimeout(() => {
        if (!menuItem.matches(':hover')) {
            closeMegaMenu(menuItem);
        }
    }, 150);
}

function closeAllMegaMenus(container) {
    const openMegaMenus = container.querySelectorAll('.themeix-menu-item-mega.is-open');
    openMegaMenus.forEach(menu => {
        closeMegaMenu(menu);
    });
}

function adjustMegaMenuPosition(menuItem) {
    const submenu = menuItem.querySelector('.themeix-submenu-mega');
    if (!submenu) return;

    const menuItemRect = menuItem.getBoundingClientRect();
    const submenuRect = submenu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    submenu.style.left = '0';
    submenu.style.right = 'auto';

    if (menuItemRect.left + submenuRect.width > viewportWidth) {
        submenu.style.left = 'auto';
        submenu.style.right = '0';
    }

    const spaceBelow = viewportHeight - menuItemRect.bottom;
    if (spaceBelow < submenuRect.height && menuItemRect.top > submenuRect.height) {
        submenu.style.top = 'auto';
        submenu.style.bottom = '100%';
    }
}

function setupMegaMenuLayout(container) {
    const megaMenus = container.querySelectorAll('.themeix-submenu-mega');
    
    megaMenus.forEach(megaMenu => {
        const columns = megaMenu.style.getPropertyValue('--menu-columns') || 3;
        const groups = megaMenu.querySelectorAll('.themeix-mega-group');
        
        if (groups.length > 0) {
            megaMenu.classList.add(`mega-${columns}-columns`);
            
            groups.forEach((group, index) => {
                if (index < columns) {
                    group.style.flex = `0 0 calc(${100 / columns}%)`;
                } else {
                    group.style.flex = `0 0 calc(${100 / columns}%)`;
                }
            });
        }
    });
}

function animateMegaMenuOpen(submenu) {
    const animation = submenu.dataset.animation || 'fade';
    
    submenu.style.opacity = '0';
    submenu.style.transform = 'translateY(-10px)';
    
    requestAnimationFrame(() => {
        submenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        submenu.style.opacity = '1';
        submenu.style.transform = 'translateY(0)';
    });
}

function animateMegaMenuClose(submenu) {
    submenu.style.opacity = '0';
    submenu.style.transform = 'translateY(-10px)';
}

function setupMegaMenuKeyboard(trigger, menuItem) {
    trigger.addEventListener('keydown', (e) => {
        const submenu = menuItem.querySelector('.themeix-submenu-mega');
        
        if (!submenu) return;

        const focusableElements = Array.from(submenu.querySelectorAll('a, button'));
        
        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                toggleMegaMenu(menuItem);
                if (menuItem.classList.contains('is-open') && focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
                break;
            case 'Escape':
                e.preventDefault();
                closeMegaMenu(menuItem);
                trigger.focus();
                break;
            case 'ArrowDown':
                if (menuItem.classList.contains('is-open')) {
                    e.preventDefault();
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                }
                break;
            case 'ArrowUp':
                if (menuItem.classList.contains('is-open')) {
                    e.preventDefault();
                    if (focusableElements.length > 0) {
                        focusableElements[focusableElements.length - 1].focus();
                    }
                }
                break;
        }
    });
}

function destroyMegaMenus(container) {
    const megaMenuTriggers = container.querySelectorAll('.themeix-menu-item-mega > .themeix-menu-link');
    
    megaMenuTriggers.forEach(trigger => {
        const menuItem = trigger.parentElement;
        
        if (menuItem.hoverTimeout) {
            clearTimeout(menuItem.hoverTimeout);
        }

        trigger.removeEventListener('click', toggleMegaMenu);
        trigger.removeEventListener('mouseenter', openMegaMenu);
        trigger.removeEventListener('mouseleave', delayedCloseMegaMenu);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMegaMenus,
        openMegaMenu,
        closeMegaMenu,
        toggleMegaMenu,
        delayedCloseMegaMenu,
        closeAllMegaMenus,
        adjustMegaMenuPosition,
        setupMegaMenuLayout,
        animateMegaMenuOpen,
        animateMegaMenuClose,
        setupMegaMenuKeyboard,
        destroyMegaMenus
    };
}