import { AlertCircle, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  type?: "info" | "warning" | "error" | "success";
  title?: string;
  children: React.ReactNode;
}

const calloutStyles = {
  info: {
    container: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950",
    icon: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    title: "text-blue-900 dark:text-blue-100",
  },
  warning: {
    container: "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950",
    icon: <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
    title: "text-yellow-900 dark:text-yellow-100",
  },
  error: {
    container: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950",
    icon: <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
    title: "text-red-900 dark:text-red-100",
  },
  success: {
    container: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950",
    icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />,
    title: "text-green-900 dark:text-green-100",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = calloutStyles[type];

  return (
    <div className={cn("my-6 rounded-lg border-2 p-4", styles.container)}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{styles.icon}</div>
        <div className="flex-1">
          {title && (
            <h4 className={cn("mb-2 font-semibold", styles.title)}>
              {title}
            </h4>
          )}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}