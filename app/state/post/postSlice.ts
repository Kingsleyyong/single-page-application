import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface PostsType {
      id: number
      userId: number
      title: string
      body: string
}

export const fetchProjects = createAsyncThunk<PostsType[], number | undefined>(
      'posts/fetchProjects',
      async (limit?: number) => {
            const response = await fetch(
                  `${process.env.API_ENDPOINT}/posts${limit ? `?_limit=${limit}` : ''}`
            )
            return (await response.json()) as PostsType[]
      }
)

const postsSlice = createSlice({
      name: 'posts',
      initialState: [] as PostsType[],
      reducers: {},
      extraReducers: (builder) => {
            builder.addCase(
                  fetchProjects.fulfilled,
                  (state, action: PayloadAction<PostsType[]>) => {
                        const newPostsData = action.payload.reduce(
                              (accumulator: PostsType[], currentPost) => {
                                    const foundData = state.find(
                                          (data) => data.id === currentPost.id
                                    )

                                    if (foundData) return accumulator
                                    return [...accumulator, currentPost]
                              },
                              []
                        )

                        return [...state, ...newPostsData]
                  }
            )
      },
})

export const {} = postsSlice.actions
export const { reducer: postsReducer } = postsSlice
