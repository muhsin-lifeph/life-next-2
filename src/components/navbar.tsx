import Image from "next/image";
import { useEffect } from "react";
import { useState, Fragment } from "react";
import 'react-phone-number-input/style.css';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from 'react'

import { SmSearchBoxModal } from "./sm-searchbox-modal";
import SmMenu from "./sm-menu";
import { useLanguage } from "@/hooks/useLanguage";
import LgNavbar from "./lg-navbar";
import SmNavbarTop from "./sm-navbar-top";
import getSearchDataSuggestions from "@/lib/getSearchData";
import NavbarBottom from "./lg-navbar-top";
import dynamic from 'next/dynamic'
import { useModal } from "./ui/modalcontext";

const LgNavbarMenu = dynamic(() => import('./lg-navbar-menu'), {
  ssr: false,
})

const LanguageChangeModal = dynamic(() => import('./language-change-modal'), {
  ssr: false,
})
const LocationModal = dynamic(() => import('./location-modal'), {
  ssr: false,
})
const AuthModal = dynamic(() => import('./authorixzation-modal'), {
  ssr: false,
})
const InvalidOTPModal = dynamic(() => import('./invalid-otp-modal'), {
  ssr: false,
})
const AddressModal = dynamic(() => import('./address-modal'), {
  ssr: false,
})

interface navbarProps {
  data: any,
  brands_data: any,
  isArabic: boolean,
  lang: string
}

const Navbar: FC<navbarProps> = ({ data, brands_data, isArabic, lang }) => {

  const { t, countries, languages } = useLanguage()

  //-----------------------------hooks-------------------------------------
  const { data: session } = useSession()

  const { locale } = useLanguage()
  const [showElement, setShowElement] = useState(false);
  const [overlayVisible, setOverlay] = useState(false);
  const [searchClosebtn, setVisibility] = useState(false);
  const [addNewAddressClick, setAddNewAddressClick] = useState(false);
  // const [showNavbarAcc, setShowNavbarAcc] = useState(false);
  const [languageModal, setLanguageModal] = useState(false)
  const [smScreenSearchBox, setSmScreenSearchBox] = useState(false)
  const [SearchLoadingState, setSearchLoadingState] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTimer, setSearchTimer] = useState<any>(null)
  const [queryData, setQueryData] = useState("")

  //setModalVisibility


  const [searchData, setData] = useState({
    results: [
      {
        hits: [
          {
            title: "",
            images: {
              featured_image: "https://www.life-me.com/wp-content/themes/LifePharmacy/assets/images/life-pharmacy-logo-white.png"
            },
            query: "",
            slug: ""
          }
        ]
      },

    ]
  })


  //default-address


  const router = useRouter();

  //-----------------------------hooks-------------------------------------

  useEffect(() => {
    if (!showDropdown) return;
    function handleClick(event: any) {
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);


  const searchSuggestions = (searchData: string, isMobile: boolean, type: string) => {
    debugger
    if (isMobile) {
      setSmScreenSearchBox(false)
    }
    else {
      searchButtonOnClick(false)
    }
    if (type === "search") {
      router.push(`/search?term=${searchData}`)
    }
    else {
      router.push(`/product/${searchData}`)
    }
  }


  const searchButtonOnClick = (isOpen: boolean) => {
    if (window.innerWidth > 767) {
      // const lgScreenSearchBox = document.getElementById("lg-screen-search") as HTMLInputElement

      // if (isOpen) {
      //   // document.getElementsByClassName("lg-screen-searchsuggestion-lg")[0].classList.remove("hidden");
      //   lgScreenSearchBox.classList.remove("rounded-full");
      //   lgScreenSearchBox.classList.add("rounded-b-none", "rounded-3xl");
      // }
    }
    else {
      setSmScreenSearchBox(true)
    }
    searchButtonOnMouseEnter(queryData)
  }

  const searchBoxClear = () => {
    (document.getElementById("sm-searchbox") as HTMLInputElement).value = ""
    setQueryData("")
    searchButtonOnMouseEnter("")
    setVisibility(false);
  }

  function searchButtonOnMouseEnter(query: string) {
    setQueryData(query)

    clearTimeout(searchTimer)

    const newTimer = setTimeout(() => {
      getSearchData(query)
    }, 600)

    setSearchTimer(newTimer)

    if (query != "") {
      setVisibility(true);
    }
    else {
      setVisibility(false);
    }
  }

  const getSearchData = (query: string) => {
    setSearchLoadingState(true)
    getSearchDataSuggestions(query).then(res => {
      setData(res)
      setSearchLoadingState(false)
    })
  }



  const locationOnClickHandle = () => {
    debugger
    if (session != null) {
      setaddNewAddress(true)

      if (session.token.addresses.length > 0) {
        setavailableAddresses(true)
      }
      else if (session.token.addresses.length === 0) {
        setAddNewAddressClick(true)
      }
    }
    else {
      setLocationModalState(true);
    }
  }

  const setModalState = (modalState: any) => {
    setLanguageModal(modalState)
  }
  const { locationModalState,
    setLocationModalState,
    setSheetOpen,
    setaddNewAddress,

    setnotValidOTPPageVisib,
    isSheetOpen,

    setLocationModal,
    notValidOTPPageVisib,

    AddressDataIndex,

    setavailableAddresses,
  } = useModal();

  const parts = locale ? locale?.split("-") : ["ae", "en"]
  return (

    <>

      <div className="sticky top-0 z-50 bg-white mx-auto">
        <SmNavbarTop />
        <div className="md:bg-[#002579] bg-white  backdrop-blur backdrop-filter ">
          <LgNavbar setSheetOpen={setSheetOpen} searchData={searchData} SearchLoadingState={SearchLoadingState} queryData={queryData} isArabic={isArabic} searchSuggestions={searchSuggestions} searchButtonOnMouseEnter={searchButtonOnMouseEnter} setLanguageModal={setLanguageModal} setLocationModal={setLocationModal} searchButtonOnClick={searchButtonOnClick}>
            <input type="button" onClick={() => {
              setSmScreenSearchBox(true)
            }} className={`cursor-pointer md:hidden block bg-gray-50 border border-slate-300 text-[#9ba0b1] text-sm rounded-lg focus:ring-0 w-full ${isArabic ? "text-right pr-12" : "pl-10 text-left"}  p-3  rounded-full`}
              value={t.navbar.searchbox_text} />
          </LgNavbar>
          <NavbarBottom locationOnClickHandle={locationOnClickHandle} AddressDataIndex={AddressDataIndex} />
          {/* <LgNavbarMenu setOverlay={setOverlay} data={data} brands_data={brands_data} /> */}
          <LgNavbarMenu data={data} setOverlay={setOverlay} brands_data={brands_data} />
        </div>
      </div>

      {/* modals */}
      <LocationModal showModal={locationModalState} setCloseModal={setLocationModalState} />

      <AuthModal />

      <InvalidOTPModal showModal={notValidOTPPageVisib} setCloseModal={setnotValidOTPPageVisib} />

      <AddressModal />

      <LanguageChangeModal setModalState={setModalState} modalState={languageModal} currentLanguage={parts[1] === "ar" ? languages[0] : languages[1]} currentCountry={parts[0] === "sa" ? countries[1] : countries[0]} countries={countries} languages={languages} lang={parts} />

      <SmSearchBoxModal showModal={smScreenSearchBox} setCloseModal={setSmScreenSearchBox} isArabic={isArabic} queryData={queryData} setQueryData={setQueryData} searchButtonOnMouseEnter={searchButtonOnMouseEnter} SearchLoadingState={SearchLoadingState} searchData={searchData} searchBoxClear={searchBoxClear} searchSuggestions={searchSuggestions} searchClosebtn={searchClosebtn} />

      <SmMenu searchButtonOnClick={searchButtonOnClick} setSmScreenSearchBox={setSmScreenSearchBox} isSheetOpen={isSheetOpen} setSheetOpen={setSheetOpen} />

      {
        overlayVisible ? <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-10" />
          : null
      }



    </>
  );
};

export default Navbar; 