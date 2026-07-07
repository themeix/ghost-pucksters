function initMobileMenu(container, config = {}) {
    const mobileToggle = container.querySelector('.gh-burger');
    const mobileMenu = container.querySelector('.themeix-mobile-menu') || createMobileMenu(container);
    
    if (!mobileToggle) {
        console.warn('Mobile toggle button not found');
        return;
    }

    mobileToggle.addEventListener('click', () => {
        toggleMobileMenu(container, mobileMenu);
    });

    initMobileAccordion(mobileMenu, config);
    initMobileKeyboard(mobileMenu);

    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth >= config.mobileBreakpoint) {
            closeMobileMenu(container, mobileMenu);
        }
    }, 250));

    document.addEventListener('click', (e) => {
        if (container.classList.contains('mobile-menu-open') && 
            !container.contains(e.target)) {
            closeMobileMenu(container, mobileMenu);
        }
    });
}

function createMobileMenu(container) {
    const desktopMenu = container.querySelector('.themeix-menu-container');
    if (!desktopMenu) return null;

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'themeix-mobile-menu';
    mobileMenu.setAttribute('aria-hidden', 'true');
    container.appendChild(mobileMenu);

    return mobileMenu;
}

function toggleMobileMenu(container, mobileMenu) {
    if (container.classList.contains('mobile-menu-open')) {
        closeMobileMenu(container, mobileMenu);
    } else {
        openMobileMenu(container, mobileMenu);
    }
}

function openMobileMenu(container, mobileMenu) {
    container.classList.add('mobile-menu-open');
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';
    document.body.classList.add('mobile-menu-active');

    const firstLink = mobileMenu.querySelector('a');
    if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
    }
}

function closeMobileMenu(container, mobileMenu) {
    container.classList.remove('mobile-menu-open');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';
    document.body.classList.remove('mobile-menu-active');

    closeAllMobileSubmenus(mobileMenu);
}

function initMobileAccordion(mobileMenu, config = {}) {
    const toggleButtons = mobileMenu.querySelectorAll('.themeix-mobile-toggle');
    
    toggleButtons.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const menuItem = toggle.closest('.themeix-mobile-menu-item');
            const submenu = menuItem.querySelector('.themeix-mobile-submenu');
            
            if (!submenu) return;

            toggleMobileSubmenu(menuItem, submenu);
        });

        const parentLink = toggle.parentElement;
        parentLink.addEventListener('click', (e) => {
            if (e.target !== toggle && !toggle.contains(e.target)) {
                const menuItem = toggle.closest('.themeix-mobile-menu-item');
                const submenu = menuItem.querySelector('.themeix-mobile-submenu');
                
                if (submenu && menuItem.classList.contains('is-open')) {
                    e.preventDefault();
                }
            }
        });
    });
}

function toggleMobileSubmenu(menuItem, submenu) {
    if (menuItem.classList.contains('is-open')) {
        closeMobileSubmenu(menuItem, submenu);
    } else {
        openMobileSubmenu(menuItem, submenu);
    }
}

function openMobileSubmenu(menuItem, submenu) {
    menuItem.classList.add('is-open');
    submenu.classList.add('is-open');
    submenu.style.maxHeight = submenu.scrollHeight + 'px';
    submenu.style.opacity = '1';

    const toggle = menuItem.querySelector('.themeix-mobile-toggle');
    if (toggle) {
        toggle.setAttribute('aria-expanded', 'true');
    }
}

function closeMobileSubmenu(menuItem, submenu) {
    menuItem.classList.remove('is-open');
    submenu.classList.remove('is-open');
    submenu.style.maxHeight = '0';
    submenu.style.opacity = '0';

    const toggle = menuItem.querySelector('.themeix-mobile-toggle');
    if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
    }

    const childSubmenus = submenu.querySelectorAll('.themeix-mobile-submenu.is-open');
    childSubmenus.forEach(childSubmenu => {
        const childMenuItem = childSubmenu.closest('.themeix-mobile-menu-item');
        closeMobileSubmenu(childMenuItem, childSubmenu);
    });
}

function closeAllMobileSubmenus(mobileMenu) {
    const openSubmenus = mobileMenu.querySelectorAll('.themeix-mobile-submenu.is-open');
    openSubmenus.forEach(submenu => {
        const menuItem = submenu.closest('.themeix-mobile-menu-item');
        closeMobileSubmenu(menuItem, submenu);
    });
}

function initMobileKeyboard(mobileMenu) {
    mobileMenu.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'Escape':
                const container = mobileMenu.closest('.gh-navigation');
                if (container) {
                    const mobileToggle = container.querySelector('.gh-burger');
                    closeMobileMenu(container, mobileMenu);
                    if (mobileToggle) {
                        mobileToggle.focus();
                    }
                }
                break;
            case 'Home':
                e.preventDefault();
                const firstLink = mobileMenu.querySelector('a');
                if (firstLink) firstLink.focus();
                break;
            case 'End':
                e.preventDefault();
                const links = Array.from(mobileMenu.querySelectorAll('a'));
                if (links.length > 0) links[links.length - 1].focus();
                break;
        }
    });
}

function destroyMobileMenu(container) {
    const mobileToggle = container.querySelector('.gh-burger');
    const mobileMenu = container.querySelector('.themeix-mobile-menu');
    
    if (mobileToggle) {
        mobileToggle.removeEventListener('click', toggleMobileMenu);
    }

    if (mobileMenu) {
        const toggleButtons = mobileMenu.querySelectorAll('.themeix-mobile-toggle');
        toggleButtons.forEach(toggle => {
            toggle.removeEventListener('click', toggleMobileSubmenu);
        });
    }

    document.body.style.overflow = '';
    document.body.classList.remove('mobile-menu-active');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileMenu,
        createMobileMenu,
        toggleMobileMenu,
        openMobileMenu,
        closeMobileMenu,
        initMobileAccordion,
        toggleMobileSubmenu,
        openMobileSubmenu,
        closeMobileSubmenu,
        closeAllMobileSubmenus,
        initMobileKeyboard,
        destroyMobileMenu,
        debounce
    };
}