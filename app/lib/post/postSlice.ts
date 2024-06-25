import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
      LoadingType,
      errorCatching,
      isLoading,
      isSuccess,
} from '../loading/loadingSlice'
import { isLastPage, onDialogCancel } from '../table/tableSlice'
import { RootState } from '../store'
import { LIMIT_PER_PAGE } from '@/app/component/table/types'
export interface PostsType {
      id: number
      userId: number
      title: string
      body: string
}

export enum PostTypeKeys {
      id = 'id',
      userId = 'userId',
      title = 'title',
      body = 'body',
}

export const getPosts = createAsyncThunk(
      'posts/getPost',
      async (limit: number, thunkAPI) => {
            thunkAPI.dispatch(isLoading(LoadingType.DATA_FETCH))

            const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts?_limit=${limit}`
            )

            if (!response.ok) {
                  thunkAPI.dispatch(
                        errorCatching(`HTTP Status ${response.status}`)
                  )
            } else {
                  const state = thunkAPI.getState()
                  const contentLength = parseInt(
                        response.headers.get('X-Total-Count') ?? '0'
                  )
                  const sliderPage = (state as RootState).tableData.sliderPage
                  const totalPage = (state as RootState).tableData.totalPage

                  if (sliderPage * LIMIT_PER_PAGE >= contentLength)
                        thunkAPI.dispatch(isLastPage(true))

                  if (sliderPage < totalPage)
                        thunkAPI.dispatch(isLastPage(false))

                  thunkAPI.dispatch(isSuccess())
                  return (await response.json()) as PostsType[]
            }
      }
)

export const postPost = createAsyncThunk(
      'post/postPost',
      async (bodyData: PostsType, thunkAPI) => {
            thunkAPI.dispatch(isLoading(LoadingType.DATA_FETCH))

            const options = {
                  method: 'POST',
                  headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(bodyData),
            }
            const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`,
                  options
            )

            const responseData = await response.json()

            // Assuming responseData has the newly created post with an 'id'
            const id = parseInt(responseData.id)

            if (!response.ok) {
                  thunkAPI.dispatch(
                        errorCatching(`HTTP Status ${response.status}`)
                  )
            } else {
                  thunkAPI.dispatch(isSuccess())
                  thunkAPI.dispatch(onDialogCancel())

                  return { ...bodyData, id } as PostsType
            }
      }
)

export const putPost = createAsyncThunk(
      'post/putProject',
      async (data: PostsType, thunkAPI) => {
            thunkAPI.dispatch(isLoading(LoadingType.DATA_FETCH))

            const options = {
                  method: 'PUT',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
            }
            const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts/${data.id}`,
                  options
            )

            if (!response.ok) {
                  thunkAPI.dispatch(
                        errorCatching(`HTTP Status ${response.status}`)
                  )
            } else {
                  thunkAPI.dispatch(isSuccess())
                  thunkAPI.dispatch(onDialogCancel())

                  return (await response.json()) as PostsType
            }
      }
)

export const deletePost = createAsyncThunk(
      'post/deletePost',
      async ({ id }: PostsType, thunkAPI) => {
            thunkAPI.dispatch(isLoading(LoadingType.DATA_FETCH))

            const options = {
                  method: 'DELETE',
                  headers: {
                        'Content-Type': 'application/json',
                  },
            }
            const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts/${id}`,
                  options
            )

            if (!response.ok) {
                  thunkAPI.dispatch(
                        errorCatching(`HTTP Status ${response.status}`)
                  )
            } else {
                  thunkAPI.dispatch(isSuccess())
                  thunkAPI.dispatch(onDialogCancel())

                  return id
            }
      }
)

const postsSlice = createSlice({
      name: 'posts',
      initialState: [] as PostsType[],
      reducers: {},
      extraReducers: (builder) => {
            builder
                  .addCase(
                        getPosts.fulfilled,
                        (
                              state,
                              action: PayloadAction<PostsType[] | undefined>
                        ) => {
                              if (!action.payload) return state

                              const newPostsData = action.payload.reduce(
                                    (accumulator: PostsType[], currentPost) => {
                                          const foundData = state.find(
                                                (data) =>
                                                      data.id === currentPost.id
                                          )

                                          if (foundData) return accumulator
                                          return [...accumulator, currentPost]
                                    },
                                    []
                              )

                              return [...state, ...newPostsData]
                        }
                  )
                  .addCase(postPost.fulfilled, (state, action) => {
                        if (!action.payload) return state
                        state.unshift(action.payload)

                        return state
                  })
                  .addCase(
                        putPost.fulfilled,
                        (
                              state,
                              action: PayloadAction<PostsType | undefined>
                        ) => {
                              if (!action.payload) return state

                              return [
                                    ...state.map((data) =>
                                          data.id === action.payload?.id
                                                ? action.payload
                                                : data
                                    ),
                              ]
                        }
                  )
                  .addCase(
                        deletePost.fulfilled,
                        (
                              state,
                              action: PayloadAction<PostsType['id'] | undefined>
                        ) => [
                              ...state.filter(
                                    (data) => data.id !== action.payload
                              ),
                        ]
                  )
      },
})

export const {} = postsSlice.actions
export const { reducer: postsReducer } = postsSlice
