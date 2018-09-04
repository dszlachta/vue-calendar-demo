import Month from '@/lib/month';

describe('Month library', () => {
    it('getDaysFor should return correct day object', () => {
        const dateToTest = new Date(2018, 7); // August
        const dayOfMonthToTest = 1; // 1st
        const expectedDayOfWeek = 3; // Wednesday
        const expectedNumberOfDays = 31;

        const daysOfMonth = Month.getDaysFor(dateToTest);

        expect(Array.isArray(daysOfMonth)).toBe(true);
        expect(daysOfMonth.length).toEqual(expectedNumberOfDays);

        const dayToTest = daysOfMonth[dayOfMonthToTest - 1];

        expect(typeof dayToTest).toEqual('object');
        expect(dayToTest.dayOfMonth).toEqual(dayOfMonthToTest);
        expect(dayToTest.dayOfWeek).toEqual(expectedDayOfWeek);
    });
});
