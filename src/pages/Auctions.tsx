import { useState } from "react";
import Navbar from "@/components/Navbar";
import AuctionCard from "@/components/AuctionCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const Auctions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const userRole = localStorage.getItem("userRole") as "admin" | "seller" | "customer" | null;

  const mockAuctions = [
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
      title: "Abstract Modern Art Painting",
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
    {
      id: "4",
      title: "Vintage Camera Collection",
      currentBid: 2800,
      startingBid: 1500,
      endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
      bidCount: 18,
      status: "active" as const,
      seller: "Alice Cooper",
    },
    {
      id: "5",
      title: "Designer Leather Handbag",
      currentBid: 1200,
      startingBid: 800,
      endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
      bidCount: 9,
      status: "active" as const,
      seller: "Emma Wilson",
    },
    {
      id: "6",
      title: "Rare Vinyl Record Collection",
      currentBid: 890,
      startingBid: 500,
      endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500",
      bidCount: 6,
      status: "ending-soon" as const,
      seller: "Michael Brown",
    },
  ];

  const filteredAuctions = mockAuctions.filter((auction) => {
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || auction.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole={userRole || undefined} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Auctions</h1>
          <p className="text-muted-foreground">Discover and bid on exclusive items</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search auctions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Auctions</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
              <SelectItem value="ended">Ended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuctions.map((auction) => (
            <AuctionCard key={auction.id} {...auction} />
          ))}
        </div>

        {filteredAuctions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No auctions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auctions;
