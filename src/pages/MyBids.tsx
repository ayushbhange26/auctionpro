import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Clock, Trophy } from "lucide-react";

const MyBids = () => {
  const navigate = useNavigate();

  const myBids = [
    {
      auctionId: "1",
      title: "Vintage Rolex Submariner",
      myBid: 5000,
      currentBid: 5000,
      imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
      status: "winning",
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      auctionId: "2",
      title: "Abstract Modern Art",
      myBid: 14000,
      currentBid: 15000,
      imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500",
      status: "outbid",
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      auctionId: "4",
      title: "Vintage Camera Collection",
      myBid: 2800,
      currentBid: 2800,
      imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
      status: "winning",
      endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const getTimeRemaining = (endTime: string) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Ended";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole="customer" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Bids</h1>
          <p className="text-muted-foreground">Track your active bids and auction status</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Bids
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myBids.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Winning
              </CardTitle>
              <Trophy className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {myBids.filter(b => b.status === "winning").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Invested
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${myBids.reduce((sum, bid) => sum + bid.myBid, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bids List */}
        <div className="space-y-4">
          {myBids.map((bid) => (
            <Card key={bid.auctionId} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-48 bg-muted">
                    <img 
                      src={bid.imageUrl} 
                      alt={bid.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{bid.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{getTimeRemaining(bid.endTime)} remaining</span>
                        </div>
                      </div>
                      <Badge 
                        className={
                          bid.status === "winning" 
                            ? "bg-success text-success-foreground" 
                            : "bg-destructive text-destructive-foreground"
                        }
                      >
                        {bid.status === "winning" ? "Winning" : "Outbid"}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Your Bid</p>
                        <p className="text-lg font-semibold">${bid.myBid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Bid</p>
                        <p className="text-lg font-semibold">${bid.currentBid.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => navigate(`/auction/${bid.auctionId}`)}
                        variant="outline"
                      >
                        View Auction
                      </Button>
                      {bid.status === "outbid" && (
                        <Button 
                          onClick={() => navigate(`/auction/${bid.auctionId}`)}
                          className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        >
                          Place Higher Bid
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {myBids.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">You haven't placed any bids yet.</p>
            <Button onClick={() => navigate("/auctions")}>
              Browse Auctions
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyBids;
