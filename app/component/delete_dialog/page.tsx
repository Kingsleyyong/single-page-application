import { useAppDispatch, useAppSelector } from '@/app/lib'
import { deletePost } from '@/app/lib/post/postSlice'
import { onDialogCancel } from '@/app/lib/table/tableSlice'

export const DeleteDialog = () => {
      const posts = useAppSelector((state) => state.posts)
      const { showDialog } = useAppSelector((state) => state.tableData)
      const dispatch = useAppDispatch()

      const onDeleteConfirmation = () => {
            const post = posts.find(
                  (data) =>
                        data.id === showDialog?.id &&
                        data.userId === showDialog.userId
            )
            if (post === undefined) {
                  console.error('No post found.')
                  return
            }

            dispatch(deletePost(post)).then(() => {
                  dispatch(onDialogCancel())
            })
      }

      return (
            <div
                  className={
                        'absolute w-1/2 rounded-xl border-black bg-gray-700 p-8 shadow-xl drop-shadow-xl'
                  }
            >
                  <span className={'text-xl'}>
                        Are you sure to delete data in User ID:{' '}
                        {showDialog?.userId}, ID: {showDialog?.id}?
                  </span>

                  <div className={'flex w-full justify-end'}>
                        <button
                              className={'m-1'}
                              onClick={() => dispatch(onDialogCancel())}
                        >
                              Cancel
                        </button>
                        <button
                              className={'m-1'}
                              onClick={onDeleteConfirmation}
                        >
                              Confirm
                        </button>
                  </div>
            </div>
      )
}
