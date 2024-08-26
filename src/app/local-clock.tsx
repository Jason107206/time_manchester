import { Paper, Typography } from "@mui/material"
import moment, { Moment } from "moment-timezone"

const addDigit = (value: number) =>
  value.toString().length == 1 ? `0${value}` : `${value}`

const LocalClock = ({
  date, timeZone, regionName, isShowSecond
}: {
  date: Moment,
  timeZone: string,
  regionName: string,
  isShowSecond: boolean
}) => (
  <Paper
    elevation={2}
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
        {
          isShowSecond &&
          <Typography
            variant="h5"
          >
            {addDigit(moment(date).tz(timeZone).seconds())}
          </Typography>
        }
      </div>
      <Typography
        variant="body2"
      >
        {moment(date).tz(timeZone).format('ll')}
      </Typography>
    </div>
  </Paper>
)

export default LocalClock