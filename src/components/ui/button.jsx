export function Button({ children, className = "", variant = "default", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition px-4 py-2";
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border border-white/40 text-white hover:border-white",
  };

  return (
    <button
      className={`${base} ${variants[variant] || ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
