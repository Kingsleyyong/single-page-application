import { TableActionEnum, TableRowDataType } from './types'

interface ITableComponentProps {
      tableHeaders: string[]
      tableData: TableRowDataType[]
}

export const TableComponent = ({
      tableHeaders,
      tableData,
}: ITableComponentProps) => {
      return (
            <table className={'size-full'}>
                  <thead>
                        <tr>
                              {tableHeaders.map((str, index) => (
                                    <td key={`Header ${index}. ${str}`}>
                                          <span>{str}</span>
                                    </td>
                              ))}
                        </tr>
                  </thead>

                  <tbody>
                        {tableData.map((rowDatas, rowIndex) => (
                              <tr key={`DataRow ${rowIndex}`}>
                                    {rowDatas.rowDatas.map(
                                          (data, cellIndex) => (
                                                <td
                                                      key={`CellData ${cellIndex}. ${data}`}
                                                >
                                                      <span>{data}</span>
                                                </td>
                                          )
                                    )}

                                    <td className={'max-w-2'}>
                                          {rowDatas.edit !==
                                                TableActionEnum.NOT_AVAILABLE && (
                                                <button>✏️</button>
                                          )}

                                          {rowDatas.delete !==
                                                TableActionEnum.NOT_AVAILABLE && (
                                                <button>🗑️</button>
                                          )}
                                    </td>
                              </tr>
                        ))}
                  </tbody>
            </table>
      )
}
