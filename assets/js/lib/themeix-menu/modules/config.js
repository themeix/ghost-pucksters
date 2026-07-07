function loadJSONConfig(configPath) {
    return fetch(configPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load JSON config: ${response.statusText}`);
            }
            return response.json();
        })
        .catch(error => {
            console.warn('JSON config loading failed:', error);
            return null;
        });
}

function validateJSONConfig(config) {
    if (!config || typeof config !== 'object') {
        return { valid: false, errors: ['Config must be an object'] };
    }

    const errors = [];

    if (config.version && typeof config.version !== 'number') {
        errors.push('Version must be a number');
    }

    if (!config.menus || !Array.isArray(config.menus)) {
        errors.push('Menus must be an array');
        return { valid: false, errors };
    }

    config.menus.forEach((menu, index) => {
        if (!menu.match || typeof menu.match !== 'object') {
            errors.push(`Menu ${index}: missing match object`);
        }

        if (!menu.type || typeof menu.type !== 'string') {
            errors.push(`Menu ${index}: missing or invalid type`);
        }

        if (menu.groups && !Array.isArray(menu.groups)) {
            errors.push(`Menu ${index}: groups must be an array`);
        }
    });

    return {
        valid: errors.length === 0,
        errors
    };
}

function findMatchingMenuConfig(menuItem, jsonConfig) {
    if (!jsonConfig || !jsonConfig.menus) return null;

    return jsonConfig.menus.find(menuConfig => {
        const match = menuConfig.match;
        
        if (match.url && menuItem.url === match.url) {
            return true;
        }

        if (match.title && menuItem.title === match.title) {
            return true;
        }

        if (match.label && menuItem.title === match.label) {
            return true;
        }

        if (match.pattern && new RegExp(match.pattern).test(menuItem.url)) {
            return true;
        }

        return false;
    });
}

function loadConfigFromDataAttribute(element) {
    try {
        const configString = element.getAttribute('data-menu-config');
        if (!configString) return null;
        
        return JSON.parse(configString);
    } catch (error) {
        console.error('Failed to parse data-menu-config:', error);
        return null;
    }
}

function mergeGlobalSettings(jsonConfig, defaultSettings) {
    if (!jsonConfig || !jsonConfig.globalSettings) {
        return defaultSettings;
    }

    return {
        ...defaultSettings,
        ...jsonConfig.globalSettings
    };
}

async function loadMultipleConfigs(configPaths) {
    const configs = await Promise.all(
        configPaths.map(path => loadJSONConfig(path))
    );

    return configs.filter(config => config !== null);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadJSONConfig,
        validateJSONConfig,
        findMatchingMenuConfig,
        loadConfigFromDataAttribute,
        mergeGlobalSettings,
        loadMultipleConfigs
    };
}