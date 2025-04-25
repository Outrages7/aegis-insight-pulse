
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
}

const LoadingSpinner = ({ className, size = 24 }: LoadingSpinnerProps) => {
  return (
    <Loader
      className={cn("animate-spin text-primary", className)}
      size={size}
    />
  );
};

export default LoadingSpinner;
