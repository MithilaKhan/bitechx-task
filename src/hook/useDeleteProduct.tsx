import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDeleteProductMutation } from "@/redux/features/product/productsApi";

export const useDeleteProduct = (refetch: () => void) => {
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteProduct(id);
          if ("data" in response) {
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
            refetch();
          } else {
            toast.error("Failed to delete the product.");
          }
        } catch {
          toast.error("Something went wrong. Please try again.");
        }
      }
    });
  };

  return { handleDelete };
};
