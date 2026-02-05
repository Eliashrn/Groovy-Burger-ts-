import { useState } from "react";

export const useSuccessMessage = (timeDelay: number = 2000) => {
  // state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // comportements
  const displaySuccessMessage = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, timeDelay);
  };

  return { isSubmitted, displaySuccessMessage };
};
