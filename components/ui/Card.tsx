'use client';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => (
  <div className={cn('bg-white rounded-lg shadow-md overflow-hidden', className)}>{children}</div>
);

const CardHeader = ({ children, className }: CardProps) => (
  <div className={cn('px-4 py-3 border-b bg-gray-50', className)}>{children}</div>
);

const CardBody = ({ children, className }: CardProps) => (
  <div className={cn('px-4 py-3', className)}>{children}</div>
);

const CardFooter = ({ children, className }: CardProps) => (
  <div className={cn('px-4 py-3 border-t bg-gray-50', className)}>{children}</div>
);

export { Card, CardHeader, CardBody, CardFooter };