
import React from "react";
import { Modal } from "antd";

import { Product } from "@/types/type";
import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";

type ProductDetailsModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  setSelectedProduct: (product: Product | null) => void
};

const ProductDetailsModal = ({ product, isOpen, onClose, setSelectedProduct }: ProductDetailsModalProps) => {
  if (!product) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={() => { setSelectedProduct(null); onClose(); }}
      footer={null}
      centered
      width={900}
      className="product-details-modal"
    >
      <div className="w-full flex flex-col gap-6">
        {/* Swiper Slider */}
        <ProductImage product={product} />

        {/* Product Info Section */}
        <ProductInfo product={product} />
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
