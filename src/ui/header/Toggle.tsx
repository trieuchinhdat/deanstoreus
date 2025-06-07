'use client'
import useMenuStore from '../../store/menuStore'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { TfiClose } from 'react-icons/tfi'

const Toggle = () => {
	const { isOpen, toggleMenu, setMenu } = useMenuStore()
	const pathname = usePathname()

	useEffect(() => {
		setMenu(false)
	}, [pathname, setMenu])

	return (
		<label className="btn-global-style flex h-8 w-8 items-center justify-center rounded [grid-area:toggle] md:hidden">
			<input
				id="header-toggle"
				type="checkbox"
				hidden
				checked={isOpen}
				onChange={toggleMenu}
			/>
			<span className="header-open:hidden">
				<CiMenuBurger fill="#ffffff" />
			</span>
			<span className="header-closed:hidden">
				<TfiClose fill="#ffffff" />
			</span>
		</label>
	)
}

export default Toggle
