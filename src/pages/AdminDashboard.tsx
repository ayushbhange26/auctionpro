import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Gavel, DollarSign, Trash2, CheckCircle } from "lucide-react";

const AdminDashboard = () => {
  const [stats] = useState({
    totalAuctions: 156,
    activeAuctions: 45,
    totalUsers: 1234,
    totalRevenue: 567890,
  });

  const mockAuctions = [
    { id: "1", title: "Vintage Watch", seller: "John Doe", currentBid: 5000, status: "active", bids: 23 },
    { id: "2", title: "Rare Painting", seller: "Jane Smith", currentBid: 15000, status: "active", bids: 45 },
    { id: "3", title: "Antique Vase", seller: "Bob Johnson", currentBid: 3500, status: "ending-soon", bids: 12 },
  ];

  const mockUsers = [
    { id: "1", name: "Alice Cooper", role: "customer", auctions: 0, bids: 15, joined: "2024-01-15" },
    { id: "2", name: "Bob Smith", role: "seller", auctions: 12, bids: 3, joined: "2024-02-20" },
    { id: "3", name: "Charlie Brown", role: "customer", auctions: 0, bids: 28, joined: "2024-03-10" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole="admin" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your auction platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Auctions
              </CardTitle>
              <Gavel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAuctions}</div>
              <p className="text-xs text-success">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Auctions
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeAuctions}</div>
              <p className="text-xs text-success">Live right now</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-success">+8% from last month</p>
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
              <p className="text-xs text-success">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="auctions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="auctions">Manage Auctions</TabsTrigger>
            <TabsTrigger value="users">Manage Users</TabsTrigger>
          </TabsList>

          <TabsContent value="auctions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Auctions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAuctions.map((auction) => (
                    <div key={auction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{auction.title}</h3>
                        <p className="text-sm text-muted-foreground">Seller: {auction.seller}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm">Current: ${auction.currentBid}</span>
                          <span className="text-sm text-muted-foreground">{auction.bids} bids</span>
                          <Badge variant={auction.status === "active" ? "default" : "destructive"}>
                            {auction.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge>{user.role}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {user.auctions} auctions
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {user.bids} bids placed
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Joined: {user.joined}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
