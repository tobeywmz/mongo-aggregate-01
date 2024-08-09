const db = require('../db/connect');
const Comment = db.collection('comments');
const { ObjectId } = require('mongodb');

async function createComment(userId, resumeId, title, description, rating) {
  const commentBody = {
    userId: new ObjectId(userId),
    resumeId: new ObjectId(resumeId),
    title: title,
    description: description,
    createdAt: new Date(),
    rating: parseFloat(rating)
  };
  const result = await Comment.insertOne(commentBody);
  return result;
}

async function listComments(resumeId) {
  const result = await Comment.aggregate([
    {
      $match: {
        resumeId: new ObjectId(resumeId)
      }
    },
    {
      $lookup: {
        from: 'users',
        foreignField: '_id',
        localField: 'userId',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $project: {
        resumeId: 0, userId: 0, 'user.username': 0, 'user.password': 0, 'user._id': 0
      }
    },
    {
      $sort: {
        createdAt: -1
      }
    }
  ]).toArray();
  return result;
}

async function getAverageRating(resumeId) {
  const result = await Comment.aggregate([
    {
      $match: {
        resumeId: new ObjectId(resumeId)
      }
    },
    {
      $group: {
        _id: null,
        averageRating: {
          $avg: '$rating'
        }
      }
    }
  ]).toArray();
  return result;
}

module.exports = {
  createComment: createComment,
  listComments: listComments,
  getAverageRating: getAverageRating
}