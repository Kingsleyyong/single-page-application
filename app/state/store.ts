import { configureStore } from '@reduxjs/toolkit'
import { postsReducer } from './post/postSlice'
import { tableDataReducer } from './table/tableSlice'

export const store = configureStore({
      reducer: {
            posts: postsReducer,
            tableData: tableDataReducer,
      },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
