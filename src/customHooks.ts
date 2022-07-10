import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
}

export const useIntersection = (
  element: React.RefObject<HTMLElement>,
  rootMargin: string
) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );

    element.current && observer.observe(element.current);
    const storedRef = element.current;

    return () => {
      if (storedRef) {
        observer.unobserve(storedRef);
      }
    };
  }, [element, rootMargin]);

  return isVisible;
};
