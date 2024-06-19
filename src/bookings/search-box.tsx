import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

interface SearchBoxProps {
  value: string;
  onChange: (query: string) => void;
  placeholder: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      className="input input-primary"
    />
  );
};
