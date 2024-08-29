'use client'

import { regions } from "@/database/regions";
import { History } from "@mui/icons-material";
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment-timezone";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TimezonePicker from "./timezone-picker";

const DateTimePicker = ({
  defaultDate,
  defaultTimezone,
  setMode,
  setDate,
  setPickerOpened
}: {
  defaultDate: Moment | null,
  defaultTimezone: string,
  setMode: Dispatch<SetStateAction<number>>,
  setDate: Dispatch<SetStateAction<Moment>>,
  setPickerOpened: Dispatch<SetStateAction<boolean>>
}) => {
  const [dateInput, setDateInput] = useState<Moment | null>(defaultDate)
  const [timeInput, setTimeInput] = useState<Moment | null>(defaultDate)
  const [timezoneInput, setTimezoneInput] = useState<string>(defaultTimezone)

  const handleNow = () => {
    const date = moment().tz(timezoneInput)
    setDateInput(date)
    setTimeInput(date)
  }

  const handleSelect = () => {
    const date = dateInput ? dateInput : moment()
    date.tz(timezoneInput)
    date.hour(timeInput ? timeInput.hours() : date.hours()).minute(timeInput ? timeInput.minutes() : date.minutes())

    setMode(1)
    setDate(date)
    setPickerOpened(false)
  }

  useEffect(() => {
    if (dateInput !== null) setDateInput(x => x!.tz(timezoneInput))
    if (timeInput !== null) setTimeInput(x => x!.tz(timezoneInput))
  }, [timezoneInput])

  return (
    <Paper
      variant="outlined"
      className="p-4 grid gap-6"
    >
      <div
        className="flex gap-2 items-center"
      >
        <History color="primary" />
        <Typography>
          Specific Time
        </Typography>
      </div>
      <div
        className="p-2 grid"
      >
        <TimezonePicker
          timezone={timezoneInput}
          setTimezone={setTimezoneInput}
        />
      </div>
      <div
        className="p-2 grid gap-4"
      >
        <LocalizationProvider
          dateAdapter={AdapterMoment}
        >
          <div
            className="flex gap-2"
          >
            <MobileTimePicker
              ampm={false}
              label="Time"
              timezone={timezoneInput}
              value={timeInput}
              onAccept={date => setTimeInput(date)}
            />
            <MobileDatePicker
              label="Date"
              format="YYYY/MM/DD"
              timezone={timezoneInput}
              value={dateInput}
              onAccept={date => setDateInput(date)}
            />
          </div>
        </LocalizationProvider>
      </div>
      <div
        className="flex justify-between"
      >
        <Button onClick={handleNow}>
          Now
        </Button>
        <Button onClick={handleSelect}>
          OK
        </Button>
      </div>
    </Paper>
  )
}

export default DateTimePicker