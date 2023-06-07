import { legacy_createStore as createStore} from 'redux'
import Mainreducer from './Mainreducer';

const store = createStore (Mainreducer)
export default store