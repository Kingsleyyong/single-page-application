'use client'

import { Fragment, useEffect } from 'react'
import { TableComponent } from './component/table/page'
import { useAppDispatch, useAppSelector } from './state'
import { fetchProjects } from './state/post/postSlice'
import {
      reinitializeHeader,
      generateTableBodyData,
      toggleActionEvent,
} from './state/table/tableSlice'
import { TableAction } from './component/table/types'
import EditDialog from './component/edit_dialog/page'

const Home = () => {
      const dispatch = useAppDispatch()
      const posts = useAppSelector((state) => state.posts)
      const tableData = useAppSelector((state) => state.tableData)

      useEffect(() => {
            dispatch(fetchProjects(10))
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

      useEffect(() => {
            console.log(tableData)
      }, [tableData])

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

                              <button className={'m-2'}>New Entry</button>
                        </section>

                        <hr className={'mt-2'} />

                        <section className={'grow p-4'}>
                              <TableComponent
                                    tableHeaders={tableData.header}
                                    tableBodyData={tableData.bodyData}
                                    onButtonClick={buttonClickHandler}
                              />
                        </section>
                  </div>

                  {tableData.showDialog !== undefined && <EditDialog />}
            </div>
      )
}

export default Home
