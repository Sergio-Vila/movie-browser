
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import React = require('react');

import Movie from "../models/Movie";

interface MovieCardProps {
    movie: Movie,
    onMovieClick: (movie: Movie) => void
};

const coverHeight = 200;
const coverWidth = coverHeight * 24 / 36;

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        maxWidth: 600
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: '1 0 auto'
    },
    cover: {
        height: coverHeight,
        width: coverWidth
    }
  }));

function cropOverview(overview: string, maxLength: number = 150): string {
    if (overview.length < maxLength) {
        return overview;
    }

    let indexLastWhiteSpace = -1; 

    for (let i=maxLength-1; i !== 0; --i) {
        if (overview.charAt(i) == ".") {
            return overview.substring(0, i);
        }
        else if (indexLastWhiteSpace === -1 && overview.charAt(i) === " ") {
            indexLastWhiteSpace = i;
        }
    }

    if (indexLastWhiteSpace !== -1) {
        return overview.substring(0, indexLastWhiteSpace);
    }

    return overview.substring(0, maxLength);
}


const MovieCard: React.FC<MovieCardProps> = (props: MovieCardProps) => {
    const classes = useStyles();

    let posterView: JSX.Element;

    if (props.movie.poster) {
        posterView = <CardMedia
            className={classes.cover}
            image={props.movie.poster.href}
            title={props.movie.title}
            component="img"
            height={coverHeight}
            width={coverWidth}
        />;
    } else {
        posterView = <></>;
    }

    return (
        <Card className={classes.card}>
            {posterView}
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {props.movie.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {cropOverview(props.movie.overview) + "..."}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => props.onMovieClick(props.movie)}>
                        Learn More
                    </Button>
                </CardActions>
            </div>
        </Card>
    );
};

export default MovieCard;