import { AnchorHTMLAttributes, MouseEvent } from "react";

type PlaceholderLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const PlaceholderLink = ({ onClick, ...props }: PlaceholderLinkProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick?.(event);
  };

  return <a href="#" {...props} onClick={handleClick} />;
};
