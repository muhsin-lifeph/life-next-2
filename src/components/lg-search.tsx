import { ChatBubbleOvalLeftIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { Typography } from './ui/typography'
import { Button } from './ui/button'


export default function LgSearchComponent({ searchData, searchSuggestions }: { searchData: any, searchSuggestions: any }) {

    const productSuggestionList = Array(10).fill(
        <div role="status" className="mb-3 flex">
            <div className="loading-img "></div>
            <div className="h-10 w-full mx-4">
                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )

    return (
        <div className="shadow-xl px-3 absolute top-13  right-0 left-0  bg-white  rounded-t-0 rounded-b-md z-50 border-t-1 border-muted">
            {searchData.results[1] ?
                <>
                    <div className="mb-5 group-search sticky top-0 bg-white pt-4">
                        {searchData?.results[1]?.hits[0] ?
                            <>
                                <Typography size={"sm"} variant={"primary"} >SUGGESTIONS</Typography>
                                <div className="flex my-2 flex-wrap  group-search">
                                    {searchData.results[1].hits.slice(0, 10).map((sug_data: any) => (
                                        <Button size={"sm"} rounded={"full"} onClick={() => {
                                            searchSuggestions(sug_data.query, false, "search")
                                        }} variant={"normal"} className="mr-2 mb-2">{sug_data.query}</Button>
                                    ))}
                                </div>
                            </>
                            : ""}
                    </div>
                    <div className="text-gray-600 group-search overflow-y-auto search-suggestion-height">
                        <Typography size={"sm"} variant={"primary"} >PRODUCTS</Typography>

                        {searchData.results[0].hits[0] ? searchData.results[0].hits.map((pro_data: any) => (
                            <div onClick={() => {
                                searchSuggestions(pro_data.slug, false, "products")
                            }} className="p-2 rounded-lg flex  group-search hover:bg-gray-100 w-full h-16 cursor-pointer">
                                <Image src={pro_data.images ? pro_data.images.featured_image : "/images/default-product-image.png"} height={40} width={40} alt={pro_data.title} className="border-[3px] rounded border-muted"></Image>
                                <p className="mx-2  my-auto">{pro_data.title} </p>
                            </div>
                        )) : <div className='mx-auto w-fit p-2'>
                            <Image src="/images/no-products-found.png" alt="no-search-results" width={150} height={150} />
                            <p className='text-center'>Oops! Products Not Found</p>
                            <button className='bg-blue-600 hover:bg-blue-700 flex space-x-3 items-center px-3 py-2 rounded-md mt-2 mx-auto'>
                                <ChatBubbleOvalLeftIcon className='w-5 h-5 fill-white' />
                                <h5 className='text-white'>Chat With Us</h5>
                            </button>
                        </div>}
                    </div>
                </> : <div role="status" className="max-w-full animate-pulse">
                    <div className="group-search mb-5 pt-4">
                        <Typography size={"sm"} variant={"primary"} >SUGGESTIONS</Typography>

                        <div className="group-search my-2 flex flex-wrap text-[13px] text-gray-700">
                            <span className="sr-only">Loading...</span>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                        </div>
                        <div className="group-search text-xs text-gray-600">
                            <h5 className="mb-3 text-xs text-sky-500">PRODUCTS</h5>
                            {productSuggestionList.map(proSuggList => proSuggList)}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}