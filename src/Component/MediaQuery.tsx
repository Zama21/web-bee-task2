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
    const mediaQueryArray = Object.keys(obj)
        .map(key => {
            switch (key) {
                case 'orientation':
                    return `(orientation: ${obj[key]})`;
                case 'minResolution':
                    return getStringMedia('min-resolution', obj[key], 'dppx');
                case 'maxResolution':
                    return getStringMedia('max-resolution', obj[key], 'dppx');
                case 'minWidth':
                    return getStringMedia('min-width', obj[key], 'px');
                case 'maxWidth':
                    return getStringMedia('max-width', obj[key], 'px');
                case 'minHeight':
                    return getStringMedia('min-height', obj[key], 'px');
                case 'maxHeight':
                    return getStringMedia('max-height', obj[key], 'px');
                default:
                    return false;
            }
        })
        .filter(value => value);

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
