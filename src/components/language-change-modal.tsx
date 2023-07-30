import { Dialog, Transition, RadioGroup } from '@headlessui/react'
import { FC, Fragment, useState } from 'react'
import Image from 'next/image'
import { CheckCircleIcon, CheckIcon, ChevronLeftIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import TransitionComp from './ui/transition'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import ModalContainer from './ui/modal-container'

interface compProps {
    setModalState: any
    modalState: boolean
    currentLanguage: any
    currentCountry: any
    countries: any
    languages: any
    lang: any
}

const LanguageChangeModal: FC<compProps> = ({ setModalState, modalState, currentLanguage, currentCountry, countries, languages, lang }) => {
    const router = useRouter()
    const [IsLanguageChangeClicked, languageChangeClicked] = useState(false)
    const [IsCountryChangeClicked, CountryChangeClicked] = useState(true)
    const [selected, setSelected] = useState('')
    const [selectedCountryPath, setSelectedCountryPath] = useState("");

    function closeModal() {
        setModalState(false)
    }

    function languageOnClicked(path: any) {
        closeModal()
        router.push('', router.asPath, { locale: `${selectedCountryPath}-${path}` })
        toast.info("Language & Country changed successfully")

    }

    const countryProps = <div className='space-y-2'>
        {countries.map((contr: any) => (
            <div onClick={() => { countryClicked(contr.path) }} className="flex justify-between hover:bg-gray-200 border border-gray-200 rounded-lg p-2 cursor-pointer">
                <div className="flex items-center justify-start space-x-4 ">
                    <div className="md:h-10 md:w-10 w-6 h-6 rounded-full my-auto">
                        <Image src={contr.flag} height="20" width="20" className="h-full w-full" alt="" />
                    </div>

                    <span className="font-bold whitespace-nowrap md:text-base text-sm">{contr.country}</span>
                    {contr.path === currentCountry.path ?
                        <div className='bg-emerald-500  text-white xs:flex hidden rounded-full md:px-2 md:py-1 items-center space-x-2 px-2 py-0.5'>
                            <CheckIcon className='md:w-4 md:h-4 h-3 w-3' />
                            <span className='text-xs'>{currentLanguage.name}</span>
                        </div> : null
                    }
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 my-auto">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>

            </div>
        )
        )}
    </div>

    const languageProps = <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
        <div className="space-y-2">
            {languages.map((plan: any) => (
                <RadioGroup.Option
                    onClick={() => { languageOnClicked(plan.path) }}
                    key={plan.name}
                    value={plan.name}
                    className={({ active, checked }) =>
                        `
${checked ? 'bg-emerald-200 bg-opacity-75 ' : 'bg-white'
                        }
relative flex cursor-pointer rounded-lg px-5 md:py-4 py-2 shadow-md focus:outline-none`
                    }
                >
                    {({ active, checked }) => (
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                                <div className=" md:text-sm text-[10px]">
                                    <RadioGroup.Label
                                        as="p"
                                        className={`font-medium  ${checked ? '' : 'text-gray-900'
                                            }`}
                                    >
                                        {plan.name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                        as="span"
                                        className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'
                                            }`}
                                    >
                                    </RadioGroup.Description>
                                </div>
                            </div>
                            {checked && (
                                <div className="shrink-0 text-emerald-500">
                                    <CheckCircleIcon className='w-5 h-5 ' />
                                </div>
                            )}
                        </div>
                    )}
                </RadioGroup.Option>
            ))}
        </div>
    </RadioGroup>
    // function setLanguage() {
    //     for (let i = 0; i < languages.length; i++) {
    //         if (languages[i].name === currentLanguage.name) {
    //             return languages[i].name
    //         }
    //     }
    // }
    function languageBackClicked() {
        CountryChangeClicked(true)
        languageChangeClicked(false)
    }
    function countryClicked(path: string) {
        if (path === lang[0]) {
            setSelected(currentLanguage.name)
        }
        else {
            setSelected('')
        }
        CountryChangeClicked(false)
        languageChangeClicked(true)
        setSelectedCountryPath(path)
    }
    return (
        <>

            {/* <Transition appear show={modalState} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25 " />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">

                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-4 py-3 text-left align-middle shadow-xl transition-all relative sm:text-sm md:text-base text-xs"> */}


            <ModalContainer showModal={modalState} setCloseModal={closeModal}>
                <div className='flex justify-between space-x-3 my-auto items-center pb-3'>
                    {!IsCountryChangeClicked ?
                        <div onClick={() => { languageBackClicked() }} className='cursor-pointer border-[3px] border-muted rounded-lg p-1 h-fit hover:bg-gray-200'> <ChevronLeftIcon className='w-6 h-5 md:w-7 md:h-7' /></div>

                        : null}
                    <span className="font-bold md:text-lg text-base ">Select Your Preference</span>

                    <button className=" bg-transparent  hover:text-gray-900 rounded-lg text-sm  items-center  border-[3px] border-muted  p-1 h-fit hover:bg-gray-200" onClick={() => { closeModal() }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:w-6 md:h-6 h-4 w-4">
                            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>


                {IsCountryChangeClicked ?
                    <TransitionComp setTransition={IsCountryChangeClicked}>
                        {countryProps}
                    </TransitionComp>
                    : null}

                {IsLanguageChangeClicked ?
                    <TransitionComp setTransition={IsLanguageChangeClicked}>
                        {languageProps}
                    </TransitionComp>
                    : null}
            </ModalContainer>

            {/* </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition> */}
        </>
    )
}


export default LanguageChangeModal