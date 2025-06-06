
// PWA Installation - Simplified and Fixed
let deferredPrompt;
let isAppInstalled = false;

// Get all install elements
const installBanner = document.getElementById('installBanner');
const installBannerBtn = document.getElementById('installBannerBtn');
const closeBannerBtn = document.getElementById('closeBannerBtn');
const installNavBtn = document.getElementById('installNavBtn');
const installCard = document.getElementById('installCard');
const installMainBtn = document.getElementById('installMainBtn');
const floatingInstallBtn = document.getElementById('floatingInstallBtn');
const installModal = document.getElementById('installModal');
const installModalOverlay = document.getElementById('installModalOverlay');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelInstallBtn = document.getElementById('cancelInstallBtn');
const confirmInstallBtn = document.getElementById('confirmInstallBtn');

console.log('PWA Install script loaded');

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('SW registered: ', registration);
        } catch (registrationError) {
            console.log('SW registration failed: ', registrationError);
        }
    });
}

// Check if app is already installed
function isAppAlreadyInstalled() {
    // Check if running as PWA
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true ||
           localStorage.getItem('appInstalled') === 'true';
}

// Detect mobile devices
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Detect iOS
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Detect Android
function isAndroid() {
    return /Android/.test(navigator.userAgent);
}

// Show all install elements
function showInstallElements() {
    console.log('Showing install elements');
    
    // Always show the install card
    if (installCard) {
        installCard.style.display = 'block';
        console.log('Install card shown');
    }
    
    // Always show floating button after delay
    setTimeout(() => {
        if (floatingInstallBtn) {
            floatingInstallBtn.style.display = 'flex';
            console.log('Floating install button shown');
        }
    }, 2000);
}

// Hide install elements
function hideInstallElements() {
    console.log('Hiding install elements');
    
    if (installCard) {
        installCard.style.display = 'none';
    }
    
    if (floatingInstallBtn) {
        floatingInstallBtn.style.display = 'none';
    }
}

// PWA Install Prompt Handler
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event fired - native install available');
    e.preventDefault();
    deferredPrompt = e;
    
    if (!isAppAlreadyInstalled()) {
        showInstallElements();
    }
});

// Install app function
async function installApp() {
    console.log('Install app function called');
    
    if (deferredPrompt) {
        console.log('Using native install prompt');
        try {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response: ${outcome}`);
            
            if (outcome === 'accepted') {
                console.log('User accepted install');
                hideInstallElements();
                localStorage.setItem('appInstalled', 'true');
            }
            
            deferredPrompt = null;
        } catch (error) {
            console.log('Error with native install:', error);
            showInstallModal();
        }
    } else {
        console.log('No native prompt, showing manual instructions');
        showInstallModal();
    }
}

// Show install modal with instructions
function showInstallModal() {
    console.log('Showing install modal');
    
    // Hide all instructions first
    const allInstructions = document.querySelectorAll('.install-instruction');
    allInstructions.forEach(instruction => {
        instruction.style.display = 'none';
    });
    
    // Show relevant instruction
    if (isIOS()) {
        const iosInstruction = document.querySelector('.ios-instruction');
        if (iosInstruction) iosInstruction.style.display = 'block';
        console.log('Showing iOS instructions');
    } else if (isAndroid()) {
        const androidInstruction = document.querySelector('.android-instruction');
        if (androidInstruction) androidInstruction.style.display = 'block';
        console.log('Showing Android instructions');
    } else {
        const desktopInstruction = document.querySelector('.desktop-instruction');
        if (desktopInstruction) desktopInstruction.style.display = 'block';
        console.log('Showing desktop instructions');
    }
    
    if (installModal) {
        installModal.style.display = 'flex';
        installModal.style.opacity = '0';
        setTimeout(() => {
            installModal.style.transition = 'opacity 0.3s ease';
            installModal.style.opacity = '1';
        }, 10);
    }
}

// Hide install modal
function hideInstallModal() {
    if (installModal) {
        installModal.style.opacity = '0';
        setTimeout(() => {
            installModal.style.display = 'none';
        }, 300);
    }
}

// Event Listeners

if (installMainBtn) {
    installMainBtn.addEventListener('click', installApp);
}

if (floatingInstallBtn) {
    floatingInstallBtn.addEventListener('click', installApp);
}

if (confirmInstallBtn) {
    confirmInstallBtn.addEventListener('click', () => {
        hideInstallModal();
        installApp();
    });
}

if (cancelInstallBtn) {
    cancelInstallBtn.addEventListener('click', hideInstallModal);
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', hideInstallModal);
}

if (installModalOverlay) {
    installModalOverlay.addEventListener('click', hideInstallModal);
}

// Handle successful installation
window.addEventListener('appinstalled', (evt) => {
    console.log('App installed successfully!');
    hideInstallElements();
    localStorage.setItem('appInstalled', 'true');
    
    setTimeout(() => {
        alert('🎉 NoMercy Gaming app berhasil diinstall! Cek home screen Anda.');
    }, 1000);
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing PWA install');
    
    if (isAppAlreadyInstalled()) {
        console.log('App already installed, hiding install elements');
        hideInstallElements();
        isAppInstalled = true;
    } else {
        console.log('App not installed, showing install elements');
        // Always show install elements - don't wait for beforeinstallprompt
        setTimeout(() => {
            showInstallElements();
        }, 1000);
    }
});

// Existing button event listeners
document.getElementById('joinCommunityBtn').addEventListener('click', () => {
    alert('Welcome to NoMercy Gaming Community! 🎮');
});

document.getElementById('signInBtn').addEventListener('click', () => {
    alert('Sign in feature coming soon! ⚡');
});

// Smooth scrolling animation
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroSection.style.transition = 'all 0.8s ease-out';
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('App is online');
});

window.addEventListener('offline', () => {
    console.log('App is offline');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + I untuk install
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        installApp();
    }
    
    // Escape untuk close modal
    if (e.key === 'Escape') {
        hideInstallModal();
    }
});

// Force show floating button immediately and aggressively
function forceShowFloatingButton() {
    if (!isAppAlreadyInstalled() && floatingInstallBtn) {
        floatingInstallBtn.style.setProperty('display', 'flex', 'important');
        floatingInstallBtn.style.setProperty('visibility', 'visible', 'important');
        floatingInstallBtn.style.setProperty('opacity', '1', 'important');
        floatingInstallBtn.style.setProperty('position', 'fixed', 'important');
        floatingInstallBtn.style.setProperty('bottom', '2rem', 'important');
        floatingInstallBtn.style.setProperty('right', '2rem', 'important');
        floatingInstallBtn.style.setProperty('z-index', '9999', 'important');
        console.log('Floating button FORCED to show with !important');
        return true;
    }
    return false;
}

// Multiple attempts to show the button
setTimeout(() => {
    console.log('First attempt to show floating button');
    forceShowFloatingButton();
}, 500);

setTimeout(() => {
    console.log('Second attempt to show floating button');
    forceShowFloatingButton();
}, 1000);

setTimeout(() => {
    console.log('Third attempt to show floating button');
    forceShowFloatingButton();
}, 2000);

// Continuous monitoring every 2 seconds
setInterval(() => {
    if (forceShowFloatingButton()) {
        console.log('Floating button maintained via interval');
    }
}, 2000);

// Observer untuk memantau perubahan DOM
if (floatingInstallBtn) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                console.log('Style mutation detected on floating button');
                setTimeout(forceShowFloatingButton, 100);
            }
        });
    });

    observer.observe(floatingInstallBtn, {
        attributes: true,
        attributeFilter: ['style']
    });
}

// Force show install elements after 2 seconds regardless
setTimeout(() => {
    if (!isAppAlreadyInstalled()) {
        console.log('Force showing install elements after delay');
        showInstallElements();
        forceShowFloatingButton();
    }
}, 2000);
