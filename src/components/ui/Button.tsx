import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost-light";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

interface LinkProps extends BaseProps {
  href: string;
}

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  "ghost-light": "btn-ghost-light",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(variantClass[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: LinkProps & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={cn(variantClass[variant], className)} {...props}>
      {children}
    </Link>
  );
}
