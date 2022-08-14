
const getFormat = (obj, format) => {
    if (format === 'json') {
        return JSON.parse(obj);
    }
}

export default getFormat;