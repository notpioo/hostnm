
import { auth, db, signOut, onAuthStateChanged, doc, getDoc, updateDoc } from './firebase-config.js';

let currentUser = null;
let userData = null;
let originalData = null;

// Check authentication
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log('User is authenticated:', user.uid);
        currentUser = user;
        await loadUserData();
        initializeProfile();
    } else {
        console.log('User not authenticated, redirecting to login');
        window.location.href = 'login.html';
    }
});

// Load user data from Firestore
async function loadUserData() {
    try {
        console.log('Loading user data for:', currentUser.uid);
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
            userData = userDoc.data();
            originalData = { ...userData }; // Store original data
            console.log('User data loaded:', userData);
        } else {
            console.error('User data not found in Firestore');
            userData = {
                fullName: currentUser.displayName || 'User',
                email: currentUser.email,
                role: 'member',
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

// Initialize profile page
function initializeProfile() {
    console.log('Initializing profile page...');
    updateProfileDisplay();
    populateForm();
    setupEventListeners();
    showAdminFeatures();
}

// Update profile display
function updateProfileDisplay() {
    if (userData) {
        // Update navbar user info
        const userName = document.getElementById('userName');
        if (userName) {
            userName.textContent = userData.fullName || userData.username || 'User';
        }

        // Update profile header
        const profileFullName = document.getElementById('profileFullName');
        const profileUsername = document.getElementById('profileUsername');
        const profileRoleBadge = document.getElementById('profileRoleBadge');

        if (profileFullName) {
            profileFullName.textContent = userData.fullName || 'User';
        }

        if (profileUsername) {
            profileUsername.textContent = '@' + (userData.username || 'user');
        }

        if (profileRoleBadge) {
            profileRoleBadge.textContent = (userData.role || 'member').toUpperCase();
            if (userData.role === 'admin') {
                profileRoleBadge.style.background = 'rgba(255, 215, 0, 0.2)';
                profileRoleBadge.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                profileRoleBadge.style.color = '#ffd700';
            }
        }

        // Update navigation avatars
        const userAvatar = document.getElementById('userAvatar');
        const mobileProfileBtn = document.querySelector('.mobile-profile-btn .user-avatar');
        const profileAvatar = document.getElementById('profileAvatar');

        const avatarElements = [userAvatar, mobileProfileBtn, profileAvatar];
        avatarElements.forEach(avatar => {
            if (avatar) {
                if (userData.profilePicture) {
                    avatar.style.backgroundImage = `url(${userData.profilePicture})`;
                    avatar.style.backgroundSize = 'cover';
                    avatar.style.backgroundPosition = 'center';
                    avatar.style.backgroundRepeat = 'no-repeat';
                    avatar.textContent = '';
                } else {
                    // Fallback to initials
                    const initials = getInitials(userData.fullName || userData.username || 'User');
                    avatar.textContent = initials;
                    avatar.style.backgroundImage = 'none';
                    if (avatar.id === 'profileAvatar') {
                        avatar.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                    } else {
                        avatar.style.background = 'linear-gradient(135deg, #ff6b35, #f093fb)';
                    }
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

// Populate form with user data
function populateForm() {
    if (userData) {
        const editFullName = document.getElementById('editFullName');
        const editUsername = document.getElementById('editUsername');
        const editBirthDate = document.getElementById('editBirthDate');
        const editGender = document.getElementById('editGender');
        const editBio = document.getElementById('editBio');

        if (editFullName) editFullName.value = userData.fullName || '';
        if (editUsername) editUsername.value = userData.username || '';
        if (editBirthDate) editBirthDate.value = userData.birthDate || '';
        if (editGender) editGender.value = userData.gender || '';
        if (editBio) editBio.value = userData.bio || '';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation events
    setupNavigationListeners();

    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSubmit);
    }

    // Cancel button
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            populateForm(); // Reset form to original values
            clearErrors();
        });
    }

    // Avatar upload
    const avatarEditBtn = document.getElementById('avatarEditBtn');
    const avatarInput = document.getElementById('avatarInput');
    
    if (avatarEditBtn && avatarInput) {
        avatarEditBtn.addEventListener('click', () => {
            avatarInput.click();
        });

        avatarInput.addEventListener('change', handleAvatarUpload);
    }

    // Bio character counter
    const editBio = document.getElementById('editBio');
    if (editBio) {
        editBio.addEventListener('input', () => {
            const maxLength = 200;
            const currentLength = editBio.value.length;
            const hint = editBio.parentNode.querySelector('.form-hint');
            if (hint) {
                hint.textContent = `${currentLength}/${maxLength} characters`;
                if (currentLength > maxLength) {
                    hint.style.color = '#fc8181';
                } else {
                    hint.style.color = '#a0aec0';
                }
            }
        });
    }

    // Username validation
    const editUsername = document.getElementById('editUsername');
    if (editUsername) {
        editUsername.addEventListener('input', () => {
            const username = editUsername.value.toLowerCase();
            editUsername.value = username.replace(/[^a-z0-9_]/g, '');
        });
    }

    // Logout handlers
    const desktopLogoutBtn = document.getElementById('desktopLogoutBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');

    [desktopLogoutBtn, mobileLogoutBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', handleLogout);
        }
    });

    // Profile menu dropdowns
    const desktopProfileBtn = document.getElementById('desktopProfileBtn');
    const desktopProfileMenu = document.getElementById('desktopProfileMenu');
    const mobileProfileBtn = document.getElementById('mobileProfileBtn');
    const mobileProfileMenu = document.getElementById('mobileProfileMenu');

    if (desktopProfileBtn && desktopProfileMenu) {
        desktopProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            desktopProfileMenu.classList.toggle('show');
        });
    }

    if (mobileProfileBtn && mobileProfileMenu) {
        mobileProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileProfileMenu.classList.toggle('show');
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        [desktopProfileMenu, mobileProfileMenu].forEach(menu => {
            if (menu && !menu.contains(e.target)) {
                menu.classList.remove('show');
            }
        });
    });
}

// Setup navigation listeners
function setupNavigationListeners() {
    // Navigation to other pages
    const navItems = document.querySelectorAll('[data-page]');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            if (page === 'dashboard') {
                window.location.href = 'dashboard.html';
            }
            // Add other navigation logic here
        });
    });

    // More menu dropdown
    const moreMenuBtn = document.getElementById('moreMenuBtn');
    const moreDropdown = document.getElementById('moreDropdown');
    if (moreMenuBtn && moreDropdown) {
        moreMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            moreMenuBtn.classList.toggle('active');
            moreDropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!moreMenuBtn.contains(e.target) && !moreDropdown.contains(e.target)) {
                moreMenuBtn.classList.remove('active');
                moreDropdown.classList.remove('show');
            }
        });
    }

    // Bottom sheet
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
}

// Handle avatar upload
async function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
    }

    try {
        // Convert to base64 for now (in real app, upload to Firebase Storage)
        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64Image = e.target.result;
            
            // Update profile avatar display
            const profileAvatar = document.getElementById('profileAvatar');
            if (profileAvatar) {
                profileAvatar.style.backgroundImage = `url(${base64Image})`;
                profileAvatar.textContent = '';
            }

            // Save to userData
            userData.profilePicture = base64Image;

            // Save to Firestore
            try {
                await updateDoc(doc(db, 'users', currentUser.uid), {
                    profilePicture: base64Image
                });
                console.log('Profile picture updated');
            } catch (error) {
                console.error('Error updating profile picture:', error);
                alert('Failed to update profile picture');
            }
        };
        reader.readAsDataURL(file);
    } catch (error) {
        console.error('Error handling avatar upload:', error);
        alert('Failed to upload avatar');
    }
}

// Handle profile form submission
async function handleProfileSubmit(e) {
    e.preventDefault();
    clearErrors();

    const formData = new FormData(e.target);
    const fullName = formData.get('fullName').trim();
    const username = formData.get('username').trim().toLowerCase();
    const birthDate = formData.get('birthDate');
    const gender = formData.get('gender');
    const bio = formData.get('bio').trim();

    const saveBtn = document.getElementById('saveBtn');
    const btnText = saveBtn.querySelector('.btn-text');
    const btnLoader = saveBtn.querySelector('.btn-loader');

    let hasErrors = false;

    // Validation
    if (!fullName) {
        showError('fullNameError', 'Full name is required');
        hasErrors = true;
    } else if (fullName.length < 2) {
        showError('fullNameError', 'Full name must be at least 2 characters');
        hasErrors = true;
    }

    if (!username) {
        showError('usernameError', 'Username is required');
        hasErrors = true;
    } else if (username.length < 3) {
        showError('usernameError', 'Username must be at least 3 characters');
        hasErrors = true;
    } else if (!/^[a-z0-9_]+$/.test(username)) {
        showError('usernameError', 'Username can only contain lowercase letters, numbers, and underscores');
        hasErrors = true;
    }

    if (bio && bio.length > 200) {
        showError('bioError', 'Bio must be less than 200 characters');
        hasErrors = true;
    }

    if (hasErrors) return;

    // Show loading
    saveBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'inline-block';

    try {
        // Update user data
        const updatedData = {
            fullName,
            username,
            birthDate: birthDate || null,
            gender: gender || null,
            bio: bio || null,
            lastUpdated: new Date().toISOString()
        };

        await updateDoc(doc(db, 'users', currentUser.uid), updatedData);
        
        // Update local userData
        Object.assign(userData, updatedData);
        originalData = { ...userData };

        // Update display
        updateProfileDisplay();

        alert('Profile updated successfully!');
        console.log('Profile updated successfully');

    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    } finally {
        // Hide loading
        saveBtn.disabled = false;
        if (btnText) btnText.style.display = 'inline-block';
        if (btnLoader) btnLoader.style.display = 'none';
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
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error signing out:', error);
            alert('Error signing out. Please try again.');
        }
    }
}

// Show admin features if user is admin
function showAdminFeatures() {
    const adminMenuItems = document.querySelectorAll('.admin-only');
    
    if (userData && userData.role === 'admin') {
        adminMenuItems.forEach(item => {
            item.style.display = 'flex';
        });
        console.log('Admin features shown');
    } else {
        adminMenuItems.forEach(item => {
            item.style.display = 'none';
        });
    }
}

// Utility functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Profile page is online');
});

window.addEventListener('offline', () => {
    console.log('Profile page is offline');
});
