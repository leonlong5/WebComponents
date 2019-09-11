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

    fetchData () {
        //clear the suggestions everytime user types
        this.setState({
            suggestions:[],
            areSuggestionsVisiable: false
        });

        //no query
        if (!this.state.query.length) return;

        //debounce
        clearTimeout(this.timeout);

        //mimics a server call
        this.timeout = setTimeout(()=>{
            this.setState({
                suggestions: [
                    'Jack', 'Jason', "John", "Joy", "Jackson", "Josh"
                ].filter(i => i.indexOf(this.state.query) !== -1), //use query to filter out
                areSuggestionsVisiable: true,
                selectedIndex: 0
            })
        }, 1000);
    }

    handleInputchange (e) {
        const query = e.value;
        this.setState({ query }, () => {
            this.fetchData()
        })
    }

    render() {
        return (
            <div>
                {this.state.selectedValue ? 
                 <p>Slected Value: {this.state.selectedValue}</p> : null}

                <input
                    type='text'
                    onKeyUp={this.handleKeyPress.bind(this)} 
                    onChange={this.handleInputchange.bind(this)}/>


                { (this.state.areSuggestionsVisiable && this.state.suggestions.length) ?
                    
                    <div calssName='suggestions'>
                        <ul>
                            {this.state.suggestions.map((item, i)=>{
                                return <li
                                        key={i}
                                        className={i === this.state.selectedIndex ? 'selected' : ''}
                                        onClick={()=>{ 
                                            this.setState({
                                                selectedValue: {item},
                                                areSuggestionsVisiable:false
                                            }) 
                                        }}
                                        >
                                            {item}
                                        </li>
                            })}
                        </ul>

                </div> : null}
            </div>
        )
    }
}

export default Autocomplete;