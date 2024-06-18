import { Fragment, useEffect } from 'react'
import { TableAction, TableActionEnum, TableRowDataType } from './types'
import { isString } from 'util'

interface ITableComponentProps {
      tableHeaders: string[]
      tableData: TableRowDataType[]
      onButtonClick: (id: number, action: TableAction) => void
}

export const TableComponent = ({
      tableHeaders,
      tableData,
      onButtonClick,
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
                        {tableData.map((row, rowIndex) => (
                              <tr key={`DataRow ${rowIndex}`}>
                                    {Object.keys(row).map((key, keyIndex) => {
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
                                                            <span
                                                                  className={
                                                                        'pointer-events-none select-none normal-case'
                                                                  }
                                                            >
                                                                  {cellData}
                                                            </span>
                                                      </td>
                                                )
                                          )
                                    })}
                                    {/* make sure change on posts state, not table header or body state */}
                                    <td>
                                          {row.edit} | {row.delete}
                                    </td>

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
                                                      className={'select-none'}
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
