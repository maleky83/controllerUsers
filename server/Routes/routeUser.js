const {
  allUsers,
  user,
  deleteUser,
  addUser,
  editeUser
} = require('../controllers/controllerUser');

const express = require('express');
const router = express.Router();

router.get('/', allUsers);
router.get('/:id', user);
router.post('/add', addUser);
router.delete('/delete', deleteUser);
router.patch('/:id', editeUser);

module.exports = router;
