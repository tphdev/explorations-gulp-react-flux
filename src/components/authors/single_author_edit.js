var React = require('react')
var EditForm = require('./_edit_author_form.js')

var AuthorStore = require('../../stores/authorStore.js');
var AuthorActions = require('../../actions/authorActions.js');

var superForEach = require('../../_utils.js')

var EditAuthorComponent = React.createClass({

  getInitialState: function(){
    return {
      authorData: {} 
    }
  },
 
  componentDidMount: function(){
    var autIdParam = this.props.params.autId

    AuthorActions.getSingleAuthor({
      name_id: autIdParam
    })


    AuthorStore.addChangeListener(function(){
      console.log("AuthorStore UI State")
      console.log(AuthorStore.getEditFormUIState())

      // make sure author record from DB matches the param
      var authorRecord = AuthorStore.getAuthorsList().find(function(aut){
        return aut.name_id === autIdParam
      })

      //get the editform UI State
      if (authorRecord){
        var authorRecord = AuthorStore.getEditFormUIState()
        
        this.setState({
          authorData: authorRecord
        })
      }     
    }.bind(this))
  },

  componentWillUnmount: function(){
    AuthorStore.removeChangeListener()
  },

  render: function(){

    if ( Object.keys( this.state.authorData ).length ){
      return <EditForm authorData={this.state.authorData}/>
    } else {
      return <p>...loading...</p>
    }
  }

})

module.exports = EditAuthorComponent;