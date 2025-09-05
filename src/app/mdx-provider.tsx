"use client"

import { MDXProvider } from '@mdx-js/react'
import { MDXComponents } from '@/components/mdx'

export function MDXProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MDXProvider components={MDXComponents}>
      {children}
    </MDXProvider>
  )
}