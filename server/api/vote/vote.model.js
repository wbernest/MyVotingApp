'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './vote.events';

var VoteSchema = new mongoose.Schema({
  name: String,
  options: Array,
  user: String,
  active: Boolean
});

registerEvents(VoteSchema);
export default mongoose.model('Vote', VoteSchema);
