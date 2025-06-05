import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Trophy, 
  MessageCircle, 
  BarChart3, 
  Smartphone, 
  Zap,
  Gamepad2,
  Target,
  Shield
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "Team Formation",
      description: "Find and form teams with players who match your skill level and gaming schedule."
    },
    {
      icon: Trophy,
      title: "Epic Tournaments",
      description: "Participate in weekly tournaments and climb the leaderboards to earn rewards."
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Real-time communication with voice and text chat during gaming sessions."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track your gaming performance with detailed analytics and improvement suggestions."
    },
    {
      icon: Smartphone,
      title: "Cross-Platform",
      description: "Play seamlessly across desktop, mobile, and tablet with PWA technology."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for uninterrupted gaming with minimal latency."
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Competitive Environment",
      description: "Face skilled opponents and improve your gameplay through intense competition."
    },
    {
      icon: Shield,
      title: "Fair Play",
      description: "Strict anti-cheat policies and fair matchmaking ensure everyone gets a chance to shine."
    },
    {
      icon: Gamepad2,
      title: "Regular Events",
      description: "Weekly tournaments, seasonal events, and special challenges keep the excitement alive."
    }
  ];

  const stats = [
    { label: "Active Players", value: "50K+" },
    { label: "Tournaments", value: "1.2K+" },
    { label: "Prizes Won", value: "$2M+" },
    { label: "Countries", value: "150+" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-primary rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-primary opacity-20 rounded-full animate-bounce"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 slide-in">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-primary/20 rounded-full border border-primary/30 mb-6">
              <Gamepad2 className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm font-medium text-foreground">Gaming Community Platform</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            NoMercy
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join the ultimate gaming community. Connect with fellow gamers, share strategies, and dominate together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/register">
              <Button className="btn-primary px-8 py-4 text-lg font-semibold glow-orange">
                <Users className="h-5 w-5 mr-2" />
                Join the Community
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-2 border-primary text-primary px-8 py-4 text-lg font-semibold hover:bg-primary hover:text-primary-foreground">
                <Zap className="h-5 w-5 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>

          {/* Install App Prompt */}
          <div className="inline-flex items-center px-6 py-3 bg-muted/50 rounded-lg border border-border">
            <Smartphone className="h-5 w-5 mr-3 text-primary" />
            <span className="text-sm text-muted-foreground">Available on all platforms - Install as an app!</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose NoMercy?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the next level of gaming community with features designed for serious gamers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="gaming-card hover:scale-105 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Join Our Community</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Connect with gamers from around the world and be part of something bigger.
              </p>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-foreground font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Card className="gaming-card p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Community Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Members</span>
                    <span className="text-primary font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Active Today</span>
                    <span className="text-primary font-bold">324</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Games Played</span>
                    <span className="text-primary font-bold">15,678</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tournaments Won</span>
                    <span className="text-primary font-bold">892</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-muted to-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Join the Elite?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Don't let your competition get ahead. Join NoMercy today and start your journey to gaming excellence.
          </p>
          <Link href="/register">
            <Button className="btn-primary px-10 py-4 text-lg font-semibold glow-orange">
              <Trophy className="h-5 w-5 mr-2" />
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
