const Loading = ({ className }: { className: string }) => {
      return (
            <div
                  className={`${className} animate-spin rounded-full border-2 border-solid border-gray-500 border-t-transparent shadow-md`}
            ></div>
      )
}

export default Loading
