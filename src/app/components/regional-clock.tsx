import { Paper, Typography } from "@mui/material"
import moment, { Moment } from "moment-timezone"
import { addDigit } from "../utils"

const RegionalClock = ({
  date, name, timezone
}: {
  date: Moment,
  name: string,
  timezone: string
}) => (
  <Paper
    variant="outlined"
    className="p-4"
  >
    <div
      className="grid gap-2"
    >
      <Typography>
        {name}
      </Typography>
      <div
        className="flex items-baseline gap-2"
      >
        <Typography
          variant="h4"
        >
          {addDigit(moment(date).tz(timezone).hours())}
        </Typography>
        <Typography
          variant="h4"
        >
          {addDigit(moment(date).tz(timezone).minutes())}
        </Typography>
      </div>
      <Typography
        variant="body2"
        color="text.secondary"
      >
        {moment(date).tz(timezone).format('ll')}
      </Typography>
    </div>
  </Paper>
)

export default RegionalClock