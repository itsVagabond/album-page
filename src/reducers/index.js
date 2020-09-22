import {
    FETCH_ALBUMS,
    FETCH_ALBUMS_SUCCESS,
    FETCH_ALBUMS_FAILURE,

    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,

    GENERATE_LIST,
    NEXT_PAGE,
    PREV_PAGE,

    pageLimit
} from "../constants";

const defaultState = {
    albums: {
        pending: null,
        error: null,
        data: null
    },
    users: {
        pending: null,
        error: null,
        data: null
    },
    list: {
        next: null,
        prev: null,
        data: null
    },
    nextStartingIndex: null,
    grandList: null,
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case FETCH_ALBUMS: return {
            ...state,
            albums: {
                pending: true,
                error: null,
                data: null
            }
        };
        case FETCH_ALBUMS_SUCCESS: return {
            ...state,
            albums: {
                pending: false,
                error: false,
                data: action.payload
            }
        };
        case FETCH_ALBUMS_FAILURE: return {
            ...state,
            albums: {
                pending: false,
                error: action.payload,
                data: false
            }
        };
        case FETCH_USERS: return {
            ...state,
            users: {
                pending: true,
                error: null,
                data: null
            }
        };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: {
                    pending: false,
                    error: false,
                    data: action.payload
                }
            };
        case FETCH_USERS_FAILURE: return {
            ...state,
            users: {
                pending: false,
                error: action.payload,
                data: false
            }
        };
        case GENERATE_LIST: {
            const { albums, users } = state;
            const listData = albums.data.map(li => {
                const { name } = users.data.find(u => u.id === li.userId)
                
                return {
                    ...li,
                    name
                };
            });

            return {
                ...state,
                nextStartingIndex: pageLimit,
                grandList: listData,
                list : {
                    data: listData.slice(0, pageLimit),
                    next: true,
                    prev: false
                }
            }
        };
        case NEXT_PAGE: {
            let { grandList, nextStartingIndex } = state;
            const data = grandList.slice(nextStartingIndex, nextStartingIndex + pageLimit);
            nextStartingIndex += pageLimit;

            return {
                ...state,
                nextStartingIndex,
                list: {
                    data,
                    next: (grandList.length - nextStartingIndex) >= pageLimit,
                    prev: (nextStartingIndex - pageLimit) !== 0
                }
            };
        };
        case PREV_PAGE: {
            let { grandList, nextStartingIndex } = state;
            nextStartingIndex -= (2 * pageLimit);

            const data = grandList.slice(nextStartingIndex, nextStartingIndex + pageLimit);
            nextStartingIndex += pageLimit;
            
            return {
                ...state,
                nextStartingIndex,
                list: {
                    data,
                    next: (grandList.length - nextStartingIndex) >= pageLimit,
                    prev: (nextStartingIndex - pageLimit) !== 0
                }
            };
        };
        default: return state;
    }
};