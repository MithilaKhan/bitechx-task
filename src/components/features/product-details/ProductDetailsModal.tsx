"use client";

import React from "react";
import { Modal } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Product } from "@/types/type";

type ProductDetailsModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

const ProductDetailsModal = ({ product, isOpen, onClose }: ProductDetailsModalProps) => {
  if (!product) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={900}
      className="product-details-modal"
    >
      <div className="w-full flex flex-col gap-6">
        {/* Swiper Slider */}
        <div className="w-full h-[300px] sm:h-[400px]">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            className="h-full"
          >
            {product.images && product.images.length > 0 ? (
              product.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <Image
                      src={img}
                      alt={product.name}
                      width={800}
                      height={400}
                      className="object-contain h-full w-auto rounded-lg"
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  No Image Available
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        {/* Product Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Details */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-semibold text-gray-800">
              💰 Price: <span className="text-primary">${product.price}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Slug: <span className="font-medium">{product.slug}</span>
            </p>
            {/* <p className="text-sm text-gray-500 mt-1">
              Created: {moment(product.createdAt).format("MMM DD, YYYY")}
            </p>
            <p className="text-sm text-gray-500">
              Updated: {moment(product.updatedAt).format("MMM DD, YYYY")}
            </p> */}
          </div>

          {/* Category Info */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold mb-3">📦 Category Info</h3>
            <div className="flex items-center gap-3 mb-2">
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
                <p className="font-semibold">{product.category.name}</p>
                <p className="text-sm text-gray-600">
                  {product.category.description || "No description"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
