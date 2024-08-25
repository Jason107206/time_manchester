import { Card, CardContent, CardHeader, Paper, Typography } from "@mui/material"
import moment, { Moment } from "moment-timezone"
import { useEffect, useState } from "react"

const addDigit = (value: number) =>
  value.toString().length == 1 ? `0${value}` : `${value}`

const LocalClock = ({
  date, timeZone, regionName
}: {
  date: Moment,
  timeZone: string,
  regionName: string
}) => (
  <Paper
    variant="outlined"
    className="p-4"
  >
    <div
      className="grid gap-4"
    >
      <Typography
        variant="h5"
      >
        {regionName}
      </Typography>
      <div
        className="flex items-baseline gap-2"
      >
        <Typography
          variant="h4"
        >
          {addDigit(moment(date).tz(timeZone).hours())}
        </Typography>
        <Typography
          variant="h4"
        >
          {addDigit(moment(date).tz(timeZone).minutes())}
        </Typography>
        <Typography
          variant="h5"
        >
          {addDigit(moment(date).tz(timeZone).seconds())}
        </Typography>
      </div>
      <Typography
        variant="body2"
      >
        {moment(date).format('ll')}
      </Typography>
    </div>
  </Paper>
)

export default LocalClock