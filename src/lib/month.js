import { getDaysInMonth, getDay, setDate, format } from 'date-fns';
import { times, identity } from 'ramda';

function createDay(monthAsDate, dayOfMonth) {
    const dayAsDate = setDate(monthAsDate, dayOfMonth);

    return {
        dayOfMonth,
        dayOfWeek: getDay(dayAsDate),
        dayDate: dayAsDate
    };
}

export function getDaysFor(date) {
    const numberOfDays = getDaysInMonth(date);
    const createDayForDate = createDay.bind(null, date);

    /* times returns a sequence from 0 to n, while
       createDay expects dayOfMonth to be at least 1.
       We will add 1 to the sequence first, before mapping
       it to createDay.
    */
    return times(identity, numberOfDays)
        .map(number => number + 1)
        .map(createDayForDate);
}

export function getName(monthNumber) {
    return format(new Date(2018, monthNumber), 'MMMM');
}

export default {
    getDaysFor,
    getName
};
