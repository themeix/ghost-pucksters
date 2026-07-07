function mergeGhostWithJSON(ghostMenu, jsonConfig) {
    if (!jsonConfig) {
        return ghostMenu;
    }

    const merged = {
        ...ghostMenu,
        type: jsonConfig.type || ghostMenu.type,
        settings: {
            ...ghostMenu.settings,
            ...jsonConfig.settings
        }
    };

    if (jsonConfig.icon) {
        merged.icon = jsonConfig.icon;
    }

    if (jsonConfig.badge) {
        merged.badge = jsonConfig.badge;
    }

    if (jsonConfig.description) {
        merged.description = jsonConfig.description;
    }

    if (jsonConfig.groups && Array.isArray(jsonConfig.groups)) {
        merged.groups = mergeGroups(ghostMenu.children, jsonConfig.groups);
    }

    if (jsonConfig.width) {
        merged.settings.width = jsonConfig.width;
    }

    if (jsonConfig.alignment) {
        merged.settings.alignment = jsonConfig.alignment;
    }

    if (jsonConfig.animation) {
        merged.settings.animation = jsonConfig.animation;
    }

    return merged;
}

function mergeGroups(ghostChildren, jsonGroups) {
    const mergedGroups = [];
    
    jsonGroups.forEach(jsonGroup => {
        const group = {
            title: jsonGroup.title || '',
            links: []
        };

        if (jsonGroup.links) {
            jsonGroup.links.forEach(jsonLink => {
                const ghostLink = findChildByTitle(ghostChildren, jsonLink.title);
                
                if (ghostLink) {
                    group.links.push({
                        ...ghostLink,
                        icon: jsonLink.icon || null,
                        badge: jsonLink.badge || null,
                        description: jsonLink.description || null
                    });
                } else if (jsonLink.url) {
                    group.links.push({
                        id: generateUniqueId(),
                        title: jsonLink.title,
                        url: jsonLink.url,
                        type: 'link',
                        icon: jsonLink.icon || null,
                        badge: jsonLink.badge || null,
                        description: jsonLink.description || null
                    });
                }
            });
        }

        mergedGroups.push(group);
    });

    const unmatchedChildren = ghostChildren.filter(ghostChild => {
        return !mergedGroups.some(group => 
            group.links.some(link => link.id === ghostChild.id)
        );
    });

    if (unmatchedChildren.length > 0) {
        const defaultGroup = {
            title: '',
            links: unmatchedChildren
        };
        mergedGroups.push(defaultGroup);
    }

    return mergedGroups;
}

function findChildByTitle(children, title) {
    return children.find(child => 
        child.title.toLowerCase() === title.toLowerCase()
    );
}

function mergeDeep(target, source) {
    const output = { ...target };
    
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = mergeDeep(target[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    
    return output;
}

function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

function resolveChildrenOrder(mergedMenu, jsonConfig) {
    if (!jsonConfig || !jsonConfig.groups) {
        return mergedMenu.children;
    }

    const orderedChildren = [];
    const processedIds = new Set();

    jsonConfig.groups.forEach(group => {
        if (group.links) {
            group.links.forEach(link => {
                if (link.id) {
                    processedIds.add(link.id);
                    orderedChildren.push(link);
                }
            });
        }
    });

    mergedMenu.children.forEach(child => {
        if (!processedIds.has(child.id)) {
            orderedChildren.push(child);
        }
    });

    return orderedChildren;
}

function generateUniqueId() {
    return `menu-${Math.random().toString(36).substr(2, 9)}`;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        mergeGhostWithJSON,
        mergeGroups,
        findChildByTitle,
        mergeDeep,
        resolveChildrenOrder,
        generateUniqueId
    };
}