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