const router = require('express').Router();

const Bear = require('./bearModel');

router.post('/', function post(req, res) {
  const bearData = req.body;
  const bear = new Bear(bearData);

  bear
    .save()
    .then(bear => {
      res.status(201).json(bear);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/', function get(req, res) {
  Bear.find().then(bears => {
    res.status(200).json(bears);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Bear.findById(id)
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json(err));
});

// /api/bears/1234
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Bear.findByIdAndRemove(id)
    .then(bear => {
      if (bear) {
        res.status(204).end();
      } else {
        res.status(404).json({ msg: 'Bear not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const options = {
    new: true,
  };

  Bear.findByIdAndUpdate(id, update, options)
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({ msg: 'Bear not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;