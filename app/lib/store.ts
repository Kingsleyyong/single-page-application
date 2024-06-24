import { configureStore } from '@reduxjs/toolkit'
import { postsReducer } from './post/postSlice'
import { tableDataReducer } from './table/tableSlice'
import { loadingReducer } from './loading/loadingSlice'

export enum ResponseStatus {
      LOADING = 'LOADING',
      ERROR = 'ERROR',
}

export const store = configureStore({
      reducer: {
            posts: postsReducer,
            tableData: tableDataReducer,
            loadingStatus: loadingReducer,
      },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
