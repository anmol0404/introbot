const memory = {
    value: false,
    set(newValue) {
        this.value = newValue;
    },
    get() {
        return this.value;
    },
};
export default memory;
