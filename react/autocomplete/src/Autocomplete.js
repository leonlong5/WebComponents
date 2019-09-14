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
    handleKeyPress (e) {
        // eslint-disable-next-line default-case
        switch(e.key) {
            case 'ArrowUp':
                if (this.state.selectedIndex - 1 < 0) break;
                return this.setState({ selectedIndex: this.state.selectedIndex - 1})
            case 'ArrowDown':
                if (this.state.selectedIndex + 1 > this.state.suggestions.length) break;
                return this.setState({ selectedIndex: this.state.selectedIndex + 1})
            case 'Escape':
                return this.setState({ areSuggestionsVisiable: false})
            case 'Backspace':
                break;
            case 'Enter':
                return this.setState({
                    selectedValue: this.state.suggestions[this.state.selectedIndex],
                    areSuggestionsVisiable: false
                })
        }
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
                ].filter(sugesstion => sugesstion.startsWith(this.state.query)), //use query to filter out
                areSuggestionsVisiable: true,
                selectedIndex: 0
            })
        }, 1000);
    }

    handleInputchange (e) {
        const query = e.target.value;
        //we need to use an updater call back here to fetch data
        //because we need query to beupdated before fetchData been triggered
        this.setState({ query }, ()=>this.fetchData())
    }

    render() {
        return (
            <div className='container'>
                
                <input
                    type='text'
                    onKeyUp={this.handleKeyPress.bind(this)} 
                    onChange={this.handleInputchange.bind(this)}/>


                { (this.state.areSuggestionsVisiable && this.state.suggestions.length) ?
                    
                    <div className='suggestions'>
                        <ul>
                            {this.state.suggestions.map((item, i)=>{
                                return <li
                                        key={i}
                                        className={i === this.state.selectedIndex ? 'selected' : ''}
                                        onClick={()=> this.setState({
                                                selectedValue: item,
                                                areSuggestionsVisiable:false
                                        })}
                                        >
                                            {item}
                                        </li>
                            })}
                        </ul>
                </div> : null}

                {this.state.selectedValue ? 
                 <p className='selectedValue'>Slected Value: {this.state.selectedValue}</p> : null}
            </div>
        )
    }
}

export default Autocomplete;