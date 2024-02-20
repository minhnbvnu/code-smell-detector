function booksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return { ...state, books: action.payload };
    case ADD_TO_BOOKMARK_LIST:
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };
    case REMOVE_FROM_BOOKMARK_LIST:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(book => book.id !== action.payload.id)
      };
    default:
      return state;
  }
}