import { Button } from "@/components/ui/button";
import { Gavel, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  userRole?: "admin" | "seller" | "customer";
}

const Navbar = ({ userRole }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/auth");
  };

  const getUserLabel = () => {
    if (!userRole) return "Guest";
    return userRole.charAt(0).toUpperCase() + userRole.slice(1);
  };

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <Gavel className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold">AuctionPro</span>
        </div>

        <div className="flex items-center gap-4">
          {!userRole ? (
            <Button onClick={() => navigate("/auth")} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Sign In
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{getUserLabel()}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userRole === "admin" && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                {userRole === "seller" && (
                  <DropdownMenuItem onClick={() => navigate("/seller")}>
                    Seller Dashboard
                  </DropdownMenuItem>
                )}
                {userRole === "customer" && (
                  <DropdownMenuItem onClick={() => navigate("/my-bids")}>
                    My Bids
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate("/auctions")}>
                  Browse Auctions
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
