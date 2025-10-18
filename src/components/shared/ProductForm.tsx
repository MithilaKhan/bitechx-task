import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import TextInput from './TextInput';
import { useGetCategoriesQuery } from '@/redux/features/product/categoriesApi';
import { useCreateProductMutation, useUpdateProductMutation } from '@/redux/features/product/productsApi';
import { toast } from 'react-toastify';
import TextArea from 'antd/es/input/TextArea';
import { Product } from '@/types/type';

type ProductDetailsModalProps = {
    product?: Product | null;
    isOpen: boolean;
    onClose: () => void;
    refetch: () => void;
    setSelectedProduct: (product: Product | null) => void;
};

const ProductForm = ({ product, isOpen, onClose, refetch, setSelectedProduct }: ProductDetailsModalProps) => {
    const [form] = Form.useForm();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [createProduct, { isLoading }] = useCreateProductMutation();
    const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();
    const { data: categories } = useGetCategoriesQuery(undefined);

    const categoryOptions =
        categories?.map((cat: { id: string; name: string }) => ({
            label: cat.name,
            value: cat.id,
        })) || [];

    useEffect(() => {
        if (product?.id) {
            form.setFieldsValue(product);
            form.setFieldValue('categoryId', product?.category?.id);

            if (product?.images && Array.isArray(product.images)) {
                setImageUrls(product.images);
            }
        }
    }, [product]);

    const handleSubmit = async (values: any) => {
        const { price, ...rest } = values;
        const formattedValues = { ...rest, price: Number(price) };

        const value = {
            ...formattedValues,
            images: imageUrls,
        };

        if (product?.id) {
            await updateProduct({ id: product?.id, value }).then((res) => {
                if (res?.data) {
                    toast.success("Product updated successfully!");
                    onClose();
                    setSelectedProduct(null);
                    form.resetFields();
                    setImageUrls([]);
                    refetch();
                } else {
                    toast.error("Update failed!");
                }
            });
        } else {
            await createProduct(value).then((res) => {
                if (res?.data) {
                    toast.success("Product created successfully!");
                    refetch();
                    onClose();
                    setSelectedProduct(null);
                    form.resetFields();
                    setImageUrls([]);
                } else {
                    toast.error("Something went wrong!");
                }
            });
        }
    };

    return (
        <Modal
            title={product?.id ? "Edit Product" : "Create Product"}
            open={isOpen}
            onCancel={() => {
                setSelectedProduct(null);
                form.resetFields();
                setImageUrls([]);
                onClose();
            }}
            footer={null}
            centered
            width={900}
        >
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <TextInput name="name" label="Product Name" />

                <Form.Item name="categoryId" label="Category Name">
                    <Select
                        placeholder="Select Category"
                        className="w-full rounded-lg"
                        style={{ height: 45, minWidth: 150 }}
                        options={categoryOptions}
                        allowClear
                    />
                </Form.Item>

                <Form.Item name="price" label="Price">
                    <Input type="number" placeholder={`Enter your price`} style={{ height: 45 }} />
                </Form.Item>

                <Form.Item name="description" label="Description">
                    <TextArea rows={4} placeholder={`Enter your description`} />
                </Form.Item>

                {/* Show existing images as <img> tags if product.id exists */}
                {product?.id && (
                    <Form.Item label="Existing Product Images">
                        <div className=' flex items-center flex-wrap'>
                            {imageUrls.map((url, index) => (
                                <div key={index} style={{ marginBottom: 8 }}>
                                    <img
                                        src={url}
                                        alt={`Product Image ${index + 1}`}
                                        style={{ maxWidth: '100px', marginRight: '8px' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </Form.Item>
                )}

                {/* Input fields for adding new image URLs */}
                <Form.Item label="Product Images">
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

                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-primary text-white font-medium rounded-lg px-6 py-2 hover:opacity-90 transition"
                        disabled={isLoading || updateLoading}
                    >
                        {product?.id ? updateLoading ? "Updating..." : "Update Product" : isLoading ? "Creating..." : "Create Product"}
                    </button>
                </div>
            </Form>
        </Modal>
    );
};

export default ProductForm;
