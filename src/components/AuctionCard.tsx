import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AuctionCardProps {
  id: string;
  title: string;
  currentBid: number;
  startingBid: number;
  endTime: string;
  imageUrl: string;
  bidCount: number;
  status: "active" | "ending-soon" | "ended";
  seller?: string;
}

const AuctionCard = ({
  id,
  title,
  currentBid,
  startingBid,
  endTime,
  imageUrl,
  bidCount,
  status,
  seller,
}: AuctionCardProps) => {
  const navigate = useNavigate();

  const getTimeRemaining = () => {
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

  const getStatusBadge = () => {
    if (status === "ended") {
      return <Badge variant="secondary">Ended</Badge>;
    }
    if (status === "ending-soon") {
      return <Badge className="bg-destructive text-destructive-foreground">Ending Soon</Badge>;
    }
    return <Badge className="bg-success text-success-foreground">Active</Badge>;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/auction/${id}`)}>
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden bg-muted">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            {getStatusBadge()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        {seller && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{seller}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Current Bid</p>
            <p className="text-xl font-bold text-primary">${currentBid.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>{bidCount} bids</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{getTimeRemaining()}</span>
        </div>
        <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          Place Bid
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuctionCard;
