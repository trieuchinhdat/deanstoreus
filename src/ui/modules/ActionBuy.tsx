import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PortableText } from '@portabletext/react'
import { ResponsiveImg } from '@/ui/Img'
import { FaArrowRight } from 'react-icons/fa'

export default function ActionBuy({
	assets,
	layout,
	basicInfoBtn,
	content,
}: {
	assets?: Sanity.Img[]
	layout?: 'button' | 'product'
	basicInfoBtn?: any
	content?: any
}) {
	if (!basicInfoBtn?.url || !basicInfoBtn?.title) return null

	if (layout === 'button') {
		return (
			<div className="mt-6 flex items-start justify-start gap-3">
				<Link
					href={basicInfoBtn.url}
					target="_blank"
					rel="noopener noreferrer"
					className="btn-action-buy inline-block rounded bg-[#b4fd8c] px-6 py-3 text-[#121218] shadow transition duration-300 hover:bg-[#121218] hover:text-[#b4fd8c]"
				>
					{basicInfoBtn.title}
				</Link>
			</div>
		)
	}

	if (layout === 'product' && assets?.length) {
		const asset = assets?.[0]
		return (
			<div className="bg-global-style mt-6 mb-6 grid grid-cols-1 items-center gap-6 rounded-xl p-4 md:grid-cols-3">
				<div className="aspect-w-16 aspect-h-9 overflow-hidden rounded shadow md:col-span-1">
					<Link
						href={basicInfoBtn.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<ResponsiveImg
							img={asset}
							className="h-full w-full object-cover"
							width={400}
							draggable={false}
						/>
					</Link>
				</div>

				<div className="space-y-4 md:col-span-2">
					{content && (
						<div className="prose">
							<PortableText value={content} />
						</div>
					)}
					<Link
						href={basicInfoBtn.url}
						target="_blank"
						rel="noopener noreferrer"
						className="btn-action-buy inline-block rounded px-6 py-3 shadow transition duration-300"
					>
						{basicInfoBtn.title}
						<span className="absolute inset-0"></span>
					</Link>
				</div>
			</div>
		)
	}

	return null
}
