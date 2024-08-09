const db = require('../db/connect');
const Resume = db.collection('resumes');
const { ObjectId } = require('mongodb');

async function create(userId, education, address, email, description, dateOfBirth) {
  const result = await Resume.insertOne({ userId: new ObjectId(userId), education, address, email, description, dateOfBirth: new Date(dateOfBirth) });
  return result;
}

async function search(name){
  const result = await Resume.aggregate([
    {
      $lookup:{
        from: 'users',
       localField: 'userId',
       foreignField: '_id',
       as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $match: {
        'user.name': name
      }
    },
    {
      $project:{
        'user.username': 1,
        email: 1
      }
    }
  ]).toArray();
  return result;
}

async function findById(resumeId) {
  const result = await Resume.aggregate([
    {
      $match: {
        _id: new ObjectId(resumeId)
      }
    }
  ]).toArray();

  return result[0];
}

module.exports = {
  create: create,
  search: search,
  findById: findById
}