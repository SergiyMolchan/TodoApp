import React from 'react';
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';

class Search extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        search: ''
      }
    }
    
      handleSearch = (e) => {
        this.setState({search: e.target.value}, () => this.props.onSearch(this.state.search.trim()));
      }

      handleBlur = () => {
        this.setState({search: ''}, () => this.props.onSearch(this.state.search));
      }

      render(){
          return(
            <TextField
            type="text" 
            placeholder="Search"
            value={this.state.search} 
            onChange={this.handleSearch}
            onBlur={this.handleBlur}
          />
          )
      }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default Search;