import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}

export default function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    number: false,
    match: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Password validation for register mode
    if (mode === 'register') {
      if (name === 'password') {
        setPasswordChecks({
          length: value.length >= 8,
          uppercase: /[A-Z]/.test(value),
          number: /\d/.test(value),
          match: value === formData.confirmPassword && value !== '',
        });
      }
      
      if (name === 'confirmPassword') {
        setPasswordChecks(prev => ({
          ...prev,
          match: value === formData.password && value !== '',
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        // For login, we'll use email field but allow username or email
        const emailValue = formData.email.includes('@') ? formData.email : `${formData.email}@nomercy.com`;
        await signIn(emailValue, formData.password);
      } else {
        // Registration validation
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        if (!passwordChecks.length || !passwordChecks.uppercase || !passwordChecks.number) {
          throw new Error('Password does not meet requirements');
        }

        await signUp(formData.email, formData.password, {
          fullName: formData.fullName,
          username: formData.username,
        });
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isRegisterFormValid = mode === 'register' ? (
    formData.fullName &&
    formData.username &&
    formData.email &&
    passwordChecks.length &&
    passwordChecks.uppercase &&
    passwordChecks.number &&
    passwordChecks.match
  ) : true;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="gaming-card w-full max-w-md rounded-2xl p-8 animate-slide-in max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 orbitron">
              {mode === 'login' ? 'Welcome Back!' : 'Join NoMercy!'}
            </h3>
            <p className="text-gray-400">
              {mode === 'login' ? 'Login to your NoMercy account' : 'Create your gaming account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-2 bg-nomercy-gray border-gray-600 text-white placeholder-gray-400 focus:border-nomercy-orange focus:ring-nomercy-orange/20"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="username" className="text-gray-300">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="mt-2 bg-nomercy-gray border-gray-600 text-white placeholder-gray-400 focus:border-nomercy-orange focus:ring-nomercy-orange/20"
                    placeholder="Choose a username"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">Username must be unique across the platform</p>
                </div>
              </>
            )}
            
            <div>
              <Label htmlFor="email" className="text-gray-300">
                {mode === 'login' ? 'Username or Email' : 'Email'}
              </Label>
              <Input
                id="email"
                name="email"
                type={mode === 'login' ? 'text' : 'email'}
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2 bg-nomercy-gray border-gray-600 text-white placeholder-gray-400 focus:border-nomercy-orange focus:ring-nomercy-orange/20"
                placeholder={mode === 'login' ? 'Enter username or email' : 'your@email.com'}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-2 bg-nomercy-gray border-gray-600 text-white placeholder-gray-400 focus:border-nomercy-orange focus:ring-nomercy-orange/20"
                placeholder={mode === 'login' ? 'Enter your password' : 'Create a strong password'}
                required
              />
              
              {mode === 'register' && formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className={`w-3 h-3 rounded-full ${passwordChecks.length ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-gray-400">At least 8 characters</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className={`w-3 h-3 rounded-full ${passwordChecks.uppercase ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-gray-400">One uppercase letter</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className={`w-3 h-3 rounded-full ${passwordChecks.number ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-gray-400">One number</span>
                  </div>
                </div>
              )}
            </div>
            
            {mode === 'register' && (
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-2 bg-nomercy-gray border-gray-600 text-white placeholder-gray-400 focus:border-nomercy-orange focus:ring-nomercy-orange/20"
                  placeholder="Confirm your password"
                  required
                />
                {formData.confirmPassword && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 text-xs">
                      <div className={`w-3 h-3 rounded-full ${passwordChecks.match ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-gray-400">Passwords match</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || (mode === 'register' && !isRegisterFormValid)}
              className="w-full gaming-gradient hover:opacity-90 transition-opacity text-lg py-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                mode === 'login' ? 'Login' : 'Create Account'
              )}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
                className="text-nomercy-orange hover:text-nomercy-orange font-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Login here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
