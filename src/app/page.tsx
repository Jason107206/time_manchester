'use client'

import { regions } from "@/database/regions";
import { AccessTime, History, MyLocation } from "@mui/icons-material";
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

  const [localName, setLocalName] = useState(regions[0].name)
  const [localTimezone, setLocalTimezone] = useState(regions[0].timezone)

  const isRealtime = useRef(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPickerOpened, setPickerOpened] = useState(false)

  const resetTime = () => {
    if (isRealtime.current) {
      setDate(moment().tz(localTimezone))
      setTimeout(() => resetTime(), 200)
    }
  }

  const resetLocalTimezone = () => {
    const i = regions.findIndex(x => x.timezone === moment.tz.guess())
    if (i > -1) {
      setLocalName(regions[i].name)
      setLocalTimezone(regions[i].timezone)
    }
  }

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
    resetLocalTimezone()
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
          className="p-4 grid gap-4"
        >
          <LocalClock
            date={date}
            name={localName}
            timezone={localTimezone}
            isShowSecond={mode == 0}
          />
          {
            !isPickerOpened &&
            <div className="grid grid-cols-2 gap-4">
              {
                regions
                  .filter(x => x.timezone !== localTimezone)
                  .map((x, i) =>
                    <RegionalClock
                      key={i}
                      date={date}
                      name={x.name}
                      timezone={x.timezone}
                    />
                  )
              }
            </div>
          }
          {
            isPickerOpened &&
            <DateTimePicker
              defaultTimezone={localTimezone}
              defaultDate={mode == 1 ? date : null}
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
            onChange={() => resetLocalTimezone()}
          >
            <MyLocation />
          </ToggleButton>
        </div>
      </div>
    </Fade>
  )
}
