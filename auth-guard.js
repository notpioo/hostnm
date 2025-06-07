
// Authentication Guard
import { auth, onAuthStateChanged } from './firebase-config.js';

// Pages that don't require authentication
const publicPages = ['index.html', 'login.html', 'register.html', ''];

// Check if current page requires authentication
function requiresAuth() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    return !publicPages.includes(currentPage);
}

// Check if user is on a public page
function isOnPublicPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    return publicPages.includes(currentPage);
}

let authInitialized = false;

// Initialize auth guard
function initAuthGuard() {
    if (authInitialized) return;
    authInitialized = true;
    
    onAuthStateChanged(auth, (user) => {
        console.log('Auth state changed:', user ? 'authenticated' : 'not authenticated');
        
        // Add small delay to prevent immediate redirects
        setTimeout(() => {
            if (user) {
                // User is authenticated
                console.log('User authenticated:', user.uid);
                
                // If on login/register page, redirect to dashboard
                if (window.location.pathname.includes('login.html') || 
                    window.location.pathname.includes('register.html')) {
                    console.log('User already logged in, redirecting to dashboard');
                    window.location.replace('dashboard.html');
                }
            } else {
                // User is not authenticated
                console.log('User not authenticated');
                
                // If on protected page, redirect to login
                if (requiresAuth()) {
                    console.log('Protected page accessed without auth, redirecting to login');
                    window.location.replace('login.html');
                }
            }
        }, 100);
    });
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Auth guard initializing...');
    initAuthGuard();
});

export { initAuthGuard, requiresAuth, isOnPublicPage };
