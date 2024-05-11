import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  ListFilter,
  MoreVertical,
  Truck,
  PlusCircle,
  MoreHorizontal,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import Bicycle from "../components/assets/images/Bicycle.jpg";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useGetAllOrdersQuery } from "../Features/orderApiSlice";
import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Skeleton } from "../components/ui/skeleton";
import {
  useAddProductMutation,
  useGetAllProductsQuery,
} from "../Features/productApiSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import { tab } from "@testing-library/user-event/dist/tab";
import { useDispatch } from "react-redux";
import { addToCart } from "../Features/cartSlice";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";

export function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: allProducts,
    isLoading,
    error,
    refetch,
  } = useGetAllProductsQuery();
  const [addProduct, { isLoading: addProductLoading, error: addProductError }] =
    useAddProductMutation();
  const data = useMemo(() => {
    return allProducts || [];
  }, [allProducts]);
  const { toast } = useToast();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  });

  const columnHelper = createColumnHelper();

  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    columnHelper.accessor((row) => row._id, {
      id: "Image",
      cell: (info) => (
        <img
          alt="Product img"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={Bicycle}
          width="64"
        />
      ),
    }),
    {
      accessorKey: "productName",
      header: "Product",
    },
    {
      accessorKey: "size",
      header: "Size",
    },
    {
      accessorKey: "color",
      header: "Color",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "brand.brandName",
      header: "Brand",
    },
    // {
    //   accessorKey: "category.categoryName",
    //   header: "Category",
    // },
    columnHelper.accessor((row) => row.category, {
      id: "Category",
      cell: (info) => (
        <>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="secondary">
                {info.getValue().categoryName}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-50">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    {info.getValue().categoryName}
                  </h4>
                  <p className="text-sm">Sgst - {info.getValue().Sgst} %</p>
                  <p className="text-sm">Cgst - {info.getValue().Cgst} %</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </>
      ),
    }),
    columnHelper.accessor((row) => row, {
      id: "Add To Cart",
      cell: (info) => (
        <>
          {/* <Button
            variant="outline"
            onClick={(e) => console.log(info.getValue())}
          >
            Add
          </Button> */}
          <Select
            onValueChange={(qty) => addToCartHandler(info.getValue(), qty)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Add to Cart" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>No of Items</SelectLabel>
                {Array.from({ length: info.getValue().quantity }).map(
                  (_, index) => (
                    <SelectItem value={index + 1} key={index}>
                      {index + 1}
                    </SelectItem>
                  )
                )}
                {/* <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
      ),
    }),
    columnHelper.accessor((row) => row._id, {
      id: "Actions",
      cell: (info) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigate(`/products/editProduct/${info.getValue()}`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

  const handleAddProduct = async () => {
    try {
      const res = await addProduct().unwrap();
      toast({
        title: "Added New Product",
        description: `${res._id}`,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Failed to add product",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const addToCartHandler = (itemInfo, qty) => {
    // e.preventDefault();
    console.log({ ...itemInfo }, qty);
    const payload = {
      productName: itemInfo.productName,
      quantity: qty,
      _id: itemInfo._id,
      price: itemInfo.price,
      Sgst: itemInfo.category.Sgst,
      Cgst: itemInfo.category.Cgst,
    };
    dispatch(addToCart({ ...payload }));
    console.log(payload);
  };

  return (
    <>
      <div className="flex items-center pl-4">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
      </div>
      <div className="flex min-h-[80vh] w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 ">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                  <TabsTrigger value="archived" className="hidden sm:flex">
                    Archived
                  </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="h-7 gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Add Product
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogDescription>
                          Are you sure, you want to add a new product?
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter className="flex justify-center">
                        <DialogClose asChild className="flex w-full gap-4">
                          <div>
                            <Button
                              className="flex-1"
                              onClick={handleAddProduct}
                            >
                              Yes
                            </Button>
                            <Button
                              className="flex-1"
                              type="button"
                              variant="secondary"
                            >
                              No
                            </Button>
                          </div>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <TabsContent value="all" className="max-h-[70vh] overflow-y-auto">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>
                      Manage your products and view their sales performance.
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
                      <>Something went wrong</>
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
          </main>
        </div>
      </div>
    </>
  );
}
