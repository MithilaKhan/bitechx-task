import SubmitButton from '@/components/shared/SubmitButton';
import { Input, Select } from 'antd';
import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

const ProductsFilter = ({CategoryOption}:{CategoryOption: {value: string, label: string}[]}) => { 
    return (
        <div className=' flex items-center justify-between'>
            <p className=' lg:text-xl text-lg font-medium text-[#0D1821] '> All Products </p>
            <Input placeholder="Search" style={{ width: 350, height: 45 }} className=' border border-[#5e5c5c] rounded-lg' allowClear prefix={<IoSearchOutline className=' text-primary' size={20} />} />
            <div className='flex items-center gap-2'>
                <Select
                    placeholder="Select Category"
                    className="w-full rounded-lg p-2"
                    style={{ height: 45 }}
                    options={CategoryOption}
                   
                />
                <SubmitButton className=' px-4' > + Add Product</SubmitButton>
            </div>
        </div>
    );
};

export default ProductsFilter;