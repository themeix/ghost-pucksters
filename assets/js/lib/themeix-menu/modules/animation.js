const animations = {
    fade: {
        enter: 'fadeIn 0.3s ease forwards',
        exit: 'fadeOut 0.2s ease forwards'
    },
    slide: {
        enter: 'slideInDown 0.3s ease forwards',
        exit: 'slideOutUp 0.2s ease forwards'
    },
    scale: {
        enter: 'scaleIn 0.3s ease forwards',
        exit: 'scaleOut 0.2s ease forwards'
    },
    flip: {
        enter: 'flipIn 0.4s ease forwards',
        exit: 'flipOut 0.3s ease forwards'
    }
};

function animateMenu(element, type, animationName = 'fade') {
    if (!element) return;

    const animation = animations[animationName];
    if (!animation) {
        console.warn(`Animation "${animationName}" not found`);
        return;
    }

    const animationClass = type === 'enter' ? animation.enter : animation.exit;
    
    element.style.animation = 'none';
    element.offsetHeight;
    element.style.animation = animationClass;

    element.addEventListener('animationend', () => {
        element.style.animation = '';
    }, { once: true });
}

function fadeIn(element, duration = 300) {
    if (!element) return;

    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.opacity = '1';
    });
}

function fadeOut(element, duration = 200) {
    if (!element) return;

    element.style.opacity = '1';
    element.style.transition = `opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.opacity = '0';
    });

    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}

function slideIn(element, direction = 'down', duration = 300) {
    if (!element) return;

    const transforms = {
        down: 'translateY(-10px)',
        up: 'translateY(10px)',
        left: 'translateX(10px)',
        right: 'translateX(-10px)'
    };

    element.style.transform = transforms[direction];
    element.style.opacity = '0';
    element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.transform = 'translateY(0) translateX(0)';
        element.style.opacity = '1';
    });
}

function slideOut(element, direction = 'up', duration = 200) {
    if (!element) return;

    const transforms = {
        down: 'translateY(10px)',
        up: 'translateY(-10px)',
        left: 'translateX(-10px)',
        right: 'translateX(10px)'
    };

    element.style.transform = 'translateY(0) translateX(0)';
    element.style.opacity = '1';
    element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.transform = transforms[direction];
        element.style.opacity = '0';
    });

    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}

function scaleIn(element, duration = 300) {
    if (!element) return;

    element.style.transform = 'scale(0.95)';
    element.style.opacity = '0';
    element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    });
}

function scaleOut(element, duration = 200) {
    if (!element) return;

    element.style.transform = 'scale(1)';
    element.style.opacity = '1';
    element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.transform = 'scale(0.95)';
        element.style.opacity = '0';
    });

    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}

function staggeredAnimation(elements, animationFn, delay = 50) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            animationFn(element);
        }, index * delay);
    });
}

function animateHeight(element, targetHeight, duration = 300) {
    if (!element) return;

    const startHeight = element.offsetHeight;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutQuad(progress);
        
        const currentHeight = startHeight + (targetHeight - startHeight) * easeProgress;
        element.style.height = `${currentHeight}px`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.style.height = targetHeight === 'auto' ? 'auto' : `${targetHeight}px`;
        }
    }

    requestAnimationFrame(animate);
}

function easeOutQuad(t) {
    return t * (2 - t);
}

function easeOutCubic(t) {
    return (--t) * t * t + 1;
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

function registerCustomAnimation(name, enterAnimation, exitAnimation) {
    animations[name] = {
        enter: enterAnimation,
        exit: exitAnimation
    };
}

function getAvailableAnimations() {
    return Object.keys(animations);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateMenu,
        fadeIn,
        fadeOut,
        slideIn,
        slideOut,
        scaleIn,
        scaleOut,
        staggeredAnimation,
        animateHeight,
        easeOutQuad,
        easeOutCubic,
        easeInOutCubic,
        registerCustomAnimation,
        getAvailableAnimations
    };
}