'use client'

import { History } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment-timezone";
import { Dispatch, SetStateAction, useState } from "react";

const DateTimePicker = ({
  defaultDate,
  timeZone,
  setMode,
  setDate,
  setPickerOpened
}: {
  defaultDate: Moment | null,
  timeZone: string,
  setMode: Dispatch<SetStateAction<number>>,
  setDate: Dispatch<SetStateAction<Moment>>,
  setPickerOpened: Dispatch<SetStateAction<boolean>>
}) => {
  const [dateInput, setDateInput] = useState<Moment | null>(defaultDate)
  const [timeInput, setTimeInput] = useState<Moment | null>(defaultDate)

  const handleNow = () => {
    const date = moment()
    setDateInput(date)
    setTimeInput(date)
  }

  const handleClear = () => {
    setDateInput(null)
    setTimeInput(null)
  }

  const handleSelect = () => {
    const date = dateInput ? dateInput : moment()
    date.hour(timeInput ? timeInput.hours() : date.hours()).minute(timeInput ? timeInput.minutes() : date.minutes())

    setMode(1)
    setDate(date.tz(timeZone))
    setPickerOpened(false)
  }

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
        className="p-1 flex gap-4"
      >
        <LocalizationProvider
          dateAdapter={AdapterMoment}
        >
          <MobileTimePicker
            ampm={false}
            label="Time"
            timezone={timeZone}
            value={timeInput}
            onAccept={date => setTimeInput(date)}
          />
          <MobileDatePicker
            label="Date"
            format="YYYY/MM/DD"
            timezone={timeZone}
            value={dateInput}
            onAccept={date => setDateInput(date)}
          />
        </LocalizationProvider>
      </div>
      <div
        className="flex justify-between"
      >
        <Button onClick={handleNow}>
          Now
        </Button>
        <div
          className="flex gap-2"
        >
          <Button onClick={handleClear}>
            Clear
          </Button>
          <Button onClick={handleSelect}>
            OK
          </Button>
        </div>
      </div>
    </Paper>
  )
}

export default DateTimePicker