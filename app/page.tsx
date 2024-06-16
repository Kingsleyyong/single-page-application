import { TableComponent } from './component/table/page'
import { TableActionEnum } from './component/table/types'

const Home = () => {
      return (
            <div className={'flex min-h-screen flex-col'}>
                  <section className={'flex grow-0 justify-between'}>
                        <h1 className={'p-3'}>Single Page Application</h1>

                        <button className={'m-2'}>New Entry</button>
                  </section>

                  <hr className={'mt-2'} />

                  <section className={'grow p-4'}>
                        <TableComponent
                              tableHeaders={['1', '2', '3', '']}
                              tableData={[
                                    {
                                          rowDatas: ['1', '2', '3'],
                                          edit: TableActionEnum.AVAILABLE,
                                          delete: TableActionEnum.AVAILABLE,
                                    },
                                    {
                                          rowDatas: ['1', '2', '3'],
                                          edit: TableActionEnum.NOT_AVAILABLE,
                                          delete: TableActionEnum.AVAILABLE,
                                    },
                              ]}
                        />
                  </section>
            </div>
      )
}

export default Home
