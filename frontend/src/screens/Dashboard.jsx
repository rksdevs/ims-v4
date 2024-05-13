import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import Chart from "../components/Chart";
import avatarMan from "../components/assets/images/avatar-man.jpg";
import avatarWoman from "../components/assets/images/avatar-woman.jpg";
import { useNavigate } from "react-router-dom";
import { useGetAllOrdersQuery } from "../Features/orderApiSlice";
import { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Skeleton } from "../components/ui/skeleton";

export function Dashboard() {
  const navigate = useNavigate();
  const { data: allOrders, isLoading, error } = useGetAllOrdersQuery();
  const data = useMemo(() => {
    return allOrders?.allOrders || [];
  }, [allOrders]);
  const [recentOrdersArray, setRecentOrdersArray] = useState([]);

  useEffect(() => {
    if (data.length) {
      const startIndex = Math.max(data.length - 5, 0);
      setRecentOrdersArray(data?.slice(startIndex));
      // console.log();
    }
  }, [data]);

  return (
    <>
      <div className="flex items-center pl-4">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div
        className="flex flex-1 flex-col gap-8 justify-center rounded-lg border border-dashed shadow-sm p-4"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex gap-4 flex-col md:flex-row">
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Orders</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Orders Dashboard for Seamless Management
                and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate("/orders")}>Check Orders</Button>
            </CardFooter>
          </Card>
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Products</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Product Dashboard for Seamless
                Management and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate("/products")}>
                Check Products
              </Button>
            </CardFooter>
          </Card>
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Categories</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Categories Dashboard for Seamless
                Management and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate("/categories")}>
                Check Categories
              </Button>
            </CardFooter>
          </Card>
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Brands</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Brands Dashboard for Seamless Management
                and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate("/brands")}>Check Brands</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Chart />
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {isLoading && (
                <>
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </>
              )}
              {recentOrdersArray?.map((order) => (
                <div className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={avatarMan} alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {order.custName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.custAddress}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">₹{order.netAmount}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
