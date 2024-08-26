'use client'

import { AccessTime, History, ImportExport } from "@mui/icons-material";
import { Dialog, Fade, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { LocalizationProvider, StaticDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment, { Moment } from "moment-timezone";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import DateTimeActionBar from "./date-time-action-bar";

const LocalClock = dynamic(() => import("./local-clock"), { ssr: false })
const RegionalClock = dynamic(() => import("./regional-clock"), { ssr: false })

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mode, setMode] = useState(0)

  const [date, setDate] = useState(moment(new Date()))
  const isRealtime = useRef(true)
  const [isSelectingTime, setIsSelectingTime] = useState(false)
  const [isChangingLocal, setIsChangingLocal] = useState(false)

  const resetTime = () => setTimeout(() => {
    if (isRealtime.current) {
      setDate(moment(new Date()))
      resetTime()
    }
  }, 500)

  const handleTimeSelect = (date: Moment | null) => {
    isRealtime.current = false
    setIsSelectingTime(false)
    setMode(1)
    setDate(date!)
  }

  useEffect(() => {
    setIsLoaded(true)
    resetTime()
  }, [])

  return (
    <Fade in={isLoaded}>
      <div>
        <div className="p-8 grid gap-8">
          {
            mode == 0 &&
            <LocalClock
              date={date}
              timeZone={isChangingLocal ? "Asia/Hong_Kong" : "Europe/London"}
              regionName={isChangingLocal ? "Hong Kong" : "Manchester"}
            />
          }
          {
            mode == 1 &&
            <RegionalClock
              date={date}
              timeZone={isChangingLocal ? "Asia/Hong_Kong" : "Europe/London"}
              regionName={isChangingLocal ? "Hong Kong" : "Manchester"}
            />

          }
          <div
            className="flex gap-2 justify-end"
          >
            <ToggleButtonGroup
              color="primary"
              exclusive
            >
              <ToggleButton
                value
                selected={mode == 0}
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
                selected={mode == 1}
                onChange={() => {
                  setIsSelectingTime(true)
                }}
              >
                <History />&nbsp;Specific Time
              </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButton
              value
              color="primary"
              selected={isChangingLocal}
              onChange={() => {
                setIsChangingLocal(s => !s)
              }}
            >
              <ImportExport />
            </ToggleButton>
          </div>
          <Dialog open={isSelectingTime}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <StaticDateTimePicker
                onAccept={date => handleTimeSelect(date)}
                defaultValue={date}
                slots={{
                  actionBar: DateTimeActionBar
                }}
                slotProps={{
                  actionBar: {
                    actions: ['today', 'accept']
                  }
                }}
              />
            </LocalizationProvider>
          </Dialog>
          <RegionalClock
            date={date}
            timeZone={isChangingLocal ? "Europe/London" : "Asia/Hong_Kong"}
            regionName={isChangingLocal ? "Manchester" : "Hong Kong"}
          />
        </div>
      </div>
    </Fade>
  )
}
