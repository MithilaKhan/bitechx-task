"use client";
import { ProductCardProps } from "@/types/type";
import React from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from "react-icons/hi";


const ProductCard = ({ product, onEdit, onDelete, onDetails }: ProductCardProps) => {
    return (
        <div className="relative border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition duration-200 flex flex-col overflow-hidden">
            {/* Top-right icon buttons */}
            <div className="absolute top-3 right-2 flex gap-2 z-10">
                <div
                    className=" w-8 h-8 flex-center rounded-full  backdrop-blur-sm bg-[#0D1821]/50 cursor-pointer transition"
                    onClick={() => onEdit(product.id)}
                    title="Edit"
                >
                    <HiOutlinePencil className="w-4 h-4 text-white" />
                </div>
                <div
                    className=" w-8 h-8 flex-center rounded-full  backdrop-blur-sm bg-[#0D1821]/50 cursor-pointer transition"
                    onClick={() => onDelete(product.id)}
                    title="Delete"
                >
                    <HiOutlineTrash className="w-4 h-4 text-white" />
                </div>
                <div
                    className=" w-8 h-8 flex-center rounded-full  backdrop-blur-sm bg-[#0D1821]/50 cursor-pointer transition"
                    onClick={() => onDetails(product)}
                    title="Details"
                >
                    <HiOutlineEye className="w-4 h-4 text-white" />
                </div>
            </div>

            {/* Product Image */}
            <div className="w-full h-[250px] relative mb-4">
                {product.images?.[0] ? (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="object-cover rounded-t-lg h-[250px] w-full"
                    />
                ) : (
                    <div className="w-full h-[250px] bg-gray-200 rounded-t-lg flex items-center justify-center">
                        No Image
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="flex-1 mb-4 p-3">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="text-sm font-medium">Category: {product.category.name}</p>
                <p className="text-sm font-semibold mt-1">Price: ${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
