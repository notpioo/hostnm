import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Skull, Menu, X } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Home", active: location === "/" },
    { href: "/dashboard", label: "Dashboard", active: location === "/dashboard", requireAuth: true },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <Skull className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground ml-2">NoMercy</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => {
              if (link.requireAuth && !currentUser) return null;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    link.active ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {currentUser.displayName || currentUser.email}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="btn-primary" size="sm">
                    Join Now
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground hover:text-primary"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-2 space-y-2">
            {navLinks.map(link => {
              if (link.requireAuth && !currentUser) return null;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                    link.active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {currentUser ? (
              <div className="pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  Welcome, {currentUser.displayName || currentUser.email}
                </p>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-2 border-t border-border space-y-2">
                <Link href="/login" className="block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button
                    className="btn-primary w-full"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join Now
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
