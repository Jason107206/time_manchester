import { Button, DialogActions } from "@mui/material";
import { PickersActionBarProps, usePickersTranslations } from "@mui/x-date-pickers";

const DateTimeActionBar = (props: PickersActionBarProps) => {
  const { onAccept, onSetToday, actions, className } = props;
  const translations = usePickersTranslations();

  if (actions == null || actions.length === 0) {
    return null;
  }

  return (
    <DialogActions className={className + " justify-between"}>
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

export default DateTimeActionBar