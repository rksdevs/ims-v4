import {
  ChevronLeft,
  Home,
  IndianRupee,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  Upload,
  Users2,
} from "lucide-react";
import Bicycle from "../components/assets/images/ProductImg.jpg";
import { Skeleton } from "../components/ui/skeleton";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Textarea } from "../components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useGetSpecificProductQuery,
} from "../Features/productApiSlice";
import {
  useEditBrandDetailsMutation,
  useGetAllBrandsQuery,
  useGetSpecificBrandQuery,
} from "../Features/brandApiSlice";
import { useGetAllCategoriesQuery } from "../Features/categoryApiSlice";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "../components/ui/use-toast";
import {
  useGetSpecificOrderDetailsQuery,
  useUpdateOrderDetailsMutation,
} from "../Features/orderApiSlice";
import { Separator } from "../components/ui/separator";
import { removeFromCart, updateCartWithCustInfo } from "../Features/cartSlice";
import { useDispatch } from "react-redux";

export function EditOrder() {
  const { id: orderId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: orderDetails,
    isLoading,
    error,
    refetch,
  } = useGetSpecificOrderDetailsQuery(orderId);

  const [updateOrder, { isLoading: updateLoading, error: updateError }] =
    useUpdateOrderDetailsMutation();
  const [custNameCurrent, setCustNameCurrent] = useState("");
  const [custAddressCurrent, setCustAddressCurrent] = useState("");
  const [custPhoneCurrent, setCustPhoneCurrent] = useState("");
  const [discountCurrent, setDiscountCurrent] = useState(0);
  const [methodOfPaymentCurrent, setMethodOfPaymentCurrent] = useState("Cash");
  const [itemsListToSend, setItemsListToSend] = useState([]);

  // Function to get the quantity of a product by its _id
  const getStockById = (productId, allProduct) => {
    const product = allProduct?.find((product) => product._id === productId);
    return product ? product.quantity : 0; // Return 0 if product not found
  };

  const updatedItemsList = (itemsList, itemToRemove) => {
    setItemsListToSend(
      itemsList.filter((item) => item.productId !== itemToRemove.productId)
    );
  };

  const updateCurrentItem = (currentItem, qty) => {
    let product = { ...currentItem };
    product.quantity = qty;
    const itemsList = itemsListToSend.filter(
      (item) => item.productId !== currentItem.productId
    );
    itemsList.push(product);
    setItemsListToSend(itemsList);
  };

  const itemsForTable = useMemo(() => {
    if (orderDetails?.items.length > 0) {
      return orderDetails?.items;
    } else {
      return [];
    }
  }, [orderDetails]);

  useEffect(() => {
    if (orderDetails) {
      console.log(orderDetails);
      setCustNameCurrent(orderDetails.custName);
      setCustAddressCurrent(orderDetails.custAddress);
      setCustPhoneCurrent(orderDetails.custPhone);
      setDiscountCurrent(orderDetails.discount);
      setMethodOfPaymentCurrent(orderDetails.methodOfPayment);
      setItemsListToSend(orderDetails.items);
    }
  }, [orderDetails]);

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    // console.log(custName, custAddress);
    // try {
    //   const res = await updateBrand({
    //     orderId,
    //     brandName,
    //     status,
    //   }).unwrap();
    //   toast({
    //     title: `${res.brandName} updated successfully`,
    //   });
    //   refetch();
    //   navigate("/brands");
    // } catch (error) {
    //   console.log(error);
    //   toast({
    //     title: "Error updating brand",
    //     description: error?.message || error?.data?.message,
    //     variant: "destructive",
    //   });
    // }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateOrder({
        ...orderDetails,
        custName: custNameCurrent,
        custAddress: custAddressCurrent,
        custPhone: custPhoneCurrent,
        custMethodOfPayment: methodOfPaymentCurrent,
        orderId,
      }).unwrap();
      refetch();
      toast({
        title: `Updated Order No: ${res._id}`,
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

  return (
    <>
      <div className="flex items-center pl-4">
        <h1 className="text-lg font-semibold md:text-2xl">Edit Brand</h1>
      </div>
      {isLoading ? (
        <>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </>
      ) : (
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
                    <form className="flex flex-col w-[50%] gap-3">
                      <div className="flex flex-col gap-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder={
                            orderDetails?.custName || "Customer name"
                          }
                          value={custNameCurrent}
                          onChange={(e) => setCustNameCurrent(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          type="text"
                          placeholder={
                            orderDetails?.custAddress || "Customer address"
                          }
                          value={custAddressCurrent}
                          onChange={(e) =>
                            setCustAddressCurrent(e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="number"
                          placeholder={
                            orderDetails?.custPhone || "Customer phone"
                          }
                          value={custPhoneCurrent}
                          onChange={(e) => setCustPhoneCurrent(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <Label htmlFor="discount">Discount %</Label>
                        <Input
                          id="discount"
                          type="number"
                          placeholder={orderDetails?.discount || "Discount"}
                          value={discountCurrent}
                          readOnly
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <Label htmlFor="payment">Payment Method</Label>
                        <Select
                          id="payment"
                          onValueChange={(e) => setMethodOfPaymentCurrent(e)}
                          defaultValue={orderDetails?.methodOfPaymentCurrent}
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
                    </form>
                    <Card className="w-[50%]">
                      <CardHeader>
                        <CardTitle>
                          {orderDetails?.items?.length > 0
                            ? "Item Details"
                            : "No Items in Cart"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="h-[40vh]">
                        {orderDetails?.items?.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="">Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {itemsForTable.map((product) => (
                                <TableRow key={product.productId}>
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
                                    {product.price}
                                  </TableCell>

                                  {/* <TableCell className="text-center">
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                      onClick={() =>
                                        updatedItemsList(itemsForTable, product)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      <span className="sr-only">Remove</span>
                                    </Button>
                                  </TableCell> */}
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
                    </Card>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </div>
              <div>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-05-chunk-4"
                >
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
                        {orderDetails?.items?.map((item) => (
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
                          <span className="text-muted-foreground">Total</span>
                          <span>₹{orderDetails?.netAmount}</span>
                        </li>
                      </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Customer Information</div>
                      <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Customer</dt>
                          <dd>{orderDetails?.custName}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Address</dt>
                          <dd>
                            <a href="mailto:">
                              {orderDetails?.custAddress?.length > 15
                                ? orderDetails?.custAddress.substring(0, 15) +
                                  "..."
                                : orderDetails?.custAddress}
                            </a>
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Phone</dt>
                          <dd>
                            <a href="tel:">{orderDetails?.custPhone}</a>
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
                          <dd>{orderDetails?.methodOfPayment}</dd>
                        </div>
                      </dl>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="flex w-full text-xs text-muted-foreground">
                      {orderDetails?.items.length > 0 && (
                        <Button
                          className="w-full"
                          onClick={(e) => handleFormSubmit(e)}
                        >
                          Update Order
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
