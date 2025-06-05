import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, UserPlus, User, Mail, Lock, AlertCircle } from "lucide-react";

export default function Register() {
  const [, setLocation] = useLocation();
  const { register, currentUser } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already logged in
  if (currentUser) {
    setLocation("/dashboard");
    return null;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      await register(formData.email, formData.password, formData.fullName, formData.username);
      toast({
        title: "Welcome to NoMercy!",
        description: "Your account has been created successfully.",
      });
      setLocation("/dashboard");
    } catch (error: any) {
      console.error('Registration error:', error);
      
      let errorMessage = "Failed to create account. Please try again.";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "An account with this email already exists.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Please choose a stronger password.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address.";
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background pt-16">
      <div className="max-w-md w-full slide-in">
        <Card className="gaming-card glow-orange">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-foreground">Join NoMercy</h2>
              <p className="text-muted-foreground">Create your gaming account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div>
                <Label htmlFor="fullName" className="block text-sm font-medium text-muted-foreground mb-2">
                  Full Name
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`input-gaming pl-10 ${errors.fullName ? 'border-destructive' : ''}`}
                    placeholder="Enter your full name"
                    disabled={loading}
                    required
                  />
                </div>
                {errors.fullName && (
                  <div className="flex items-center mt-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.fullName}
                  </div>
                )}
              </div>

              {/* Username Field */}
              <div>
                <Label htmlFor="username" className="block text-sm font-medium text-muted-foreground mb-2">
                  Username
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`input-gaming pl-10 ${errors.username ? 'border-destructive' : ''}`}
                    placeholder="Choose a username"
                    disabled={loading}
                    required
                  />
                </div>
                {errors.username && (
                  <div className="flex items-center mt-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.username}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                  Email Address
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`input-gaming pl-10 ${errors.email ? 'border-destructive' : ''}`}
                    placeholder="Enter your email"
                    disabled={loading}
                    required
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center mt-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-2">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`input-gaming pl-10 pr-12 ${errors.password ? 'border-destructive' : ''}`}
                    placeholder="Create a password"
                    disabled={loading}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
                {errors.password && (
                  <div className="flex items-center mt-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-foreground mb-2">
                  Confirm Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`input-gaming pl-10 pr-12 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                    placeholder="Confirm your password"
                    disabled={loading}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={loading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center mt-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    if (errors.terms) {
                      setErrors(prev => ({ ...prev, terms: "" }));
                    }
                  }}
                  className="h-4 w-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2 mt-1"
                  disabled={loading}
                  required
                />
                <label htmlFor="acceptTerms" className="ml-2 text-sm text-muted-foreground">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.terms && (
                <div className="flex items-center text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.terms}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="btn-primary w-full py-3 font-semibold text-lg glow-orange"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="loading-spinner h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-center text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
