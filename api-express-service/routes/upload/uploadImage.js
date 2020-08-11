const router = require('express').Router();
const multer = require('multer');
const user = require('../../models/user');
const { verifyToken } = require('../../middlewares');
// const { Storage } = require('@google-cloud/storage');
const multerGoogleStorage = require("multer-google-storage");

// const storage = new Storage({ keyFilename: './e3vis-ntueee-d9a98304c430.json' });
// const bucket = storage.bucket('e3vis');

const uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine()
}).single('image');

router.get('/', verifyToken, async (req, res) => {
  if (!(req.user.role === "superadmin" || req.user.role === "clubadmin")) return res.status(401).send('Unauthorized Access!');
  res.status(200).send({ user: req.user._id, access: "authorized" });
})

router.post('/image', verifyToken, async (req, res) => {
  if (!(req.user.role === "superadmin" || req.user.role === "clubadmin")) return res.status(401).send('Unauthorized Access!');
  try {
    uploadHandler(req, res, function (err) {
      if (err) {
        console.log("uploading error", err)
        return res.status(400).json(err);
      }
      if (!req.file) {
        return res.status(500).send("Error!");
      }
      res.status(200).send(req.file.path);
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/avatar-image', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');
  try {
    uploadHandler(req, res, function (err) {
      if (err) {
        console.log("uploading error", err)
        return res.status(400).json(err);
      }
      if (!req.file) {
        return res.status(500).send("Error!");
      }
      const imageUrl = req.file.path;
      user.findOneAndUpdate({ email: req.user.email }, { avatarUrl: imageUrl }).then(() => {
        res.status(200).json("Image is updated successfully!");
      }).catch((err) => {
        res.status(400).send(err);
      });
    });

  } catch (err) {
    res.status(400).send(err);
  }
});




// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, __dirname + '../../../uploads/images')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// })

// // const upload = multer({ storage: storage, limits: { fileSize: 100 } });
// const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 } }).single('image');

// router.get('/', verifyToken, async (req, res) => {
//   if (!(req.user.role === "superadmin" || req.user.role === "clubadmin")) return res.status(401).send('Unauthorized Access!');
//   res.status(200).send({ user: req.user._id, access: "authorized" });
// })

// router.post('/image', verifyToken, (req, res) => {
//   if (!(req.user.role === "superadmin" || req.user.role === "clubadmin")) return res.status(401).send('Unauthorized Access!');
//   try {
//     upload(req, res, function (err) {
//       if (err) {
//         return res.status(400).json(err.message);
//       }
//       var imageUrl = 'https' + '://' + req.get('host') + "/genesis-api/uploads/images/" + req.file.filename;

//       return res.status(200).json(imageUrl);
//     });

//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// router.post('/avatar-image', verifyToken, async (req, res) => {
//   if (!req.user.role) return res.status(401).send('Unauthorized Access!');
//   try {
//     upload(req, res, function (err) {
//       if (err) {
//         return res.status(400).json(err.message);
//       }
//       var imageUrl = 'https' + '://' + req.get('host') + "/genesis-api/uploads/images/" + req.file.filename;
//       user.findOneAndUpdate({ email: req.user.email }, { avatarUrl: imageUrl }).then(() => {
//         res.status(200).json("Image is updated successfully!");
//       }).catch((err) => {
//         res.status(400).send(err);
//       });
//     });

//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

module.exports = router;