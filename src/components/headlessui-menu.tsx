import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import LgSearchComponent from './lg-search'
import { useLanguage } from '@/hooks/useLanguage'
import { Input } from './ui/input'
import { typographyVariants } from './ui/typography'
import { Icon } from './ui/icons'
import { LgSearchMenuTransition } from './ui/transition'
import { cn } from '@/lib/utils'

export default function Example({ SearchLoadingState, searchSuggestions, searchButtonOnClick, searchData, queryData, isArabic, searchButtonOnMouseEnter }: { SearchLoadingState: any, queryData: any, searchSuggestions: any, searchData: any, isArabic: any, searchButtonOnMouseEnter: any, searchButtonOnClick: any }) {
  const { t } = useLanguage()

  return (
    <Menu as="div" className="w-full relative">
      {({ open }) => (
        <>
          <Menu.Button className="w-full">
            <Input type='text' iconVariantLeft={"inputIconLeft"} iconLeftType='searchIcon' iconRight={SearchLoadingState}
              iconLeft={true} iconRightType='loadingIcon' iconVariantRight={"inputLoadingIcon"} variant={"search"} onClick={() => searchButtonOnClick(true)}
              onChange={(e) => { searchButtonOnMouseEnter((e.target as HTMLInputElement).value) }}
              className={
                cn(typographyVariants({ size: "sm", bold: "light" }),
                  `${open ? "rounded-2xl rounded-b-none" : "rounded-full"}`)}
              ref={input => input && input.focus()}
              onKeyDown={(e) => e.key === "Enter" ? searchSuggestions((e.target as HTMLInputElement).value, false, "search") : null}
              defaultValue={queryData} id="lg-searchbox" placeholder={t.navbar.searchbox_text} />
          </Menu.Button>
          <LgSearchMenuTransition>
            <Menu.Items className="absolute right-0 z-30  left-0 bg-white rounded-lg rounded-t-none border-t w-full">
              <LgSearchComponent searchSuggestions={searchSuggestions} searchData={searchData} />
            </Menu.Items>
          </LgSearchMenuTransition>
        </>
      )}
    </Menu>
  )
}

