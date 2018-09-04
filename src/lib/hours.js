import { times } from 'ramda';

export function get() {
    const hoursIn12Format = times(number => number + 1, 11);
    const createHourLabel = (hour, suffix) => `${hour}:00 ${suffix}`;

    return [
        [ 0, '12 midnight' ],
        ...hoursIn12Format.map(hour => [hour, createHourLabel(hour, 'am')]),
        [ 12, '12 noon' ],
        ...hoursIn12Format.map(hour => [hour + 12, createHourLabel(hour, 'pm')])
    ];
}

export default {
    get
};
