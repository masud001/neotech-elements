const initialState = { isSidebarOpen: true };

const sidebarReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_SIDEBAR":
            return { ...state, isSidebarOpen: !state.isSidebarOpen };
        case "SET_SIDEBAR_STATE":
            return { ...state, isSidebarOpen: action.payload };
        default:
            throw new Error(`No matching "${action.type}" action type`);
    }
}

export { initialState };
export default sidebarReducer;