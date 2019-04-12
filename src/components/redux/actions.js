export const nextPage = forwardCursor =>{
    return{
        type: "NEXT_PAGE",
        payload: forwardCursor
    }
};

export const prevPage = backCursor =>{
    return{
        type: "PREV_PAGE",
        payload: backCursor
    }
};

export const resetCursor = pageData =>{
    return{
        type: "RESET_CURSOR",
        payload: pageData
    }
}