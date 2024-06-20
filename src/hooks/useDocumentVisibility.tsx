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
    return false;
}

export const useDocumentVisibility = (): DocumentVisibility => {
    const [visible, setVisible] = useState(initialStateVisible);
    const [count, setCount] = useState(0);
    const callbacksRef = useRef<((isVisible: boolean) => void)[]>([]);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            const handleVisibilityChange = () => {
                if (document.visibilityState === 'visible') {
                    setVisible(true);
                } else {
                    setVisible(false);
                    setCount(prevCount => prevCount + 1);
                }
            };

            document.addEventListener(
                'visibilitychange',
                handleVisibilityChange
            );

            return () => {
                document.removeEventListener(
                    'visibilitychange',
                    handleVisibilityChange
                );
                callbacksRef.current.forEach(callback =>
                    document.removeEventListener(
                        'visibilitychange',
                        callback as unknown as EventListener
                    )
                );
            };
        }
    }, []);

    const onVisibilityChange = (callback: (isVisible: boolean) => void) => {
        if (typeof document !== 'undefined') {
            const handleCallback = () =>
                callback(document.visibilityState === 'visible');

            callbacksRef.current.push(handleCallback);

            document.addEventListener('visibilitychange', handleCallback);

            return () => {
                document.removeEventListener(
                    'visibilitychange',
                    handleCallback
                );
            };
        } else return () => {};
    };

    return { count, visible, onVisibilityChange };
};
