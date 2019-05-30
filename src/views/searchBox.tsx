
import TextField from '@material-ui/core/TextField';
import React = require('react');

interface SearchBoxProps {
    onSearch: (userInput: string) => void;
    userInput: string;
};

interface SearchBoxState {
    userInput: string;
};

export default class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
    state: SearchBoxState;

    constructor(props: SearchBoxProps) {
        super(props);

        this.state = {
            userInput: props.userInput
        };
    }

    handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            this.props.onSearch(this.state.userInput);
        }
    }

    render() {
        return (
            <TextField
                InputProps={{
                    value: this.state.userInput,
                    placeholder: "Search movies",
                    onKeyPress: this.handleKeyDown,
                    onChange: (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ userInput: event.target.value })
                }}
                fullWidth={true}
            />
        );
    };
}