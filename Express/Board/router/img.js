const { upload } = require("../util/multer");
const express = require('express');
const fs = require('fs');
var router = express.Router();

// 이미지 업로드
router.post("/upload", upload.single("img"), async (req, res) => {

    const imgfile = req.file;
    console.log(imgfile);
    res.send({message: "이미지 등록 완료"});
});

router.delete("/upload", async (req, res) => {

    if (fs.existsSync("/uploads" + file_name)) {
      // 파일이 존재한다면 true 그렇지 않은 경우 false 반환
      try {
        fs.unlinkSync("/uploads" + file_name);
        console.log("image delete");
      } catch (error) {
        console.log(error);
      }
    }
  });

module.exports = router;