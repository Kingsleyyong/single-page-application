import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Playball } from 'next/font/google'

export interface PostsType {
      id: number
      userId: number
      title: string
      body: string
}

export const getPosts = createAsyncThunk(
      'posts/getPost',
      async (limit?: number) => {
            const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts${limit ? `?_limit=${limit}` : ''}`
            )
            return (await response.json()) as PostsType[]
      }
)

export const putPost = createAsyncThunk(
      'post/putProject',
      async (data: PostsType) => {
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

            return (await response.json()) as PostsType
      }
)

export const deletePost = createAsyncThunk(
      'post/deletePost',
      async ({ id }: PostsType) => {
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

            return id
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
                        (state, action: PayloadAction<PostsType[]>) => {
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
                  .addCase(
                        putPost.fulfilled,
                        (state, action: PayloadAction<PostsType>) => [
                              ...state.map((data) =>
                                    data.id === action.payload.id
                                          ? action.payload
                                          : data
                              ),
                        ]
                  )
                  .addCase(
                        deletePost.fulfilled,
                        (state, action: PayloadAction<PostsType['id']>) => [
                              ...state.filter(
                                    (data) => data.id !== action.payload
                              ),
                        ]
                  )
      },
})

export const {} = postsSlice.actions
export const { reducer: postsReducer } = postsSlice
