// Action Creators

import {
    FETCH_ALBUMS,
    FETCH_ALBUMS_SUCCESS,
    FETCH_ALBUMS_FAILURE,

    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    
    GENERATE_LIST,
    NEXT_PAGE,
    PREV_PAGE
} from "../constants";

export function fetchAlbums() {
    return {
        type: FETCH_ALBUMS
    }
}

export function fetchAlbumsSuccess(payload) {
    return {
        type: FETCH_ALBUMS_SUCCESS,
        payload
    }
}

export function fetchAlbumsFailure(payload) {
    return {
        type: FETCH_ALBUMS_FAILURE,
        payload
    }
}

export function fetchUsers() {
    return {
        type: FETCH_USERS
    }
}

export function fetchUsersSuccess(payload) {
    return {
        type: FETCH_USERS_SUCCESS,
        payload
    }
}

export function fetchUsersFailure(payload) {
    return {
        type: FETCH_USERS_FAILURE,
        payload
    }
}

export function generateList() {
    return {
        type: GENERATE_LIST
    }
}

export function fetchNextPage() {
    return {
        type: NEXT_PAGE
    }
}

export function fetchPrevPage() {
    return {
        type: PREV_PAGE
    }
}