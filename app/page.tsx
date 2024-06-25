'use client'

// React
import { lazy, useCallback, useEffect, useState, Suspense } from 'react'

// Redux
import { useAppDispatch, useAppSelector } from './lib'
import { getPosts } from './lib/post/postSlice'
import {
      reinitializeHeader,
      generateTableBodyData,
      toggleActionEvent,
      toggleNewEntry,
      addingSlider,
      subtractSlider,
} from './lib/table/tableSlice'

// Types
import { LIMIT_PER_PAGE, TableAction } from './component/table/types'

// Component
import EditDialog from './component/edit_dialog/editDialog'
import DeleteDialog from './component/delete_dialog/deleteDialog'
import Loading from './loading'

// Lazy-load the TableComponent
const TableComponent = lazy(() => import('./component/table/tableComponent'))

const Home = () => {
      // For basic loading page
      const [isLoadingTable, setisLoadingTable] = useState(false)

      const dispatch = useAppDispatch()
      const posts = useAppSelector((state) => state.posts)
      const tableData = useAppSelector((state) => state.tableData)

      // Callback function to prevent infinity fetching
      const getPostCallback = useCallback(() => {
            if (
                  tableData.bodyData.length <
                  LIMIT_PER_PAGE * tableData.sliderPage
            ) {
                  setisLoadingTable(true)
                  dispatch(getPosts(LIMIT_PER_PAGE * tableData.sliderPage))
            }
      }, [dispatch, tableData.bodyData.length, tableData.sliderPage])

      useEffect(() => {
            getPostCallback()
      }, [getPostCallback])

      // When posts getting new changes
      useEffect(() => {
            dispatch(reinitializeHeader(posts))
            dispatch(generateTableBodyData(posts))
            setisLoadingTable(false)
      }, [dispatch, posts])

      const buttonClickHandler = (id: number, rowAction: TableAction) => {
            const payload = { id, rowAction }
            dispatch(toggleActionEvent(payload))
      }

      const onNewEntryBtnClick = () => {
            dispatch(toggleNewEntry())
      }

      const nextPageClickHandler = () => {
            if (!tableData.isEndPage) {
                  dispatch(addingSlider())
            }
      }
      const prevPageClickHandler = () => {
            if (tableData.sliderPage !== 1) {
                  dispatch(subtractSlider())
            }
      }

      return (
            <div
                  className={
                        'relative flex flex-col items-center justify-center'
                  }
            >
                  <div
                        className={`flex h-full w-full flex-col items-center justify-center ${
                              tableData.showDialog !== undefined && 'dialogOpen'
                        }`}
                  >
                        <section
                              className={'flex w-full grow-0 justify-between'}
                        >
                              <h1 className={'p-3'}>Single Page Application</h1>

                              <button
                                    className={'m-2'}
                                    onClick={onNewEntryBtnClick}
                              >
                                    New Entry
                              </button>
                        </section>

                        <hr className={'mt-2 w-full'} />

                        <Suspense
                              fallback={<Loading className={'h-80 w-80'} />}
                        >
                              {isLoadingTable ? (
                                    <Loading className={'m-10 h-80 w-80'} />
                              ) : (
                                    <section className={'w-full grow p-4'}>
                                          <TableComponent
                                                tableHeaders={tableData.header}
                                                tableBodyData={
                                                      tableData.bodyData
                                                }
                                                onButtonClick={
                                                      buttonClickHandler
                                                }
                                                startIndex={
                                                      (tableData.sliderPage -
                                                            1) *
                                                      LIMIT_PER_PAGE
                                                }
                                                endIndex={
                                                      tableData.sliderPage *
                                                      LIMIT_PER_PAGE
                                                }
                                          />
                                    </section>
                              )}
                        </Suspense>
                  </div>

                  {tableData.showDialog !== undefined &&
                        tableData.showDialog.action !== TableAction.DELETE && (
                              <EditDialog />
                        )}

                  {tableData.showDialog !== undefined &&
                        tableData.showDialog.action === TableAction.DELETE && (
                              <DeleteDialog />
                        )}

                  <div
                        className={
                              'absolute right-4 top-full flex items-center justify-center space-x-2'
                        }
                  >
                        {tableData.sliderPage !== 1 && (
                              <button onClick={prevPageClickHandler}>
                                    {'<'}
                              </button>
                        )}
                        {!tableData.isEndPage && (
                              <button onClick={nextPageClickHandler}>
                                    {'>'}
                              </button>
                        )}
                  </div>
            </div>
      )
}

export default Home
