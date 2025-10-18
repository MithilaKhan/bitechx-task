import React from 'react';
import { Form, Input } from 'antd';
import { ImageUploadSectionProps } from '@/types/type';

const ImageUploadSection = ({ imageUrls, setImageUrls , product }: ImageUploadSectionProps) => (
    <>
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
        </Form.Item>
        <button
            type="button"
            className="text-primary mt-2"
            onClick={() => setImageUrls([...imageUrls, ""])}
        >
            + Add Image URL
        </button>
    </>
);

export default ImageUploadSection;