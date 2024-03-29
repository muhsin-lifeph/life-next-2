import { useState } from "react"
import { TransitionComp } from "./ui/transition"
import { useLanguage } from "@/hooks/useLanguage"
import { Icon } from "./ui/icons"
import { Typography } from "./ui/typography"
const SmNavbarTop = () => {
    const [highestRatedP, sethighestRatedP] = useState(true)
    const { t } = useLanguage()
    return (
        highestRatedP ?
            <TransitionComp
                setTransition={highestRatedP} >
                <div className="flex bg-life-2 text-white text-xs px-2 py-1 md:hidden justify-between items-center">
                    <div className="flex justify-start items-center space-x-2">
                        <Icon type="crossIcon" size={"sm"} />
                        <Typography lineClamp={"one"} size={"sm"} >{t.navbar.highest_rated_phar}</Typography>
                    </div>
                    <Typography size={"sm"} className="whitespace-nowrap">{t.navbar.download_now}</Typography>
                </div>
            </TransitionComp>
            : null
    )
}

export default SmNavbarTop