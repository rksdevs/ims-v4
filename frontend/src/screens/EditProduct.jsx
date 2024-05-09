import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";
import Bicycle from "../components/assets/images/ProductImg.jpg";
import { Skeleton } from "../components/ui/skeleton";
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
  SelectItem,
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
  useEditProductMutation,
  useGetSpecificProductQuery,
} from "../Features/productApiSlice";
import { useGetAllBrandsQuery } from "../Features/brandApiSlice";
import { useGetAllCategoriesQuery } from "../Features/categoryApiSlice";
import { useEffect, useState } from "react";
import { toast } from "../components/ui/use-toast";

export function EditProduct() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const {
    data: productDetails,
    isLoading,
    error,
  } = useGetSpecificProductQuery(productId);
  const {
    data: allBrands,
    isLoading: brandsLoading,
    error: brandsError,
  } = useGetAllBrandsQuery();
  const {
    data: allCategories,
    isLoading: loadingCategories,
    error: errorCategories,
  } = useGetAllCategoriesQuery();
  const [updateProduct, { error: updateProductError }] =
    useEditProductMutation();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (productDetails) {
      setProductName(productDetails.productName);
      setDescription(productDetails.description);
      setImage(productDetails.image);
      setQuantity(productDetails.quantity);
      setPrice(productDetails.price);
      setSize(productDetails.size);
      setColor(productDetails.color);
      setBrand(productDetails.brand);
      setCategory(productDetails.category);
    }
  }, [productDetails]);

  const handleProductUpdate = async (e) => {
    e.preventDefault();
    // console.log({
    //   productName,
    //   description,
    //   image,
    //   quantity,
    //   price,
    //   size,
    //   color,
    //   brand,
    //   category,
    // });
    try {
      const res = await updateProduct({
        productId,
        productName,
        description,
        image,
        quantity,
        price,
        size,
        color,
        brand,
        category,
      }).unwrap();
      toast({
        title: `${res.productName} updated successfully!`,
      });
      navigate("/products");
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to update product",
        description:
          updateProductError.message || error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex items-center pl-4">
        <h1 className="text-lg font-semibold md:text-2xl">Edit Product</h1>
      </div>
      <div className="flex min-h-[80vh] w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              {isLoading ? (
                <>Loading Data</>
              ) : error ? (
                <>Oops something went wrong! Please refresh the page</>
              ) : (
                <>
                  <form
                    className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
                    onSubmit={(e) => handleProductUpdate(e)}
                  >
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-4">
                      <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                          <CardTitle>Product Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6">
                            <div className="grid gap-3">
                              <Label htmlFor="name">Name</Label>
                              <Input
                                id="name"
                                type="text"
                                className="w-full"
                                placeholder={productName}
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                              />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="min-h-14"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card x-chunk="dashboard-07-chunk-1">
                        <CardHeader>
                          <CardTitle>Stock</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[100px]">
                                  Stock
                                </TableHead>
                                <TableHead>Color</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="w-[100px]">
                                  Size
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <Label htmlFor="stock-1" className="sr-only">
                                    Stock
                                  </Label>
                                  <Input
                                    id="stock-1"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) =>
                                      setQuantity(e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Label htmlFor="color" className="sr-only">
                                    Color
                                  </Label>
                                  <Input
                                    id="color"
                                    type="text"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Label htmlFor="price-1" className="sr-only">
                                    Price
                                  </Label>
                                  <Input
                                    id="price-1"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Label htmlFor="size" className="sr-only">
                                    Size
                                  </Label>
                                  <Input
                                    id="size"
                                    type="text"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                  />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                      <Card x-chunk="dashboard-07-chunk-2">
                        <CardHeader>
                          <CardTitle>Brand & Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6 sm:grid-cols-3">
                            <div className="grid gap-3">
                              <Label htmlFor="brand">Brand</Label>
                              <Select onValueChange={(e) => setBrand(e)}>
                                <SelectTrigger
                                  id="brand"
                                  aria-label="Select brand"
                                >
                                  <SelectValue placeholder="Select brand" />
                                </SelectTrigger>
                                <SelectContent>
                                  {brandsLoading ? (
                                    <SelectItem>
                                      <Skeleton className="h-4 w-[100px]" />
                                    </SelectItem>
                                  ) : brandsError ? (
                                    <SelectItem>
                                      Something went wrong!
                                    </SelectItem>
                                  ) : (
                                    allBrands.map((brand) => (
                                      <SelectItem
                                        value={brand._id}
                                        key={brand._id}
                                        disabled={
                                          brand.status === "Inactive"
                                            ? true
                                            : false
                                        }
                                      >
                                        {brand.brandName}
                                      </SelectItem>
                                    ))
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="category">Category</Label>
                              <Select onValueChange={(e) => setCategory(e)}>
                                <SelectTrigger
                                  id="category"
                                  aria-label="Select category"
                                >
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {loadingCategories ? (
                                    <SelectItem>
                                      <Skeleton className="h-4 w-[100px]" />
                                    </SelectItem>
                                  ) : errorCategories ? (
                                    <SelectItem>
                                      Something went wrong!
                                    </SelectItem>
                                  ) : (
                                    allCategories.map((category) => (
                                      <SelectItem
                                        value={category._id}
                                        key={category._id}
                                      >
                                        {category.categoryName}
                                      </SelectItem>
                                    ))
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                      <Card
                        className="overflow-hidden"
                        x-chunk="dashboard-07-chunk-4"
                      >
                        <CardHeader>
                          <CardTitle>Product images</CardTitle>
                          <CardDescription>
                            Lipsum dolor sit amet, consectetur adipiscing elit
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-2">
                            <img
                              alt="Product img"
                              className="aspect-square w-full rounded-md object-cover"
                              height="300"
                              src={Bicycle}
                              width="300"
                            />
                            <div className="grid grid-cols-3 gap-2">
                              <button>
                                <img
                                  alt="Product img"
                                  className="aspect-square w-full rounded-md object-cover"
                                  height="84"
                                  src={Bicycle}
                                  width="84"
                                />
                              </button>
                              <button>
                                <img
                                  alt="Product img"
                                  className="aspect-square w-full rounded-md object-cover"
                                  height="84"
                                  src={Bicycle}
                                  width="84"
                                />
                              </button>
                              <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                <Upload className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Upload</span>
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card x-chunk="dashboard-07-chunk-5">
                        <CardHeader>
                          <CardTitle>Save Product</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button size="sm" type="submit">
                            Save
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </form>
                  <div className="flex items-center justify-center gap-2 md:hidden">
                    <Button variant="outline" size="sm">
                      Discard
                    </Button>
                    <Button size="sm">Save Product</Button>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
