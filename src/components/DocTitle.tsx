import { useEffect } from 'react'

export function DocTitle({ children }: { children: string }) {
  useEffect(() => {
    document.title = children
  }, [children])
}
