const Group = require('../models/Group');
const User = require('../models/User');

exports.createGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const ownerId = req.user.id;

    if (!name) return res.status(400).json({ message: 'Group name is required' });

    const group = await Group.create({
      name: name.trim(),
      description: description || '',
      owner: ownerId,
      members: [ownerId]
    });

    res.status(201).json({ success: true, group });
  } catch (error) {
    console.error('Create group error:', error);
    res.status(500).json({ message: 'Server error creating group' });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('owner', 'username profilePicture').sort({ createdAt: -1 });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching groups' });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('members', 'username profilePicture');
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching group' });
  }
};

exports.joinGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const userId = req.user.id;
    if (group.members.includes(userId)) return res.status(400).json({ message: 'Already a member' });

    group.members.push(userId);
    await group.save();

    res.status(200).json({ success: true, message: 'Joined group' });
  } catch (error) {
    res.status(500).json({ message: 'Server error joining group' });
  }
};

exports.leaveGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const userId = req.user.id;
    group.members = group.members.filter(id => id.toString() !== userId);
    await group.save();

    res.status(200).json({ success: true, message: 'Left group' });
  } catch (error) {
    res.status(500).json({ message: 'Server error leaving group' });
  }
};
