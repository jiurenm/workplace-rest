const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event) => {
  return {
    ok: true,
    taskType: event.taskType || null,
    message: 'sendReminder cloud function placeholder'
  };
};
