const keysPrefix = 'calendar';

export function getPrefixedKey(key) {
    return `${keysPrefix}/${key}`;
}

export function get(key) {
    const content = window.localStorage.getItem(getPrefixedKey(key));

    if (!content) return undefined;

    return JSON.parse(content);
}

export function set(key, value) {
    window.localStorage.setItem(getPrefixedKey(key), JSON.stringify(value));
}

export default {
    get,
    set
};
