import { useEffect, useRef } from 'react';

/* Gets the value of a piece of data in the previous render in the current render. */
export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}