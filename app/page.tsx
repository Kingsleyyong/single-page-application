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
                        <TableComponent tableHeaders={[]} tableData={[]} />
                  </section>
            </div>
      )
}

export default Home
