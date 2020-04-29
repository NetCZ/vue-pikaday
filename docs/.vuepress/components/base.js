import Vue from 'vue';
import moment from 'moment';
import _ from 'lodash';

import 'pikaday/css/pikaday.css';

import VuePikaday from '../../../src';

Vue.use(VuePikaday);

Vue.prototype.$moment = moment;
Vue.prototype.$_ = _;
