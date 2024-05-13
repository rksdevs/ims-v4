import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  RefreshCw,
  Search,
  ShoppingCart,
  Users,
  Layers3,
  Tags,
  ScrollText,
} from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Features/cartSlice";
import { useLogoutMutation } from "../Features/authApiSlice";
import { logout } from "../Features/authSlice";

const Header = () => {
  const { items } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              to="/"
              className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/orders"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ScrollText className="h-4 w-4" />
              Orders
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground"
            >
              <Package className="h-4 w-4" />
              Products{" "}
            </Link>
            <Link
              to="/brands"
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground"
            >
              <Tags className="h-4 w-4" />
              Brands{" "}
            </Link>
            <Link
              to="/categories"
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground"
            >
              <Layers3 className="h-4 w-4" />
              Categories{" "}
            </Link>
            <Link
              to="/customers"
              className="hidden flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Customers
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Cart
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {items.length
                  ? items.reduce((sum, currentItem) => {
                      return sum + currentItem.quantity;
                    }, 0)
                  : 0}
              </Badge>
            </Link>
            <Link
              to="/analytics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LineChart className="h-4 w-4" />
              Analytics
            </Link>
          </nav>
          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <RefreshCw onClick={() => dispatch(clearCart())} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear Cart</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={(e) => logoutHandler(e)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ModeToggle />
    </header>
  );
};

export default Header;
