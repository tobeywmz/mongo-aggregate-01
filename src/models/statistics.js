const db = require('../db/connect');
const Comment = db.collection('comments');
const User = db.collection('users');
const Resume = db.collection('resumes');
const { ObjectId } = require('mongodb');

async function global() {
  const resumeCountResult = await Resume.aggregate([
    {
      $group: {
        _id: null,
        countAll: {
          $count: {}
        }
      }
    }
  ]).toArray();
  let resumeCount = 0;
  if (resumeCountResult.length)
  {
    resumeCount = resumeCountResult[0].countAll;
  }

  const userCountResult = await User.aggregate([
    {
      $group: {
        _id: null,
        countAll: {
          $count: {}
        }
      }
    }
  ]).toArray();
  let userCount = 0;
  if (userCountResult.length)
  {
    userCount = userCountResult[0].countAll;
  }

  const commentCountResult = await Comment.aggregate([
    {
      $group: {
        _id: null,
        countAll: {
          $count: {}
        }
      }
    }
  ]).toArray();
  let commentCount = 0;
  if (commentCountResult.length)
  {
    commentCount = commentCountResult[0].countAll;
  }

  return {
    resumeCount: resumeCount,
    userCount: userCount,
    commentCount: commentCount,
  };
}

module.exports = {
  global: global
};