import { useEffect, useState } from 'react';
import { processMediaQueryString } from '../utils/mediaQueryParser';

type MediaQuery = {
    query: string;
};

export const useMediaQuery = ({ query }: MediaQuery): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(
            processMediaQueryString(query)
        );

        const updateMatches = () => {
            setMatches(mediaQueryList.matches);
        };

        // updateMatches();

        mediaQueryList.addEventListener('change', updateMatches);

        return () => {
            mediaQueryList.removeEventListener('change', updateMatches);
        };
    }, [query]);

    return matches;
};
