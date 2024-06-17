import { configureStore } from '@reduxjs/toolkit'
import { postsReducer } from './post/postSlice'
import { tableDataReducer, tableHeaderReducer } from './table/tablesSlice'

export const store = configureStore({
      reducer: {
            posts: postsReducer,
            tableHeader: tableHeaderReducer,
            tableData: tableDataReducer,
      },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
