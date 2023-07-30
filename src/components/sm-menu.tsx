import { HomeIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { BsCart, BsCollection, BsHouse, BsPerson, BsSearch } from "react-icons/bs"
import { FaHome } from "react-icons/fa"

const SmMenu = ({ setSmScreenSearchBox, searchButtonOnClick, setSheetOpen, isSheetOpen }: { setSheetOpen: any, isSheetOpen: any, setSmScreenSearchBox: any, searchButtonOnClick: any }) => {
    const router = useRouter()
    const { pathname } = router
    const redirect = (url: string) => {
        router.push(url)
    }
    const { data: session } = useSession()

    return (
        <div className="fixed bottom-1 left-2 right-2 md:hidden    backdrop-blur-sm bg-opacity-95 bg-slate-100   py-4 items-center z-30 rounded-3xl">
            <div className="flex justify-between sm:px-6 px-5">
                <div>
                    <button onClick={() => redirect("/")} className={` ${pathname === "/" ? "text-blue-500 " : "text-gray-500"}`}>
                        <BsHouse className="sm:w-8 sm:h-8 w-6 h-6 mx-auto my-auto" />
                        <p className="sm:text-xs text-center text-[10px]">Home</p>
                    </button>
                </div>
                <div>
                    <button onClick={() => redirect("/category-menu/beauty-care")} className={` ${pathname.includes("category-menu") ? "text-blue-500 " : "text-gray-500"}`}>
                        <BsCollection className="sm:w-8 sm:h-8 w-6 h-6 mx-auto my-auto" />
                        <p className="sm:text-xs text-[10px]">Category</p>
                    </button>
                </div>
                <div >
                    <button onClick={() => {
                        setSmScreenSearchBox(true)
                        searchButtonOnClick(false)
                    }} className="active:text-blue-500 text-white bg-primary p-2 rounded-full" >
                        <BsSearch className="sm:w-8 sm:h-8 w-6 h-6 mx-auto my-auto " />
                    </button>
                </div>
                <div>
                    <button className={` ${pathname.includes("dashboard") ? "text-blue-500 " : "text-gray-500"}`} onClick={() => { session ? redirect("/dashboard") : setSheetOpen(true) }}>
                        <BsPerson className="sm:w-8 sm:h-8 w-6 h-6 mx-auto my-auto" />
                        <p className="sm:text-xs text-[10px]">Account</p>
                    </button>
                </div>
                <div>
                    <button className={` ${pathname.includes("cart") ? "text-blue-500 " : "text-gray-500"}`} onClick={() => redirect("/cart")}>
                        <BsCart className="sm:w-8 sm:h-8 w-6 h-6 mx-auto my-auto" />
                        <p className="sm:text-xs text-[10px] text-center">Cart</p>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default SmMenu