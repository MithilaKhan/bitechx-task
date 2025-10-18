"use client";
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination , Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Product } from '@/types/type';

const ProductImage = ({ product }: { product: Product }) => {
    return (
        <div>
            <div className="w-full h-[270px] sm:h-[400px]">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    pagination={{ clickable: true }}
                    loop
                    autoplay={{
                        delay: 1500, 
                        disableOnInteraction: false, 
                    }}
                    className="h-full"
                >
                    {product.images && product.images.length > 0 ? (
                        product.images.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                    <img
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
        </div>
    );
};

export default ProductImage;