import { Paper, Typography } from "@mui/material"
import moment, { Moment } from "moment-timezone"

const addDigit = (value: number) =>
  value.toString().length == 1 ? `0${value}` : `${value}`

const RegionalClock = ({
  date, timeZone, regionName
}: {
  date: Moment,
  timeZone: string,
  regionName: string
}) => (
  <Paper
    elevation={4}
    className="p-4"
  >
    <div
      className="grid gap-2"
    >
      <Typography
        variant="h6"
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
      </div>
      <Typography
        color="text.secondary"
      >
        {moment(date).tz(timeZone).format('ll')}
      </Typography>
    </div>
  </Paper>
)

export default RegionalClock