import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, ...props }: Props) => {
  const className = `border border-black bg-black px-2 py-1 text-white hover:bg-white hover:text-black ${props.className}`;
  delete props.className;

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
