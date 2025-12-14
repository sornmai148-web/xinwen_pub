import { cn } from "@/lib/utils";

interface Props extends React.PropsWithChildren {
  className?: string;
}
export const Container: React.FC<Props> = ({ children, className }) => (
  <div className={cn("px-3", className)}>{children}</div>
);
