import React from 'react';
import ProductCard from './ProductCard';
import { Pagination, ConfigProvider } from 'antd';
import { Product } from '@/types/type';

interface ProductListProps {
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

const ProductList: React.FC<ProductListProps> = ({
  products,
  isFetching,
  onEdit,
  onDelete,
  onDetails,
  offset,
  limit,
  total,
  onPageChange
}) => {
  return (
    <>
      {isFetching ? (
        <p className="text-center py-10 text-gray-500">Loading products...</p>
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => onEdit(product)}
                onDelete={() => onDelete(product.id)}
                onDetails={() => onDetails(product)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center lg:my-8 my-5">
            <ConfigProvider
              theme={{
                components: {
                  Pagination: {
                    itemBg: "#A44A3F30",
                    itemActiveBg: "#A44A3F30",
                  },
                },
                token: {
                  colorPrimaryBorder: '#0D1821',
                  colorPrimary: '#A44A3F',
                },
              }}
            >
              <Pagination
                current={offset / limit + 1}
                pageSize={limit}
                total={total}
                onChange={onPageChange}
                showSizeChanger={false}
              />
            </ConfigProvider>
          </div>
        </>
      ) : (
        <p className="text-center py-10 text-gray-400">No products found</p>
      )}
    </>
  );
};

export default ProductList;
