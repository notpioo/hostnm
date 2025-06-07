import { auth, db, signOut, onAuthStateChanged, doc, getDoc, updateDoc } from './firebase-config.js';

let currentUser = null;
let userData = null;

// Check authentication (auth-guard.js handles redirects)
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log('User is authenticated:', user.uid);
        currentUser = user;
        await loadUserData();
        initializeDashboard();
    }
    // Note: redirect is handled by auth-guard.js
});

// Load user data from Firestore
async function loadUserData() {
    try {
        console.log('Loading user data for:', currentUser.uid);
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
            userData = userDoc.data();
            console.log('User data loaded:', userData);
        } else {
            console.error('User data not found in Firestore');
            // Create basic user data if it doesn't exist
            userData = {
                fullName: currentUser.displayName || 'User',
                email: currentUser.email,
                role: 'member',
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            await setDoc(doc(db, 'users', currentUser.uid), userData);
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

// Initialize dashboard
function initializeDashboard() {
    console.log('Initializing dashboard...');
    updateUserInfo();
    setupEventListeners();
    showAdminPanel();
    updateLastLogin();
}

// Update user information in UI
function updateUserInfo() {
    if (userData) {
        // Update welcome message
        const welcomeUserName = document.getElementById('welcomeUserName');
        if (welcomeUserName) {
            welcomeUserName.textContent = userData.fullName || userData.username || 'Gamer';
        }

        // Update user name in navbar
        const userName = document.getElementById('userName');
        if (userName) {
            userName.textContent = userData.fullName || userData.username || 'User';
        }

        // Update user role badge
        const userRoleBadge = document.getElementById('userRoleBadge');
        if (userRoleBadge) {
            userRoleBadge.textContent = (userData.role || 'member').toUpperCase();
            if (userData.role === 'admin') {
                userRoleBadge.style.background = 'rgba(255, 215, 0, 0.2)';
                userRoleBadge.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                userRoleBadge.style.color = '#ffd700';
            }
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Top navigation dropdown
    const moreMenuBtn = document.getElementById('moreMenuBtn');
    const moreDropdown = document.getElementById('moreDropdown');
    if (moreMenuBtn && moreDropdown) {
        moreMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            moreMenuBtn.classList.toggle('active');
            moreDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!moreMenuBtn.contains(e.target) && !moreDropdown.contains(e.target)) {
                moreMenuBtn.classList.remove('active');
                moreDropdown.classList.remove('show');
            }
        });
    }

    // Desktop profile menu
    const desktopProfileBtn = document.getElementById('desktopProfileBtn');
    const desktopProfileMenu = document.getElementById('desktopProfileMenu');
    if (desktopProfileBtn && desktopProfileMenu) {
        desktopProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            desktopProfileMenu.classList.toggle('show');
        });

        // Close profile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!desktopProfileBtn.contains(e.target) && !desktopProfileMenu.contains(e.target)) {
                desktopProfileMenu.classList.remove('show');
            }
        });
    }

    // Mobile profile menu
    const mobileProfileBtn = document.getElementById('mobileProfileBtn');
    const mobileProfileMenu = document.getElementById('mobileProfileMenu');
    if (mobileProfileBtn && mobileProfileMenu) {
        mobileProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileProfileMenu.classList.toggle('show');
        });

        // Close profile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileProfileBtn.contains(e.target) && !mobileProfileMenu.contains(e.target)) {
                mobileProfileMenu.classList.remove('show');
            }
        });
    }

    // Profile navigation
    const desktopProfileMenuItem = document.getElementById('desktopProfileMenuItem');
    const profileMenuItem = document.getElementById('profileMenuItem');

    [desktopProfileMenuItem, profileMenuItem].forEach(item => {
        if (item) {
            item.addEventListener('click', () => {
                window.location.href = 'profile.html';
            });
        }
    });

    // Logout buttons
    const desktopLogoutBtn = document.getElementById('desktopLogoutBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');

    [desktopLogoutBtn, mobileLogoutBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', handleLogout);
        }
    });

    // Bottom navigation
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    bottomNavItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            bottomNavItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
        });
    });

    // Bottom sheet (mobile more menu)
    const moreBottomBtn = document.getElementById('moreBottomBtn');
    const bottomSheet = document.getElementById('bottomSheet');
    const bottomSheetClose = document.getElementById('bottomSheetClose');
    const bottomSheetOverlay = document.getElementById('bottomSheetOverlay');

    if (moreBottomBtn && bottomSheet) {
        moreBottomBtn.addEventListener('click', () => {
            bottomSheet.classList.add('show');
        });

        [bottomSheetClose, bottomSheetOverlay].forEach(element => {
            if (element) {
                element.addEventListener('click', () => {
                    bottomSheet.classList.remove('show');
                });
            }
        });
    }

    // Top navigation items
    const topNavItems = document.querySelectorAll('.top-nav-item[data-page]');
    topNavItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            topNavItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');

            const page = item.dataset.page;
            console.log(`Navigate to: ${page}`);
            // Here you can add navigation logic
        });
    });

    // Dropdown menu items
    const dropdownItems = document.querySelectorAll('.nav-dropdown-item[data-page]');
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            console.log(`Navigate to: ${page}`);
            // Close dropdown after click
            if (moreMenuBtn && moreDropdown) {
                moreMenuBtn.classList.remove('active');
                moreDropdown.classList.remove('show');
            }
            // Here you can add navigation logic
        });
    });

    // Bottom sheet items
    const bottomSheetItems = document.querySelectorAll('.bottom-sheet-item[data-page]');
    bottomSheetItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            console.log(`Navigate to: ${page}`);
            bottomSheet.classList.remove('show');
            // Here you can add navigation logic
        });
    });

    // Logout button (legacy)
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Dashboard animations
    const welcomeCard = document.querySelector('.welcome-card');
    const actionCards = document.querySelectorAll('.action-card');

    if (welcomeCard) {
        welcomeCard.style.opacity = '0';
        welcomeCard.style.transform = 'translateY(20px)';
        setTimeout(() => {
            welcomeCard.style.transition = 'all 0.5s ease-out';
            welcomeCard.style.opacity = '1';
            welcomeCard.style.transform = 'translateY(0)';
        }, 100);
    }

    actionCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

// Show admin panel if user is admin
function showAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    const adminMenuItems = document.querySelectorAll('.admin-only');

    if (userData && userData.role === 'admin') {
        if (adminPanel) {
            adminPanel.style.display = 'block';
        }
        adminMenuItems.forEach(item => {
            item.style.display = 'flex';
        });
        console.log('Admin features shown');
    } else {
        if (adminPanel) {
            adminPanel.style.display = 'none';
        }
        adminMenuItems.forEach(item => {
            item.style.display = 'none';
        });
    }
}

// Update last login time
async function updateLastLogin() {
    if (currentUser && userData) {
        try {
            await updateDoc(doc(db, 'users', currentUser.uid), {
                lastLogin: new Date().toISOString()
            });
            console.log('Last login updated');
        } catch (error) {
            console.error('Error updating last login:', error);
        }
    }
}

// Handle logout
async function handleLogout(e) {
    e.preventDefault();

    if (confirm('Are you sure you want to logout?')) {
        try {
            await signOut(auth);
            console.log('User signed out');
            // Clear any cached data
            localStorage.clear();
            sessionStorage.clear();
            // Force redirect
            window.location.replace('index.html');
        } catch (error) {
            console.error('Error signing out:', error);
            alert('Error signing out. Please try again.');
        }
    }
}

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Dashboard is online');
});

window.addEventListener('offline', () => {
    console.log('Dashboard is offline');
});

// Update profile display
function updateProfileDisplay() {
    if (userData) {
        const userName = document.getElementById('userName');
        const welcomeUserName = document.getElementById('welcomeUserName');
        const userRoleBadge = document.getElementById('userRoleBadge');

        // Update avatar displays
        const userAvatar = document.getElementById('userAvatar');
        const mobileProfileBtn = document.querySelector('.mobile-profile-btn .user-avatar');

        if (userName) {
            userName.textContent = userData.fullName || userData.username || 'User';
        }

        if (welcomeUserName) {
            welcomeUserName.textContent = userData.fullName || userData.username || 'Gamer';
        }

        if (userRoleBadge) {
            userRoleBadge.textContent = (userData.role || 'member').toUpperCase();
            if (userData.role === 'admin') {
                userRoleBadge.style.background = 'rgba(255, 215, 0, 0.2)';
                userRoleBadge.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                userRoleBadge.style.color = '#ffd700';
            }
        }

        // Update avatars with profile picture
        const avatarElements = [userAvatar, mobileProfileBtn];
        avatarElements.forEach(avatar => {
            if (avatar) {
                if (userData.profilePicture) {
                    avatar.style.backgroundImage = `url(${userData.profilePicture})`;
                    avatar.style.backgroundSize = 'cover';
                    avatar.style.backgroundPosition = 'center';
                    avatar.style.backgroundRepeat = 'no-repeat';
                    avatar.textContent = '';
                } else {
                    // Fallback to initials or default emoji
                    const initials = getInitials(userData.fullName || userData.username || 'User');
                    avatar.textContent = initials;
                    avatar.style.backgroundImage = 'none';
                    avatar.style.background = 'linear-gradient(135deg, #ff6b35, #f093fb)';
                }
            }
        });
    }
}

// Helper function to get initials
function getInitials(name) {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2);
}