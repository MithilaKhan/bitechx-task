import React, { useState } from "react";
import { Input, Select } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import SubmitButton from "@/components/shared/SubmitButton";

interface ProductsFilterProps {
  CategoryOption: { value: string; label: string }[];
  onCategoryChange: (value?: string) => void;
  onSearch: (value: string) => void;
}

const ProductsFilter = ({
  CategoryOption,
  onCategoryChange,
  onSearch,
}: ProductsFilterProps) => {
  const [searchValue, setSearchValue] = useState(""); 

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      onSearch("");
    }
  };

  return (
    <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between gap-y-3">
      <p className="lg:text-2xl text-xl font-medium text-[#0D1821]">
        All Products
      </p>

      {/* 🔍 Search Input */}
      <Input
        placeholder="Search products..."
        style={{ maxWidth: 450, height: 45 }}
        className="border border-[#5e5c5c] rounded-lg"
        allowClear
        value={searchValue}
        onChange={handleSearchChange}
        onPressEnter={() => onSearch(searchValue.trim())}
        prefix={<IoSearchOutline className="text-primary" size={20} />}
      />

      {/* 🧩 Category & Add Button */}
      <div className="flex items-center lg:justify-end justify-between gap-2">
        <Select
          placeholder="Select Category"
          className="w-full rounded-lg"
          style={{ height: 45 , minWidth: 150}}
          options={CategoryOption}
          allowClear
          onChange={(value) => onCategoryChange(value)}
        />
        <SubmitButton className="px-4 w-full">+ Add Product</SubmitButton>
      </div>
    </div>
  );
};

export default ProductsFilter;
