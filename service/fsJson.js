const fs = require('fs')

fs.readFile('./data_json/goods.json', function (err, data) {
  if (err) {
    console.log(err)
  } else {
    let newData = JSON.parse(data)
    console.log(newData)
    let i = 0
    let pushData = []
    newData.RECORDS.map(function (value, index) {
      if (value.IMAGE1 !== null) {
        i++
        console.log(value.NAME)
        pushData.push(value)
      }
    })
    console.log(i)
    fs.writeFile('./data_json/newGoods.json', JSON.stringify(pushData), function (err) {
      if (err) {
        console.log('文件写入失败')
      } else {
        console.log('文件写入成功')
      }
    })
  }
})
