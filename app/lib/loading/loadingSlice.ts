import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export enum Status {
      LOADING = 'LOADING',
      ERROR = 'ERROR',
      SUCCESS = 'SUCCESS',
}

export enum LoadingType {
      PAGE_LOAD,
      DATA_FETCH,
}

interface LoadingStateType {
      type: LoadingType
      status: Status
      errorMessage?: string
}

const loadingSlice = createSlice({
      name: 'loading',
      initialState: {} as LoadingStateType,
      reducers: {
            isLoading: (_state, action: PayloadAction<LoadingType>) => ({
                  type: action.payload,
                  status: Status.LOADING,
            }),
            errorCatching: (state, action: PayloadAction<string>) => ({
                  ...state,
                  status: Status.ERROR,
                  errorMessage: action.payload,
            }),
            isSuccess: (state) =>
                  state.status !== Status.ERROR
                        ? {
                                ...state,
                                status: Status.SUCCESS,
                          }
                        : state,
      },
})

export const { isLoading, errorCatching, isSuccess } = loadingSlice.actions
export const { reducer: loadingReducer } = loadingSlice
