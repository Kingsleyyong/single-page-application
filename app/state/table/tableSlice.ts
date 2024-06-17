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
                              const rowDatasArray = [] as string[]
                              action.payload.headers.map((string) => {
                                    rowDatasArray.push(
                                          currentPost[
                                                string as keyof typeof currentPost
                                          ].toString()
                                    )
                              })

                              return [
                                    ...accumulator,
                                    {
                                          rowDatas: rowDatasArray,
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
                        rowIndex: number
                        rowAction: TableAction
                  }>
            ) => {
                  const currentRow = state.bodyData.at(action.payload.rowIndex)
                  const currentStatus =
                        action.payload.rowAction === TableAction.EDIT
                              ? currentRow?.edit
                              : currentRow?.delete
                  if (
                        currentStatus === TableActionEnum.NOT_AVAILABLE ||
                        currentStatus === undefined
                  )
                        return

                  return {
                        ...state,
                        bodyData: {
                              ...state.bodyData,
                              [action.payload.rowAction === TableAction.EDIT
                                    ? 'edit'
                                    : 'delete']:
                                    currentStatus === TableActionEnum.AVAILABLE
                                          ? TableActionEnum.IS_ACTIVE
                                          : TableActionEnum.AVAILABLE,
                        },
                  }
            },
      },
})

export const { reinitializeHeader, generateTableBodyData, toggleActionEvent } =
      tableDataSlice.actions
export const { reducer: tableDataReducer } = tableDataSlice
