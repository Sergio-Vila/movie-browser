
import BackButton from "./BackButton";
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

import React = require('react');

import Actor from "../models/Actor";
import Movie from "../models/Movie";
import {Grid} from "@material-ui/core";

interface MovieInfoProps {
    movie: Movie,
    casting: Promise<Actor[]>,
    onBackButtonClick: () => void
};

function formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    content: {
        flex: '1 0 auto'
    }
  }));


const MovieInfo: React.FC<MovieInfoProps> = (props: MovieInfoProps) => {
    const classes = useStyles();

    const [casting, useCasting] = React.useState<Actor[]>();

    props.casting.then(useCasting);

    let castingView: JSX.Element;

    if (casting) {
        castingView =
            <p>
                <b>Casting: </b>
                {casting.map((actor: Actor) => actor.name).join(", ")}.
            </p>;
    } else {
        castingView = <></>;
    }

    const movieInfo: JSX.Element =
        <div>
            <h1>{ props.movie.title }</h1>
            <p>{ props.movie.overview }</p>
            <p><b>Released: </b>{ formatDate(props.movie.releaseDate) }</p>
            {castingView}
            <BackButton onClick={props.onBackButtonClick} />
    </div>

    if (props.movie.poster) {
        return (
            <Grid container spacing={3}>
                <Grid item sm={4}>
                    <CardMedia
                        className={classes.content}
                        image={props.movie.poster.href}
                        title={props.movie.title}
                        component="img"
                    />
                </Grid>
                <Grid item sm={8}>
                    {movieInfo}
                </Grid>
            </Grid>
        );
    } else {
        return movieInfo;
    }
};

export default MovieInfo;