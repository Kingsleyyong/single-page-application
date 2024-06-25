// Redux
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

// This loading slice mainly use for fetching data, showing fetching status
// in UI and debug purpose
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
            removeStatus: () => ({}) as LoadingStateType,
      },
})

export const { isLoading, errorCatching, isSuccess, removeStatus } =
      loadingSlice.actions
export const { reducer: loadingReducer } = loadingSlice
