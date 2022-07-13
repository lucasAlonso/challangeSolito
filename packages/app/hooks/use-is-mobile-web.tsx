//showtimexyz 
import { useState, useEffect } from "react";
/**
 * Cant make expo to show correct user Agent, maybe bug?
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
