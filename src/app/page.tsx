'use client'

import { clockList } from "@/database/clock-list";
import { AccessTime, History, ImportExport } from "@mui/icons-material";
import { Fade, ToggleButton, ToggleButtonGroup } from "@mui/material";
import moment from "moment-timezone";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { setTimeout } from "timers";
import DateTimePicker from "./components/date-time-picker";

const LocalClock = dynamic(() => import("./components/local-clock"), { ssr: false })
const RegionalClock = dynamic(() => import("./components/regional-clock"), { ssr: false })

export default function Home() {
  const [mode, setMode] = useState(0)
  const [date, setDate] = useState(moment())

  const isRealtime = useRef(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPickerOpened, setPickerOpened] = useState(false)

  const [localIndex, setLocalIndex] = useState(0)

  const resetTime = () => {
    if (isRealtime.current) {
      setDate(moment())
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
      <div>
        <div
          className="p-8 grid gap-4"
        >
          <LocalClock
            date={date}
            timeZone={clockList[localIndex].timeZone}
            regionName={clockList[localIndex].regionName}
            isShowSecond={mode == 0}
          />
          {
            !isPickerOpened &&
            <div className="grid grid-cols-2 gap-4">
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
          }
          {
            isPickerOpened &&
            <DateTimePicker
              defaultDate={mode == 1 ? date : null}
              timeZone={clockList[localIndex].timeZone}
              setMode={setMode}
              setDate={setDate}
              setPickerOpened={setPickerOpened}
            />
          }
        </div>
        <div
          className="absolute bottom-0 p-4 w-full flex gap-4 justify-end"
        >
          <ToggleButtonGroup
            color="primary"
            exclusive
          >
            <ToggleButton
              value
              selected={!isPickerOpened && mode == 0}
              onChange={() => {
                setPickerOpened(false)
                setMode(0)
              }}
            >
              <AccessTime />&nbsp;Now
            </ToggleButton>
            <ToggleButton
              value
              selected={isPickerOpened || mode == 1}
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
      </div>
    </Fade>
  )
}
