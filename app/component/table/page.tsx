import { useEffect } from 'react'
import { TableActionEnum, TableRowDataType } from './types'

interface ITableComponentProps {
      tableHeaders: string[]
      tableData: TableRowDataType[]
      onEditButtonClick: (rowIndex: number) => void
      onDeleteButtonClick: (rowIndex: number) => void
}

export const TableComponent = ({
      tableHeaders,
      tableData,
      onEditButtonClick,
      onDeleteButtonClick,
}: ITableComponentProps) => {
      useEffect(() => {
            console.log(tableHeaders, tableData)
      }, [tableData, tableHeaders])

      return (
            <table className={'size-full'}>
                  <thead>
                        <tr>
                              {tableHeaders.map((str, index) => (
                                    <td key={`Header ${index}. ${str}`}>
                                          <span
                                                className={
                                                      'pointer-events-none select-none uppercase'
                                                }
                                          >
                                                {str.replace(
                                                      /([a-z0-9])([A-Z])/g,
                                                      '$1 $2'
                                                )}
                                          </span>
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
                                                      className={
                                                            Number.isNaN(
                                                                  parseInt(
                                                                        data,
                                                                        10
                                                                  )
                                                            )
                                                                  ? 'max-w-48'
                                                                  : 'max-w-40'
                                                      }
                                                >
                                                      <span
                                                            className={
                                                                  'pointer-events-none select-none normal-case'
                                                            }
                                                      >
                                                            {data}
                                                      </span>
                                                </td>
                                          )
                                    )}
                                    <td>
                                          {rowDatas.edit} | {rowDatas.delete}
                                    </td>

                                    <td className={'max-w-20'}>
                                          {rowDatas.edit !==
                                                TableActionEnum.NOT_AVAILABLE && (
                                                <button
                                                      onClick={() =>
                                                            onEditButtonClick(
                                                                  rowIndex
                                                            )
                                                      }
                                                      className={'select-none'}
                                                >
                                                      ✏️
                                                </button>
                                          )}

                                          {rowDatas.delete !==
                                                TableActionEnum.NOT_AVAILABLE && (
                                                <button
                                                      onClick={() =>
                                                            onDeleteButtonClick(
                                                                  rowIndex
                                                            )
                                                      }
                                                      className={'select-none'}
                                                >
                                                      🗑️
                                                </button>
                                          )}
                                    </td>
                              </tr>
                        ))}
                  </tbody>
            </table>
      )
}
