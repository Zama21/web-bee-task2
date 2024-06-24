import { useState, useEffect, useRef } from 'react';

interface DocumentVisibility {
    count: number;
    visible: boolean;
    onVisibilityChange: (callback: (isVisible: boolean) => void) => () => void;
}

function initialStateVisible() {
    if (typeof document !== 'undefined') {
        return document.visibilityState === 'visible';
    }
    return true;
}

export const useDocumentVisibility = (): DocumentVisibility => {
    const [visible, setVisible] = useState(initialStateVisible);
    const [count, setCount] = useState(0);
    const callbacksRef = useRef<((isVisible: boolean) => void)[]>([]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            const isVisible = document.visibilityState === 'visible';

            setVisible(isVisible);

            if (!isVisible) setCount(prevCount => prevCount + 1);

            callbacksRef.current.forEach(callback => callback(isVisible));
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            );
        };
    }, []);

    const onVisibilityChange = (callback: (isVisible: boolean) => void) => {
        callbacksRef.current.push(callback);

        return () => {
            callbacksRef.current = callbacksRef.current.filter(
                c => c !== callback
            );
        };
    };

    return { count, visible, onVisibilityChange };
};
