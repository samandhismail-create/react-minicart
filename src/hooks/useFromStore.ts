import { useState, useEffect } from "react";

export default function useFromStore<T, F>(
  store: { subscribe: (callback: () => void) => () => void; getState: () => T },
  selector: (state: T) => F
): F {
  const [state, setState] = useState<F>(() => selector(store.getState()));

  useEffect(() => {
    const callback = () => setState(selector(store.getState()));
    const unsubscribe = store.subscribe(callback);
    return unsubscribe; 
  }, [store, selector]);

  return state;
}
