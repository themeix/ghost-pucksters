function initDropdowns(container, config = {}) {
    const dropdownTriggers = container.querySelectorAll('.has-submenu > .themeix-menu-link');
    
    dropdownTriggers.forEach(trigger => {
        const menuItem = trigger.parentElement;
        const submenu = menuItem.querySelector('.themeix-submenu');
        
        if (!submenu) return;

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleDropdown(menuItem);
        });

        trigger.addEventListener('mouseenter', () => {
            if (config.mouseDelay) {
                menuItem.hoverTimeout = setTimeout(() => {
                    openDropdown(menuItem);
                }, config.mouseDelay);
            } else {
                openDropdown(menuItem);
            }
        });

        trigger.addEventListener('mouseleave', () => {
            if (menuItem.hoverTimeout) {
                clearTimeout(menuItem.hoverTimeout);
            }
            closeDropdown(menuItem);
        });

        submenu.addEventListener('mouseenter', () => {
            if (menuItem.hoverTimeout) {
                clearTimeout(menuItem.hoverTimeout);
            }
        });

        submenu.addEventListener('mouseleave', () => {
            closeDropdown(menuItem);
        });

        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDropdown(menuItem);
            } else if (e.key === 'Escape') {
                closeDropdown(menuItem);
                trigger.focus();
            }
        });
    });
}

function openDropdown(menuItem) {
    const submenu = menuItem.querySelector('.themeix-submenu');
    const trigger = menuItem.querySelector('.themeix-menu-link');
    
    if (!submenu || !trigger) return;

    closeAllDropdowns(menuItem.parentElement);

    menuItem.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    submenu.classList.add('is-open');

    adjustDropdownPosition(menuItem);
}

function closeDropdown(menuItem) {
    const submenu = menuItem.querySelector('.themeix-submenu');
    const trigger = menuItem.querySelector('.themeix-menu-link');
    
    if (!submenu || !trigger) return;

    menuItem.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    submenu.classList.remove('is-open');
}

function toggleDropdown(menuItem) {
    if (menuItem.classList.contains('is-open')) {
        closeDropdown(menuItem);
    } else {
        openDropdown(menuItem);
    }
}

function closeAllDropdowns(container) {
    const openDropdowns = container.querySelectorAll('.is-open');
    openDropdowns.forEach(dropdown => {
        if (dropdown.classList.contains('themeix-menu-item')) {
            closeDropdown(dropdown);
        }
    });
}

function adjustDropdownPosition(menuItem) {
    const submenu = menuItem.querySelector('.themeix-submenu');
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

function handleDropdownKeyboard(e, menuItem) {
    const submenu = menuItem.querySelector('.themeix-submenu');
    const focusableElements = submenu ? 
        Array.from(submenu.querySelectorAll('a, button')) : [];
    
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            if (focusableElements.length > 0) {
                focusableElements[focusableElements.length - 1].focus();
            }
            break;
        case 'Home':
            e.preventDefault();
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
            break;
        case 'End':
            e.preventDefault();
            if (focusableElements.length > 0) {
                focusableElements[focusableElements.length - 1].focus();
            }
            break;
    }
}

function destroyDropdowns(container) {
    const dropdownTriggers = container.querySelectorAll('.has-submenu > .themeix-menu-link');
    
    dropdownTriggers.forEach(trigger => {
        const menuItem = trigger.parentElement;
        
        if (menuItem.hoverTimeout) {
            clearTimeout(menuItem.hoverTimeout);
        }

        trigger.removeEventListener('click', toggleDropdown);
        trigger.removeEventListener('mouseenter', openDropdown);
        trigger.removeEventListener('mouseleave', closeDropdown);
        trigger.removeEventListener('keydown', handleDropdownKeyboard);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initDropdowns,
        openDropdown,
        closeDropdown,
        toggleDropdown,
        closeAllDropdowns,
        adjustDropdownPosition,
        handleDropdownKeyboard,
        destroyDropdowns
    };
}