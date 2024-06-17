'use client'

import { useEffect } from 'react'
import { TableComponent } from './component/table/page'
import { useAppDispatch, useAppSelector } from './state'
import { fetchProjects } from './state/post/postSlice'
import {
      generateTableData,
      reinitializeHeader,
} from './state/table/tablesSlice'

const Home = () => {
      const dispatch = useAppDispatch()
      const posts = useAppSelector((state) => state.posts)
      const tableHeaders = useAppSelector((state) => state.tableHeader)
      const tableData = useAppSelector((state) => state.tableData)

      useEffect(() => {
            dispatch(fetchProjects(10))
      }, [dispatch])

      useEffect(() => {
            dispatch(reinitializeHeader(posts))
      }, [dispatch, posts])

      useEffect(() => {
            dispatch(generateTableData({ posts, headers: tableHeaders }))
      }, [dispatch, posts, tableHeaders])

      return (
            <div className={'flex min-h-screen flex-col'}>
                  <section className={'flex grow-0 justify-between'}>
                        <h1 className={'p-3'}>Single Page Application</h1>

                        <button className={'m-2'}>New Entry</button>
                  </section>

                  <hr className={'mt-2'} />

                  <section className={'grow p-4'}>
                        <TableComponent
                              tableHeaders={tableHeaders}
                              tableData={tableData}
                        />
                  </section>
            </div>
      )
}

export default Home
