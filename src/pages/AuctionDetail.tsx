import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, TrendingUp, User, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bidAmount, setBidAmount] = useState("");
  
  const userRole = localStorage.getItem("userRole") as "admin" | "seller" | "customer" | null;

  // Mock auction data
  const auction = {
    id: id,
    title: "Vintage Rolex Submariner",
    description: "A stunning vintage Rolex Submariner in excellent condition. This timepiece has been meticulously maintained and comes with original documentation. Features a classic stainless steel case and black dial.",
    currentBid: 5000,
    startingBid: 3000,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
    seller: "John Doe",
    bidCount: 23,
    status: "active",
  };

  const bidHistory = [
    { bidder: "Alice", amount: 5000, time: "2 minutes ago" },
    { bidder: "Bob", amount: 4800, time: "15 minutes ago" },
    { bidder: "Charlie", amount: 4500, time: "1 hour ago" },
    { bidder: "David", amount: 4200, time: "2 hours ago" },
    { bidder: "Eve", amount: 4000, time: "3 hours ago" },
  ];

  const getTimeRemaining = () => {
    const end = new Date(auction.endTime);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Auction ended";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  const handlePlaceBid = () => {
    const amount = parseFloat(bidAmount);
    if (!amount || amount <= auction.currentBid) {
      toast({
        title: "Invalid bid",
        description: `Bid must be higher than $${auction.currentBid}`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bid placed successfully!",
      description: `Your bid of $${amount.toLocaleString()} has been placed.`,
    });
    setBidAmount("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole={userRole || undefined} />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <div className="rounded-lg overflow-hidden bg-muted mb-4">
              <img 
                src={auction.imageUrl} 
                alt={auction.title}
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold">{auction.title}</h1>
                <Badge className="bg-success text-success-foreground">
                  {auction.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <User className="h-4 w-4" />
                <span>Seller: {auction.seller}</span>
              </div>
              <p className="text-muted-foreground">{auction.description}</p>
            </div>

            {/* Bidding Card */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="text-xl">Current Bid</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-primary">
                    ${auction.currentBid.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground mb-1">
                    ({auction.bidCount} bids)
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{getTimeRemaining()}</span>
                </div>

                {userRole === "customer" && (
                  <div className="space-y-2 pt-4">
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder={`Min. $${auction.currentBid + 100}`}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                      />
                      <Button 
                        onClick={handlePlaceBid}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground whitespace-nowrap"
                      >
                        Place Bid
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Minimum increment: $100
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bid History */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <CardTitle>Bid History</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bidHistory.map((bid, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{bid.bidder[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{bid.bidder}</p>
                          <p className="text-xs text-muted-foreground">{bid.time}</p>
                        </div>
                      </div>
                      <span className="font-semibold">${bid.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
