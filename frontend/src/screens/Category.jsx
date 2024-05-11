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
import { useGetAllBrandsQuery } from "../Features/brandApiSlice";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../Features/categoryApiSlice";

export function Category() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    data: allCategories,
    isLoading,
    error,
    refetch,
  } = useGetAllCategoriesQuery();
  const [addCategory, { error: addCategoryError }] = useAddCategoryMutation();
  const [deleteCategory, { error: deleteCategoryError }] =
    useDeleteCategoryMutation();
  const allCategoriesData = useMemo(() => {
    return allCategories || [];
  }, [allCategories]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const columnHelper = createColumnHelper();

  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    {
      accessorKey: "categoryName",
      header: "Category",
    },
    {
      accessorKey: "_id",
      header: "ID",
    },
    {
      accessorKey: "Sgst",
      header: "State-Gst",
    },
    {
      accessorKey: "Cgst",
      header: "Center-Gst",
    },
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
                navigate(`/categories/editCategory/${info.getValue()}`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => handleDeleteCategory(e, info.getValue())}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
  ];

  const allCategoriesstable = useReactTable({
    data: allCategoriesData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
  });

  const handleAddCategory = async () => {
    try {
      const res = await addCategory().unwrap();
      refetch();
      toast({
        title: "Added New Category",
        description: `${res._id}`,
      });
    } catch (error) {
      toast({
        title: "Failed to add category!",
        description:
          addCategoryError.message || error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (e, categoryId) => {
    e.preventDefault();
    try {
      await deleteCategory(categoryId).unwrap();
      refetch();
      toast({
        title: "Deleted category successfully!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error deleting category!",
        description:
          deleteCategoryError.message || error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex items-center pl-4">
        <h1 className="text-lg font-semibold md:text-2xl">Categories</h1>
      </div>
      <div className="flex min-h-[80vh] w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 ">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="h-7 gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Add Category
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Category</DialogTitle>
                        <DialogDescription>
                          Are you sure, you want to add a new category?
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter className="flex justify-center">
                        <DialogClose asChild className="flex w-full gap-4">
                          <div>
                            <Button
                              className="flex-1"
                              onClick={handleAddCategory}
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
                    <CardTitle>All Brands</CardTitle>
                    <CardDescription>
                      Check and manage all your brands
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
                          {allCategoriesstable
                            .getHeaderGroups()
                            .map((headerGroup) => (
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
                          {allCategoriesstable.getRowModel().rows.map((row) => (
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
                              onClick={() => allCategoriesstable.firstPage()}
                              disabled={
                                !allCategoriesstable.getCanPreviousPage()
                              }
                            >
                              First Page
                            </Button>
                          </PaginationItem>
                          <PaginationItem>
                            <Button
                              variant="ghost"
                              onClick={() => allCategoriesstable.previousPage()}
                              disabled={
                                !allCategoriesstable.getCanPreviousPage()
                              }
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                          </PaginationItem>

                          <PaginationItem>
                            <Button
                              variant="ghost"
                              onClick={() => allCategoriesstable.nextPage()}
                              disabled={!allCategoriesstable.getCanNextPage()}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </PaginationItem>
                          <PaginationItem>
                            <Button
                              variant="ghost"
                              onClick={() => allCategoriesstable.lastPage()}
                              disabled={!allCategoriesstable.getCanNextPage()}
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
