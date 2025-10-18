import Swal from "sweetalert2";

const useDeleteConfirmation = () => {
  const handleDeleteConfirmation = async (id: string, deleteProduct: Function, refetch: Function) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteProduct(id);
        if ("data" in response) {
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
          refetch();
        } else {
          Swal.fire("Failed to delete", "Please try again.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Something went wrong, please try again", "error");
      }
    }
  };

  return handleDeleteConfirmation;
};

export default useDeleteConfirmation;
