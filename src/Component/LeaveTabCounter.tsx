import { useDocumentVisibility } from 'bbchut-react-use-document';
import { useEffect } from 'react';

export const LeaveTabCounter = () => {
    const { count, visible, onVisibilityChange } = useDocumentVisibility();

    useEffect(() => {
        onVisibilityChange(isVisible => {
            console.log('first handler', isVisible);
        });

        const unsubscribeSecondHandler = onVisibilityChange(isVisible => {
            console.log('second handler', isVisible);
        });

        setTimeout(() => unsubscribeSecondHandler(), 5000); // отписываемся от 'second handler' через 5 секунд
    }, []);

    return (
        <div>
            <span>
                Вы покинули страницу: {count} раз Вкладка активна?{' '}
                {visible ? 'да' : 'нет'}
            </span>
        </div>
    );
};
