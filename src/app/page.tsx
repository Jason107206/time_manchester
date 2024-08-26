'use client'

import { AccessTime, History } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogTitle, Fade, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { LocalizationProvider, PickersActionBarProps, StaticDateTimePicker, usePickersTranslations } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment, { Moment } from "moment-timezone";
import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";

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

  const handleTimeSelect = (date: Moment | null) => {
    setIsSelectingTime(false)
    if (date == null) {
      setMode(0)
      isRealtime.current = true
    } else {
      setMode(1)
      isRealtime.current = false
      setDate(date)
    }
  }

  const DateTimeActionBar = (props: PickersActionBarProps) => {
    const { onAccept, onCancel, onSetToday, actions, className } = props;
    const translations = usePickersTranslations();

    if (actions == null || actions.length === 0) {
      return null;
    }

    return (
      <DialogActions className={className + " justify-between"}>
        <Button
          onClick={onSetToday}
          key="today"
        >
          {translations.todayButtonLabel}
        </Button>
        <div>
          <Button
            onClick={onCancel}
            key="cancel"
          >
            {translations.cancelButtonLabel}
          </Button>
          <Button
            onClick={onAccept}
            key="accept"
          >
            {translations.okButtonLabel}
          </Button>
        </div>
      </DialogActions>
    );
  }

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
                  actions: ['today', 'cancel', 'accept']
                }
              }}
            />
          </LocalizationProvider>
        </Dialog>
        <RegionalClock
          date={date}
          timeZone="Asia/Hong_Kong"
          regionName="Hong Kong"
        />
      </div>
    </div>
  )
}
