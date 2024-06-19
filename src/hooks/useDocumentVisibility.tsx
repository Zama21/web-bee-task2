import { useState, useEffect } from 'react';

interface DocumentVisibility {
    count: number;
    visible: boolean;
    onVisibilityChange: (callback: (isVisible: boolean) => void) => () => void;
}

export const useDocumentVisibility = (): DocumentVisibility => {
    const [visible, setVisible] = useState(
        document.visibilityState === 'visible'
    );
    const [count, setCount] = useState(0);

    const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
            setVisible(true);
        } else {
            setVisible(false);
            setCount(prevCount => prevCount + 1);
        }
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            );
        };
    }, []);

    const onVisibilityChange = (callback: (isVisible: boolean) => void) => {
        const handleCallback = () => {
            callback(document.visibilityState === 'visible');
        };
        document.addEventListener('visibilitychange', handleCallback);

        return () => {
            document.removeEventListener('visibilitychange', handleCallback);
        };
    };

    return { count, visible, onVisibilityChange };
};
