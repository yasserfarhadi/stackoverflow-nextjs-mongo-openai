import React, { MutableRefObject } from 'react';

const useOnClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: (
    event: React.MouseEvent<HTMLElement> | MouseEvent | TouchEvent,
  ) => void,
) => {
  React.useEffect(() => {
    if (!ref.current) return;
    const listener = (
      event: React.MouseEvent<HTMLElement> | MouseEvent | TouchEvent,
    ) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
