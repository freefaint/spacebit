import { useEffect, useState } from 'react';

export const useInitialSlaveState = <T>(initial: T) => {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    setValue((current) => (current === initial ? current : initial));
  }, [initial]);

  return { value, setValue };
};
