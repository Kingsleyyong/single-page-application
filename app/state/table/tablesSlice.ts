import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PostsType } from '../post/postSlice'
import { TableActionEnum, TableRowDataType } from '@/app/component/table/types'

const tableHeaderSlice = createSlice({
      name: 'tableHeader',
      initialState: [] as string[],
      reducers: {
            reinitializeHeader: (
                  _state,
                  action: PayloadAction<PostsType[]>
            ) => {
                  const posts = action.payload

                  const headers = posts.reduce(
                        (accumulator: string[], currentPost) => {
                              const diff = Object.keys(currentPost).filter(
                                    (key) => !accumulator.includes(key)
                              )

                              return [...accumulator, ...diff]
                        },
                        []
                  )

                  return headers
            },
      },
})

export const { reinitializeHeader } = tableHeaderSlice.actions
export const { reducer: tableHeaderReducer } = tableHeaderSlice

const tableDataSlice = createSlice({
      name: 'tableHeader',
      initialState: [] as TableRowDataType[],
      reducers: {
            generateTableData: (
                  _state,
                  action: PayloadAction<{
                        posts: PostsType[]
                        headers: string[]
                  }>
            ) => {
                  const posts = action.payload.posts

                  const tableData = posts.reduce(
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

                  return tableData
            },
      },
})

export const { generateTableData } = tableDataSlice.actions
export const { reducer: tableDataReducer } = tableDataSlice
