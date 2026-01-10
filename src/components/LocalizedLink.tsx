import { Link, LinkProps } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";

interface LocalizedLinkProps extends Omit<LinkProps, "to"> {
  to: string;
}

export const LocalizedLink = ({ to, children, ...props }: LocalizedLinkProps) => {
  const { getLocalizedPath } = useLanguage();
  
  // If it's an external link or anchor, don't localize
  if (to.startsWith("http") || to.startsWith("#")) {
    return <Link to={to} {...props}>{children}</Link>;
  }
  
  return (
    <Link to={getLocalizedPath(to)} {...props}>
      {children}
    </Link>
  );
};
