export interface errorType {
    data: {
        message: string
    }
}


type Category = {
    id: string;
    name: string;
    image: string;
    description?: string | null
};

export type Product = {
    id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    slug: string;
    category: Category;
};

export type ProductCardProps = {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
    onDetails: (product: Product) => void;
};

export type ProductDetailsModalProps = {
    product?: Product | null;
    isOpen: boolean;
    onClose: () => void;
    refetch : () => void;
    setSelectedProduct: (product: Product | null) => void;
}; 

export type formFieldsProps = {
    form ?: any;
    product?: Product | null;
    imageUrls: string[];
    setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
}; 

export interface ProductsFilterProps {
  CategoryOption: { value: string; label: string }[];
  onCategoryChange: (value?: string) => void;
  onSearch: (value: string) => void;
  setIsProductForm: (value: boolean) => void
} 


export interface ProductListProps {
  products: Product[];
  isFetching: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onDetails: (product: Product) => void;
  offset: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
} 

export interface ImageUploadSectionProps {
    imageUrls: string[];
    setImageUrls: React.Dispatch<React.SetStateAction<string[]>>; 
    product ?: Product | null
} 

