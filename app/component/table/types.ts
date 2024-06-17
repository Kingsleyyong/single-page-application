export enum TableActionEnum {
      AVAILABLE = 'AVAILABLE',
      NOT_AVAILABLE = 'NOT_AVAILABLE',
      IS_ACTIVE = 'IS_ACTIVE',
}

export enum TableAction {
      EDIT = 'EDIT',
      DELETE = 'DELETE',
}

export type TableRowDataType = {
      rowDatas: string[]
      edit: TableActionEnum
      delete: TableActionEnum
}
