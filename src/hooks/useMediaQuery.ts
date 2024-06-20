import { useEffect, useState } from 'react';

type MediaQuery = {
    query: string;
};

function initialStateMatches({ query }: MediaQuery) {
    if (typeof window !== 'undefined') {
        return window.matchMedia(query).matches;
    }
    return false;
}

export const useMediaQuery = ({ query }: MediaQuery): boolean => {
    const [matches, setMatches] = useState(() =>
        initialStateMatches({ query })
    );

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mediaQueryList = window.matchMedia(query);

            const updateMatches = (e: MediaQueryListEvent) =>
                setMatches(e.matches);

            mediaQueryList.addEventListener('change', updateMatches);

            return () => {
                mediaQueryList.removeEventListener('change', updateMatches);
            };
        }
    }, [query]);

    return matches;
};
