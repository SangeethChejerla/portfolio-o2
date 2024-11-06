'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

type CalloutVariant = 'info' | 'warning' | 'success' | 'error' | 'default';
type CalloutSize = 'sm' | 'md' | 'lg';

interface CalloutProps {
  children: React.ReactNode;
  emoji?: string;
  variant?: CalloutVariant;
  size?: CalloutSize;
  title?: string;
  dismissible?: boolean;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<
  CalloutVariant,
  {
    bg: string;
    border: string;
    icon: string;
    hover: string;
  }
> = {
  default: {
    bg: 'bg-gray-50 dark:bg-gray-800/50',
    border: 'border-gray-200 dark:border-gray-700',
    icon: '💡',
    hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'ℹ️',
    hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: '⚠️',
    hover: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/30',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    icon: '✅',
    hover: 'hover:bg-green-100 dark:hover:bg-green-900/30',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    icon: '❌',
    hover: 'hover:bg-red-100 dark:hover:bg-red-900/30',
  },
};

const sizeStyles: Record<
  CalloutSize,
  {
    padding: string;
    text: string;
    emoji: string;
  }
> = {
  sm: {
    padding: 'p-3',
    text: 'text-sm',
    emoji: 'text-base',
  },
  md: {
    padding: 'p-4',
    text: 'text-base',
    emoji: 'text-lg',
  },
  lg: {
    padding: 'p-5',
    text: 'text-lg',
    emoji: 'text-xl',
  },
};

export default function Callout({
  children,
  emoji,
  variant = 'default',
  size = 'md',
  title,
  dismissible = false,
  className = '',
  onClick,
}: CalloutProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisible) return null;

  const styles = variantStyles[variant];
  const sizes = sizeStyles[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        rounded-lg border shadow-sm
        transition-all duration-200
        ${styles.bg}
        ${styles.border}
        ${styles.hover}
        ${sizes.padding}
        ${className}
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <motion.span
          animate={{ scale: isHovered ? 1.1 : 1 }}
          className={`${sizes.emoji} flex-shrink-0 select-none`}
        >
          {emoji || styles.icon}
        </motion.span>

        <div className="flex-1">
          {title && (
            <h3 className={`font-semibold mb-1 ${sizes.text}`}>{title}</h3>
          )}
          <div className={`${sizes.text} text-gray-700 dark:text-gray-200`}>
            {children}
          </div>
        </div>

        {dismissible && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Preset Callouts
export function InfoCallout(props: Omit<CalloutProps, 'variant'>) {
  return <Callout {...props} variant="info" />;
}

export function WarningCallout(props: Omit<CalloutProps, 'variant'>) {
  return <Callout {...props} variant="warning" />;
}

export function SuccessCallout(props: Omit<CalloutProps, 'variant'>) {
  return <Callout {...props} variant="success" />;
}

export function ErrorCallout(props: Omit<CalloutProps, 'variant'>) {
  return <Callout {...props} variant="error" />;
}
