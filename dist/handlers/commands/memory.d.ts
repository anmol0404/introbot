interface Memory {
    value: boolean;
    set(newValue: boolean): void;
    get(): boolean;
}
declare const memory: Memory;
export default memory;
