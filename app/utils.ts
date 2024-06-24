export const sortByOrder = <T>(a: T[], b: T[]): T[] => {
      const indexMap = new Map<T, number>(a.map((item, index) => [item, index]))
      b.sort(
            (item1, item2) =>
                  (indexMap.get(item1) ?? Infinity) -
                  (indexMap.get(item2) ?? Infinity)
      )
      return b
}
