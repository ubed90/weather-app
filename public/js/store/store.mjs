export class Store {
    static action = '';
    subscribers;
    reducers;
    state;
    
    constructor(reducers = {}, initialState = {}) {
        this.subscribers = [];
        this.reducers = reducers;
        this.state = this.reduce(initialState , {});
    }

    get value() {
        return this.state;
    }

    select(reducer) {
        return this.value[reducer];
    }

    subscribe(fn) {
        this.subscribers = [...this.subscribers, fn];
        this.notify();

        return {
            unsubscribe: () => {
                return this.subscribers = this.subscribers.filter(sub => sub !== fn);
            }
        }
    }

    notify() {
        this.subscribers.forEach(fn => fn({ state: this.value, actionType: Store.action }));
    }

    dispatch(action) {
        Store.action = action.type;
        this.state = this.reduce(this.state, action);
        this.notify();
    }

    reduce(state, action) {
        const newState = {};

        for(const prop in this.reducers) {
            newState[prop] = this.reducers[prop](state[prop], action);
        }

        return newState;
    }
}