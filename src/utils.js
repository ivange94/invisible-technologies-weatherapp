export const parse = value => {
    const values = value.split(',')
    const locationObjects = []
    values.forEach((tmpVal, index) => {
        const location = {};
        if (index % 2 === 1) {
            location.name = values[index - 1].trim()
            location.postalCode = (tmpVal.trim())
            locationObjects.push(location)
        }
    })
    return locationObjects
}