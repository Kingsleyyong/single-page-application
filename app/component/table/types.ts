import { PostsType } from '@/app/state/post/postSlice'

export enum TableActionEnum {
      AVAILABLE = 'AVAILABLE',
      NOT_AVAILABLE = 'NOT_AVAILABLE',
      IS_ACTIVE = 'IS_ACTIVE',
}

export enum TableAction {
      EDIT = 'EDIT',
      DELETE = 'DELETE',
}

export interface TableRowDataType extends PostsType {
      edit: TableActionEnum
      delete: TableActionEnum
}
