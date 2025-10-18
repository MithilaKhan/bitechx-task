import { Product } from '@/types/type';
import Image from 'next/image';
import React from 'react';

const ProductInfo = ({ product }: { product: Product }) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:py-4 pt-0">
                {/* Product Details */}
                <div>
                    <p className="lg:text-2xl text-xl font-semibold mb-2">{product.name}</p>
                    <p className="text-gray-600 mb-4">{product.description}</p>

                    <div className=" flex lg:flex-row flex-col-reverse  gap-y-2 lg:items-center justify-between">

                        <p className="text-lg font-semibold text-gray-800">
                            💰 Price: <span className="text-primary">${product.price}</span>
                        </p>

                        <p className="lg:text-[16px] text-sm  mt-1">
                            Slug: <span className="font-medium">{product.slug}</span>
                        </p>
                    </div>
                </div>

                {/* Category Info */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">📦 Category Info</h3>
                    <div className="flex items-start gap-3 mb-2">
                        {product.category?.image && (
                            <Image
                                src={product.category.image}
                                alt={product.category.name}
                                width={60}
                                height={60}
                                className="rounded-md object-cover"
                            />
                        )}
                        <div>
                            <p className="font-semibold lg:text-lg text-[16px]">{product.category.name}</p>
                            <p className="text-sm text-gray-600">
                                {product.category.description || "No description"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;