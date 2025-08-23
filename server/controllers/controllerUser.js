const User = require('../models/users');

const allUsers = async (req, res) => {
  try {
    const findUser = await User.find();
    res.json(findUser);
  } catch (err) {
    res.status(500).send('خطا گرفتن کاربرها: ' + err);
  }
};

const user = async (req, res) => {
  try {
    const findId = await User.findById(req.params.id);
    res.json(findId);
  } catch (err) {
    res.status(500).send('خطا گرفتن یک کاربر: ' + err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.id);
    res.send('حذف شد');
  } catch (err) {
    res.status(500).send('خطا حذف کاربر : ' + err);
  }
};

const addUser = async (req, res) => {
  try {
    const existUser = await User.findOne({ name: req.body.name });
    if (existUser) {
      return res.status(400).send('کاربر تکراری');
    }
    const user = new User({
      name: req.body.name,
      password: req.body.password,
      detail: req.body.detail
    });
    await user.save();
    res.send('ذخیره شد');
  } catch (err) {
    res.status(500).send('خطا ذخیره کاربر : ' + err);
  }
};

const editeUser = async (req, res) => {
  try {
    const exist = await User.findOne({ name: req.body.name });
    if (exist && exist._id.toString() !== req.params.id) {
      return res.status(400).send('کاربر تکراری');
    }
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) {
      return res.status(404).send('کاربر پیدا نشد');
    }
    res.send('ویرایش شد');
  } catch (err) {
    res.status(500).send('خطا ویرایش کاربر : ' + err);
  }
};

module.exports = {
  allUsers,
  user,
  deleteUser,
  addUser,
  editeUser
};
