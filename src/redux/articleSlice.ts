import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleState, PaginatedArticle } from "../types";


const initialState: ArticleState = {
    paginated_articles: null,
    loading: false,
    error: null,
};

const newsSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    fetchPaginatedArticleStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPaginatedArticleSuccess(state, action: PayloadAction<PaginatedArticle>) {
      state.loading = false;
      state.paginated_articles = action.payload;
    },
    fetchPaginatedArticleFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.paginated_articles = null; 
    },
  },
});

export const { fetchPaginatedArticleStart, fetchPaginatedArticleSuccess, fetchPaginatedArticleFailure } = newsSlice.actions;
export default newsSlice.reducer;


export const fetchPaginatedArticles = () => async (dispatch: any) => {
    dispatch(fetchPaginatedArticleStart());
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
        mode: "cors",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data); // Log the response to debug
      dispatch(fetchPaginatedArticleSuccess(data));
    } catch (error) {
      console.error("Fetch error:", error.message);
      dispatch(fetchPaginatedArticleFailure(error.message));
    }
  };