import { format } from 'date-fns';

export function day(date) {
    return format(date, 'MMMM Do, YYYY');
}

export function month(date) {
    return format(date, 'MMMM, YYYY');
}

export function year(date) {
    return format(date, 'YYYY');
}

export function eventTime(date) {
    return format(date, 'hh:mm a');
}

export default {
    day,
    month,
    year,
    eventTime
};
