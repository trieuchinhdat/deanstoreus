import { create } from 'zustand'

interface MenuState {
	isOpen: boolean
	toggleMenu: () => void
	setMenu: (value: boolean) => void
}

const useMenuStore = create<MenuState>((set) => ({
	isOpen: false,
	toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
	setMenu: (value: boolean) => set({ isOpen: value }),
}))

export default useMenuStore
