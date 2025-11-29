import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, DollarSign, Eye, TrendingUp, Sparkles, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuctionCard from "@/components/AuctionCard";

const SellerDashboard = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const mockAuctions = [
    {
      id: "1",
      title: "Vintage Rolex Watch",
      currentBid: 5000,
      startingBid: 3000,
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
      bidCount: 23,
      status: "active" as const,
    },
    {
      id: "2",
      title: "Antique Persian Rug",
      currentBid: 8500,
      startingBid: 5000,
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500",
      bidCount: 41,
      status: "ending-soon" as const,
    },
  ];

  const stats = {
    activeAuctions: 2,
    totalBids: 64,
    totalRevenue: 13500,
  };

  const handleCreateAuction = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    toast({
      title: "Auction created!",
      description: "Your auction is now live and accepting bids.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Navbar userRole="seller" />
      
      {/* Animated Background Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Seller Dashboard
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Manage your auctions and track performance
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-accent text-accent-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Create Auction
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md backdrop-blur-xl bg-card/95 border-2 border-accent/20">
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Create New Auction
                </DialogTitle>
                <DialogDescription>
                  Fill in the details to list your item for auction
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateAuction} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold">Item Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., Vintage Watch" 
                    required 
                    className="border-2 focus:border-accent transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your item..." 
                    required 
                    className="border-2 focus:border-accent transition-colors min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="starting-bid" className="text-sm font-semibold">Starting Bid ($)</Label>
                    <Input 
                      id="starting-bid" 
                      type="number" 
                      placeholder="1000" 
                      required 
                      className="border-2 focus:border-accent transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-sm font-semibold">Duration (hours)</Label>
                    <Input 
                      id="duration" 
                      type="number" 
                      placeholder="24" 
                      required 
                      className="border-2 focus:border-accent transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm font-semibold flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Image URL
                  </Label>
                  <Input 
                    id="image" 
                    type="url" 
                    placeholder="https://..." 
                    required 
                    className="border-2 focus:border-accent transition-colors"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full gradient-accent text-accent-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Create Auction
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-lift border-2 border-transparent hover:border-accent/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Auctions
              </CardTitle>
              <div className="p-2 bg-accent/10 rounded-lg">
                <Eye className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                {stats.activeAuctions}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Currently live</p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-2 border-transparent hover:border-accent/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Bids
              </CardTitle>
              <div className="p-2 bg-success/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-to-r from-success to-success/70 bg-clip-text text-transparent">
                {stats.totalBids}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Across all auctions</p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-2 border-transparent hover:border-accent/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <div className="p-2 bg-accent/10 rounded-lg animate-pulse-glow">
                <DollarSign className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-to-r from-accent via-accent to-accent/70 bg-clip-text text-transparent">
                ${stats.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-success mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* My Auctions */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              My Auctions
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow" />
              Live updates
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAuctions.map((auction, index) => (
              <div 
                key={auction.id} 
                className="animate-scale-in hover-lift"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <AuctionCard {...auction} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
