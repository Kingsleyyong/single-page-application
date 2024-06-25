import { useEffect } from 'react'
import { TableAction, TableActionEnum, TableRowDataType } from './types'

interface ITableComponentProps {
      tableHeaders: string[]
      tableBodyData: TableRowDataType[]
      onButtonClick: (id: number, action: TableAction) => void
      startIndex: number
      endIndex: number
}

const TableComponent = ({
      tableHeaders,
      tableBodyData,
      onButtonClick,
      startIndex,
      endIndex,
}: ITableComponentProps) => {
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
                        {tableBodyData
                              .filter(
                                    (_, index) =>
                                          index >= startIndex &&
                                          index < endIndex
                              )
                              .map((row, rowIndex) => (
                                    <tr key={`DataRow ${rowIndex}`}>
                                          {Object.keys(row).map(
                                                (key, keyIndex) => {
                                                      const cellData =
                                                            row[
                                                                  tableHeaders[
                                                                        keyIndex
                                                                  ] as keyof typeof row
                                                            ]

                                                      return (
                                                            !Object.keys(
                                                                  TableAction
                                                            ).includes(
                                                                  key.toUpperCase()
                                                            ) && (
                                                                  <td
                                                                        key={`Row ${rowIndex}, ${key}`}
                                                                        className={
                                                                              typeof cellData ===
                                                                                    'string' &&
                                                                              Number.isNaN(
                                                                                    parseInt(
                                                                                          cellData,
                                                                                          10
                                                                                    )
                                                                              )
                                                                                    ? 'max-w-48'
                                                                                    : 'max-w-40'
                                                                        }
                                                                  >
                                                                        {
                                                                              <span
                                                                                    className={
                                                                                          'pointer-events-none select-none normal-case'
                                                                                    }
                                                                              >
                                                                                    {
                                                                                          cellData
                                                                                    }
                                                                              </span>
                                                                        }
                                                                  </td>
                                                            )
                                                      )
                                                }
                                          )}
                                          <td
                                                key={`Row ${rowIndex} action button`}
                                                className={'max-w-20'}
                                          >
                                                {row.edit !==
                                                      TableActionEnum.NOT_AVAILABLE && (
                                                      <button
                                                            onClick={() =>
                                                                  onButtonClick(
                                                                        row.id,
                                                                        TableAction.EDIT
                                                                  )
                                                            }
                                                      >
                                                            ✏️
                                                      </button>
                                                )}

                                                {row.delete !==
                                                      TableActionEnum.NOT_AVAILABLE && (
                                                      <button
                                                            onClick={() =>
                                                                  onButtonClick(
                                                                        row.id,
                                                                        TableAction.DELETE
                                                                  )
                                                            }
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

export default TableComponent
