'use client'

import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogActions, Fade, IconButton } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { LocalizationProvider, PickersActionBarProps, StaticDateTimePicker, usePickersTranslations } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment-timezone";
import { Dispatch, forwardRef, SetStateAction } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Fade ref={ref} {...props} />;
})

const DateTimeActionBar = (props: PickersActionBarProps) => {
  const { onAccept, onSetToday, actions, className } = props;
  const translations = usePickersTranslations();

  if (actions == null || actions.length === 0) {
    return null;
  }

  return (
    <DialogActions className={className + " !justify-between"}>
      <Button
        onClick={onSetToday}
        key="today"
      >
        {translations.todayButtonLabel}
      </Button>
      <Button
        onClick={onAccept}
        key="accept"
      >
        {translations.okButtonLabel}
      </Button>
    </DialogActions>
  );
}

const DateTimePickerDialog = ({
  open,
  setMode,
  setDate,
  setPickerOpened
}: {
  open: boolean,
  setMode: Dispatch<SetStateAction<number>>,
  setDate: Dispatch<SetStateAction<moment.Moment>>,
  setPickerOpened: Dispatch<SetStateAction<boolean>>
}) => {
  const handleSelect = (date: Moment | null) => {
    if (date !== null) {
      setMode(1)
      setDate(date)
    }
    setPickerOpened(false)
  }

  return (
    <Dialog
      open={open}
      fullScreen={window.innerWidth < 425 || window.innerHeight < 715}
      TransitionComponent={Transition}
    >
      <div
        className="p-2 h-full grid gap-2"
      >
        <div
          className="p-2 flex gap-2 justify-end"
        >
          <div>
            <IconButton
              color="primary"
              onClick={() => setPickerOpened(false)}
            >
              <Close />
            </IconButton>
          </div>
        </div>
        <LocalizationProvider
          dateAdapter={AdapterMoment}
        >
          <StaticDateTimePicker
            ampm={false}
            defaultValue={moment(new Date())}
            slots={{ actionBar: DateTimeActionBar }}
            slotProps={{
              actionBar: {
                actions: ['today', 'accept']
              }
            }}
            onAccept={date => handleSelect(date)}
          />
        </LocalizationProvider>
      </div>
    </Dialog>
  )
}

export default DateTimePickerDialog