import React, { ReactNode } from 'react';
import { useMediaQuery } from 'bbchut-react-media-query';

type MediaQueryPropType = `${number}px` | number;

type MediaQueryProps = {
    orientation?: 'landscape' | 'portrait';
    minResolution?: `${number}dppx` | number;
    maxResolution?: `${number}dppx` | number;
    minWidth?: MediaQueryPropType;
    maxWidth?: MediaQueryPropType;
    minHeight?: MediaQueryPropType;
    maxHeight?: MediaQueryPropType;
};

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
> &
    {
        [K in Keys]-?: Required<Pick<T, K>> &
            Partial<Pick<T, Exclude<Keys, K>>>;
    }[Keys];

type MediaQueryComponentProps = RequireAtLeastOne<MediaQueryProps> & {
    children: ((matches: boolean) => ReactNode) | ReactNode;
};

function getStringMedia(
    type: string,
    value: string | number | undefined,
    unit: string
): string {
    if (typeof value === 'number') {
        return `(${type}: ${value}${unit})`;
    }
    return `(${type}: ${value})`;
}

function convertToMediaQuery(obj: MediaQueryProps): string {
    function convertMediaKey(mediaKey: string): string {
        return mediaKey.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
    const mediaQueryArray = Object.entries(obj).map(([key, value]) => {
        const mediaKey = key as unknown as keyof MediaQueryProps;
        switch (mediaKey) {
            case 'orientation':
                return `(${mediaKey}: ${value})`;
            case 'minResolution':
            case 'maxResolution':
                return getStringMedia(convertMediaKey(key), value, 'dppx');
            case 'minWidth':
            case 'maxWidth':
            case 'minHeight':
            case 'maxHeight':
                return getStringMedia(convertMediaKey(key), value, 'px');
            default:
                const exhaustiveCheck: never = mediaKey;
                throw new Error(`Assertion failed, value = ${exhaustiveCheck}`);
        }
    });

    return mediaQueryArray.join(' and ');
}

const MediaQuery: React.FC<MediaQueryComponentProps> = ({
    children,
    ...mediaQueryProps
}) => {
    const allMatches = useMediaQuery({
        query: convertToMediaQuery(mediaQueryProps),
    });

    if (typeof children === 'function') return <>{children(allMatches)}</>;
    else {
        return allMatches ? <>{children}</> : null;
    }
};

export default MediaQuery;
