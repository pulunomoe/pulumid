import { ReactNode } from "react";

interface Props {
  id: string;
  label: string;
  children: ReactNode;
}

const Field = ({ id, label, children }: Props) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
};

export default Field;
