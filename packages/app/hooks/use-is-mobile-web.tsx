//showtimexyz 
import { useState, useEffect } from "react";
/**
 * TOdo 
 * try to reach user agent in mobile apps
 * 
 */
function useIsMobileWeb() {
  const [userAgent, setUserAgent] = useState("");
  const [isMobileWeb, setIsMobileWeb] = useState(true);

  useEffect(() => {
    const userAgent = window?.navigator?.userAgent;
    setUserAgent(userAgent);
    if (userAgent === undefined) {
      setIsMobileWeb(true)

    } else {

      setIsMobileWeb(
        / android /.test(userAgent) || /iPad|iPhone|iPod|ios/.test(userAgent)
      );
    }

  }, []);

  return {
    userAgent,
    isMobileWeb,
  };
}

export { useIsMobileWeb };
