import { useAppDispatch, useAppSelector } from '@/app/lib'
import { Status } from '@/app/lib/loading/loadingSlice'
import { deletePost } from '@/app/lib/post/postSlice'
import { onDialogCancel } from '@/app/lib/table/tableSlice'
import Loading from '@/app/loading'

export const DeleteDialog = () => {
      const posts = useAppSelector((state) => state.posts)
      const { showDialog } = useAppSelector((state) => state.tableData)
      const loading = useAppSelector((state) => state.loadingStatus)

      const dispatch = useAppDispatch()

      const onDeleteConfirmation = () => {
            const post = posts.find(
                  (data) =>
                        data.id === showDialog?.id &&
                        data.userId === showDialog.userId
            )
            if (post === undefined) return

            dispatch(deletePost(post))
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
                              disabled={loading.status === Status.LOADING}
                              className={'m-1'}
                              onClick={onDeleteConfirmation}
                        >
                              {loading.status === Status.LOADING ? (
                                    <Loading className={'h-6 w-6'} />
                              ) : (
                                    'Confirm'
                              )}
                        </button>
                  </div>
            </div>
      )
}
