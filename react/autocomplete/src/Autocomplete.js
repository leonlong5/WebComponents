import React from 'react';

class Autocomplete extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            suggestions: [],
            query : '',
            areSuggestionsVisiable: false
        }
    }
    handleKeyPress () {

    }

    render() {
        return (
            <div>
                <input
                    type='text'
                    onKeyUp={this.handleKeyPress.bind(this)} />

                <div calssName='suggestions'>
                    <ul>
                        
                    </ul>
                </div>
            </div>
        )
    }
}

export default Autocomplete;