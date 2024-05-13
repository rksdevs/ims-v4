import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  ListFilter,
  MoreVertical,
  Truck,
  FileInput,
  IndianRupee,
} from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../components/ui/pagination";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  useGetAllOrdersQuery,
  useGetSpecificOrderDetailsQuery,
} from "../Features/orderApiSlice";
import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { Skeleton } from "../components/ui/skeleton";
import { useNavigate } from "react-router-dom";

export function Orders() {
  const { data: allOrders, isLoading, error } = useGetAllOrdersQuery();
  const data = useMemo(() => {
    return allOrders?.allOrders || [];
  }, [allOrders]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  });
  const [previewOrderId, setPreviewOrderId] = useState("");
  const [loadPreviewCard, setLoadPreviewCard] = useState(false);
  const navigate = useNavigate();

  const {
    data: specificOrderData,
    isLoading: loadingSpecificOrderDetails,
    error: errorSpecificOrderDetails,
  } = useGetSpecificOrderDetailsQuery(previewOrderId, {
    skip: !loadPreviewCard,
  });

  const columnHelper = createColumnHelper();

  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    {
      accessorKey: "custName",
      header: "Customer",
    },
    {
      accessorKey: "billNumber",
      header: "Bill",
    },
    {
      accessorKey: "netAmount",
      header: "Amount",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "_id",
      header: "ID",
    },
    columnHelper.accessor((row) => row._id, {
      id: "Preview",
      cell: (info) => (
        <Button
          aria-haspopup="true"
          size="icon"
          variant="ghost"
          onClick={() => setPreviewOrderId(info.getValue())}
        >
          <FileInput className="h-4 w-4" />
          <span className="sr-only">Preview</span>
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  useEffect(() => {
    if (allOrders) {
      setPreviewOrderId(allOrders?.allOrders[0]._id);
      setLoadPreviewCard(true);
    }
  }, [allOrders]);

  return (
    <>
      <div className="flex items-center pl-4">
        <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
      </div>
      <div className="flex min-h-[80vh] w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                  <CardHeader className="pb-3">
                    <CardTitle>Your Orders</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      Introducing Our Dynamic Orders Dashboard for Seamless
                      Management and Insightful Analysis.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button onClick={() => navigate("/products")}>
                      Create New Order
                    </Button>
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-1">
                  <CardHeader className="pb-2">
                    <CardDescription>This Week</CardDescription>
                    <CardTitle className="text-4xl">$1,329</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      +25% from last week
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={25} aria-label="25% increase" />
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                  <CardHeader className="pb-2">
                    <CardDescription>This Month</CardDescription>
                    <CardTitle className="text-4xl">$5,329</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      +10% from last month
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={12} aria-label="12% increase" />
                  </CardFooter>
                </Card>
              </div>
              <Tabs defaultValue="week">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-sm"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Fulfilled
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Declined
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Refunded
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-sm"
                    >
                      <File className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                  </div>
                </div>
                <TabsContent
                  value="week"
                  className="max-h-[50vh] overflow-y-auto"
                >
                  <Card x-chunk="dashboard-05-chunk-3" className="rounded-sm">
                    <CardHeader className="px-7">
                      <CardTitle>Orders</CardTitle>
                      <CardDescription>
                        Recent orders from your store.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <>
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                          </div>
                        </>
                      ) : error ? (
                        <>
                          {" "}
                          Status Code: {error.status}{" "}
                          {JSON.stringify(error.data)}
                        </>
                      ) : (
                        <Table>
                          <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                              <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                  <TableHead key={header.id}>
                                    {flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                                  </TableHead>
                                ))}
                              </TableRow>
                            ))}
                          </TableHeader>
                          <TableBody>
                            {table.getRowModel().rows.map((row) => (
                              <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                  <TableCell key={cell.id}>
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                    <CardFooter>
                      <div className="text-xs text-muted-foreground">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <Button
                                variant="ghost"
                                onClick={() => table.firstPage()}
                                disabled={!table.getCanPreviousPage()}
                              >
                                First Page
                              </Button>
                            </PaginationItem>
                            <PaginationItem>
                              <Button
                                variant="ghost"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </Button>
                            </PaginationItem>

                            <PaginationItem>
                              <Button
                                variant="ghost"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                              >
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </PaginationItem>
                            <PaginationItem>
                              <Button
                                variant="ghost"
                                onClick={() => table.lastPage()}
                                disabled={!table.getCanNextPage()}
                              >
                                Last Page
                              </Button>
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              {loadingSpecificOrderDetails ? (
                <>
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </>
              ) : errorSpecificOrderDetails ? (
                <>
                  Error Status: {errorSpecificOrderDetails.status} Error
                  Details: {errorSpecificOrderDetails.data}
                </>
              ) : (
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-05-chunk-4"
                >
                  <CardHeader className="flex flex-row bg-muted/50 p-6 items-center">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        {specificOrderData?.billNumber || "Bill"}
                      </CardTitle>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1"
                        disabled
                      >
                        <Truck className="h-3.5 w-3.5" />
                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                          Actions
                        </span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Export</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Trash</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Order Details</div>
                      <ul className="grid gap-3">
                        {specificOrderData?.items?.map((item) => (
                          <li
                            key={item._id}
                            className="flex items-center justify-between"
                          >
                            <span className="text-muted-foreground">
                              {item.productName} x <span>{item.quantity}</span>
                            </span>
                            <span>
                              ₹
                              {(item.price +
                                (item.price * item.Sgst) / 100 +
                                (item.price * item.Cgst) / 100) *
                                item.quantity}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Separator className="my-2" />
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">
                            Gross Amount
                          </span>
                          <span>₹{specificOrderData?.itemsPrice}</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">
                            Discount
                          </span>
                          <span>{specificOrderData?.discount}%</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">Total</span>
                          <span>₹{specificOrderData?.netAmount}</span>
                        </li>
                      </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Customer Information</div>
                      <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Customer</dt>
                          <dd>{specificOrderData?.custName}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Address</dt>
                          <dd>
                            <a href="mailto:">
                              {specificOrderData?.custAddress?.length > 15
                                ? specificOrderData?.custAddress.substring(
                                    0,
                                    15
                                  ) + "..."
                                : specificOrderData?.custAddress}
                            </a>
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Phone</dt>
                          <dd>
                            <a href="tel:">{specificOrderData?.custPhone}</a>
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Payment Information</div>
                      <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <dt className="flex items-center gap-1 text-muted-foreground">
                            <IndianRupee className="h-4 w-4" />
                            Method
                          </dt>
                          <dd>{specificOrderData?.methodOfPayment}</dd>
                        </div>
                      </dl>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
