import React, { ReactNode, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  // const modalRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
  //       onClose();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center ">
      <div className="bg-black p-10 rounded-lg shadow-lg">{children}</div>
    </div>
  );
};
