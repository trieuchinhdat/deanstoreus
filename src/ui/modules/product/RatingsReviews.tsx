'use client'
import { useState } from 'react'
import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import { FaStar } from 'react-icons/fa6'
import { BsFillPatchCheckFill } from 'react-icons/bs'

import ImageReview from '../RichtextModule/ImageReview'
import Link from 'next/link'

const REVIEWS_PER_PAGE = 4

export default function RatingsReviews({
	reviews,
	urlreviewsgsheet,
	idreviewsnameproduct,
}: Partial<{
	reviews: Sanity.RatingsReviews
	urlreviewsgsheet: string
	idreviewsnameproduct: string
}>) {
	const reviewItems = reviews?.reviewItems || []
	const [currentPage, setCurrentPage] = useState(1)

	// Tính tổng số trang
	const totalPages = Math.ceil(reviewItems.length / REVIEWS_PER_PAGE)

	// Tính phần tử review hiển thị trang hiện tại
	const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE
	const currentReviews = reviewItems.slice(
		startIndex,
		startIndex + REVIEWS_PER_PAGE,
	)

	const handlePrev = () => {
		setCurrentPage((page) => Math.max(page - 1, 1))
	}

	const handleNext = () => {
		setCurrentPage((page) => Math.min(page + 1, totalPages))
	}

	return (
		<section
			className="section-reviews"
			id="id-section-reviews"
			style={{ backgroundColor: reviews?.backgroundColor || '#ffffff' }}
		>
			<div className="section ml-auto space-y-8">
				{reviews?.title && (
					<header className="richtext text-start text-balance">
						<h3 className="mb-4 max-md:text-[18px]">{reviews.title}</h3>
						<Link
							href={`${urlreviewsgsheet}?entry.${idreviewsnameproduct}=${encodeURIComponent(reviews?.title || '')}`}
							className="action min-w-[180px] font-bold max-sm:w-full"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Viết đánh giá sản phẩm"
							title="Viết đánh giá sản phẩm"
						>
							Viết đánh giá sản phẩm
						</Link>
					</header>
				)}

				<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
					{currentReviews.map((item: any, idx: number) => (
						<div
							key={startIndex + idx}
							className="space-y-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
						>
							<div className="flex flex-wrap items-center">
								<h3 className="mr-2 text-lg font-semibold">{item.title}</h3>
								{item.approved && (
									<span className="flex items-center text-[#2ba832]">
										<BsFillPatchCheckFill color="#2ba832" />
										<span className="ml-1 text-[12px] font-bold">
											Đã mua hàng
										</span>
									</span>
								)}
							</div>

							<div className="flex gap-1 text-yellow-500">
								{Array.from({ length: 5 }).map((_, i) => (
									<FaStar
										key={i}
										className={cn(
											'h-4 w-4',
											i < (item.rating || 0)
												? 'text-yellow-500'
												: 'text-gray-300',
										)}
									/>
								))}
							</div>

							<div className="prose prose-sm max-w-none text-gray-700">
								<PortableText
									value={item.content}
									components={{
										types: {
											image: ImageReview,
										},
									}}
								/>
							</div>
							<div className="text-xs text-gray-500">
								{new Date(item.publishDate).toLocaleDateString('vi-VN', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
								})}
							</div>
						</div>
					))}
				</div>

				{/* Pagination Controls */}
				{totalPages > 1 && (
					<div className="mt-6 flex items-center justify-center space-x-4">
						<button
							onClick={handlePrev}
							disabled={currentPage === 1}
							className={cn(
								'rounded px-4 py-2 font-semibold',
								currentPage === 1
									? 'cursor-not-allowed bg-gray-300 text-gray-600'
									: 'btn-global-style text-white',
							)}
						>
							Prev
						</button>

						<span className="text-gray-700">
							Page {currentPage} of {totalPages}
						</span>

						<button
							onClick={handleNext}
							disabled={currentPage === totalPages}
							className={cn(
								'rounded px-4 py-2 font-semibold',
								currentPage === totalPages
									? 'cursor-not-allowed bg-gray-300 text-gray-600'
									: 'btn-global-style text-white',
							)}
						>
							Next
						</button>
					</div>
				)}
			</div>
		</section>
	)
}
