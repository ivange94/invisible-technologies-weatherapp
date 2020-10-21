import { parse } from './utils';

const mockResult = [{
        name: "New York",
        postalCode: "2005"
    },
    {
        name: "Tokyo",
        postalCode: "3006"
    },
    {
        name: "Florida",
        postalCode: "2008"
    }
]

test('Parse string to location objects', () => {
    const value = "New York, 2005, Tokyo, 3006, Florida, 2008";
    expect(parse(value)).toEqual(mockResult);
})