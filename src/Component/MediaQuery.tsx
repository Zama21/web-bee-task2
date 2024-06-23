import React, { ReactNode } from 'react';
import { processMediaQueryString } from '../utils/mediaQueryParser';
import { useMediaQuery } from 'bbchut-react-media-query';

type MediaQueryPropType = `${number}px` | number;

type MediaQueryProps = {
    orientation: 'landscape' | 'portrait';
    minResolution: `${number}dppx` | number;
    maxResolution: `${number}dppx` | number;
    minWidth: MediaQueryPropType;
    maxWidth: MediaQueryPropType;
    minHeight: MediaQueryPropType;
    maxHeight: MediaQueryPropType;
};
type ChldType = { children?: ((matches: boolean) => ReactNode) | ReactNode };

type MediaQueryProps_<
    U = { [K in keyof MediaQueryProps]: Pick<MediaQueryProps, K> }
> = Partial<MediaQueryProps> & U[keyof U] & ChldType;

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

function convertToMediaQuery(obj: MediaQueryProps_): string {
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

const MediaQuery: React.FC<MediaQueryProps_> = props => {
    const { children, ...mediaQueryProps } = props;

    const allMatches = useMediaQuery({
        query: processMediaQueryString(convertToMediaQuery(mediaQueryProps)),
    });

    if (typeof children === 'function')
        return allMatches ? <>{children(true)}</> : <>{children(false)}</>;
    else {
        return allMatches ? <>{children}</> : null;
    }
};

export default MediaQuery;
