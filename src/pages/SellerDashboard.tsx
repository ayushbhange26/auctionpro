import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, DollarSign, Eye, TrendingUp } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <Navbar userRole="seller" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
            <p className="text-muted-foreground">Manage your auctions and track performance</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Create Auction
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Auction</DialogTitle>
                <DialogDescription>
                  Fill in the details to list your item for auction
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateAuction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Item Title</Label>
                  <Input id="title" placeholder="e.g., Vintage Watch" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your item..." required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="starting-bid">Starting Bid ($)</Label>
                    <Input id="starting-bid" type="number" placeholder="1000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input id="duration" type="number" placeholder="24" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input id="image" type="url" placeholder="https://..." required />
                </div>
                <Button type="submit" className="w-full">Create Auction</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Auctions
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeAuctions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Bids
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBids}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* My Auctions */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Auctions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAuctions.map((auction) => (
              <AuctionCard key={auction.id} {...auction} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
