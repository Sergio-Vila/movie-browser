import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    }
  })
);

interface BackButtonProps {
    onClick: () => void
};

const BackButton: React.FC<BackButtonProps> = (props: BackButtonProps) => {
  const classes = useStyles();

  return (
    <div>
      <IconButton onClick={props.onClick} color="primary" className={classes.button} aria-label="Back to search results">
        <Icon>arrow_back</Icon>
      </IconButton>
    </div>
  );
}

export default BackButton;
