import { connect } from 'react-redux';
import App from '../views/App';
import { saveLocal } from '../lib/actions';

export const AppContainer = connect(
    function mapStateToProps(state) {
        return {items : state.items}
    },
    function mapDispatchToProps(dispatch) {
        return {saveToLocalStorage : items => dispatch(saveLocal(items))}
    }
)(App);