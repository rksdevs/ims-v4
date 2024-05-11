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
  BadgeIndianRupee,
  IndianRupee,
  Trash2,
  ShoppingCart,
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
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
  useCreateOrderMutation,
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
import { Label } from "../components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateCartWithCustInfo,
} from "../Features/cartSlice";
import { useToast } from "../components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const {
    items,
    custAddress,
    custName,
    custPhone,
    discount,
    methodOfPayment,
    itemsPrice,
    netAmount,
    readyToCreateOrder,
  } = useSelector((state) => state.cart);
  const itemsForTable = useMemo(() => {
    if (items.length > 0) {
      return items;
    } else {
      return [];
    }
  }, [items]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [custNameCurrent, setCustNameCurrent] = useState("");
  const [custAddressCurrent, setCustAddressCurrent] = useState("");
  const [custPhoneCurrent, setCustPhoneCurrent] = useState("");
  const [discountCurrent, setDiscountCurrent] = useState(0);
  const [methodOfPaymentCurrent, setMethodOfPaymentCurrent] = useState("Cash");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const { toast } = useToast();

  const [createOrder, { isLoading, error: orderCreationError }] =
    useCreateOrderMutation();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(
        updateCartWithCustInfo({
          custAddress: custAddressCurrent,
          custName: custNameCurrent,
          custPhone: custPhoneCurrent,
          methodOfPayment: methodOfPaymentCurrent,
          discount: discountCurrent,
        })
      );

      toast({
        title: "Saved customer information",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updating customer into",
        description: error,
        variant: "destructive",
      });
    }
  };

  const handleOrderCreation = async (e) => {
    e.preventDefault();
    console.log({
      items,
      custName,
      custAddress,
      custPhone,
      discount,
      netAmount,
      itemsPrice,
    });
    try {
      const res = await createOrder({
        items,
        custName,
        custAddress,
        custPhone,
        discount,
        netAmount,
        itemsPrice,
      }).unwrap();
      dispatch(clearCart());
      toast({
        title: `Order Successful, Bill No: ${res.billNumber}`,
        description: `Order Id: ${res._id}`,
      });
      navigate("/orders");
    } catch (error) {
      console.log(orderCreationError);
      toast({
        title: `Error creating order!`,
        description: error,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex items-center pl-4">
        <h1 className="text-lg font-semibold md:text-2xl">Cart</h1>
      </div>
      <div className="flex min-h-[80vh] w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <Card
                x-chunk="dashboard-05-chunk-3"
                className="rounded-lg min-h-[68vh]"
              >
                <CardHeader className="px-7">
                  <CardTitle>Customer & Payment Info</CardTitle>
                  <CardDescription>
                    Add customer and payment information to create an order
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-[49vh] flex items-center gap-4">
                  <form
                    onSubmit={(e) => handleFormSubmit(e)}
                    className="flex flex-col w-[50%] gap-3"
                  >
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={custName || "Customer name"}
                        value={custNameCurrent}
                        onChange={(e) => setCustNameCurrent(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder={custAddress || "Customer address"}
                        value={custAddressCurrent}
                        onChange={(e) => setCustAddressCurrent(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="number"
                        placeholder={custPhone || "Customer phone"}
                        value={custPhoneCurrent}
                        onChange={(e) => setCustPhoneCurrent(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="discount">Discount %</Label>
                      <Input
                        id="discount"
                        type="number"
                        placeholder={discount || "Discount"}
                        value={discountCurrent}
                        onChange={(e) => setDiscountCurrent(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="payment">Payment Method</Label>
                      <Select
                        id="payment"
                        onValueChange={(e) => setMethodOfPaymentCurrent(e)}
                        defaultValue={methodOfPaymentCurrent}
                      >
                        <SelectTrigger className="w-[337px]">
                          <SelectValue placeholder="Payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Cash">Cash</SelectItem>
                            <SelectItem value="UPI">UPI</SelectItem>
                            <SelectItem value="Card">Card</SelectItem>
                            <SelectItem value="Credit">Credit</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Button type="submit">Confirm</Button>
                    </div>
                  </form>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {items?.length > 0
                          ? "Item Details"
                          : "No Items in Cart"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[40vh]">
                      {items?.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="">Product</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Remove</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {itemsForTable.map((product) => (
                              <TableRow key={product._id}>
                                <TableCell className="font-medium">
                                  {product.productName?.length > 15
                                    ? product.productName.substring(0, 15) +
                                      "..."
                                    : product.productName}
                                </TableCell>
                                <TableCell className="text-center">
                                  {product.quantity}
                                </TableCell>

                                <TableCell className="text-center">
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() =>
                                      dispatch(removeFromCart(product._id))
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Remove</span>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="flex justify-center w-[18vw] h-[40vh] items-center">
                          <Button onClick={() => navigate("/products")}>
                            <ShoppingCart className="h-3.5 w-3.5 mr-2" />
                            Add Items
                          </Button>
                        </div>
                      )}
                    </CardContent>
                    {/* {items?.length > 0 && (
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
                    )} */}
                  </Card>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
            <div>
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row bg-muted/50 p-6 items-center">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Order
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold">Order Details</div>
                    <ul className="grid gap-3">
                      {items?.map((item) => (
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
                      {/* <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Glimmer Lamps x <span>2</span>
                        </span>
                        <span>$250.00</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Aqua Filters x <span>1</span>
                        </span>
                        <span>$49.00</span>
                      </li> */}
                    </ul>
                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between font-semibold">
                        <span className="text-muted-foreground">Total</span>
                        <span>₹{netAmount}</span>
                      </li>
                    </ul>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Customer Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Customer</dt>
                        <dd>{custName}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Address</dt>
                        <dd>
                          <a href="mailto:">
                            {custAddress?.length > 15
                              ? custAddress.substring(0, 15) + "..."
                              : custAddress}
                          </a>
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Phone</dt>
                        <dd>
                          <a href="tel:">{custPhone}</a>
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
                        <dd>{methodOfPayment}</dd>
                      </div>
                    </dl>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="flex w-full text-xs text-muted-foreground">
                    {items.length > 0 ? (
                      readyToCreateOrder ? (
                        <Button
                          className="w-full"
                          onClick={(e) => handleOrderCreation(e)}
                        >
                          Create Order
                        </Button>
                      ) : (
                        <Button disabled className="w-full">
                          Waiting Customer Info
                        </Button>
                      )
                    ) : (
                      <Button disabled className="w-full">
                        Add Items in Cart
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
