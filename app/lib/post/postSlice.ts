import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface PostsType {
      id: number
      userId: number
      title: string
      body: string
}

export const getProjects = createAsyncThunk(
      'posts/getProjects',
      async (limit?: number) => {
            const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts${limit ? `?_limit=${limit}` : ''}`
            )
            return (await response.json()) as PostsType[]
      }
)

export const putProject = createAsyncThunk(
      'post/editProject',
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

const postsSlice = createSlice({
      name: 'posts',
      initialState: [] as PostsType[],
      reducers: {},
      extraReducers: (builder) => {
            builder
                  .addCase(
                        getProjects.fulfilled,
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
                        putProject.fulfilled,
                        (state, action: PayloadAction<PostsType>) => [
                              ...state.map((data) =>
                                    data.id === action.payload.id
                                          ? action.payload
                                          : data
                              ),
                        ]
                  )
      },
})

export const {} = postsSlice.actions
export const { reducer: postsReducer } = postsSlice
