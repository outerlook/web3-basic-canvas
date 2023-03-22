export const createError = <const T extends string>(errorType: T) => <Data extends unknown>(data: Data) => ({
    type: errorType,
    data,
});