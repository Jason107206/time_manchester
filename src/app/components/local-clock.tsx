import { Place } from "@mui/icons-material"
import { Paper, Typography } from "@mui/material"
import moment, { Moment } from "moment-timezone"
import { addDigit } from "../utils"

const LocalClock = ({
  date, timeZone, regionName, isShowSecond
}: {
  date: Moment,
  timeZone: string,
  regionName: string,
  isShowSecond: boolean
}) => (
  <Paper
    variant="outlined"
    className="p-4"
  >
    <div
      className="grid gap-2"
    >
      <div
        className="flex gap-2 items-center"
      >
        <Place color="primary" />
        <Typography>
          {regionName}
        </Typography>
      </div>
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
        color="text.secondary"
      >
        {moment(date).tz(timeZone).format('ll')}
      </Typography>
    </div>
  </Paper>
)

export default LocalClock