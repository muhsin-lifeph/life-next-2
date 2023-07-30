import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/hooks/useLanguage"
import LgScreenSubMenu from "./lg-screen-sub-menu"
import Example from "./headlessui-menu"
const LgNavbar = ({ setSheetOpen, setLocationModal, searchButtonOnMouseEnter, SearchLoadingState, queryData, isArabic, children, searchSuggestions, setLanguageModal, searchButtonOnClick, searchData }: { setSheetOpen: any, searchData: any, searchButtonOnClick: any, SearchLoadingState: any, setLanguageModal: any, children: any, queryData: any, isArabic: boolean, searchSuggestions: any, searchButtonOnMouseEnter: any, setLocationModal: any }) => {

  const { countries, languages } = useLanguage()

  return (
    <div className="container-page flex gap-5  sm:py-3 py-1 items-center">
      <Link href={"/"} className="my-auto block">
        <Image src="https://www.lifepharmacy.com/images/logo-white.svg" alt=""
          className=" md:flex hidden" width={380} height={250} />
        <Image className="mr-auto w-7 lg:hidden md:hidden" src="https://www.lifepharmacy.com/images/life.svg" alt="" width={100} height={100} />
      </Link>

      {/* {SearchLoadingState ?
        <svg fill="none" className={`animate-spin w-5 h-5 absolute inline ${isArabic ? "left-8" : "right-8"}  inset-y-0 m-auto w-4 h-4 mx-2`} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" shape-rendering="geometricPrecision" viewBox="0 0 24 24" height="24" width="24" ><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg> : ""} */}
      <Example SearchLoadingState={SearchLoadingState} searchButtonOnClick={searchButtonOnClick} searchButtonOnMouseEnter={searchButtonOnMouseEnter} searchSuggestions={searchSuggestions} searchData={searchData} queryData={queryData} isArabic={isArabic} />

      <LgScreenSubMenu  setSheetOpen={setSheetOpen} countries={countries} languages={languages} setLanguageModal={setLanguageModal} setLocationModal={setLocationModal} />
    </div>
  )
}

export default LgNavbar