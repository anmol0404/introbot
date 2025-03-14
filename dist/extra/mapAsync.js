export default async function mapAsync(array, callbackfn) {
    return Promise.all(array.map(callbackfn));
}
