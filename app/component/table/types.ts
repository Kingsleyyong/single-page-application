// Redux
import { PostsType } from '@/app/lib/post/postSlice'

export enum TableActionEnum {
      AVAILABLE = 'AVAILABLE',
      NOT_AVAILABLE = 'NOT_AVAILABLE',
      IS_ACTIVE = 'IS_ACTIVE',
}

export enum TableAction {
      EDIT = 'EDIT',
      DELETE = 'DELETE',
      NEW_ENTRY = 'NEW_ENTRY',
}

export interface TableRowDataType extends PostsType {
      edit: TableActionEnum
      delete: TableActionEnum
}

export const LIMIT_PER_PAGE = 10

export interface TableComponentProps {
      tableHeaders: string[]
      tableBodyData: TableRowDataType[]
      onButtonClick: (id: number, rowAction: TableAction) => void
      startIndex: number
      endIndex: number
}
