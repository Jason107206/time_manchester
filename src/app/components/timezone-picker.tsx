import { regions } from "@/database/regions"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

const TimezonePicker = ({
  timezone, setTimezone
}: {
  timezone: string,
  setTimezone: Dispatch<SetStateAction<string>>
}) => (
  <FormControl>
    <InputLabel id="timezoneSelector">Timezone</InputLabel>
    <Select
      labelId="timezoneSelector"
      label="Timezone"
      value={timezone}
      onChange={x => setTimezone(x.target.value)}
    >
      {
        regions.map((x, i) =>
          <MenuItem
            key={i}
            value={x.timezone}
          >
            {x.name}
          </MenuItem>
        )
      }
    </Select>
  </FormControl>
)

export default TimezonePicker