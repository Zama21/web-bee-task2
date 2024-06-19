import { useMediaQuery } from 'bbchut-react-media-query';
import React, { ReactNode } from 'react';

interface MediaQueryProps {
    orientation?: string;
    minResolution?: string | number;
    maxResolution?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
    minHeight?: string | number;
    maxHeight?: string | number;
    children?: ((matches: boolean) => ReactNode) | ReactNode;
}

interface MediaQueryKeys {
    orientation: string;
    minResolution: string;
    maxResolution: string;
    minWidth: string;
    maxWidth: string;
    minHeight: string;
    maxHeight: string;
}

const mediaQueryKeys: MediaQueryKeys = {
    orientation: 'orientation',
    minResolution: 'min-resolution',
    maxResolution: 'max-resolution',
    minWidth: 'min-width',
    maxWidth: 'max-width',
    minHeight: 'min-height',
    maxHeight: 'max-height',
};

function convertToMediaQuery(obj: MediaQueryProps): string {
    const mediaQueryArray = Object.keys(obj)
        .filter(key => key in mediaQueryKeys)
        .map(
            key =>
                `(${mediaQueryKeys[key as keyof MediaQueryKeys]}: ${
                    obj[key as keyof MediaQueryProps]
                })`
        );
    return mediaQueryArray.join(' and ');
}

const MediaQuery: React.FC<MediaQueryProps> = props => {
    const { children, ...mediaQueryProps } = props;

    const allMatches = useMediaQuery({
        query: convertToMediaQuery(mediaQueryProps),
    });

    if (typeof children === 'function')
        return allMatches ? <>{children(true)}</> : <>{children(false)}</>;
    else {
        return allMatches ? <>{children}</> : null;
    }
};

export default MediaQuery;