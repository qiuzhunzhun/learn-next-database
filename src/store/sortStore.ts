import { create } from 'zustand'
import { SortValue } from '@/types/global'

type StoreState = {
    value:SortValue,
    setValue:(value:SortValue) => void
}

const useSortStore = create<StoreState>((set) => (
    {
        value:"latest",
        setValue:(value) => set({ value })
    }
))

export default useSortStore