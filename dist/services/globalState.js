class GlobalState {
    constructor() {
        this.startTime = Date.now();
    }
}
const globalState = new GlobalState();
export default globalState;
