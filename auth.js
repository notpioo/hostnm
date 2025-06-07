
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, setDoc, getDoc } from './firebase-config.js';

// Auth state monitoring is handled by auth-guard.js

// Password visibility toggle
function setupPasswordToggle(passwordId, toggleId) {
    const passwordInput = document.getElementById(passwordId);
    const toggleBtn = document.getElementById(toggleId);
    
    if (passwordInput && toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            const icon = toggleBtn.querySelector('.toggle-icon');
            if (icon) {
                icon.textContent = isPassword ? '🔓' : '🔒';
            }
        });
    }
}

// Initialize password toggles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupPasswordToggle('password', 'passwordToggle');
    setupPasswordToggle('confirmPassword', 'confirmPasswordToggle');
    
    // Smooth form animations
    const authCard = document.querySelector('.auth-card');
    if (authCard) {
        authCard.style.opacity = '0';
        authCard.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            authCard.style.transition = 'all 0.6s ease-out';
            authCard.style.opacity = '1';
            authCard.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
}

function getPasswordStrength(password) {
    const validation = validatePassword(password);
    const score = Object.values(validation).filter(Boolean).length;
    
    if (score < 3) return { text: 'Weak', class: 'strength-weak' };
    if (score < 5) return { text: 'Medium', class: 'strength-medium' };
    return { text: 'Strong', class: 'strength-strong' };
}

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

// Password strength indicator
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const strengthElement = document.getElementById('passwordStrength');

    if (passwordInput && strengthElement) {
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            if (password) {
                const strength = getPasswordStrength(password);
                strengthElement.textContent = `Password strength: ${strength.text}`;
                strengthElement.className = `password-strength ${strength.class}`;
                strengthElement.style.display = 'block';
            } else {
                strengthElement.textContent = '';
                strengthElement.className = 'password-strength';
                strengthElement.style.display = 'none';
            }
        });
    }
});

// Login Form
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const loginBtn = document.getElementById('loginBtn');
            const btnText = loginBtn.querySelector('.btn-text');
            const btnLoader = loginBtn.querySelector('.btn-loader');
            
            // Validation
            if (!email) {
                showError('emailError', 'Email is required');
                return;
            }
            
            if (!validateEmail(email)) {
                showError('emailError', 'Please enter a valid email');
                return;
            }
            
            if (!password) {
                showError('passwordError', 'Password is required');
                return;
            }
            
            // Show loading
            loginBtn.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (btnLoader) btnLoader.style.display = 'inline-block';
            
            try {
                console.log('Attempting login...');
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                console.log('Login successful:', user.uid);
                
                // Get user data from Firestore
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                
                if (userDoc.exists()) {
                    console.log('User data found:', userDoc.data());
                } else {
                    console.log('User data not found in Firestore');
                }
                
                // Redirect to dashboard
                alert('Login successful! Welcome back!');
                window.location.href = 'dashboard.html';
                
            } catch (error) {
                console.error('Login error:', error);
                
                let errorMessage = 'Login failed. Please try again.';
                
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'No account found with this email';
                        showError('emailError', errorMessage);
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Incorrect password';
                        showError('passwordError', errorMessage);
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address';
                        showError('emailError', errorMessage);
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Too many failed attempts. Please try again later.';
                        showError('passwordError', errorMessage);
                        break;
                    case 'auth/invalid-credential':
                        errorMessage = 'Invalid email or password';
                        showError('passwordError', errorMessage);
                        break;
                    default:
                        showError('passwordError', errorMessage);
                }
            } finally {
                // Hide loading
                loginBtn.disabled = false;
                if (btnText) btnText.style.display = 'inline-block';
                if (btnLoader) btnLoader.style.display = 'none';
            }
        });
    }
});

// Register Form
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();
            
            const fullName = document.getElementById('fullName').value.trim();
            const username = document.getElementById('username').value.trim().toLowerCase();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            const registerBtn = document.getElementById('registerBtn');
            const btnText = registerBtn.querySelector('.btn-text');
            const btnLoader = registerBtn.querySelector('.btn-loader');
            
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
            
            if (!email) {
                showError('emailError', 'Email is required');
                hasErrors = true;
            } else if (!validateEmail(email)) {
                showError('emailError', 'Please enter a valid email');
                hasErrors = true;
            }
            
            if (!password) {
                showError('passwordError', 'Password is required');
                hasErrors = true;
            } else {
                const validation = validatePassword(password);
                if (!validation.length) {
                    showError('passwordError', 'Password must be at least 8 characters');
                    hasErrors = true;
                } else if (!validation.uppercase || !validation.lowercase || !validation.number) {
                    showError('passwordError', 'Password must contain uppercase, lowercase, and number');
                    hasErrors = true;
                }
            }
            
            if (!confirmPassword) {
                showError('confirmPasswordError', 'Please confirm your password');
                hasErrors = true;
            } else if (password !== confirmPassword) {
                showError('confirmPasswordError', 'Passwords do not match');
                hasErrors = true;
            }
            
            if (!agreeTerms) {
                showError('agreeTermsError', 'You must agree to the terms and conditions');
                hasErrors = true;
            }
            
            if (hasErrors) return;
            
            // Show loading
            registerBtn.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (btnLoader) btnLoader.style.display = 'inline-block';
            
            try {
                console.log('Attempting registration...');
                
                // Create user account
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                console.log('User created:', user.uid);
                
                // Save user data to Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    fullName: fullName,
                    username: username,
                    email: email,
                    role: 'member',
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                    profileComplete: true
                });
                
                console.log('User data saved to Firestore');
                alert('Registration successful! Welcome to NoMercy Gaming!');
                window.location.href = 'dashboard.html';
                
            } catch (error) {
                console.error('Registration error:', error);
                
                let errorMessage = 'Registration failed. Please try again.';
                
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'An account with this email already exists';
                        showError('emailError', errorMessage);
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address';
                        showError('emailError', errorMessage);
                        break;
                    case 'auth/operation-not-allowed':
                        errorMessage = 'Email/password accounts are not enabled';
                        showError('emailError', errorMessage);
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'Password is too weak';
                        showError('passwordError', errorMessage);
                        break;
                    default:
                        showError('emailError', errorMessage);
                }
            } finally {
                // Hide loading
                registerBtn.disabled = false;
                if (btnText) btnText.style.display = 'inline-block';
                if (btnLoader) btnLoader.style.display = 'none';
            }
        });
    }
});
