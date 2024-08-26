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
    variant="outlined"
    className="p-4"
  >
    <div
      className="flex items-center justify-between"
    >
      <div
        className="grid gap-1"
      >
        <Typography
          variant="h5"
        >
          {regionName}
        </Typography>
        <Typography
          variant="body2"
        >
          {moment(date).tz(timeZone).format('ll')}
        </Typography>
      </div>
      <div
        className="flex gap-2"
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
    </div>
  </Paper>
)

export default RegionalClock