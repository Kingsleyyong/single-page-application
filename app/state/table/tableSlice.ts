import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PostsType } from '../post/postSlice'
import {
      TableAction,
      TableActionEnum,
      TableRowDataType,
} from '@/app/component/table/types'

interface TableDataType {
      header: string[]
      bodyData: TableRowDataType[]
}

const tableDataSlice = createSlice({
      name: 'tableData',
      initialState: { header: [], bodyData: [] } as TableDataType,
      reducers: {
            reinitializeHeader: (state, action: PayloadAction<PostsType[]>) => {
                  const posts = action.payload

                  const header = posts.reduce(
                        (accumulator: string[], currentPost) => {
                              const diff = Object.keys(currentPost).filter(
                                    (key) => !accumulator.includes(key)
                              )

                              return [...accumulator, ...diff]
                        },
                        []
                  )

                  return { ...state, header }
            },
            generateTableBodyData: (
                  state,
                  action: PayloadAction<{
                        posts: PostsType[]
                        headers: string[]
                  }>
            ) => {
                  const posts = action.payload.posts

                  const bodyData = posts.reduce(
                        (accumulator: TableRowDataType[], currentPost) => {
                              return [
                                    ...accumulator,
                                    {
                                          ...currentPost,
                                          edit: TableActionEnum.AVAILABLE,
                                          delete: TableActionEnum.AVAILABLE,
                                    },
                              ]
                        },
                        []
                  )

                  return { ...state, bodyData }
            },
            toggleActionEvent: (
                  state,
                  action: PayloadAction<{
                        id: number
                        rowAction: TableAction
                  }>
            ) => {
                  const currentRow = state.bodyData.find(
                        (data) => data.id === action.payload.id
                  )
                  const currentStatus =
                        action.payload.rowAction === TableAction.EDIT
                              ? currentRow?.edit
                              : currentRow?.delete
                  if (
                        currentStatus === TableActionEnum.NOT_AVAILABLE ||
                        currentStatus === undefined
                  )
                        return

                  const newBodyData = state.bodyData.reduce(
                        (accumulator: TableRowDataType[], currentData) => {
                              if (currentData.id === action.payload.id) {
                                    accumulator.push({
                                          ...currentData,
                                          [action.payload.rowAction.toLowerCase()]:
                                                currentStatus ===
                                                TableActionEnum.AVAILABLE
                                                      ? TableActionEnum.IS_ACTIVE
                                                      : TableActionEnum.AVAILABLE,
                                    })
                              } else accumulator.push(currentData)

                              return accumulator
                        },
                        []
                  )

                  return {
                        ...state,
                        bodyData: newBodyData,
                  }
            },
      },
})

export const { reinitializeHeader, generateTableBodyData, toggleActionEvent } =
      tableDataSlice.actions
export const { reducer: tableDataReducer } = tableDataSlice
