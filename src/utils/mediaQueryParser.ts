interface MediaQueryObj {
    orientation: { isModify: boolean; value: string };
    'min-resolution': { isModify: boolean; value: string };
    'max-resolution': { isModify: boolean; value: string };
    'min-width': { isModify: boolean; value: string };
    'max-width': { isModify: boolean; value: string };
    'min-height': { isModify: boolean; value: string };
    'max-height': { isModify: boolean; value: string };
}

const mediaQueriesObj: MediaQueryObj = {
    orientation: { isModify: false, value: '' },
    'min-resolution': { isModify: true, value: 'dppx' },
    'max-resolution': { isModify: true, value: 'dppx' },
    'min-width': { isModify: true, value: 'px' },
    'max-width': { isModify: true, value: 'px' },
    'min-height': { isModify: true, value: 'px' },
    'max-height': { isModify: true, value: 'px' },
};

interface ParsedMediaQuery {
    key: string;
    value: string;
}

export function parseMediaQuery(mediaQuery: string): ParsedMediaQuery {
    const matches = mediaQuery.match(/\((.*?):(.*?)\)/);
    if (matches && matches.length === 3) {
        return { key: matches[1].trim(), value: matches[2].trim() };
    } else {
        throw new Error('Invalid media query format');
    }
}

interface NumberAndUnit {
    number: number;
    unit: string;
}

export function extractNumberAndUnit(value: string): NumberAndUnit {
    const numberStr = value.replace(/D/g, '');
    const number = parseInt(numberStr);
    const unit = value.replace(/[0-9]/g, '');
    return { number, unit };
}

export function parseAndModifyMediaQuery(query: string): string {
    const parse = parseMediaQuery(query);

    if (!mediaQueriesObj[parse.key as keyof MediaQueryObj].isModify)
        return query;

    const parseValue = extractNumberAndUnit(parse.value);

    if (parseValue.unit) return query;

    return `(${parse.key}: ${parseValue.number}${
        mediaQueriesObj[parse.key as keyof MediaQueryObj].value
    })`;
}

export function processMediaQueryString(mediaQueryString: string): string {
    let parts = mediaQueryString.split(/ and | or /);

    const separators = mediaQueryString.match(/(and|or)/gi) || [];
    parts = parts.map((item: string) => parseAndModifyMediaQuery(item));

    let result = parts[0];
    for (let i = 1; i < parts.length; i++) {
        result += ' ' + separators[i - 1] + ' ' + parts[i];
    }
    return result;
}
