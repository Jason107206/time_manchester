'use client'

import { clockList } from "@/database/clock-list";
import { AccessTime, History, ImportExport } from "@mui/icons-material";
import { Fade, ToggleButton, ToggleButtonGroup } from "@mui/material";
import moment from "moment-timezone";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { setTimeout } from "timers";
import DateTimePickerDialog from "./date-time-picker-dialog";

const LocalClock = dynamic(() => import("./local-clock"), { ssr: false })
const RegionalClock = dynamic(() => import("./regional-clock"), { ssr: false })

export default function Home() {
  const [mode, setMode] = useState(0)
  const [date, setDate] = useState(moment(new Date()))

  const isRealtime = useRef(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPickerOpened, setPickerOpened] = useState(false)

  const [localIndex, setLocalIndex] = useState(0)

  const resetTime = () => {
    if (isRealtime.current) {
      setDate(moment(new Date()))
      setTimeout(() => resetTime(), 200)
    }
  }

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
    resetTime()
  }, [])

  useEffect(() => {
    if (mode == 0) {
      isRealtime.current = true
      resetTime()
    } else {
      isRealtime.current = false
    }
  }, [mode])

  return (
    <Fade in={isLoaded}>
      <div className="p-8 h-full grid grid-rows-[1fr_auto] gap-4">
        <div>
          <div className="grid gap-8">
            <LocalClock
              date={date}
              timeZone={clockList[localIndex].timeZone}
              regionName={clockList[localIndex].regionName}
              isShowSecond={mode == 0}
            />
            {
              clockList
                .filter((x, i) => i !== localIndex)
                .map((x, i) =>
                  <RegionalClock
                    key={i}
                    date={date}
                    timeZone={x.timeZone}
                    regionName={x.regionName}
                  />
                )
            }
          </div>
        </div>
        <div
          className="flex gap-4 justify-end"
        >
          <ToggleButtonGroup
            color="primary"
            exclusive
          >
            <ToggleButton
              value
              selected={mode == 0}
              onChange={() => setMode(m => m == 1 ? 0 : 1)}
            >
              <AccessTime />&nbsp;Now
            </ToggleButton>
            <ToggleButton
              value
              selected={mode == 1}
              onChange={() => setPickerOpened(true)}
            >
              <History />&nbsp;Specific Time
            </ToggleButton>
          </ToggleButtonGroup>
          <ToggleButton
            value
            color="primary"
            selected={localIndex !== 0}
            onChange={() => setLocalIndex(s => s == 1 ? 0 : 1)}
          >
            <ImportExport />
          </ToggleButton>
        </div>
        <DateTimePickerDialog
          open={isPickerOpened}
          setMode={setMode}
          setDate={setDate}
          setPickerOpened={setPickerOpened}
        />
      </div>
    </Fade>
  )
}
