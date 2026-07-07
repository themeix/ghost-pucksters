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

function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function generateUniqueId(prefix = 'menu') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function getViewportSize() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight
    };
}

function getElementSize(element) {
    if (!element) return { width: 0, height: 0 };

    return {
        width: element.offsetWidth,
        height: element.offsetHeight
    };
}

function getElementPosition(element) {
    if (!element) return { top: 0, left: 0 };

    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        right: rect.right + window.scrollX
    };
}

function hasClass(element, className) {
    if (!element) return false;
    return element.classList.contains(className);
}

function addClass(element, className) {
    if (!element) return;
    element.classList.add(className);
}

function removeClass(element, className) {
    if (!element) return;
    element.classList.remove(className);
}

function toggleClass(element, className) {
    if (!element) return;
    element.classList.toggle(className);
}

function setAttributes(element, attributes) {
    if (!element || !attributes) return;

    Object.keys(attributes).forEach(key => {
        element.setAttribute(key, attributes[key]);
    });
}

function getAttributes(element) {
    if (!element) return {};

    const attributes = {};
    for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        attributes[attr.name] = attr.value;
    }
    return attributes;
}

function removeAttributes(element, attributeNames) {
    if (!element || !attributeNames) return;

    attributeNames.forEach(name => {
        element.removeAttribute(name);
    });
}

function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);

    if (attributes) {
        setAttributes(element, attributes);
    }

    if (content) {
        element.textContent = content;
    }

    return element;
}

function insertAfter(newNode, referenceNode) {
    if (!referenceNode || !referenceNode.parentNode) return;
    
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertBefore(newNode, referenceNode) {
    if (!referenceNode || !referenceNode.parentNode) return;
    
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

function wrapElement(element, wrapper) {
    if (!element || !wrapper) return;

    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
}

function unwrapElement(element) {
    if (!element || !element.parentNode) return;

    const parent = element.parentNode;
    while (element.firstChild) {
        parent.insertBefore(element.firstChild, element);
    }
    parent.removeChild(element);
}

function isEmpty(obj) {
    if (obj == null) return true;
    if (Array.isArray(obj)) return obj.length === 0;
    if (typeof obj === 'object') return Object.keys(obj).length === 0;
    if (typeof obj === 'string') return obj.trim().length === 0;
    return false;
}

function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (obj instanceof Object) {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}

function mergeObjects(target, source) {
    const result = { ...target };

    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                result[key] = mergeObjects(target[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
    }

    return result;
}

function parseJSON(string) {
    try {
        return JSON.parse(string);
    } catch (error) {
        console.error('JSON parsing error:', error);
        return null;
    }
}

function stringifyJSON(obj, pretty = false) {
    try {
        return pretty ? JSON.stringify(obj, null, 2) : JSON.stringify(obj);
    } catch (error) {
        console.error('JSON stringifying error:', error);
        return '';
    }
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function normalizeURL(url) {
    if (!url) return '';

    try {
        const urlObj = new URL(url, window.location.origin);
        return urlObj.href;
    } catch (error) {
        return url;
    }
}

function isExternalLink(url) {
    if (!url) return false;

    try {
        const urlObj = new URL(url, window.location.origin);
        return urlObj.origin !== window.location.origin;
    } catch (error) {
        return false;
    }
}

function measureText(text, font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    return context.measureText(text);
}

function truncateText(text, maxLength, suffix = '...') {
    if (!text || text.length <= maxLength) return text;

    return text.substring(0, maxLength - suffix.length) + suffix;
}

function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

function formatDate(date, options = {}) {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(date);
}

function localStorageAvailable() {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (error) {
        return false;
    }
}

function getSessionStorageAvailable() {
    try {
        const test = '__sessionStorage_test__';
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        return true;
    } catch (error) {
        return false;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        generateUniqueId,
        sanitizeHTML,
        escapeRegExp,
        isElementInViewport,
        getViewportSize,
        getElementSize,
        getElementPosition,
        hasClass,
        addClass,
        removeClass,
        toggleClass,
        setAttributes,
        getAttributes,
        removeAttributes,
        createElement,
        insertAfter,
        insertBefore,
        wrapElement,
        unwrapElement,
        isEmpty,
        deepClone,
        mergeObjects,
        parseJSON,
        stringifyJSON,
        isValidURL,
        normalizeURL,
        isExternalLink,
        measureText,
        truncateText,
        formatNumber,
        formatDate,
        localStorageAvailable,
        getSessionStorageAvailable
    };
}