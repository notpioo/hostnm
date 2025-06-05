// PWA Installation
let deferredPrompt;
let isInstallPromptShown = false;

// Get all install buttons
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

// PWA Install Prompt Handler
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallElements();
});

// Show install elements
function showInstallElements() {
    // Show install banner after 3 seconds
    setTimeout(() => {
        if (!isInstallPromptShown && !localStorage.getItem('installBannerDismissed')) {
            installBanner.style.display = 'block';
            installBanner.classList.add('show');
        }
    }, 3000);
    
    // Show install card
    if (installCard) {
        installCard.style.display = 'block';
    }
    
    // Show navbar install button
    if (installNavBtn) {
        installNavBtn.style.display = 'flex';
    }
    
    // Show floating button after 5 seconds
    setTimeout(() => {
        if (!isInstallPromptShown && floatingInstallBtn) {
            floatingInstallBtn.style.display = 'flex';
        }
    }, 5000);
}

// Hide install elements
function hideInstallElements() {
    if (installBanner) {
        installBanner.classList.remove('show');
        setTimeout(() => {
            installBanner.style.display = 'none';
        }, 300);
    }
    
    if (installCard) {
        installCard.style.display = 'none';
    }
    
    if (installNavBtn) {
        installNavBtn.style.display = 'none';
    }
    
    if (floatingInstallBtn) {
        floatingInstallBtn.style.display = 'none';
    }
}

// Install app function
async function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
            hideInstallElements();
            isInstallPromptShown = true;
        }
        
        deferredPrompt = null;
    } else {
        // Show manual install instructions
        showInstallModal();
    }
}

// Show install modal
function showInstallModal() {
    installModal.style.display = 'flex';
    installModal.style.opacity = '0';
    setTimeout(() => {
        installModal.style.transition = 'opacity 0.3s ease';
        installModal.style.opacity = '1';
    }, 10);
}

// Hide install modal
function hideInstallModal() {
    installModal.style.opacity = '0';
    setTimeout(() => {
        installModal.style.display = 'none';
    }, 300);
}

// Event Listeners for Install Buttons
if (installBannerBtn) {
    installBannerBtn.addEventListener('click', installApp);
}

if (closeBannerBtn) {
    closeBannerBtn.addEventListener('click', () => {
        installBanner.classList.remove('show');
        localStorage.setItem('installBannerDismissed', 'true');
        setTimeout(() => {
            installBanner.style.display = 'none';
        }, 300);
    });
}

if (installNavBtn) {
    installNavBtn.addEventListener('click', installApp);
}

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
    console.log('App was installed successfully');
    hideInstallElements();
    isInstallPromptShown = true;
    
    // Show success message
    setTimeout(() => {
        alert('🎉 NoMercy Gaming app installed successfully! Check your home screen.');
    }, 1000);
});

// Check if app is already installed
window.addEventListener('DOMContentLoaded', () => {
    // Check if running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
        console.log('App is running as PWA');
        hideInstallElements();
        isInstallPromptShown = true;
    }
});

// Button Event Listeners (existing)
document.getElementById('joinCommunityBtn').addEventListener('click', () => {
    alert('Welcome to NoMercy Gaming Community! 🎮');
});

document.getElementById('signInBtn').addEventListener('click', () => {
    alert('Sign in feature coming soon! ⚡');
});

// Smooth scrolling and animations (existing)
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero-section');
    heroSection.style.opacity = '0';
    heroSection.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        heroSection.style.transition = 'all 0.8s ease-out';
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }, 100);
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
        if (deferredPrompt) {
            installApp();
        }
    }
    
    // Escape untuk close modal
    if (e.key === 'Escape') {
        hideInstallModal();
    }
});