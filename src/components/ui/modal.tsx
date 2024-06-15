import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  // TODO: Consideration about closing the modal after click out of the modal area

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center ">
      <div className="bg-black p-10 rounded-lg shadow-lg">{children}</div>
    </div>
  );
};
