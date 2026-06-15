const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event) => {
  return {
    ok: true,
    date: event.date || null,
    message: 'aggregateStats cloud function placeholder'
  };
};
