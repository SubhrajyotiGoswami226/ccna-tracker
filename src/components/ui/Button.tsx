
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400",
        variant === "primary" &&
          "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/10",
        variant === "ghost" &&
          "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/[0.06]",
        variant === "danger" &&
          "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
