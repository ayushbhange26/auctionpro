import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import AuctionCard from "@/components/AuctionCard";
import { Gavel, TrendingUp, Shield, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole") as "admin" | "seller" | "customer" | null;

  const featuredAuctions = [
    {
      id: "1",
      title: "Vintage Rolex Submariner",
      currentBid: 5000,
      startingBid: 3000,
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
      bidCount: 23,
      status: "active" as const,
      seller: "John Doe",
    },
    {
      id: "2",
      title: "Abstract Modern Art",
      currentBid: 15000,
      startingBid: 10000,
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500",
      bidCount: 45,
      status: "active" as const,
      seller: "Jane Smith",
    },
    {
      id: "3",
      title: "Antique Persian Rug",
      currentBid: 3500,
      startingBid: 2000,
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500",
      bidCount: 12,
      status: "ending-soon" as const,
      seller: "Bob Johnson",
    },
  ];

  const features = [
    {
      icon: Gavel,
      title: "Live Auctions",
      description: "Participate in real-time bidding on exclusive items",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Your bids and purchases are protected and verified",
    },
    {
      icon: Zap,
      title: "Instant Updates",
      description: "Get notified when you're outbid or an auction is ending",
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Track trends and make informed bidding decisions",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole={userRole || undefined} />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Discover Rare Treasures at Live Auctions
            </h1>
            <p className="text-lg lg:text-xl mb-8 text-primary-foreground/90">
              Join thousands of collectors and sellers in the world's most trusted auction platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow"
                onClick={() => navigate("/auctions")}
              >
                Browse Auctions
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => navigate("/auth")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AuctionPro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center space-y-4 p-6 rounded-lg bg-card hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Auctions</h2>
            <Button variant="outline" onClick={() => navigate("/auctions")}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAuctions.map((auction) => (
              <AuctionCard key={auction.id} {...auction} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Bidding?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join our community of collectors and sellers today
          </p>
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow"
            onClick={() => navigate("/auth")}
          >
            Create Account
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
