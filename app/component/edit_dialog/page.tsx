import { useAppDispatch, useAppSelector } from '@/app/lib'
import React, { FormEvent, Fragment, useRef } from 'react'
import { TableAction, TableRowDataType } from '../table/types'
import { PostsType, putPost } from '@/app/lib/post/postSlice'
import { onDialogCancel } from '@/app/lib/table/tableSlice'

const EditDialog = () => {
      const { showDialog, bodyData } = useAppSelector(
            (state) => state.tableData
      )
      const dispatch = useAppDispatch()

      const textAreasRef = useRef<{
            [key in PostsType['title'] | PostsType['body']]: HTMLTextAreaElement
      }>({})

      const currentRowData = bodyData.find(
            (data) =>
                  data.userId === showDialog?.userId &&
                  data.id === showDialog.id
      )

      const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            if (showDialog === undefined) return

            const newInput = Object.keys(textAreasRef.current)
                  .filter(
                        (key) =>
                              !Object.keys(TableAction).includes(
                                    key.toUpperCase()
                              ) && !Object.keys(showDialog).includes(key)
                  )
                  .reduce(
                        (accumulator, currKey) => {
                              const element = textAreasRef.current[currKey]

                              if (element && 'value' in element) {
                                    const text = element.value
                                    return {
                                          ...accumulator,
                                          [currKey]: text,
                                    }
                              }

                              return accumulator
                        },
                        {} as {
                              title: TableRowDataType['title']
                              body: TableRowDataType['body']
                        }
                  )

            if (currentRowData) {
                  const { id, userId } = currentRowData
                  const post: PostsType = { userId, id, ...newInput }
                  dispatch(putPost(post)).then(() => dispatch(onDialogCancel()))
            } else console.log([...bodyData, { ...showDialog, ...newInput }])
      }

      if (showDialog === undefined) return null

      return (
            <div
                  className={
                        'absolute w-1/2 rounded-xl border-black bg-gray-700 p-8 shadow-xl drop-shadow-xl'
                  }
            >
                  <span className={'text-center text-2xl font-extrabold'}>
                        {currentRowData ? 'Edit Data' : 'New Data Entry'}
                  </span>
                  <hr className={'my-3'} />
                  <form
                        onSubmit={onFormSubmit}
                        className={`grid min-h-max grid-cols-2 gap-5`}
                  >
                        {Object.keys(bodyData[bodyData.length - 1])
                              .filter(
                                    (key) =>
                                          !Object.keys(TableAction).includes(
                                                key.toUpperCase()
                                          )
                              )
                              .map((key) => (
                                    <Fragment key={key}>
                                          {Object.keys(showDialog).includes(
                                                key
                                          ) && (
                                                <label
                                                      className={'flex w-full'}
                                                >
                                                      <span
                                                            className={
                                                                  'text-xl font-bold capitalize'
                                                            }
                                                      >
                                                            {key.replace(
                                                                  /([a-z0-9])([A-Z])/g,
                                                                  '$1 $2'
                                                            )}
                                                            {': '}
                                                            {showDialog[
                                                                  key as keyof typeof showDialog
                                                            ].toString()}
                                                      </span>
                                                </label>
                                          )}

                                          {!Object.keys(showDialog).includes(
                                                key
                                          ) && (
                                                <label
                                                      className={
                                                            'flex w-full flex-col justify-between'
                                                      }
                                                >
                                                      <span
                                                            className={
                                                                  'text-xl font-bold capitalize'
                                                            }
                                                      >
                                                            {key}:
                                                      </span>
                                                      <textarea
                                                            ref={(node) => {
                                                                  if (node) {
                                                                        textAreasRef.current[
                                                                              `${key}` as string
                                                                        ] = node
                                                                  }
                                                            }}
                                                            name={key}
                                                            className={
                                                                  'mt-2 h-60 rounded-lg bg-gray-900/50 p-2'
                                                            }
                                                            defaultValue={
                                                                  (currentRowData ??
                                                                        {})[
                                                                        key as keyof typeof currentRowData
                                                                  ]
                                                            }
                                                      />
                                                </label>
                                          )}
                                    </Fragment>
                              ))}

                        <button
                              type="button"
                              className={'bg-gray-800'}
                              onClick={() => dispatch(onDialogCancel())}
                        >
                              Cancel
                        </button>
                        <button type="submit" className={'bg-gray-800'}>
                              Submit
                        </button>
                  </form>
            </div>
      )
}

export default EditDialog
