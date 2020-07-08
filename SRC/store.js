import {createStore} from 'redux';
import ReducerCreater from './redux/ReducerCreater';

const store=createStore(ReducerCreater);
export default store;