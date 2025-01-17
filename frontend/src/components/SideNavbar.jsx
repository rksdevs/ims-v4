import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
  Layers3,
  Tags,
  ScrollText,
  ClipboardList,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { useSelector } from "react-redux";

const SideNavbar = () => {
  const location = useLocation();
  const { items } = useSelector((state) => state.cart);
  const checkLocation = () => {
    const orderPage = location.pathname.includes("/orders");
    const productsPage = location.pathname.includes("/products");
    const customersPage = location.pathname.includes("/customers");
    const analyticsPage = location.pathname.includes("/analytics");
  };

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <ClipboardList className="h-6 w-6" />
            <span className="">Register Inc</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
            {/* <Link
              to="/analytics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LineChart className="h-4 w-4" />
              Analytics
            </Link> */}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Help!</CardTitle>
              <CardDescription>
                Need a web application, look no further! Check out our products.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
