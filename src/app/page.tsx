'use client'

import { AccessTime, History } from "@mui/icons-material";
import { Fade, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { LocalizationProvider, StaticDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from "moment-timezone";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const LocalClock = dynamic(() => import("./local-clock"), { ssr: false })
const RegionalClock = dynamic(() => import("./regional-clock"), { ssr: false })

export default function Home() {
  const [date, setDate] = useState(moment(new Date()))

  const [mode, setMode] = useState(0)
  const isRealtime = useRef(true)
  const [isSelectingTime, setIsSelectingTime] = useState(false)

  const resetTime = () => setTimeout(() => {
    setDate(moment(new Date()))
    if (isRealtime.current) resetTime()
  }, 500)

  useEffect(() => {
    resetTime()
  }, [])

  return (
    <div>
      <div className="p-8 grid gap-8">
        <LocalClock
          date={date}
          timeZone="Europe/London"
          regionName="Manchester"
        />
        <div
          className="flex justify-end"
        >
          <ToggleButtonGroup
            color="primary"
            exclusive
          >
            <ToggleButton
              value
              selected={mode == 0 && !isSelectingTime}
              onChange={() => {
                if (mode == 1) {
                  setMode(0)
                  isRealtime.current = true
                  resetTime()
                }
                if (isSelectingTime) setIsSelectingTime(false)
              }}
            >
              <AccessTime />&nbsp;Now
            </ToggleButton>
            <ToggleButton
              value
              selected={isSelectingTime || mode == 1}
              onChange={() => {
                setIsSelectingTime(true)
              }}
            >
              <History />&nbsp;Specific Time
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        {
          isSelectingTime &&
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <StaticDateTimePicker
              onAccept={(date) => {
                setIsSelectingTime(false)
                if (date == null) {
                  setMode(0)
                  isRealtime.current = true
                } else {
                  setMode(1)
                  isRealtime.current = false
                  setDate(date)
                }
              }}
              slotProps={{
                actionBar: {
                  actions: ['today', 'accept']
                }
              }}
            />
          </LocalizationProvider>
        }
        {
          !isSelectingTime &&
          <Fade in={isSelectingTime}>
            <RegionalClock
              date={date}
              timeZone="Asia/Hong_Kong"
              regionName="Hong Kong"
            />
          </Fade>
        }
      </div>
    </div>
  )
}
