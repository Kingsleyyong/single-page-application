import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PostTypeKeys, PostsType } from '../post/postSlice'
import {
      TableAction,
      TableActionEnum,
      TableRowDataType,
} from '@/app/component/table/types'
import { sortByOrder } from '@/app/utils'

interface TableDataType {
      header: string[]
      bodyData: TableRowDataType[]
      showDialog:
            | {
                    action: TableAction
                    userId: TableRowDataType['userId']
                    id: TableRowDataType['id']
              }
            | undefined
      sliderPage: number
      isEndPage: boolean
}

const tableDataSlice = createSlice({
      name: 'tableData',
      initialState: {
            header: [],
            bodyData: [],
            showDialog: undefined,
            sliderPage: 1,
            isEndPage: false,
      } as TableDataType,
      reducers: {
            reinitializeHeader: (state, action: PayloadAction<PostsType[]>) => {
                  const posts = action.payload

                  const header = posts.reduce(
                        (accumulator: string[], currentPost) => {
                              const diff = Object.keys(currentPost).filter(
                                    (key) => !accumulator.includes(key)
                              )

                              return sortByOrder(Object.keys(PostTypeKeys), [
                                    ...accumulator,
                                    ...diff,
                              ])
                        },
                        []
                  )

                  return { ...state, header }
            },
            generateTableBodyData: (
                  state,
                  action: PayloadAction<PostsType[]>
            ) => {
                  const posts = action.payload

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
                        showDialog: (() => {
                              const currentData = newBodyData.find(
                                    (data) => data.id === action.payload.id
                              )
                              if (currentData === undefined) return undefined

                              const { userId, id } = currentData
                              return {
                                    userId,
                                    id,
                                    action: action.payload.rowAction,
                              }
                        })(),
                  }
            },
            toggleNewEntry: (state) => ({
                  ...state,
                  showDialog: {
                        id: -1,
                        userId: -1,
                        action: TableAction.NEW_ENTRY,
                  },
            }),
            onDialogCancel: (state) => {
                  return { ...state, showDialog: undefined }
            },
            isLastPage: (state) => ({ ...state, isEndPage: true }),
            addingSlider: (state) => ({
                  ...state,
                  sliderPage: state.sliderPage + 1,
            }),
            subtractSlider: (state) => ({
                  ...state,
                  sliderPage: state.sliderPage - 1,
            }),
      },
})

export const {
      reinitializeHeader,
      generateTableBodyData,
      toggleActionEvent,
      onDialogCancel,
      toggleNewEntry,
      isLastPage,
      addingSlider,
      subtractSlider,
} = tableDataSlice.actions
export const { reducer: tableDataReducer } = tableDataSlice
