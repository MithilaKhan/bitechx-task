"use client";

import React from "react";
import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useGetCategoriesQuery } from "@/redux/features/product/categoriesApi";
import { formFieldsProps } from "@/types/type";
import TextInput from "../shared/TextInput";

const labelStyle = (label: string) => (
    <p className="text-[#5c5a5a] text-sm font-normal">{label}</p>
);

const ProductFormFields = ({  product, imageUrls, setImageUrls }: formFieldsProps) => {
    const { data: categories } = useGetCategoriesQuery(undefined);
    const categoryOptions =
        categories?.map((cat: { id: string; name: string }) => ({
            label: cat.name,
            value: cat.id,
        })) || [];

    return (
        <>
            {/* Product Name */}
            <TextInput name="name" label="Product Name" />

            {/* Category */}
            <Form.Item
                name="categoryId"
                label={labelStyle("Category Name")}
                rules={[{ required: true, message: "Please select a category" }]}
            >
                <Select
                    placeholder="Select category"
                    className="w-full rounded-lg"
                    style={{ height: 45, minWidth: 150 }}
                    options={categoryOptions}
                    allowClear
                />
            </Form.Item>

            {/* Price */}
            <Form.Item
                name="price"
                label={labelStyle("Price")}
                rules={[
                    { required: true, message: "Price is required" },
                    {
                        validator: (_, value) =>
                            value > 0
                                ? Promise.resolve()
                                : Promise.reject("Price must be greater than 0"),
                    },
                ]}
            >
                <Input type="number" placeholder="Enter price" style={{ height: 45 }} />
            </Form.Item>

            {/* Description */}
            <Form.Item
                name="description"
                label={labelStyle("Description")}
                rules={[{ required: true, message: "Description is required" }]}
            >
                <TextArea rows={4} placeholder="Enter product description" />
            </Form.Item>

            {/* Existing Product Images */}
            {product?.id && imageUrls.length > 0 && (
                <Form.Item label={labelStyle("Existing Product Images")}>
                    <div className="flex items-center flex-wrap">
                        {imageUrls.map((url, index) => (
                            <div key={index} style={{ marginBottom: 8 }}>
                                <img
                                    src={url}
                                    alt={`Product Image ${index + 1}`}
                                    style={{ maxWidth: "100px", marginRight: "8px" }}
                                />
                            </div>
                        ))}
                    </div>
                </Form.Item>
            )}

            {/* Product Images */}
            <Form.Item label={labelStyle("Product Images")}>
                {imageUrls.map((url, index) => (
                    <Input
                        key={index}
                        value={url}
                        onChange={(e) => {
                            const newUrls = [...imageUrls];
                            newUrls[index] = e.target.value;
                            setImageUrls(newUrls);
                        }}
                        placeholder={`Image URL ${index + 1}`}
                        style={{ marginBottom: 8 }}
                    />
                ))}
                <button
                    type="button"
                    className="text-primary mt-2"
                    onClick={() => setImageUrls([...imageUrls, ""])}
                >
                    + Add Image URL
                </button>
            </Form.Item>
        </>
    );
};

export default ProductFormFields;
