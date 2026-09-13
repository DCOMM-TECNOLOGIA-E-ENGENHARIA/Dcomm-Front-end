import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  /** color variant for placement over dark or light backgrounds */
  variant?: 'dark' | 'light'
}

/**
 * Typographic DCOMM logo.
 * "DCOMM" is large and imposing; "TECNOLOGIA E ENGENHARIA" is a small,
 * minimalist, wide-tracked subtitle.
 */
export function Logo({ className, variant = 'dark' }: LogoProps) {
  const primary = variant === 'light' ? 'text-white' : 'text-primary'
  const sub =
    variant === 'light' ? 'text-white/60' : 'text-muted-foreground'

  return (
    <span className={cn('inline-flex flex-col leading-none', className)}>
      <span
        className={cn(
          'font-display text-2xl font-extrabold tracking-tight sm:text-[1.7rem]',
          primary,
        )}
      >
        D<span className="text-accent">C</span>OMM
      </span>
      <span
        className={cn(
          'mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.34em] sm:text-[0.55rem]',
          sub,
        )}
      >
        Tecnologia e Engenharia
      </span>
    </span>
  )
}
