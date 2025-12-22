'use client'

import React from 'react'

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  label?: string
  showLabel?: boolean
  variant?: 'primary' | 'success' | 'warning' | 'error'
}

const variantColors = {
  primary: 'bg-primary-600',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      label,
      showLabel = true,
      variant = 'primary',
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min((value / max) * 100, 100)
    const displayLabel = label || `${Math.round(percentage)}%`

    return (
      <div
        ref={ref}
        className={`w-full ${className || ''}`}
        {...props}
      >
        {showLabel && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
              Progress
            </span>
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
              {displayLabel}
            </span>
          </div>
        )}

        <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden h-2 shadow-inner">
          <div
            className={`
              ${variantColors[variant]}
              h-full rounded-full
              transition-all duration-500 ease-out
            `}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>

        {showLabel && (
          <div className="mt-2 text-xs text-secondary-500 dark:text-secondary-400">
            {value} / {max}
          </div>
        )}
      </div>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'
