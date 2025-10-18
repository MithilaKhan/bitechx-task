import { Form, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCreateProductMutation, useUpdateProductMutation } from '@/redux/features/product/productsApi';
import { toast } from 'react-toastify';
import { ProductDetailsModalProps } from '@/types/type';
import ProductFormFields from '../ui/ProductFormFields';

const ProductForm = ({ product, isOpen, onClose, refetch, setSelectedProduct }: ProductDetailsModalProps) => {
    const [form] = Form.useForm();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [createProduct, { isLoading }] = useCreateProductMutation();
    const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();

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
            title={<p className=' text-lg lg:text-xl text-primary font-semibold'> {product?.id ? "Edit Product" : "Create Product"} </p> }
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
                <ProductFormFields
                    form={form}
                    product={product}
                    imageUrls={imageUrls}
                    setImageUrls={setImageUrls}
                />

                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-primary text-white font-medium rounded-lg px-6 py-2 hover:opacity-90 transition"
                        disabled={isLoading || updateLoading}
                    >
                        {product?.id
                            ? updateLoading ? "Updating..." : "Update Product"
                            : isLoading ? "Creating..." : "Create Product"
                        }
                    </button>
                </div>
            </Form>
        </Modal>
    );
};

export default ProductForm;
