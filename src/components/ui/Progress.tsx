
import clsx from "clsx";

export function Progress({
  value,
  className,
  size = "md",
}: {
  value: number;
  className?: string;
  size?: "sm" | "md";
}) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={clsx(
        "w-full overflow-hidden rounded-full bg-slate-800/80",
        size === "sm" ? "h-1.5" : "h-2",
        className
      )}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-[width] duration-500 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
