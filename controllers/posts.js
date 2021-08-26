import mongoose from 'mongoose'

import PostMessage from '../models/PostMessage.js'

export const getPosts = async(req, res) => {
  try {
    const postMessages = await PostMessage.find()

    res.status(200).json(postMessages)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const createPost = async(req, res) => {
  const { title, message, selectedFile, creator, tags} = req.body

  const newPostMessage = new PostMessage({title, message, selectedFile, creator, tags})

  try {
    await newPostMessage.save()
    res.status(200).json(newPostMessage)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updatePost = async(req, res) => {
  const { id } = req.params
  const { title, message, selectedFile, creator, tags } = req.body
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No post with id: ${id}`})

  const updatedPost = { title, message, selectedFile, creator, tags, _id: id }
  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true })

  res.status(200).json(updatedPost)
}