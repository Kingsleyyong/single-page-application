'use client'

import { Suspense, lazy, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './lib'
import { getPosts } from './lib/post/postSlice'
import {
      reinitializeHeader,
      generateTableBodyData,
      toggleActionEvent,
      toggleNewEntry,
} from './lib/table/tableSlice'
import { TableAction } from './component/table/types'
import EditDialog from './component/edit_dialog/page'
import Loading from './loading'
import { DeleteDialog } from './component/delete_dialog/page'
import { isSuccess } from './lib/loading/loadingSlice'

// Lazy-load the TableComponent
const TableComponent = lazy(() => import('./component/table/page'))

const Home = () => {
      const dispatch = useAppDispatch()
      const posts = useAppSelector((state) => state.posts)
      const tableData = useAppSelector((state) => state.tableData)
      const loadingData = useAppSelector((state) => state.loadingStatus)

      useEffect(() => {
            dispatch(getPosts(10))
      }, [dispatch])

      useEffect(() => {
            dispatch(reinitializeHeader(posts))
      }, [dispatch, posts])

      useEffect(() => {
            dispatch(
                  generateTableBodyData({ posts, headers: tableData.header })
            )
      }, [dispatch, posts, tableData.header])

      const buttonClickHandler = (id: number, rowAction: TableAction) => {
            const payload = { id, rowAction }
            dispatch(toggleActionEvent(payload))
      }

      const onNewEntryBtnClick = () => {
            dispatch(toggleNewEntry())
      }

      return (
            <div
                  className={
                        'relative flex flex-col items-center justify-center'
                  }
            >
                  <div
                        className={`h-full w-full ${
                              tableData.showDialog !== undefined && 'dialogOpen'
                        }`}
                  >
                        <section className={'flex grow-0 justify-between'}>
                              <h1 className={'p-3'}>Single Page Application</h1>

                              <button
                                    className={'m-2'}
                                    onClick={onNewEntryBtnClick}
                              >
                                    New Entry
                              </button>
                        </section>

                        <hr className={'mt-2'} />

                        <Suspense fallback={<Loading />}>
                              <section className={'grow p-4'}>
                                    <TableComponent
                                          tableHeaders={tableData.header}
                                          tableBodyData={tableData.bodyData}
                                          onButtonClick={buttonClickHandler}
                                    />
                              </section>
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
            </div>
      )
}

export default Home
