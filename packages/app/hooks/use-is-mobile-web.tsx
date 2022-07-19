//showtimexyz
import { useState, useEffect } from 'react'
/**
 * TOdo
 * try to reach user agent in mobile apps
 *
 */
function useIsMobileWeb() {
  const [isMobileWeb, setIsMobileWeb] = useState<boolean | null>(null)

  useEffect(() => {
    const userAgent = window?.navigator?.userAgent
    if (userAgent === undefined) {
      setIsMobileWeb(true)
    } else {
      setIsMobileWeb(false)
    }
  }, [])

  return {
    isMobileWeb,
  }
}

export { useIsMobileWeb }
