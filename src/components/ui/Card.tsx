
import clsx from "clsx";

export function Card({
  children,
  className,
  hoverable = false,
}: {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-5",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]",
        hoverable && "transition-all duration-200 hover:border-cyan-400/30 hover:bg-white/[0.05]",
        className
      )}
    >
      {children}
    </div>
  );
}
