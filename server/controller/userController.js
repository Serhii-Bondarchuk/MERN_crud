import UserModel from "../model/userModel.js";

const errorMessage = (req, res, err) => {
  return res.status(500).json({ error: err.message });
}

export const create = async (req, res) => {
  try {
    const newUser = new UserModel(req.body)
    const { email, name } = newUser
    const userExists = await UserModel.findOne({ email })

    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const savedUser = await newUser.save()
    return res.status(201).json(savedUser);

  } catch (error) {
    return errorMessage(req, res, error)
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }
    return res.status(200).json(users);

  } catch (error) {
    return errorMessage(req, res, error)
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deletedUser = await UserModel.findById(id)

    if (!deletedUser) {
      return res.status(400).json({ msg: 'User not found' });
    }
    await UserModel.findByIdAndDelete(id)
    return res.status(200).json(deletedUser)
  } catch (error) {
    return errorMessage(req, res, error)
  }
}


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const userExists = await UserModel.findById(id)

    if (!userExists) {
      return res.status(404).json({ msg: 'User not found' });
    }
    return res.status(200).json(userExists);
  } catch (error) {
    return errorMessage(req, res, error)
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const userExists = await UserModel.findById(id)
    if (!userExists) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body,
      { new: true }
    )
    return res.status(200).json(updatedUser);
  } catch (error) {
    return errorMessage(req, res, error)
  }
}
