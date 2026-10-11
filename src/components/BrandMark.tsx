type BrandMarkProps = {
  variant: 'logo' | 'loader'
}

export default function BrandMark({ variant }: BrandMarkProps) {
  return (
    <svg
      className={`block flex-none overflow-visible ${variant === 'logo' ? 'h-8 w-8' : 'h-13 w-13'}`}
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <rect className="fill-[#eee8dc]" width="64" height="64" rx="32" />
      <circle className="fill-none stroke-[#806949] stroke-[1.5px]" cx="32" cy="32" r="25" />
      {variant === 'logo' && (
        <text className="fill-[#55432e] text-[39px] font-[Georgia,'Times_New_Roman',serif] font-normal transition-opacity duration-100 motion-safe:group-hover:opacity-0 motion-safe:group-focus-visible:opacity-0" x="32" y="44" textAnchor="middle">S</text>
      )}
      <text
        className={`fill-transparent stroke-[#55432e] stroke-[.8px] [stroke-dasharray:180] [stroke-dashoffset:180] opacity-0 text-[39px] font-[Georgia,'Times_New_Roman',serif] font-normal ${variant === 'logo' ? 'motion-safe:group-hover:animate-brand-write motion-safe:group-focus-visible:animate-brand-write' : 'animate-loader-write motion-reduce:animate-none motion-reduce:fill-[#55432e] motion-reduce:stroke-none motion-reduce:[stroke-dashoffset:0] motion-reduce:opacity-100'}`}
        x="32"
        y="44"
        textAnchor="middle"
      >S</text>
    </svg>
  )
}
