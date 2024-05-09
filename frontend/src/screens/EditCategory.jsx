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
import { useGetSpecificProductQuery } from "../Features/productApiSlice";
import {
  useEditBrandDetailsMutation,
  useGetAllBrandsQuery,
  useGetSpecificBrandQuery,
} from "../Features/brandApiSlice";
import {
  useEditCategoryMutation,
  useGetAllCategoriesQuery,
  useGetSpecificCategoryQuery,
} from "../Features/categoryApiSlice";
import { useEffect, useState } from "react";
import { useToast } from "../components/ui/use-toast";

export function EditCategory() {
  const { id: categoryId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    data: categoryDetails,
    isLoading,
    error,
    refetch,
  } = useGetSpecificCategoryQuery(categoryId);

  const [
    updateCategory,
    { isLoading: updateBrandLoading, error: updateBrandError },
  ] = useEditCategoryMutation();

  const [categoryName, setCategoryName] = useState("");
  const [Sgst, setSgst] = useState(0);
  const [Cgst, setCgst] = useState(0);

  useEffect(() => {
    if (categoryDetails) {
      setCategoryName(categoryDetails.categoryName);
      setSgst(categoryDetails.Sgst);
      setCgst(categoryDetails.Cgst);
    }
  }, [categoryDetails]);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    // console.log(brandName, status);
    try {
      const res = await updateCategory({
        categoryId,
        categoryName,
        Sgst,
        Cgst,
      }).unwrap();
      toast({
        title: `${res.categoryName} updated successfully`,
      });
      refetch();
      navigate("/categories");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updating category",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex items-center pl-4">
        <h1 className="text-lg font-semibold md:text-2xl">Edit Category</h1>
      </div>
      <div className="flex min-h-[80vh] w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid min-w-[40vw] max-w-[59rem] flex-1 auto-rows-max gap-4">
              {isLoading ? (
                <>Loading Data</>
              ) : error ? (
                <>Oops something went wrong! Please refresh the page</>
              ) : (
                <>
                  <div className="flex w-full">
                    <form
                      className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-4 w-full"
                      onSubmit={(e) => handleUpdateCategory(e)}
                    >
                      <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                        <CardHeader>
                          <CardTitle>Category Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6">
                            <div className="grid gap-3">
                              <Label htmlFor="name">Name</Label>
                              <Input
                                id="name"
                                type="text"
                                className="w-full"
                                placeholder={categoryName}
                                value={categoryName}
                                onChange={(e) =>
                                  setCategoryName(e.target.value)
                                }
                              />
                            </div>
                            <div className="flex gap-3 w-full">
                              <div className="flex flex-col gap-4 flex-1">
                                <Label htmlFor="sgst">Sgst</Label>
                                <Input
                                  id="sgst"
                                  type="number"
                                  className=""
                                  placeholder={Sgst}
                                  value={Sgst}
                                  onChange={(e) => setSgst(e.target.value)}
                                />
                              </div>
                              <div className="flex flex-col gap-4 flex-1">
                                <Label htmlFor="cgst">Cgst</Label>
                                <Input
                                  id="cgst"
                                  type="number"
                                  className=""
                                  placeholder={Cgst}
                                  value={Cgst}
                                  onChange={(e) => setCgst(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="grid gap-3 ">
                              <Button
                                type="submit"
                                id="save"
                                className="w-[30%]"
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </form>
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
